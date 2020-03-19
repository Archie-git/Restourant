import React from 'react';
import {Table, Divider, Switch, message, Input, Button, Modal} from 'antd';
import Loading from '../../components/loading/index';
import TopNav from '../../components/top-nav/index'
import {reqCategoryList, updateCategoryList, reqCategorySearch, reqCategoryDelete} from '../../api/index';

class Category extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            data: [],
            column: [],
        }
    }
    UNSAFE_componentWillMount = async () => {
        const response=await reqCategoryList();
        this.refreshTable(response);
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
            render: (text, record) => <Button type="link" onClick={()=>this.handleView(record)}>{text}</Button>
        },
        {
            title: '级别',
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
                return <span>{level}</span>;
            },
            sorter: (a, b) => a.level-b.level
        },
        {
            title: '子项数量',
            dataIndex: 'son',
            key: 'son',
            sorter: (a, b) => a.son-b.son
        },
        {
            title: '商品总数(/件)',
            dataIndex: 'amount',
            key: 'amount',
            sorter: (a, b) => a.amount-b.amount
        },
        {
            title: '是否显示',
            dataIndex: 'isnav',
            key: 'isnav',
            render: (text, record) => <Switch
                size="small"
                onClick={()=>this.handleIsnavChange(record)}
                defaultChecked={text === 1}/>,
            filters: [{text: '已显示', value: 1}, {text: '未显示', value: 0}],
            onFilter: (value, record) => value===record.isnav
        },
        {
            title: '操作',
            key: 'action',
            render: (record) => (
                <span>
                    <Button size="small"  onClick={()=>this.handleEdit(record)}>编辑</Button>
                    <Divider type="vertical" />
                    <Button size="small" type="danger" onClick={()=>this.handleDelete(record)}>删除</Button>
                </span>
            )
        }
    ];
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
        }, 300)
    };
    handleIsnavChange = async (record) =>{
        const response = await updateCategoryList({id: record.id, isnav: 1-record.isnav});
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
    handleAdd = () => {this.props.history.push('/category-add')};
    handleEdit = (record) => {
        this.props.history.push({
            pathname: '/category-edit',
            state: {data: record}
        })
    };
    handleView = (record) => {
        this.props.history.push({pathname: '/category-view', state: {data: record}})
    };
    render(){
        return (
            <div className="category-container">
                <TopNav nav={['商品管理', '商品分类']}/>
                <div style={{margin: "20px 22px 0 20px"}}>
                    <Button type="primary" onClick={this.handleAdd}>新增品类</Button>
                    <Input.Search
                        style={{width: "200px", float: "Right"}}
                        placeholder="查询品类信息"
                        onSearch={(value) => this.handleSearch(value)}
                        enterButton
                    />
                </div>
                {
                    this.state.isLoading ? <Loading /> :
                        <Table
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

export default Category;




















