import React from 'react';
import TopNav from "../../components/top-nav";
import {Button, Input, Form, DatePicker, Table, Tag, Icon, Divider, Modal} from "antd";
import Loading from '../../components/loading';
import {reqInventoryList, reqStockList, reqUserList, reqInventoryUpdate, reqInventoryDelete} from '../../api';

const Inventory = Form.create({name: 'search-inventory-form'})(
    class extends React.Component{
        constructor(props) {
            super(props);
            this.state = {
                isLoading: true,
                data: [],
                tableData: []
            }
        }
        UNSAFE_componentWillMount = async () => {
            const response = await reqInventoryList();
            this.refreshTable(response);
        };
        componentWillUnmount = () => {
            clearTimeout(this.timerID)
        };
        refreshTable = async (response1) => {
            const response2 = await reqUserList();
            const response3 = await reqStockList();
            if(response1.status===0 && response2.status===0 && response3.status===0){
                let creater = [];
                let data = response1.data.map(item1 => {
                    response2.data.forEach(item2 => {
                        if(item1.creater === item2.id){
                            item1.creater = item2.username;
                            creater.push(item1.creater)
                        }
                    });
                    return item1
                });
                creater = new Set(creater);
                let createrFilters = [];
                creater.forEach(item => {
                    createrFilters.push({text: item, value: item})
                });
                this.setState({isLoading: true});
                this.timerID = setTimeout(() => {
                    this.setState({
                        isLoading: false,
                        data: data,
                        tableData: data,
                        createrFilters: createrFilters,
                        dateRange: []
                    })
                }, 300)
            }
        };
        handleDeal = (record) => {
            let data = {id: record.id, state : 1-record.state};
            console.log(data);
            Modal.confirm({
                title: "警告",
                content: "确定要将单号\"PD"+record.id+"\"设置为已处理吗",
                okText: "确认",
                onOk: async ()=>{
                    const response = await reqInventoryUpdate(data);
                    if(response.status===0){
                        let data = this.state.data.map(item => {
                            item.state = item.id===record.id ? 1-item.state : item.state;
                            return item;
                        });
                        this.setState({data: data})
                    }
                },
                cancelText: "取消",
                onCancel: () => {}
            })
        };
        handleDelete = async (record) => {
            Modal.confirm({
                title: '警告',
                content:  "确定要删除该库存记录\""+record.id+"\"吗？",
                okText: '确认',
                onOk: async () => {
                    const response = await reqInventoryDelete(record.id);
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
            this.props.history.push({pathname: '/inventory-view', state: {data: record}})
        };
        handleDatePickerChange = (renge, rangeString) => {
            this.setState({dateRange: rangeString})
        };
        handleSearch = async (value) => {
            if(!value && !this.state.dateRange[0]){
                const response = await reqInventoryList();
                this.refreshTable(response)
            }else if(!value){
                let start = new Date(this.state.dateRange[0]).getTime();
                let end = new Date(this.state.dateRange[1]).getTime();
                let data = this.state.data.filter(item => {
                    return item.time>=start && item.time<=end
                });
                this.setState({isLoading: true});
                this.timerID = setTimeout(()=>{
                    this.setState({
                        isLoading: false,
                        tableData: data
                    })
                }, 300)
            }else if(!this.state.dateRange[0]){
                let data = this.state.data.filter(item => {
                    return Number(value)===item.id
                });
                this.setState({isLoading: true});
                this.timerID = setTimeout(()=>{
                    this.setState({
                        isLoading: false,
                        tableData: data
                    })
                },300)
            }else{
                let start = new Date(this.state.dateRange[0]).getTime();
                let end = new Date(this.state.dateRange[1]).getTime();
                let data = this.state.data.filter(item => {
                    return Number(value)===item.id && item.time>=start && item.time<=end
                });
                this.setState({isLoading: true});
                this.timerID = setTimeout(()=>{
                    this.setState({
                        isLoading: false,
                        tableData: data
                    })
                },300)
            }
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
        getVariance = (amount, expect) => {
            const ret = (amount-expect).toFixed(2);
            return ret>0 ? <span>+{ret}</span> : <span>{ret}</span>
        };
        render(){
            const columns = [
                {
                    title: '盘点单号',
                    dataIndex: 'id',
                    key: 'id',
                    render: (text, record) => <Button type="link" onClick={()=>{this.handleView(record)}}>{text}</Button>
                },
                {
                    title: '盘点时间',
                    dataIndex: 'createtime',
                    key: 'time',
                    render: (text) => <span><Icon type="clock-circle" />  {this.getTime(text)}</span>,
                    sorter: (a, b) => a.time-b.time
                },
                {
                    title: '盘点人',
                    dataIndex: 'creater',
                    key: 'creater',
                    filters: this.state.createrFilters,
                    onFilter: (value, record) => value===record.creatername
                },
                {
                    title: '预期金额',
                    key: 'expect',
                    dataIndex: 'expect',
                    render: (text) => <span>￥{text.toFixed(2)}</span>,
                    sorter: (a, b) => a.expect-b.expect
                },
                {
                    title: '盘点金额',
                    key: 'amount',
                    dataIndex: 'amount',
                    render: (text) => <span>￥{text.toFixed(2)}</span>,
                    sorter: (a, b) => a.amount-b.amount
                },
                {
                    title: '差异金额',
                    key: 'variance',
                    render: (text, record) => this.getVariance(record.amount, record.expect),
                    sorter: (a, b) => a.amount-b.amount
                },
                {
                    title: '状态',
                    key: 'state',
                    dataIndex: 'state',
                    render: (text) => text===1 ? <Tag color='green'>已处理</Tag> : <Tag color='red'>未处理</Tag>,
                    filters: [{text: '已处理', value: 0}, {text: '未处理', value: 1}],
                    onFilter: (value, record) => value===record.state
                },
                {
                    title: '操作',
                    key: 'operate',
                    render: (text, record) => record.state===1 ?
                        <div>
                            <Button size="small" disabled>处理</Button>
                            <Divider type="vertical" />
                            <Button size="small" type="danger" disabled>删除</Button>
                        </div> : <div>
                            <Button size="small" onClick={()=>this.handleDeal(record)}>处理</Button>
                            <Divider type="vertical" />
                            <Button size="small" type="danger" onClick={()=>this.handleDelete(record)}>删除</Button>
                        </div>
                }
            ];
            return (
                <div>
                    <TopNav nav={['库存管理', '库存盘点']} />
                    <div className="stock-header" style={{margin: "20px"}}>
                        <Button type="primary"
                                style={{marginRight: "40px"}}
                                onClick={()=>{this.props.history.push('/inventory-add')}}>新建盘点单
                        </Button>
                        <Input.Search
                            placeholder="输入盘点单号"
                            style={{width: "160px", float: "right", marginLeft: "15px"}}
                            onSearch={(value) => this.handleSearch(value)}
                            enterButton
                        />
                        <DatePicker.RangePicker
                            style={{width: "230px", float: "right"}}
                            onChange={this.handleDatePickerChange}
                        />
                    </div>
                    {
                        this.state.isLoading ? <Loading /> :
                            <Table
                                size="small"
                                style={{margin: '20px'}}
                                columns={columns}
                                dataSource={this.state.tableData}
                                rowKey={record => record.id}
                                bordered
                            />
                    }
                </div>
            )
        }
    }
);

export default Inventory;








