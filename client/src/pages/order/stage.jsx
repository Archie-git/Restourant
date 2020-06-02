import React from 'react';
import TopNav from "../../components/top-nav";
import {Input, Table, Button, Icon, Tag, Divider, Modal} from "antd";
import Loading from "../../components/loading";
import {
    reqOrderSearch,
    reqProductList,
    reqCustomerList,
    reqOrderUpdate,
    reqFrontdeskList
} from '../../api/index';

class Stage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            data: [],
            searching: false
        }
    }
    UNSAFE_componentWillMount = async () => {
        const response = await reqFrontdeskList();
        this.refreshTable(response)
    };
    componentDidMount = () => {
        this.timerID1 = setInterval(async () => {
            if(!this.state.searching){
                const response = await reqFrontdeskList();
                this.refreshTable(response)
            }
        }, 5000)
    };
    componentWillUnmount = () => {
        this.setState = () => {};
        clearInterval(this.timerID1);
        clearTimeout(this.timerID2)
    };
    refreshTable = async (response1) => {
        const response2 = await reqProductList();
        const response3 = await reqCustomerList();
        if(response1.status===0 && response2.status===0 && response3){
            let data = response1.data.map(item1 => {
                item1.commodity = JSON.parse(item1.commodity);
                response3.data.forEach(item2 => {
                    if(item1.customer === item2.id) item1.customer=item2
                });
                return item1
            });
            this.timerID2 = setTimeout(()=>{
                this.setState({
                    data: data.reverse(),
                    isLoading: false
                })
            }, 100)
            
        }
    };
    handleSearch = async (id) => {
        if(id){
            const response = await reqOrderSearch(id);
            this.setState({
                searching: true,
                isLoading: true
            });
            this.refreshTable(response)
        }else{
            this.setState({
                searching: false,
                isLoading: true
            })
        }
    };
    handleView = (record) => {
        console.log(record);
        this.props.history.push({pathname: '/order/stage/view', state: {data : record}});
    };
    handleCustomerDetail = (record) => {
        this.props.history.push({pathname: '/member/view', state: {data: record}})
    };
    handleCancel = async (record) => {
        Modal.confirm({
            title: '警告',
            content: "确定要取消订单(ID: "+record.id+")吗?",
            okText: '确定',
            onOk: async ()=>{
                let data = {
                    id: record.id,
                    state: 2
                };
                let response = await reqOrderUpdate(data);
                if(response.status === 0){
                    let data = this.state.data.filter(item => {
                        return item.id !== record.id
                    });
                    this.setState({data: data})
                }
            },
            onCancel: ()=>{}
        })
    };
    handleComplete = async (record) => {
        Modal.confirm({
            title: '警告',
            content: "确定要将订单(ID: "+record.id+")设置为完成状态吗?",
            okText: '确定',
            onOk: async ()=>{
                let data = {
                    id: record.id,
                    state: 3
                };
                let response = await reqOrderUpdate(data);
                if(response.status === 0){
                    let data = this.state.data.filter(item => {
                        return item.id !== record.id
                    });
                    this.setState({data: data})
                }
            },
            onCancel: ()=>{}
        })
    };
    getTime = (time) => {
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
        const column = [
            {
                title: '订单ID',
                dataIndex: 'id',
                key: 'id',
                render: (text, record) => <Button type="link" onClick={()=>this.handleView(record)}>{text} [查看]</Button>
            },
            {
                title: '顾客',
                dataIndex: 'customer',
                key: 'customer',
                render: (text) => (
                    <Button type="link" onClick={()=>this.handleCustomerDetail(text)}>
                        {
                            text.status===1 ? <span>{text.name} <Tag color="blue">黄金</Tag></span> :
                                text.status===2 ? <span>{text.name} <Tag color="green">白金</Tag></span> :
                                    text.status===3 ? <span>{text.name} <Tag color="red">钻石</Tag></span> :
                                        <span>{text.name}</span>
                        }
                    </Button>
                ),
                filters: [
                    {text: "黄金会员", value: 1},
                    {text: "白金会员", value: 2},
                    {text: "钻石会员", value: 3},
                    {text: "普通顾客", value: 0}
                ],
                onFilter: (value, record) => value === record.customer.status
            },
            {
                title: '桌号',
                dataIndex: 'seat',
                key: 'seat',
                render: (text) => <span>{text}</span>,
                sorter: (a, b) => a.seat - b.seat
            },
            {
                title: '订单内容',
                dataIndex: 'commodity',
                key: 'commodity',
                render: (text) => (
                    <div>
                        {
                            text.map((item, index) => {
                                return <div key={index}>{item.name}<Icon type="close"/>{item.count}</div>
                            })
                        }
                    </div>
                )
            },
            {
                title: '下单时间',
                dataIndex: 'createtime',
                key: 'createtime',
                render: (text) => <span><Icon type="clock-circle" />&nbsp;{this.getTime(text)}</span>,
                sorter: (a, b) => a.createtime - b.createtime,
                // filters: [
                //     {text: "今日", value: 0},
                //     {text: "近一周", value: 1},
                //     {text: "近一个月", value: 2},
                //     {text: "近一季度", value: 3}
                // ],
                // onFilter: (value, record) => value===record.stars
            },
            {
                title: '支付金额',
                dataIndex: 'amount',
                key: 'amount',
                render: (text) => <span>￥{text.toFixed(2)}</span>,
                sorter: (a, b) => a.amount - b.amount
            },
            {
                title: '评价',
                key: 'stars',
                dataIndex: 'stars',
                render: (text) => {
                    if(text === 0){
                        return <span>暂未评价</span>
                    }else{
                        let starArr=[];
                        for(let i=0;i<text;i++){
                            starArr.push(i)
                        }
                        return starArr.map((item) => {
                            return <Icon key={item} type="star" style={{color: "yellow"}} theme="filled" />
                        });
                    }
                },
                sorter: (a, b) => a.stars - b.stars,
                filters: [
                    {text: "未评价", value: 0},
                    {text: "一星", value: 1},
                    {text: "二星", value: 2},
                    {text: "三星", value: 3},
                    {text: "四星", value: 4},
                    {text: "五星", value: 5},
                ],
                onFilter: (value, record) => value===record.stars
            },
            {
                title: '状态',
                dataIndex: 'state',
                key: 'state',
                render: (text, record) => text === 0 ? (
                    <div>
                        {
                            record.urged === 0 ? <Tag color="blue">已付款</Tag> : <Tag color="red">催单</Tag>
                        }
                    </div>
                ) : text === 1 ? <Tag color="red">请求取消</Tag> :
                    text === 2 ? <Tag color="green">已取消</Tag> :
                        <Tag color="green">已完成</Tag>,
                filters: [
                    {text: "已付款", value: 0},
                    {text: "请求取消", value: 1},
                    {text: "已取消", value: 2},
                    {text: "已完成", value: 3}
                ],
                onFilter: (value, record) => value===record.state
            },
            {
                title: '操作',
                key: 'operation',
                render: (record) => record.state === 0 ? (
                    <span>
                        <Divider type="vertical"/>
                        <Button size="small" type="primary" onClick={()=>this.handleComplete(record)}>完成</Button>
                    </span>
                ) : record.state === 1 ? (
                    <span>
                        <Divider type="vertical"/>
                        <Button size="small" type="danger" onClick={()=>this.handleCancel(record)}>取消</Button>
                    </span>
                ) :  '/'
            }
        
        ];
        return (
            <div>
                <TopNav nav={['订单管理', '全部订单']} />
                <div style={{margin: "20px 22px 0 20px", overflow: "hidden"}}>
                    {/*<Button type="primary" onClick={this.handleAdd}>新增订单</Button>*/}
                    <Input.Search
                        style={{width: "200px", float: "Right"}}
                        placeholder="搜索订单ID"
                        onSearch={(value) => this.handleSearch(value)}
                        enterButton
                    />
                </div>
                {
                    this.state.isLoading ? <Loading /> :
                        <Table
                            style={{margin: "20px"}}
                            size="small"
                            columns={column}
                            dataSource={this.state.data}
                            rowKey={record => record.id}
                            bordered
                        />
                }
            </div>
        )
    }
}

export default Stage;






