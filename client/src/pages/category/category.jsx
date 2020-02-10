import React from 'react';
import {Table, Divider, Switch, message, Input, Button, Modal} from 'antd';
import Loading from '../../components/loading/index';
import './category.less';
import {reqCategoryList, updateCategoryList, reqCategorySearch, reqCategoryDelete, addCategoryList} from '../../api/index';
import AddCategoryModal from './category-add';

class Category extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            data: [],
            addVisible: false,
            editVisible: false,
            column: [],
            visilble: false
        }
    }
    UNSAFE_componentWillMount = async () => {
        const response=await reqCategoryList();
        this.refreshTable(response);
    };
    formRef = {};
    componentWillUnmount =() => {
        clearTimeout(this.timerID)
    };
    categoryColumn = [
        {
            title: '编号',
            key: 'index',
            render: (text, record) => <span>{record.index+1}</span>
        },
        {
            title: '品类名称',
            dataIndex: 'name',
            key: 'name',
            render: text => <Button type="link" onClick={this.testfunc}>{text}</Button>
        },
        {
            title: '排序',
            dataIndex: 'level',
            key: 'level',
            render: text => {
                let level="";
                switch(text){
                    case 0 : level="一级";break;
                    case 1 : level="二级";break;
                    case 2 : level="三级";break;
                    case 3 : level="四级";break;
                    case 4 : level="五级";break;
                    case 5 : level="六级";break;
                    case 6 : level="七级";break;
                    case 7 : level="八级";break;
                    case 8 : level="九级";break;
                    default: level="十级"
                }
                // return <Button type="link" onClick={this.testfunc}>{level}</Button>
                return level;
            }
        },
        {
            title: '子项数量',
            dataIndex: 'son',
            key: 'son'
        },
        {
            title: '商品总数(/件)',
            dataIndex: 'amount',
            key: 'amount'
        },
        {
            title: '是否显示',
            dataIndex: 'isnav',
            key: 'isnav',
            render: (text, record) => <Switch size="small" onClick={() => this.handleIsnavChange(record)} defaultChecked={text === 1}/>
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <span>
                        <Button size="small"  onClick={this.testfunc}>编辑</Button>
                        <Divider type="vertical" />
                        <Button size="small" type="danger" onClick={() => this.handleDelete(record)}>删除</Button>
                    </span>
            )
        }
    ];
    productColumn = [
        {
            title: '编号',
            key: 'index',
            render: (text, record) => <span>{record.index+1}</span>
        },
        {
            title: '品类名称',
            dataIndex: 'name',
            key: 'name',
            render: text => <Button type="link" onClick={this.testfunc}>{text}</Button>
        },
        {
            title: '排序',
            dataIndex: 'level',
            key: 'level',
            render: text => {
                let level="";
                switch(text){
                    case 1 : level="一级";break;
                    case 2 : level="二级";break;
                    case 3 : level="三级";break;
                    case 4 : level="四级";break;
                    case 5 : level="五级";break;
                    case 6 : level="六级";break;
                    case 7 : level="七级";break;
                    case 8 : level="八级";break;
                    case 9 : level="九级";break;
                    default: level="十级"
                }
                // return <Button type="link" onClick={this.testfunc}>{level}</Button>
                return level;
            }
        },
        {
            title: '子项数量',
            dataIndex: 'son',
            key: 'son'
        },
        {
            title: '商品总数',
            dataIndex: 'amount',
            key: 'amount'
        },
        {
            title: '是否显示',
            dataIndex: 'isnav',
            key: 'isnav',
            render: (text, record) => <Switch size="small" onClick={() => this.handleIsnavChange(record)} defaultChecked={text === 1}/>
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <span>
                        <Button size="small"  onClick={this.testfunc}>编辑</Button>
                        <Divider type="vertical" />
                        <Button size="small" type="danger" onClick={() => this.handleDelete(record)}>删除</Button>
                    </span>
            )
        }
    ];
    testfunc = () => {
        message.success("这是一个测试事件");
    } ;
    refreshTable  = (response) => {
        this.setState({isLoading: true});
        this.timerID = setTimeout(() => {
            if(response.status===0){
                let data = response.data.map((item, index) => {
                    item.index = index;
                    return item
                });
                this.setState({isLoading: false, data: data, column: this.categoryColumn})
            }else if(response.status===1){
                message.error(response.msg);
                this.setState({isLoading: false, data: null})
            }
        }, 500)
    };
    handleIsnavChange = async (record) =>{
        const response = await updateCategoryList({id: record.id, isnav: record.isnav===0 ? 1 : 0});
        let data = this.state.data;
        if(response.status === 0){
            data.forEach(item => item.isnav = item.id===record.id ? 1-item.isnav : item.isnav);
            this.setState({
                data: data
            });
        }else if(response.status === 1){
            this.setState({
                data: data
            });
            message.error(response.msg)
        }
    };
    handleSearch = async (value) => {
        const response = value==="" ? await reqCategoryList() : await reqCategorySearch(value);
        this.refreshTable(response);
    };
    handleDelete = (record) => {
        Modal.confirm({
            title: '警告',
            content:  "确定要删除品类\""+record.name+"\"吗？",
            okText: '确认',
            onOk: async () => {
                const response = await reqCategoryDelete(record.id);
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
    showAddModal = () => {this.setState({ addVisible: true })};
    handleAddCancel = () => {this.setState({ addVisible: false })};
    handleAddOk = () => {
        this.formRef.props.form.validateFields( async (err, values) => {
            if(!err) {
                let data=values;
                data.level=data.level===undefined ? 7 : data.level;
                data.description=data.description===undefined ? "无" : data.description;
                const response = await addCategoryList(data);
                if(response.status === 0){
                    this.setState({ addVisible: false });
                }
                message.success(response.msg);
                this.formRef.props.form.resetFields();
                response=await reqCategoryList();
                this.refreshTable(response);
            }else{
                console.log("校验失败");
            }
        });
    };
    
    
    render(){
        return (
            <div className="category-container">
                <Button type="primary" className="add-button" onClick={this.showAddModal}>新增品类</Button>
                <AddCategoryModal
                    wrappedComponentRef={(formRef) => this.formRef = formRef}
                    visible={this.state.addVisible}
                    onCancel={this.handleAddCancel}
                    onOk={this.handleAddOk}
                    // ref={this.saveFormRef}
                />
                <Input.Search
                    className="search-box"
                    placeholder="查询品类信息"
                    onSearch={(value) => this.handleSearch(value)}
                    enterButton/>
                {
                    this.state.isLoading ?
                    <Loading /> :
                    <Table
                        style={{margin: "20px"}}
                        columns={this.state.column}
                        dataSource={this.state.data}
                        rowKey={record => record.id}
                        bordered/>
                }
            </div>
        )
    }
}

export default Category;




















