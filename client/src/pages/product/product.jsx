import React from 'react';
import './product.less';
import {Button, Divider, Switch, Table, Modal, Row, Col, Cascader, Tag, Select, Input, Icon} from 'antd';
import {reqCategoryList, reqProductList, reqProductDelete, updateProductList, reqProductSearch} from '../../api';
import Loading from '../../components/loading/index';
import TopNav from "../../components/top-nav";

class Product extends React.Component {
    constructor(props){
        super(props);
        this.state=({
            isLoading: true,
            data: [],
            options1: [],
            options2: [],
            selectedRowKeys: [],
            operation: "",
            selectedCategory: [],
            categoryFilters: [],
            selectedType: ''
        })
    }
    UNSAFE_componentWillMount = async () => {
        const response = await reqProductList();
        if(response.status === 0) this.refreshTable(response.data)
    };
    componentWillUnmount = () => {
        clearTimeout(this.timerID);
    };
    formRef = {};
    rowSelection = {
        onChange: (selectedRowKeys) => {
            this.setState({selectedRowKeys: selectedRowKeys})
        }
    };
    refreshTable = async (data) => {
        const response = await reqCategoryList();
        if(response.status===0){
            let options1 = [
                {
                    value: 'onsale-1',
                    label: '商品上架',
                },
                {
                    value: 'onsale-0',
                    label: '商品下架',
                },
                {
                    value: 'recommend-1',
                    label: '设为推荐',
                },
                {
                    value: 'recommend-0',
                    label: '取消推荐',
                },
                {
                    value: 'isnew-1',
                    label: '设为新品',
                },
                {
                    value: 'isnew-0',
                    label: '取消新品',
                },
                {
                    value: 'delete',
                    label: '删除商品',
                }
            ];
            let options2 = [];
            let categoryFilters = [];
            response.data.forEach(item1 => {
                options2.push({label: item1.name, value: item1.id});
                data.map(item2 => {
                    categoryFilters.indexOf(item1.name)===-1 ? categoryFilters.push(item1.name) : categoryFilters.push();
                    if(item2.category === item1.id) item2.categoryName = item1.name;
                    if(item2.category === 999) item2.categoryName = '未分类';
                    return item2;
                })
            });
            categoryFilters = categoryFilters.map(item => {
                return {text: item, value: item}
            });
            categoryFilters.push({text: '未分类', value: '未分类'});
            options1.push({
                label: '移至',
                value: 'move',
                children: options2
            });
            this.setState({
                isLoading: true,
                options1: options1,
                options2: options2,
                categoryFilters: categoryFilters
            });
            this.timerID = setTimeout(() => {
                this.setState({
                    isLoading: false,
                    data: data
                })
            }, 300);
        }
    };
    handleStateChange = async (record, string) =>{
        let obj={id: record.id};
        obj[string]=1-record[string];
        const response = await updateProductList(obj);
        let data = this.state.data;
        if(response.status === 0){
            data.forEach(item => item[string] = item.id===record.id ? 1-item[string] : item[string]);
            this.setState({
                data: data
            });
        }
    };
    handleAdd = () => {
        this.props.history.push('/product/add')
    };
    handleView = (record) => {
        this.props.history.push({pathname: '/product/view', state: {data: record}})
    };
    handleEdit = (record) => {
        this.props.history.push({pathname: '/product/edit', state: {data: record}})
    };
    handleDelete = (record) => {
        Modal.confirm({
            title: '警告',
            content:  "确定要删除商品\""+record.name+"\"吗？",
            okText: '确认',
            onOk: async () => {
                const response = await reqProductDelete(record);
                if(response.status === 0){
                    let data=[];
                    this.state.data.forEach(item => {
                        item.id===record.id ? data.push() : data.push(item)
                    });
                    this.setState({
                        data: data
                    })
                }
            },
            cancelText: '取消',
            onCancel: () => {}
        });
    };
    handleSelectChange = (value) => {
        this.setState({selectedType: value})
    };
    handleSearch = async (value) => {
        let data = {
            status: this.state.selectedType,
            value: value
        };
        if(data.value==="" && data.status===""){
            const response = await reqProductList();
            if(response.status === 0) this.refreshTable(response.data)
        }else{
            for(let key in data){
                if(data.hasOwnProperty(key) && data[key].length !== 0){
                    if(key === "status"){
                        let arr = data.status.split('-');
                        data[arr[0]] = Number(arr[1])
                    }else{
                        data[key] = typeof(data[key])==="object" ? data[key][0] : data[key]
                    }
                }
            }
            const response = await reqProductSearch(data);
            if(response.status === 0) this.refreshTable(response.data)
        }
    };
    handleCascaderChange = (value) => {
        this.setState({operation: value})
    };
    handleOperate = async () => {
        let operation = this.state.operation;
        if(operation.length === 0){
            this.setState({selectedRowKeys: []});
            this.refreshTable(this.state.data)
        }else if(operation.length === 1){
            if(operation[0] === 'delete'){
                const response1 = reqProductDelete(this.state.selectedRowKeys);
                if(response1.status === 0){
                    const response2 = await reqProductList();
                    if(response2.status === 0){
                        let data = response2.data;
                        data.forEach(item1 => {
                            this.state.options2.forEach(item2 => {
                                if(item1.category === item2.value){
                                    item1.categoryName = item2.label
                                }
                            })
                        });
                        this.timerID = setTimeout(() => {
                            this.formRef1.props.form.resetFields();
                            this.refreshTable(data)
                        }, 500)
                    }
                }
            }else if(operation[0] === 'move'){
                this.formRef1.props.form.resetFields();
                this.refreshTable(this.state.data)
            }else{
                let data = {};
                let arr = operation[0].split('-');
                data.id = this.state.selectedRowKeys;
                data[arr[0]] = Number(arr[1]);
                const response1 = await updateProductList(data);
                if(response1.status === 0){
                    const response2 = await reqProductList();
                    if(response2.status === 0){
                        let data = response2.data;
                        data.forEach(item1 => {
                            this.state.options2.forEach(item2 => {
                                if(item1.category === item2.value){
                                    item1.categoryName = item2.label
                                }
                            })
                        });
                        this.timerID = setTimeout(() => {
                            this.refreshTable(data)
                        }, 500)
                    }
                }
            }
        }else{
            let data = {};
            data.id = this.state.selectedRowKeys;
            data.category = operation[1];
            const response1 = await updateProductList(data);
            if(response1.status === 0){
                const response2 = await reqProductList();
                if(response2.status === 0){
                    let data = response2.data;
                    data.forEach(item1 => {
                        this.state.options2.forEach(item2 => {
                            if(item1.category === item2.value){
                                item1.categoryName = item2.label
                            }
                        })
                    });
                    this.refreshTable(data)
                }
            }
        }
    };
    render(){
        const columns = [
            {
                title: '货号',
                key: 'number',
                dataIndex: 'number'
            },
            {
                title: '名称',
                dataIndex: 'name',
                key: 'name',
                render: (text, record) => (
                    <Button type="link" onClick={()=>this.handleView(record)}>
                        {text}
                        {record.category === 999 ? <Tag size="small" color="red">未分类</Tag> : null}
                    </Button>
                )
            },
            {
                title: '分类',
                key: 'categoryName',
                dataIndex: 'categoryName',
                render: (text, record) => <span>{record.category === 999 ? "未设置分类" : text}</span>,
                filters: this.state.categoryFilters,
                onFilter: (value, record) => value===record.categoryName
            },
            {
                title: '售价',
                key: 'price',
                dataIndex: 'price',
                render: (text) => <span>￥{text.toFixed(2)}</span>,
                sorter: (a, b) => a.price - b.price
            },
            {
                title: '积分',
                key: 'integral',
                dataIndex: 'integral',
                render: (text) => <span>{text}</span>,
                sorter: (a, b) => a.integral - b.integral
            },
            {
                title: '单位',
                key: 'unit',
                dataIndex: 'unit',
                render: (text) => <span>{text}</span>
            },
            // {
            //     title: '销量/周',
            //     key: 'sales',
            //     dataIndex: 'sales',
            //     render: (text, record) => <span>{record.category === 999 ? '/' : text+record.unit}</span>,
            //     sorter: (a, b) => a.sales - b.sales
            // },
            {
                title: '状态',
                key: 'status',
                render: (record) => record.category === 999 ? <span>/</span> : (
                    <span>
                        <span>上架：</span>
                        <Switch size="small"
                                defaultChecked={record.onsale === 1}
                                onClick={()=>this.handleStateChange(record, "onsale")}
                        /><br/>
                        <span>新品：</span>
                        <Switch size="small"
                                style={{marginTop: "5px"}}
                                defaultChecked={record.isnew === 1}
                                onClick={()=>this.handleStateChange(record, "isnew")}
                        /><br/>
                        <span>推荐：</span>
                        <Switch size="small"
                                style={{marginTop: "5px"}}
                                defaultChecked={record.recommend === 1}
                                onClick={()=>this.handleStateChange(record, "recommend")}
                        />
                    </span>
                )
            },
            // {
            //     title: '上架',
            //     key: 'onsale',
            //     dataIndex: 'onsale',
            //     render: (text, record) => (
            //         <Switch size="small"
            //                 defaultChecked={text=== 1}
            //                 onClick={()=>this.handleStateChange(record, "onsale")}
            //         />
            //     )
            // },
            // {
            //     title: '新品',
            //     key: 'isnew',
            //     dataIndex: 'isnew',
            //     render: (text, record) => (
            //         <Switch size="small"
            //                 defaultChecked={text=== 1}
            //                 onClick={()=>this.handleStateChange(record, "isnew")}
            //         />
            //     )
            // },
            // {
            //     title: '推荐',
            //     key: 'recommend',
            //     dataIndex: 'recommend',
            //     render: (text, record) => (
            //         <Switch size="small"
            //                 defaultChecked={text=== 1}
            //                 onClick={()=>this.handleStateChange(record, "recommend")}
            //         />
            //     )
            // },
            {
                title: '操作',
                key: 'action',
                render: (record) => (
                    <span>
                        <Button size="small" onClick={()=>this.handleEdit(record)}>编辑</Button>
                        <Divider type="vertical" />
                        <Button size="small" type="danger" onClick={()=>this.handleDelete(record)}>删除</Button>
                    </span>
                )
            }
        ];
        return (
            <div className="product-container">
                <TopNav nav={['商品管理', '商品列表']}/>
                <div className="product-header">
                    <Row>
                        <Col span={8}>
                            <Button type="primary" onClick={()=>this.handleAdd()}><Icon type="plus"/>新增商品</Button>
                            
                        </Col>
                        <Col span={6} style={{marginTop: "-1px"}}>
                            <Cascader style={{width: "120px", marginRight: "15px"}}
                                      placeholder="批量操作"
                                      options={this.state.options1}
                                      onChange={this.handleCascaderChange}/>
                            <Button type="primary" onClick={this.handleOperate}>确认</Button>
                        </Col>
                        <Col span={10} style={{textAlign:"right"}}>
                            <Select
                                style={{width: "110px", textAlign: "left"}}
                                placeholder="选择状态"
                                onChange={this.handleSelectChange}
                            >
                                <Select.Option value="">全部</Select.Option>
                                <Select.Option value="onsale-1">已上架</Select.Option>
                                <Select.Option value="onsale-0">未上架</Select.Option>
                                <Select.Option value="isnew-1">新品</Select.Option>
                                <Select.Option value="isnew-0">非新品</Select.Option>
                                <Select.Option value="recommend-1">已推荐</Select.Option>
                                <Select.Option value="recommend-0">未推荐</Select.Option>
                            </Select>
                            <Input.Search
                                placeholder="搜索商品名称/货号"
                                style={{width: "200px", float: "right", margin: "0 15px "}}
                                onSearch={(value) => this.handleSearch(value)}
                                enterButton
                            />
                        </Col>
                    </Row>
                </div>
                {
                    this.state.isLoading ? <Loading /> :
                        <Table
                            rowSelection={this.rowSelection}
                            style={{margin: "20px"}}
                            size="small"
                            columns={columns}
                            dataSource={this.state.data}
                            rowKey={record => record.id}
                            bordered
                        />
                }
            </div>
        )
    }
    
}

export default Product;























