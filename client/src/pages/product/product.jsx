import React from 'react';
import './product.less';
import {Button, Divider, Switch, Table, Icon, Modal, message} from 'antd';
import ProductOperate from './product-operate';
import ProductSearch from './product-search';
import {reqCategoryList, reqProductList, reqProductDelete, updateProductList, reqProductSearch} from '../../api';
import Loading from '../../components/loading/index';
import TopNav from "../../components/top-nav";

class Product extends React.Component {
    constructor(props){
        super(props);
        this.state=({
            column: this.columns,
            isLoading: true,
            data: [],
            options1: [],
            options2: [],
            options3: [
                {
                    value: 'onsale-1',
                    label: '已上架',
                },
                {
                    value: 'onsale-0',
                    label: '未上架',
                },
                {
                    value: 'isnew-1',
                    label: '新品',
                },
                {
                    value: 'isnew-0',
                    label: '非新品',
                },
                {
                    value: 'recommend-1',
                    label: '已推荐',
                },
                {
                    value: 'recommend-0',
                    label: '未推荐',
                }
            ],
            selectedRowKeys: []
        })
    }
    UNSAFE_componentWillMount = async () => {
        const response1 = await reqProductList();
        const response2 = await reqCategoryList();
        if(response1.status===0 && response2.status===0){
            let data = response1.data;
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
                    value: 'unrecommend-0',
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
            response2.data.forEach(item1 => {
                options2.push({label: item1.name, value: item1.id});
                data.map(item2 => {
                    if(item2.category === item1.id){
                        item2.category_name = item1.name
                    }
                    return item2;
                })
            });
            options1.push({
                label: '移至',
                value: 'move',
                children: options2
            });
            this.setState({
                options1: options1,
                options2: options2
            });
            this.refreshTable(data);
        }
    };
    componentWillUnmount = () => {
        clearTimeout(this.timeID);
    };
    formRef1 = {};
    formRef = {};
    columns = [
        {
            title: '货号',
            key: 'number',
            dataIndex: 'number'
        },
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '分类',
            key: 'category_name',
            dataIndex: 'category_name',
        },
        {
            title: '售价',
            key: 'price',
            dataIndex: 'price',
            render: (text) => <span>￥{text}</span>
        },
        {
            title: '销量/周',
            key: 'sales',
            dataIndex: 'sales',
            render: (text, record) => <span>{text+record.unit}</span>
        },
        {
            title: '评价',
            key: 'stars',
            dataIndex: 'stars',
            render: (text) => {
                let starArr=[];
                for(let i=0;i<text;i++){
                    starArr.push(i)
                }
                return starArr.map((item) => {
                    return <Icon key={item} type="star" style={{color: "yellow"}} theme="filled" />
                });
            }
        },
        {
            title: '状态',
            key: 'status',
            render: (record) => (
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
        {
            title: '操作',
            key: 'action',
            render: (record) => (
                <span>
                    <Button size="small" onClick={()=>this.handleView(record)}>详情</Button>
                    <Divider type="vertical" />
                    <Button size="small" onClick={()=>this.handleEdit(record)}>编辑</Button>
                    <Divider type="vertical" />
                    <Button size="small" type="danger" onClick={()=>this.handleDelete(record)}>删除</Button>
                </span>
            )
        }
    ];
    rowSelection = {
        onChange: (selectedRowKeys) => {
            this.setState({selectedRowKeys: selectedRowKeys})
        }
    };
    refreshTable = (data) => {
        this.setState({isLoading: true});
        this.timeID = setTimeout(() => {
            this.setState({
                isLoading: false,
                data: data
            })
        }, 300);
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
        this.props.history.push('/product-add')
    };
    handleView = (record) => {
        this.props.history.push({pathname: '/product-view', state: {data: record}})
    };
    handleEdit = (record) => {
        this.props.history.push({pathname: '/product-edit', state: {data: record}})
    };
    handleDelete = (record) => {
        Modal.confirm({
            title: '警告',
            content:  "确定要删除商品\""+record.name+"\"吗？",
            okText: '确认',
            onOk: async () => {
                let data = [];
                data.push(record.id);
                const response = await reqProductDelete(data);
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
    handleOperateSubmit = e => {
        e.preventDefault();
        this.formRef1.props.form.validateFields( async (err, values) => {
            if(!err){
                let operation = values.operation;
                if(this.state.selectedRowKeys.length!==0 && operation.length!==0){
                    if(operation.length === 1){
                        if(operation[0] === 'delete'){
                            const response1 = reqProductDelete(this.state.selectedRowKeys);
                            if(response1.status === 0){
                                message.success(response1.msg);
                                const response2 = await reqProductList();
                                if(response2.status === 0){
                                    let data = response2.data;
                                    data.forEach(item1 => {
                                        this.state.options2.forEach(item2 => {
                                            if(item1.category === item2.value){
                                                item1.category_name = item2.label
                                            }
                                        })
                                    });
                                    this.timeID = setTimeout(() => {
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
                                message.success(response1.msg);
                                const response2 = await reqProductList();
                                if(response2.status === 0){
                                    let data = response2.data;
                                    data.forEach(item1 => {
                                        this.state.options2.forEach(item2 => {
                                            if(item1.category === item2.value){
                                                item1.category_name = item2.label
                                            }
                                        })
                                    });
                                    this.timeID = setTimeout(() => {
                                        this.formRef1.props.form.resetFields();
                                        this.refreshTable(data)
                                    }, 500)
                                }
                            }
                        }
                    }else{
                        let data = {};
                        data.id = this.state.selectedRowKeys;
                        data.category = operation[1];
                        console.log(data);
                        const response1 = await updateProductList(data);
                        if(response1.status === 0){
                            message.success(response1.msg);
                            const response2 = await reqProductList();
                            if(response2.status === 0){
                                let data = response2.data;
                                data.forEach(item1 => {
                                    this.state.options2.forEach(item2 => {
                                        if(item1.category === item2.value){
                                            item1.category_name = item2.label
                                        }
                                    })
                                });
                                this.timeID = setTimeout(() => {
                                    this.formRef1.props.form.resetFields();
                                    this.refreshTable(data)
                                }, 500)
                            }
                        }
                    }
                }else{
                    this.setState({selectedRowKeys: []});
                    this.refreshTable(this.state.data)
                }
            }
        });
    };
    handleSearchSubmit = e => {
        e.preventDefault();
        this.formRef2.props.form.validateFields(async (err, values) => {
            if(!err){
                let data = {};
                if(values.nameOrNumber==="" && values.category.length===0 && values.status.length===0){
                    this.refreshTable(this.state.data)
                }else{
                    for(let key in values){
                        if(values.hasOwnProperty(key) && values[key]!==undefined){
                            if(values[key].length !== 0){
                                if(key === "status"){
                                    let arr = values.status[0].split('-');
                                    data[arr[0]] = Number(arr[1])
                                }else{
                                    data[key] = typeof(values[key])==="object" ? values[key][0] : values[key]
                                }
                            }
                        }
                    }
                    const response = await reqProductSearch(data);
                    if(response.status === 0){
                        let data=response.data;
                        this.state.options2.forEach(item1 => {
                            data.forEach(item2 => {
                                if(item2.category === item1.value){
                                    item2.category_name = item1.label
                                }
                            })
                        });
                        this.refreshTable(data)
                    }
                }
            }
        })
    };
    
    render(){
        return (
            <div className="product-container">
                <TopNav nav={['商品管理', '商品列表']}/>
                <div className="product-header">
                    <Button type="primary" className="add-product" onClick={()=>this.handleAdd()}>新增商品</Button>
                    <ProductOperate
                        wrappedComponentRef={(formRef) => this.formRef1 = formRef}
                        options1={this.state.options1}
                        onSubmit={this.handleOperateSubmit}
                    />
                    <ProductSearch
                        wrappedComponentRef={(formRef) => this.formRef2 = formRef}
                        options2={this.state.options2}
                        options3={this.state.options3}
                        onSubmit={this.handleSearchSubmit}
                    />
                </div>
                {
                    this.state.isLoading ? <Loading /> :
                        <Table
                            rowSelection={this.rowSelection}
                            style={{margin: "20px"}}
                            size="small"
                            columns={this.state.column}
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























