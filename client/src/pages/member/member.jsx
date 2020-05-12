import React from 'react';
import {Button, Input, Table, Divider, Icon, Modal, Tag, message, Form} from 'antd';
import TopNav from '../../components/top-nav/index';
import Loading from '../../components/loading/index';
import { reqMemberList, reqMemberSearch, reqMemberDelete, reqRuleUpdate } from '../../api/index';

class Member extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            data: [],
            visible: false,
            rule: {}
        }
    }
    UNSAFE_componentWillMount = async () => {
        let response = await reqMemberList();
        this.refreshTable(response)
    };
    componentWillUnmount = () => {
        clearTimeout(this.timerID)
    };
    refreshTable = (response) => {
        if(response.status === 0){
            let data = response.data;
            data = data.map(item => {
                return item
            });
            this.setState({isLoading: true});
            this.timerID = setTimeout(() => {
                this.setState({
                    isLoading: false,
                    data: data,
                })
            }, 300)
        }
    };
    handleSearch = async (value) => {
        console.log(value);
        const response = value==="" ? await reqMemberList() : await reqMemberSearch(value);
        this.refreshTable(response)
    };
    handleAdd = () => {
        this.props.history.push('/member/add')
    };
    //会员设置
    // handleSet = async () => {
    //     const response = await reqRuleList();
    //     if(response.status === 0){
    //         this.setState({
    //             visible: true,
    //             rule: response.data[0]
    //         })
    //     }
    // };
    handleDelete = (record) => {
        Modal.confirm({
            title: '警告',
            content: "确定要删除会员\""+record.name+"(ID:"+record.id+")\"吗?",
            okText: '确定',
            onOk: async ()=>{
                const response1 = await reqMemberDelete(record.id);
                if(response1.status === 0){
                    let data = [];
                    this.state.data.forEach(item => {
                        item.id===record.id ? data.push() : data.push(item)
                    });
                    this.setState({data: data})
                }
            },
            onCancel: ()=>{}
        })
    };
    handleDetail = (record) => {
        this.props.history.push({pathname: '/member/view', state: {data: record}})
    };
    handleEdit = (record) => {
        this.props.history.push({pathname: '/member/edit', state: { data: record}})
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if(!err){
                const response = await reqRuleUpdate(values);
                if(response.status === 0){
                    this.setState({visible: false});
                    this.timerID = setTimeout(()=>{
                        message.success("设置成功");
                    }, 500)
                }
            }
        })
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
                title: '会员ID',
                key: 'id',
                dataIndex: 'id'
            },
            {
                title: '昵称/等级',
                key: 'name',
                dataIndex: 'name',
                render: (text, record) => (
                    <Button type="link" onClick={()=>this.handleDetail(record)}>
                        {
                            record.status===1 ? <span>{text} <Tag color="blue">黄金</Tag></span> :
                                record.status===2 ? <span>{text} <Tag color="green">白金</Tag></span> :
                                    record.status===3 ? <span>{text} <Tag color="red">钻石</Tag></span> :
                                        <span>{text}</span>
                        }
                    </Button>
                ),
                filters: [{text: '黄金会员', value: 1}, {text: '白金会员', value: 2}, {text: '钻石会员', value: 3}],
                onFilter: (value, record) => value===record.status
            },
            {
                title: '创建时间',
                key: 'createtime',
                dataIndex: 'createtime',
                render: (text) => <span>{this.getTimeForm(text)}</span>,
                sorter: (a, b) => a.createtime-b.createtime,
            },
            {
                title: '电话',
                key: 'tel',
                dataIndex: 'tel',
                render: (text)=><span><Icon type="phone" /> {text}</span>
            },
            {
                title: '积分',
                key: 'integral',
                dataIndex: 'integral',
                sorter: (a, b) => a.integral-b.integral
            },
            {
                title: '订单数量',
                key: 'orderSum',
                render: (text, record) => <span>待完成</span>,
                filters: [
                    {
                        text: '最近一周',
                        value: '0',
                    },
                    {
                        text: '最近一月',
                        value: '1',
                    },
                    {
                        text: '最近一年',
                        value: '2'
                    }
                ]
            },
            {
                title: '消费金额',
                key: 'orderAmount',
                render: (text, record) => <span>待完成</span>,
                filters: [
                    {
                        text: '最近一周',
                        value: '0',
                    },
                    {
                        text: '最近一月',
                        value: '1',
                    },
                    {
                        text: '最近一年',
                        value: '2'
                    }
                ]
            },
            {
                title: '操作',
                key: 'operation',
                render: (record) => (
                    <div>
                        <Button size="small" type="primary" onClick={()=>this.handleEdit(record)}>编辑</Button>
                        <Divider type="vertical"/>
                        <Button size="small" type="danger" onClick={()=>this.handleDelete(record)}>删除</Button>
                    </div>
                )
            }
        ];
        return (
            <div>
                <TopNav nav={["会员管理","会员列表"]}/>
                <div style={{margin: "20px 22px 0 20px"}}>
                    <Button type="primary" onClick={this.handleAdd}><Icon type="plus"/>新增会员</Button>
                    {/*会员设置*/}
                    {/*<Button type="primary" style={{marginLeft: "40px"}} onClick={this.handleSet}>会员设置</Button>*/}
                    <Input.Search
                        style={{width: "200px", float: "Right"}}
                        placeholder="查询会员ID/昵称"
                        onSearch={(value) => this.handleSearch(value)}
                        enterButton
                    />
                </div>
                {
                    this.state.isLoading ? <Loading /> :
                        <Table size="small"
                               style={{margin: "20px"}}
                               columns={columns}
                               dataSource={this.state.data}
                               rowKey={record => record.id}
                               bordered
                        />
                }
                {/*<Modal*/}
                {/*    visible={this.state.visible}*/}
                {/*    title="会员设置"*/}
                {/*    onCancel={()=>{this.setState({visible: false})}}*/}
                {/*    footer={null}*/}
                {/*>*/}
                {/*    <Form style={{overflow: "hidden"}} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} onSubmit={this.handleSubmit}>*/}
                {/*        <Form.Item label="ID" style={{display: "none"}}>*/}
                {/*            {*/}
                {/*                this.props.form.getFieldDecorator('id', {*/}
                {/*                    initialValue: 1000*/}
                {/*                })(<InputNumber/>)*/}
                {/*            }*/}
                {/*        </Form.Item>*/}
                {/*        <Form.Item label="黄金会员">*/}
                {/*            {*/}
                {/*                this.props.form.getFieldDecorator('gold', {*/}
                {/*                    initialValue: this.state.rule.gold || 0*/}
                {/*                })(<InputNumber style={{width: "150px"}}/>)*/}
                {/*            }*/}
                {/*            <span style={{marginLeft: "10px"}}>积分</span>*/}
                {/*        </Form.Item>*/}
                {/*        <Form.Item label="白金会员">*/}
                {/*            {*/}
                {/*                this.props.form.getFieldDecorator('platinum', {*/}
                {/*                    initialValue: this.state.rule.platinum || 0*/}
                {/*                })(<InputNumber style={{width: "150px"}}/>)*/}
                {/*            }*/}
                {/*            <span style={{marginLeft: "10px"}}>积分</span>*/}
                {/*        </Form.Item>*/}
                {/*        <Form.Item label="钻石会员">*/}
                {/*            {*/}
                {/*                this.props.form.getFieldDecorator('diamond', {*/}
                {/*                    initialValue: this.state.rule.diamond || 0*/}
                {/*                })(<InputNumber style={{width: "150px"}}/>)*/}
                {/*            }*/}
                {/*            <span style={{marginLeft: "10px"}}>积分</span>*/}
                {/*        </Form.Item>*/}
                {/*        /!*<Button style={{float: "right", margin: "20px 160px 0 30px"}} type="primary" htmlType="submit">确定</Button>*!/*/}
                {/*        <Popconfirm*/}
                {/*            placement="topRight"*/}
                {/*            title="确定要更新会员设置吗？"*/}
                {/*            okType="danger"*/}
                {/*            onConfirm={this.handleSubmit}*/}
                {/*            okText="确认"*/}
                {/*            cancelText="取消"*/}
                {/*        >*/}
                {/*            <Button style={{float: "right", margin: "20px 160px 0 30px"}} type="primary">设置</Button>*/}
                {/*        </Popconfirm>*/}
                {/*        <Button*/}
                {/*            style={{float: "right", marginTop: "20px"}}*/}
                {/*            type="primary"*/}
                {/*            onClick={()=>{this.setState({visible: false})}}*/}
                {/*        >取消</Button>*/}
                {/*    </Form>*/}
                {/*</Modal>*/}
            </div>
        )
    }
}

export default Form.create()(Member);





















