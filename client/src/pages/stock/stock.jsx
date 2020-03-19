import React from 'react';
import './stock.less';
import TopNav from '../../components/top-nav/index';
import Loading from '../../components/loading/index';
import {Button, Table, Divider, Tag, Modal, Input, Icon} from 'antd';
import {
    reqStockList,
    reqStockCategory,
    reqStockDelete,
    reqStockSearch,
    reqStocklogList,
    addStocklogList
} from '../../api/index';
import memoryUtils from "../../util/memoryUtils";

class Stock extends React.Component{
    constructor(props) {
        super(props);
        this.state = ({
            isLoading: true,
            data: [],
            category: [],
            options: []
        })
    }
    UNSAFE_componentWillMount = async () => {
        const response = await reqStockList();
        this.refreshTable(response);
    };
    componentWillUnmount = () => {
        clearTimeout(this.timerID)
    };
    refreshTable = async (response1) => {
        const response2 = await reqStocklogList();
        const response3 = await reqStockCategory();
        if(response1.status === 0 && response2.status === 0 && response3.status === 0){
            let data = response1.data;
            data = data.map(item1 => {
                item1.state = item1.amount>item1.excess ? 2 : item1.amount<item1.warning ? 1 : 0;
                item1.log = [];
                response2.data.forEach(item2 => {
                    if(item2.stockid === item1.id){
                        item1.log.push(item2)
                    }
                });
                item1.manager = item1.log[item1.log.length-1].manager;
                let time = item1.log[item1.log.length-1].time;
                time = new Date(time);
                item1.fullTime = time;
                item1.time = time.getMonth()+1+"-"+time.getDate()+" "+time.getHours()+":"+time.getMinutes();
                item1.pictures = item1.pictures.split(',');
                return item1
            });
            let category = [];
            let options = [];
            response3.data.forEach(item => {
                category.push({text: item.category, value: item.category});
                options.push({label: item.category, value: item.category})
            });
            this.setState({
                category: category,
                options: options,
                isLoading: true
            });
            this.timerID = setTimeout(() => {
                this.setState({
                    isLoading: false,
                    data: data
                })}, 300)
        }
    };
    handleDelete = (record) => {
        Modal.confirm({
            title: '警告',
            content: "确定要删除库存记录\""+record.name+"\"吗",
            okText: '确认',
            onOk: async () => {
                const response = await reqStockDelete(record.id);
                if(response.status === 0){
                    console.log(record);
                    let log = {...record};
                    log.stockid = log.id;
                    log.stockname =log.name;
                    log.manager = memoryUtils.user.username;
                    log.time = new Date().getTime();
                    log.operation = "删除";
                    log.pictures = log.pictures.join(',');
                    delete log.state;
                    delete log.log;
                    delete log.name;
                    delete log.id;
                    console.log(log);
                    let response2 = await addStocklogList(log);
                    if(response2.status === 0){
                        const response = await reqStockList();
                        this.refreshTable(response)
                    }
                }
            },
            cancelText: "取消",
            onCancel: ()=>{}
        })
    };
    handleEdit = (record) => {
        this.props.history.push({pathname: '/stock-edit', state: {data: record}} )
    };
    handleSearch = async (name) => {
        const response = name==="" ? await reqStockList() : await reqStockSearch(name);
        this.refreshTable(response);
    };
    handleView = (record) => {
        this.props.history.push({pathname: '/stock-view', state: {data: record}});
    };
    render(){
        const state = [{text: "正常", value: 0},{text: "告罄", value: 1},{text: "过剩", value: 2}];
        const columns = [
            {
                title: '编号',
                key: 'index',
                render: (text, record, index) => <span>{index+1}</span>
            },
            {
                title: '名称',
                dataIndex: 'name',
                key: 'name',
                render: (text, record) => (
                    <span>
                        <Button type="link" onClick={()=>this.handleView(record)}>
                            {text}&nbsp;
                            {record.amount<record.warning ? <Tag size="small" color="red">告罄</Tag> : null}
                            {record.amount>record.excess ? <Tag size="small" color="green">过剩</Tag> : null}
                        </Button>
                    </span>
                )
            },
            {
                title: '类型',
                dataIndex: 'category',
                key: 'category',
                filters: this.state.category,
                onFilter: (value, record) => value===record.category
            },
            {
                title: '单价',
                dataIndex: 'price',
                key: 'price',
                render: (text) => <span>￥{text}</span>,
                sorter: (a, b) => a.price-b.price
            },
            {
                title: '库存量',
                dataIndex: 'amount',
                key: 'amount',
                sorter: (a, b) => a.amount - b.amount,
                filters: state,
                onFilter: (value, record) => value===record.state
            },
            {
                title: '单位',
                dataIndex: 'unit',
                key: 'unit',
            },
            {
                title: '最近更新',
                dataIndex: 'time',
                key: 'time',
                render: (text) => <span><Icon type="clock-circle" />&nbsp;{text}</span>,
                sorter: (a, b) => a.fullTime - b.fullTime
            },
            {
                title: '操作人',
                dataIndex: 'manager',
                key: 'manager'
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <div>
                        <Button size="small" type="primary" onClick={()=>{this.handleEdit(record)}}>编辑</Button>
                        <Divider type="vertical" />
                        <Button size="small" type="danger" onClick={()=>{this.handleDelete(record)}}>删除</Button>
                    </div>
                )
            }
        ];
        return (
            <div className="stock-container">
                <TopNav nav={['库存管理', '库存信息']}/>
                <div className="stock-header">
                    <Button type="primary"
                            style={{marginRight: "40px"}}
                            onClick={()=>{this.props.history.push('/stock-add')}}>新增库存</Button>
                    <Button type="primary" onClick={()=>this.props.history.push('/stock-log')}>仓库日志</Button>
                    <Input.Search
                        style={{width: "200px", float: "Right"}}
                        placeholder="查询库存信息"
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
                               rowKey = {record => record.id}
                               bordered
                        />
                }
            </div>
        )
    }
}

export default Stock


