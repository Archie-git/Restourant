import React from 'react';
import './product.less';
import {Button, Divider, Switch, Table, Icon, Modal} from 'antd';
import ProductHeader from './product-header';
import {reqCategoryList, reqProductList, reqProductDelete, updateProductList} from '../../api';
import Loading from '../../components/loading/index';
import TopNav from "../../components/top-nav";

class Product extends React.Component {
    constructor(props){
        super(props);
        this.state=({
            column: this.columns,
            isLoading: true,
            data: []
        })
    }
    UNSAFE_componentWillMount = async () => {
        const response1 = await reqProductList();
        const response2 = await reqCategoryList();
        if(response1.status===0 && response2.status===0){
            let data = response1.data;
            data.map(item1 => {
                response2.data.forEach(item2 => {
                    if(item1.category === item2.id){
                        item1.category = item2.name
                    }
                });
                return item1
            });
            this.refreshTable(data)
        }
    };
    refreshTable = (data) => {
        this.timeID = setTimeout(() => {
            this.setState({
                isLoading: false,
                data: data
            })
        }, 100);
    };
    componentWillUnmount = () => {
        clearTimeout(this.timeID);
    };
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
            dataIndex: 'category',
            key: 'category',
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
                    <Button size="small" onClick={this.handleEdit}>编辑</Button>
                    <Divider type="vertical" />
                    <Button size="small" type="danger" onClick={()=>this.handleDelete(record)}>删除</Button>
                </span>
            )
        }
    ];
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
        this.props.history.replace('/product-add')
    };
    handleView = (record) => {
        console.log(record);
        this.props.history.replace({pathname: '/product-view', state: {data: record}})
    };
    handleEdit = () => {
        this.props.history.replace('/product-edit')
    };
    handleDelete = (record) => {
        Modal.confirm({
            title: '警告',
            content:  "确定要删除商品\""+record.name+"\"吗？",
            okText: '确认',
            onOk: async () => {
                const response = await reqProductDelete(record.id);
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
    
    onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };
    
    render(){
        const rowSelection = {
            onChange: this.onSelectChange,
        };
        return (
            <div className="product-container">
                <TopNav nav={['商品管理', '商品列表']}/>
                <ProductHeader
                    onAddClick={this.handleAdd}
                />
                {
                    this.state.isLoading ? <Loading /> :
                        <Table
                            rowSelection={rowSelection}
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























