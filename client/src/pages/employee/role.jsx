import React from 'react';
import {Table, Divider, Button, Modal, Icon} from 'antd';
import Loading from '../../components/loading/index';
import TopNav from '../../components/top-nav/index'
import {reqRoleList, reqUserList, reqRoleDelete} from '../../api/index';

class Role extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            data: [],
            viewVisible: false,
            role: {},
        }
    };
    UNSAFE_componentWillMount = async () => {
        const response=await reqRoleList();
        this.refreshTable(response);
    };
    refreshTable  = async (response1) => {
        const response2 = await reqUserList();
        if(response1.status===0 && response2.status===0){
            let data = response1.data.map((item1, index) => {
                item1.index = index;
                response2.data.forEach(item2 => {
                    if(item1.creater === item2.id) item1.creatername = item2.username
                });
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
                    },
                    {
                        title: "财务管理",
                        display: 0,
                        children: [
                            {
                                title: "财务报表",
                                display: 0
                            }
                        ]
                    }
                ];
                item1.permission.split('-').forEach(item3 => {
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
                        case '财务报表':
                            permission[5].display = 1;
                            permission[5].children[0].display = 1;
                            break;
                        default:
                            break;
                    }
                });
                item1.permission = permission;
                return item1
            });
            this.setState({isLoading: true});
            this.timerID = setTimeout(() => {
                this.setState({isLoading: false, data: data})
            }, 300)
        }
    };
    handleDelete = (record) => {
        Modal.confirm({
            title: '警告',
            content:  "确定要删除角色\""+record.name+"\"吗？",
            okText: '确认',
            onOk: async () => {
                const response = await reqRoleDelete(record.id);
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
    handleView = (record) => {
        this.setState({
            viewVisible: true,
            role: record
        });
    };
    handleAdd = () => {
        this.props.history.push('/role-add')
    };
    handleEdit = (record) => {
        this.props.history.push({pathname: '/role-edit', state: {data: record}})
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
                title: '角色名称',
                dataIndex: 'name',
                key: 'name',
                render: (text, record) => <Button type="link" onClick={()=>this.handleView(record)}>{text}</Button>
            },
            {
                title: '创建时间',
                dataIndex: 'createtime',
                key: 'son',
                render: (text) => <span><Icon type="clock-circle" />&nbsp;{this.getTime(text)}</span>
            },
            {
                title: '创建人',
                dataIndex: 'creatername',
                key: 'creatername'
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
                    <Button size="small"  onClick={()=>this.handleEdit(record)}>编辑</Button>
                    <Divider type="vertical" />
                    <Button size="small" type="danger" onClick={()=>this.handleDelete(record)}>删除</Button>
                </span>
                )
            }
        ];
        return (
            <div className="category-container">
                <TopNav nav={['人事管理','角色管理']}/>
                <div style={{margin: "20px 22px 0 20px"}}>
                    <Button type="primary" onClick={this.handleAdd}>新增角色</Button>
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
                {/*查看角色详情*/}
                <Modal
                    title={<span>角色权限-{this.state.role.name}</span>}
                    visible={this.state.viewVisible}
                    onCancel={()=>{this.setState({viewVisible: false})}}
                    footer={
                        [<Button type="primary" key="view-ok" onClick={()=>this.setState({viewVisible: false})}>确认</Button>]
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

export default Role;



