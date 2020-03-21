import React from 'react';
import {Table, Divider, Button, Modal, Icon} from 'antd';
import Loading from '../../components/loading/index';
import TopNav from '../../components/top-nav/index'
import {reqUserList, reqUserDelete, reqRoleList} from '../../api/index';

class User extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            data: [],
            viewVisible: false,
            editVisible: false,
        }
    };
    UNSAFE_componentWillMount = async () => {
        const response=await reqUserList();
        this.refreshTable(response);
    };
    refreshTable  = async (response1) => {
        const response2 = await reqRoleList();
        if(response1.status===0 && response2.status===0){
            this.setState({isLoading: true});
            this.timerID = setTimeout(() => {
                let data = response1.data.map((item1, index) => {
                    item1.index = index;
                    response2.data.forEach(item2 => {
                        if(item1.role === item2.id){
                            item1.rolename = item2.name;
                        }
                    });
                    return item1
                });
                this.setState({isLoading: false, data: data})
            }, 300)
        }
    };
    handleDelete = (record) => {
        Modal.confirm({
            title: '警告',
            content:  "确定要删除角色\""+record.username+"\"吗？",
            okText: '确认',
            onOk: async () => {
                const response = await reqUserDelete(record.id);
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
    handleAdd = () => {this.props.history.push('/user-add')};
    handleEdit = (record) => {
        this.props.history.push({pathname: '/user-edit', state: {data: record}})
    };
    getTime = (time) => {
        let temp = new Date(time);
        let month = temp.getMonth()+1;
        return temp.getFullYear()+"-"+month+"-"+temp.getDate()+" "+temp.getHours()+":"+temp.getMinutes()
    };
    render(){
        const columns = [
            {
                title: '编号',
                key: 'index',
                render: (text, record) => <span>{record.index+1}</span>
            },
            {
                title: '用户名称',
                dataIndex: 'username',
                key: 'username',
            },
            {
                title: '创建时间',
                dataIndex: 'createtime',
                key: 'son',
                render: (text) => <span><Icon type="clock-circle" />&nbsp;{this.getTime(text)}</span>
            },
            {
                title: '角色',
                dataIndex: 'rolename',
                key: 'rolename'
            },
            {
                title: '电话',
                dataIndex: 'tel',
                key: 'tel',
                render: (text) => <span><Icon type="phone" /> +86 {text}</span>
            },
            {
                title: '邮箱',
                dataIndex: 'email',
                key: 'email'
            },
            {
                title: '密码',
                dataIndex: 'password',
                key: 'password'
            },
            {
                title: '备注',
                dataIndex: 'note',
                key: 'note'
            },
            {
                title: '操作',
                key: 'action',
                render: (record) => (
                    <span>
                    <Button size="small"  onClick={()=>this.handleEdit(record)}>设置</Button>
                    <Divider type="vertical" />
                    <Button size="small" type="danger" onClick={()=>this.handleDelete(record)}>删除</Button>
                </span>
                )
            }
        ];
        return (
            <div className="category-container">
                <TopNav nav={['人事管理','用户列表']}/>
                <div style={{margin: "20px 22px 0 20px"}}>
                    <Button type="primary" onClick={this.handleAdd}>创建用户</Button>
                </div>
                {
                    this.state.isLoading ? <Loading /> :
                        <Table
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

export default User;