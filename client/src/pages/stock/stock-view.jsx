import React from 'react';
import { Form, Card, Button, Tag, List, Select, DatePicker } from 'antd';
import TopNav from '../../components/top-nav/index';
import StocklogView from './stock-log-view';
import moment from "moment";

class ViewStock extends React.Component{
    constructor(props) {
        super(props);
        this.state = ({
            data: [],
            log: [],
            option: 0,
            visible: false,
            logInfo: {}
        })
    }
    UNSAFE_componentWillMount = () => {
        // const data = this.props.location.state.data;
        // this.setState({
        //     data: data,
        //     log: data.log.reverse()
        // });
    
        const data = this.props.location.state.data;
        let data1 = data.log.reverse();
        data1 = data1.map(item1 => {
            if(item1.operation === "修改"){
                let data2 = data1.filter(item2 => {
                    return item1.time > item2.time && item1.stockid === item2.stockid && item1.operation === "修改"
                });
                if(data2.length === 0){
                    item1.before = data1.find(item3 => {
                        return item3.stockid === item1.stockid && item3.operation === "新增"
                    });
                }else{
                    data2 = data2.sort((a, b) => a.time - b.time);
                    item1.before = data2.pop();
                }
            }
            return item1
        });
        this.setState({
            data: data,
            log: data1
        });
    };
    handleSelectChange = (value) => {
        if(value === 0){
            this.setState({log: this.state.data.log})
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
        let log = this.state.data.log.filter(item => {
            return item.time>=start && item.time<=end
        });
        this.setState({log: log})
    };
    handleWeekPickerChange = (week) => {
        let start = moment(week).day(0).format('YYYY/MM/DD')+" 00:00:00";
        let end = moment(week).day(6).format('YYYY/MM/DD')+" 23:59:59";
        start = new Date(start).getTime();
        end = new Date(end).getTime();
        let log = this.state.data.log.filter(item => {
            return item.time>start && item.time<=end
        });
        this.setState({log: log})
    };
    handleMonthPickerChange = (month) => {
        let start = moment(month).startOf('month').format('YYYY-MM-DD') + " 23:59:59";
        let end = moment(month).endOf('month').format('YYYY-MM-DD') + " 23:59:59";
        start = new Date(start).getTime();
        end = new Date(end).getTime();
        let log = this.state.data.log.filter(item => {
            return item.time>=start && item.time<=end
        });
        this.setState({log: log})
    };
    handleRangePickerChange = (dates, dateStrings) => {
        let start = new Date(dateStrings[0]).getTime();
        let end = new Date(dateStrings[1]).getTime();
        let log = this.state.data.log.filter(item => {
            return item.time>=start && item.time<=end
        });
        this.setState({log: log})
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
        const formItemLayout = {
            labelCol: {span: 8},
            wrapperCol: {span: 10}
        };
        let header = (
            <div style={{textAlign: "right"}}>
                { this.state.option===0 ? null : this.getTimePicker()}
                <Select defaultValue="按顺序查看" onChange={(value)=>this.handleSelectChange(value)}
                        style={{width: "115px", margin: "0 20px 0 10px"}}>
                    <Select.Option value={0}>按顺序查看</Select.Option>
                    <Select.Option value={1}>按日期查看</Select.Option>
                    <Select.Option value={2}>按周次查看</Select.Option>
                    <Select.Option value={3}>按月份查看</Select.Option>
                    <Select.Option value={4}>自定义区间</Select.Option>
                </Select>
            </div>
        );
        return (
            <div className="stock-view-container">
                <TopNav nav={['库存管理', '库存信息', '货物详情']} />
                <Card title={<span style={{ color: "#1DA57A", fontWeight: "bolder", fontSize: "20px"}}>查看货物详情</span>}
                      extra={<Button type='primary' onClick={()=>{this.props.history.push('/stock')}}>返回</Button>}
                      style={{width: "100%", border: "none"}}
                >
                    <Form {...formItemLayout} style={{marginTop: "40px"}}>
                        <Form.Item label="货物名称">
                            <span className="ant-form-text">{this.state.data.name}</span>
                        </Form.Item>
                        <Form.Item label="货物种类">
                            <span className="ant-form-text">{this.state.data.category}</span>
                        </Form.Item>
                        <Form.Item label="单价">
                            <span className="ant-form-text">￥{this.state.data.price.toFixed(2)}</span>
                        </Form.Item>
                        <Form.Item label="库存数量">
                            <span className="ant-form-text">{this.state.data.amount}</span>
                        </Form.Item>
                        <Form.Item label="库存单位">
                            <span className="ant-form-text">{this.state.data.unit}</span>
                        </Form.Item>
                        <Form.Item label="库存状态">
                            <span style={{marginLeft: "20px"}}>
                                {this.state.data.state===0 ? <Tag size="small" color="blue">正常</Tag> :
                                    this.state.data.state===1 ? <Tag size="small" color="red">告罄</Tag> :
                                        <Tag size="small" color="green">过剩</Tag>}
                            </span>
                        </Form.Item>
                        <Form.Item label="库存监控">
                            <span className="ant-form-text">
                                上限：{this.state.data.excess}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                下限：{this.state.data.warning}
                            </span>
                        </Form.Item>
                        <Form.Item label="图片">
                                <span className="ant-form-pictures">
                                    {
                                        this.state.data.pictures.map((item, index) => {
                                            return item==="" ? null
                                                : <img key={index} src={'/upload/'+item} alt="货物图片"/>
                                        })
                                    }
                                </span>
                        </Form.Item>
                        <Form.Item label="备注">
                            <span className="ant-form-text">{ this.state.data.note ? this.state.data.note : '无'}</span>
                        </Form.Item>
                    </Form>
                    <List style={{margin: "50px 170px"}}
                          size="small"
                          header={header}
                          dataSource={this.state.log}
                          pagination={{pageSize: 10}}
                          renderItem={item =>
                              <List.Item>
                                  {/*<span style={{fontWeight: "bolder", marginLeft: "10px"}}>{this.getTimeForm(item.time)}</span>*/}
                                  {/*<span style={{color: "#1DA57A", marginLeft: "20px", width: "50px"}}>{item.manager}</span>*/}
                                  {/*<span>对“{item.stockname}”的库存信息进行了{item.operation}</span>*/}
                                  {/*<Button type="link"*/}
                                  {/*        style={{marginLeft: "30px"}}*/}
                                  {/*        onClick={()=>this.handleDetail(item)}*/}
                                  {/*>详情</Button>*/}
                                  <span style={{fontWeight: "bolder", marginLeft: "10px"}}>
                                      {this.getTimeForm(item.time)}
                                  </span>
                                  <span style={{color: "#1DA57A", marginLeft: "20px", width: "60px"}}>
                                      {item.manager}
                                  </span>
                                  <span>对</span>
                                  <span style={{margin: "0 20px", width: "80px"}}>“<span style={{color: "#1DA57A"}}>{item.stockname}</span>”</span>
                                  <span>的库存信息进行了</span>
                                  <span style={{color: '#1DA57A'}}>{item.operation}</span>
                                  <Button
                                      type="primary"
                                      size="small"
                                      style={{marginLeft: "30px"}}
                                      onClick={()=>this.handleDetail(item)}
                                  >详情</Button>
                              </List.Item>
                          }
                          bordered
                    />
                    <StocklogView
                        visible={this.state.visible}
                        info={this.state.logInfo}
                        onCancel={this.onOk}
                        onOk={this.onOk}
                    />
                </Card>
            </div>
        )
    }
}


export default ViewStock;