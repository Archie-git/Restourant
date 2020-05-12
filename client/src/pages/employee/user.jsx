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
            visible: false,
            role: {}
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
                            item1.role = item2;
                            let permission = [
                                {
                                    title: "订单管理",
                                    display: 0,
                                    children: [
                                        {
                                            title: "全部订单",
                                            display: 0
                                        },
                                        {
                                            title: "前台管理",
                                            display: 0
                                        }
                                    ]
                                },
                                {
                                    title: "商品管理",
                                    display: 0,
                                    children: [
                                        {
                                            title: "商品分类",
                                            display: 0
                                        },
                                        {
                                            title: "商品列表",
                                            display: 0
                                        },
                                        {
                                            title: "添加商品",
                                            display: 0
                                        }
                                    ]
                                },
                                {
                                    title: "库存管理",
                                    display: 0,
                                    children: [
                                        {
                                            title: "库存信息",
                                            display: 0
                                        },
                                        {
                                            title: "库存盘点",
                                            display: 0
                                        }
                                    ]
                                },
                                {
                                    title: "会员管理",
                                    display: 0,
                                    children: [
                                        {
                                            title: "会员列表",
                                            display: 0
                                        },
                                        {
                                            title: "新增会员",
                                            display: 0
                                        }
                                    ]
                                },
                                {
                                    title: "人事管理",
                                    display: 0,
                                    children: [
                                        {
                                            title: "员工列表",
                                            display: 0
                                        },
                                        {
                                            title: "用户列表",
                                            display: 0
                                        },
                                        {
                                            title: "角色管理",
                                            display: 0
                                        }
                                    ]
                                }
                            ];
                            item1.role.permission.split('-').forEach(item3 => {
                                switch (item3) {
                                    case '全部订单':
                                        permission[0].display = 1;
                                        permission[0].children[0].display = 1;
                                        break;
                                    case '前台管理':
                                        permission[0].display = 1;
                                        permission[0].children[1].display = 1;
                                        break;
                                    case '商品分类':
                                        permission[1].display = 1;
                                        permission[1].children[0].display = 1;
                                        break;
                                    case '商品列表':
                                        permission[1].display = 1;
                                        permission[1].children[1].display = 1;
                                        break;
                                    case '添加商品':
                                        permission[1].display = 1;
                                        permission[1].children[2].display = 1;
                                        break;
                                    case '库存信息':
                                        permission[2].display = 1;
                                        permission[2].children[0].display = 1;
                                        break;
                                    case '库存盘点':
                                        permission[2].display = 1;
                                        permission[2].children[1].display = 1;
                                        break;
                                    case '会员列表':
                                        permission[3].display = 1;
                                        permission[3].children[0].display = 1;
                                        break;
                                    case '新增会员':
                                        permission[3].display = 1;
                                        permission[3].children[1].display = 1;
                                        break;
                                    case '员工列表':
                                        permission[4].display = 1;
                                        permission[4].children[0].display = 1;
                                        break;
                                    case '用户列表':
                                        permission[4].display = 1;
                                        permission[4].children[1].display = 1;
                                        break;
                                    case '角色管理':
                                        permission[4].display = 1;
                                        permission[4].children[2].display = 1;
                                        break;
                                    default:
                                        break;
                                }
                            });
                            item1.role.permission = permission
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
            content:  "确定要删除用户\""+record.username+"\"吗？",
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
    handleAdd = () => {this.props.history.push('/employee/user/add')};
    handleEdit = (record) => {
        this.props.history.push({pathname: '/employee/user/edit', state: {data: record}})
    };
    handleRoleView = (role) => {
        console.log(role);
        this.setState({
            visible: true,
            role: role
        });
    };
    getTimeForm = (time) => {
        time = new Date(time);
        let month = time.getMonth()+1;
        month = month>=10 ? month : "0"+month;
        let date = time.getDate()>=10 ? time.getDate() : "0"+time.getDate();
        let hour = time.getHours()>=10 ? time.getHours() : "0"+time.getHours();
        let minute = time.getMinutes()>=10 ? time.getMinutes() : "0"+time.getMinutes();
        let second = time.getSeconds()>=10 ? time.getSeconds() : "0"+time.getSeconds();
        return time.getFullYear()+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
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
                render: (text) => <span><Icon type="clock-circle" /> {this.getTimeForm(text)}</span>,
                sorter: (a, b) => b.createtime - a.createtime
            },
            {
                title: '所属角色',
                dataIndex: 'role',
                key: 'role',
                render: (text) => <Button type="link" onClick={()=>this.handleRoleView(text)}>{text.name}</Button>
            },
            {
                title: '电话',
                dataIndex: 'tel',
                key: 'tel',
                render: (text) => <span><Icon type="phone" />+86 {text}</span>
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
                key: 'note',
                render: (text) => text ? text : '/'
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
                    <Button type="primary" onClick={this.handleAdd}><Icon type="plus"/>创建用户</Button>
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
                <Modal
                    title={<span>角色权限-{this.state.role.name}</span>}
                    visible={this.state.visible}
                    onCancel={()=>{this.setState({visible: false})}}
                    footer={
                        [<Button type="primary" key="view-ok" onClick={()=>this.setState({visible: false})}>确认</Button>]
                    }
                >
                    <div style={{marginLeft: "100px"}}>
                        {
                            this.state.role.permission ? this.state.role.permission.map((item1, index) => {
                                return (
                                    <div key={index}>
                                        <div><Icon type="caret-down" style={{color: "#1DA57A"}}/>{item1.title}</div>
                                        {
                                            item1.children.map((item2, index) => {
                                                return item2.display===1 ? (
                                                    <div style={{marginLeft: "25px"}} key={index}>
                                                        <Icon type="check" style={{color: "#1DA57A"}}/>&nbsp;{item2.title}
                                                    </div>
                                                ) :  (
                                                    <div style={{marginLeft: "25px"}} key={index}>
                                                        <Icon type="close" style={{color: "#fa7f3e"}}/>&nbsp;{item2.title}
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                )
                            }) : null
                        }
                    </div>
                </Modal>
            </div>
        )
    }
}

export default User;