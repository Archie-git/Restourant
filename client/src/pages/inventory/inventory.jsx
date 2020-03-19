import React from 'react';
import TopNav from "../../components/top-nav";
import {Button, Input, Form, DatePicker, Table, Tag, Icon, Divider, Modal, message} from "antd";
import Loading from '../../components/loading/index';
import {reqInventoryList, reqStockList, reqUserList, updateInventoryList} from '../../api/index';

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
        refreshTable = async (response1) => {
            const response2 = await reqUserList();
            const response3 = await reqStockList();
            if(response1.status===0 && response2.status===0 && response3.status===0){
                let managers = [];
                let data = response1.data.map(item1 => {
                    response2.data.forEach(item2 => {
                        if(item1.manager === item2.id){
                            item1.managername = item2.username;
                            managers.push(item1.managername)
                        }
                    });
                    item1.detail = item1.detail.split(',');
                    item1.detail = item1.detail.map(item3 => {
                        let stockname = item3.split('-')[0];
                        response3.data.forEach(item4 => {
                            if(Number(stockname)===item4.id){
                                stockname = item4.name;
                            }
                        });
                        return item3.split('-')[1]==="0" ? stockname+"×-"+item3.split('-')[2] : stockname+"×"+item3.split('-')[2];
                    });
                    return item1
                });
                managers = new Set(managers);
                let managerFilters = [];
                managers.forEach(item => {
                    managerFilters.push({text: item, value: item})
                });
                this.setState({isLoading: true});
                this.timeID = setTimeout(() => {
                    this.setState({
                        isLoading: false,
                        data: data,
                        tableData: data,
                        managerFilters: managerFilters,
                        dateRange: []
                    })
                }, 300)
            }
        };
        componentWillUnmount = () => {
            clearTimeout(this.timerID)
        };
        handleDeal = (record) => {
            let data = {id: record.id, state : 1-record.state};
            console.log(data);
            Modal.confirm({
                title: "警告",
                content: "确定要将单号\"PD"+record.id+"\"设置为已处理吗",
                okText: "确认",
                onOk: async ()=>{
                    const response1 = await updateInventoryList(data);
                    if(response1.status===0){
                        message.success("设置成功");
                        const response2 = await reqInventoryList();
                        this.timerID = setTimeout(()=>{
                            this.refreshTable(response2)
                        }, 400)
                    }
                },
                cancelText: "取消",
                onCancel: () => {}
            })
        };
        handleDelete = (record) => {
    
            console.log(record.id)
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
            let temp = new Date(time);
            let month = temp.getMonth()+1;
            return temp.getFullYear()+"-"+month+"-"+temp.getDate()+" "+temp.getHours()+":"+temp.getMinutes()
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
                    dataIndex: 'time',
                    key: 'time',
                    render: (text) => <span><Icon type="clock-circle" />  {this.getTime(text)}</span>,
                    sorter: (a, b) => a.time-b.time
                },
                {
                    title: '盘点人',
                    dataIndex: 'managername',
                    key: 'managername',
                    filters: this.state.managerFilters,
                    onFilter: (value, record) => value===record.managername
                },
                {
                    title: '总金额',
                    key: 'amount',
                    dataIndex: 'amount',
                    render: (text) => <span>￥{text}</span>,
                    sorter: (a, b) => a.amount-b.amount
                },
                {
                    title: '差异金额',
                    key: 'variance',
                    dataIndex: 'variance',
                    render: (text) => <span>￥{text}</span>,
                    sorter: (a, b) => a.variance-b.variance
                },
                {
                    title: '状态',
                    key: 'state',
                    dataIndex: 'state',
                    render: (text) => text===0 ? <Tag color='green'>已处理</Tag> : <Tag color='red'>未处理</Tag>,
                    filters: [{text: '已处理', value: 0}, {text: '未处理', value: 1}],
                    onFilter: (value, record) => value===record.state
                },
                {
                    title: '操作',
                    key: 'operate',
                    render: (text, record) => record.state===0 ?
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
                    <TopNav nav={['库存管理', '权限盘点']} />
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








