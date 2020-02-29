import React from 'react';
import {Button, Card, Col, DatePicker, List, Row, Select} from 'antd';
import TopNav from '../../components/top-nav/index';
import StocklogView from './stock-log-view';
import moment from "moment";
import {reqStocklogList} from "../../api";

class StockLog extends React.Component{
    constructor(props){
        super(props);
        this.state = ({
            data: [],
            log: [],
            option: 0,
            visible: false,
            logInfo: {},
        })
    }
    UNSAFE_componentWillMount = async () => {
        const response = await reqStocklogList();
        if(response.status === 0){
            let data = response.data.reverse();
            this.setState({
                data: data,
                log: data
            })
        }
    };
    handleSelectChange = (value) => {
        if(value === 0){
            this.setState({log: this.state.data})
        }
        this.setState({option: value})
    };
    getTimePicker = () => {
        if(this.state.option===1){
            return (
                <DatePicker
                    placeholder="请选择日期"
                    onChange={this.handleDatePickerChange}
                />
            )
        }else if(this.state.option===2){
            return (
                <DatePicker.WeekPicker
                    placeholder="请选择周次"
                    onChange={this.handleWeekPickerChange}
                    format="YYYY-WW"
                />
            )
        }else if(this.state.option===3){
            return (
                <DatePicker.MonthPicker
                    placeholder="请选择月份"
                    onChange={this.handleMonthPickerChange}
                    format="YYYY-MM"
                />
            )
        }else{
            return (
                <DatePicker.RangePicker
                    placeholder={["开始日期","结束日期"]}
                    onChange={this.handleRangePickerChange}
                    style={{width: "220px", textAlign: "left"}}
                />
            )
        }
    };
    handleDatePickerChange = (date, dateString) => {
        let start = new Date(dateString+" 00:00:00").getTime();
        let end = new Date(dateString+" 23:59:59").getTime();
        let log = this.state.data.filter(item => {
            return item.time>=start && item.time<=end
        });
        this.setState({log: log})
    };
    handleWeekPickerChange = (week) => {
        let start = moment(week).day(0).format('YYYY/MM/DD')+" 00:00:00";
        let end = moment(week).day(6).format('YYYY/MM/DD')+" 23:59:59";
        start = new Date(start).getTime();
        end = new Date(end).getTime();
        let log = this.state.data.filter(item => {
            return item.time>start && item.time<=end
        });
        this.setState({log: log})
    };
    handleMonthPickerChange = (month) => {
        let start = moment(month).startOf('month').format('YYYY-MM-DD') + " 23:59:59";
        let end = moment(month).endOf('month').format('YYYY-MM-DD') + " 23:59:59";
        start = new Date(start).getTime();
        end = new Date(end).getTime();
        let log = this.state.data.filter(item => {
            return item.time>=start && item.time<=end
        });
        this.setState({log: log})
    };
    handleRangePickerChange = (dates, dateStrings) => {
        let start = new Date(dateStrings[0]).getTime();
        let end = new Date(dateStrings[1]).getTime();
        let log = this.state.data.filter(item => {
            return item.time>=start && item.time<=end
        });
        this.setState({log: log})
    };
    getTime = (time) => {
        time = new Date(Number(time));
        let month = time.getMonth()+1;
        return time.getFullYear()+"-"+month+"-"+time.getDate()+"\xa0\xa0"+time.getHours()+":"+time.getMinutes();
    };
    handleDetail = (data) => {
        this.setState({
            visible: true,
            logInfo: data
        })
    };
    onOk = () =>{
        this.setState({visible: false})
    };
    render(){
        let header = (
            <div>
                <Row>
                    <Col span={6}> </Col>
                    <Col span={18} style={{textAlign: "right"}}>
                        { this.state.option===0 ? null : this.getTimePicker()}
                        <Select defaultValue="按顺序查看" onChange={(value)=>this.handleSelectChange(value)}
                                style={{width: "115px", marginLeft: "10px"}}>
                            <Select.Option value={0}>按顺序查看</Select.Option>
                            <Select.Option value={1}>按日期查看</Select.Option>
                            <Select.Option value={2}>按周次查看</Select.Option>
                            <Select.Option value={3}>按月份查看</Select.Option>
                            <Select.Option value={4}>自定义区间</Select.Option>
                        </Select>
                    </Col>
                </Row>
            </div>
        );
        return (
            <div>
                <TopNav nav={['库存管理','库存信息','库存日志']} />
                <Card title={<span style={{ color: "#1DA57A", fontWeight: "bolder", fontSize: "20px"}}>查看库存日志</span>}
                      extra={<Button type="primary" onClick={()=>this.props.history.push('/stock')}>返回</Button>}
                      style={{ border: "none", width: "100%"}}
                >
                    <List style={{margin: "20px 200px"}}
                          size="small"
                          header={header}
                          dataSource={this.state.log}
                          pagination={{pageSize: 10}}
                          renderItem={item =>
                              <List.Item>
                                  <span style={{fontWeight: "bolder", marginLeft: "10px"}}>
                                      {this.getTime(item.time)}
                                  </span>
                                  <span style={{color: "#1DA57A", marginLeft: "20px"}}>
                                      {item.manager}
                                  </span>
                                  <span>
                                      对“{item.stockname}”的库存信息进行了{item.operation}
                                  </span>
                                  <Button type="link"
                                          style={{marginLeft: "30px"}}
                                          onClick={()=>this.handleDetail(item)}
                                  >详情</Button>
                              </List.Item>
                          }
                          bordered
                    />
                    <StocklogView visible={this.state.visible}
                                  info={this.state.logInfo}
                                  onCancel={this.onOk}
                                  onOk={this.onOk}
                    />
                </Card>
            </div>
        )
    }
}

export default StockLog;