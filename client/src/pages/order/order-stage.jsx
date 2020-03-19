import React from 'react';
import TopNav from "../../components/top-nav";
import {Input, Table, Button, message, Icon} from "antd";
import Loading from "../../components/loading";
import {reqOrderList, reqOrderSearch, reqProductList} from '../../api/index';

class OrderStage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            data: [],
            tableData: []
        }
    }
    UNSAFE_componentWillMount = async () => {
        const response = await reqOrderList();
        this.refreshTable(response)
    };
    refreshTable = async (response1) => {
        const response2 = await reqProductList();
        if(response1.status===0 && response2.status===0){
            this.setState({isLoading: true});
            let data = response1.data.map(item => {
                item.commodity = JSON.parse(item.commodity);
                return item
            });
            this.timerID = setTimeout(()=>{
                this.setState({
                    isLoading: false,
                    data: data
                })
            }, 300)
        }
    };
    handleSearch = async (id) => {
        const response = id==="" ? await reqOrderList() : await reqOrderSearch(id);
        this.refreshTable(response)
    };
    // handleProductView = async (id) => {
    //     console.log(id)
    //     const response = await reqProductSearch(id);
    //     console.log(response.data)
    //     if(response.status === 0){
    //         // this.props.history.push({pathname: '/product-view', state: {data: response.data}})
    //     }
    // };
    handleView = (id) => {
        message.success(id)
    };
    getTime = (time) => {
        let temp = new Date(time);
        let month = temp.getMonth()+1;
        return temp.getFullYear()+"-"+month+"-"+temp.getDate()+" "+temp.getHours()+":"+temp.getMinutes()
    };
    render(){
        const column = [
            {
                title: '订单ID',
                dataIndex: 'id',
                key: 'id',
                render: (text) => <Button type="link" onClick={()=>this.handleView(text)}>{text}</Button>
            },
            {
                title: '顾客',
                dataIndex: 'customer',
                key: 'customer'
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
                title: '创建时间',
                dataIndex: 'createtime',
                key: 'createtime',
                render: (text) => <span>{this.getTime(text)}</span>,
                sorter: (a, b) => a.amount - b.amount,
            },
            {
                title: '订单总金额',
                dataIndex: 'amount',
                key: 'amount',
                render: (text) => <span>￥{text}</span>,
                sorter: (a, b) => a.amount - b.amount
            },
            {
                title: '评价',
                dataIndex: 'evalution',
                key: 'evalution'
            },
            {
                title: '状态',
                dataIndex: 'state',
                key: 'state'
            },
            {
                title: '操作',
                key: 'operation',
                render: (record) => (
                    <span>
                    <Button size="small" type="primary"  onClick={()=>this.handleView(record.id)}>查看详情</Button>
                </span>
                )
            }

        ];
        return (
            <div>
                <TopNav nav={['订单管理', '全部订单']} />

                <div style={{margin: "20px 22px 0 20px", overflow: "hidden"}}>
                    <Input.Search
                        style={{width: "200px", float: "Right"}}
                        placeholder="查询订单信息"
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

export default OrderStage;






