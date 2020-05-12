import React from 'react';
import TopNav from "../../components/top-nav";
import {Button, Icon} from "antd";
import {reqShopInfo, reqWeekOrder} from "../../api";
import ReactEcharts from "echarts-for-react";

class Home extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            weekData: {
                amount: [],
                quantity: [],
                date: [],
                quantityPercent: 0.00,
                amountPercent: 0.00
            }
        }
    }
    UNSAFE_componentWillMount = async () => {
        const response1 = await reqShopInfo();
        const response2 = await reqWeekOrder();
        if(response1.status === 0 && response2.status === 0){
            // 获取周次和周数据
            let week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
            let day = new　Date().getDay();
            let arr = week.splice(day+1, 7-day-1);
            week = arr.concat(week);
            week = week.map(item => {
                if(week.indexOf(item) < week.indexOf("周日")) item = '上' + item;
                if(week.indexOf(item) === week.length-1) item = '今天';
                return item;
            });
            let weekData = response2.data;
            weekData.date = week;
            //获取月份和月数据
            
            
            this.setState({
                weekData: weekData,
                data: response1.data
            });
        }
    };
    handleDetail = () => {
        this.props.history.push({pathname: '/home/view', state: {data: this.state.data}})
    };
    getOption = () => {
        return {
            title: {
                text: ''
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['数量', '总额'],
                selectedMode: 'single'
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            // toolbox: {
            //     feature: {
            //         saveAsImage: {}
            //     }
            // },
            xAxis: {
                type: 'category',
                boundaryGap: true,
                data: this.state.weekData.date
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '数量',
                    type: 'line',
                    stack: '总量',
                    // data: [120, 132, 101, 134, 90, 230, 210]
                    data: this.state.weekData.quantity
                },
                {
                    name: '总额',
                    type: 'line',
                    stack: '总量',
                    data: this.state.weekData.amount
                }
            ]
        }
    };
    getPercentForm = (num) => {
        if(num > 1){
            return num-1
        }else{
            return 1-num
        }
    };
    render() {
        return (
            <div className='home-container'>
                <TopNav nav={['首页']} />
                <div style={{margin: "20px 22px 0 40px", textAlign: "right"}}>
                    {/*<span style={{ color: "#1DA57A", fontWeight: "bolder", fontSize: "23px", position: "relative", top: "-10px"}}>*/}
                    {/*    {this.state.data.name}*/}
                    {/*</span>*/}
                    <Button type="primary" onClick={this.handleDetail}>门店详情</Button>
                </div>
                {/*每周销售图*/}
                <div style={{margin: "20px"}}>
                    <div
                        style={{
                            display: "inline-block",
                            verticalAlign: "top",
                            width: "19%",
                            margin: "30px 2% 0 4%",
                            border: "1px solid lightgray"
                        }}
                    >
                        <div style={{borderBottom: "1px solid lightgray", padding: "20px", fontWeight: "bold"}}>今日营收情况</div>
                        <div style={{padding: "20px 20px 5px"}}>
                            <div style={{fontWeight: "bolder"}}>订单数量：{this.state.weekData.quantityToday} 单</div>
                            <div style={{fontSize: "12px", display: this.state.weekData.quantityPercent === "Infinity" ? "none" : "block"}}>
                                <span>日同比{this.getPercentForm(this.state.weekData.quantityPercent)}%</span>
                                {
                                    this.state.weekData.quantityPercent > 1 ? (
                                        <Icon type="arrow-up" style={{color: "green"}}/>
                                    ) : (
                                        <Icon type="arrow-down" style={{color: "red"}}/>
                                    )
                                }
                            </div>
                        </div>
                        <div style={{padding: "10px 20px 20px"}}>
                            <div style={{fontWeight: "bolder"}}>营收总额：{this.state.weekData.amountToday} 元</div>
                            <div style={{fontSize: "12px", display: this.state.weekData.amountPercent === "Infinity" ? "none" : "block"}}>
                                <span>日同比{this.getPercentForm(this.state.weekData.amountPercent)}%</span>
                                {
                                    this.state.weekData.amountPercent > 1 ? (
                                        <Icon type="arrow-up" style={{color: "green"}}/>
                                    ) : (
                                        <Icon type="arrow-down" style={{color: "red"}}/>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div style={{display: "inline-block", width: "65%", margin: "0 5%", verticalAlign: "top"}}>
                        <ReactEcharts option={this.getOption()} />
                    </div>
                </div>
                {/*每月销售图*/}
                {/*<div style={{margin: "100px 20px 20px"}}>*/}
                {/*    <ReactEcharts option={this.getOption()} />*/}
                {/*</div>*/}
            </div>
        )
    }
}

export default Home;