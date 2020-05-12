import React from 'react';
// import './order.less';
import {Form, Button, Card, Icon, Tag} from 'antd';
import TopNav from "../../components/top-nav";

class ViewOrder extends React.Component{
    constructor(props){
        super(props);
        this.state=({
            data: {}
        })
    }
    UNSAFE_componentWillMount = async () => {
        let data = this.props.location.state.data;
        this.setState({
            data: data
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
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 10 },
        };
        return (
            <div className="product-view-container">
                <TopNav nav={['订单管理', '订单详情']}/>
                <Card title={<span style={{ color: "#1DA57A", fontWeight: "bolder", fontSize: "20px"}}>查看订单信息</span>}
                      extra={<Button type="primary" onClick={()=>this.props.history.push('/order')}>返回</Button>}
                      style={{ border: "none", width: "100%"}}
                >
                    <Form {...formItemLayout} style={{marginTop: "40px"}}>
                        <Form.Item label="订单ID">
                            <span className="ant-form-text">{this.state.data.id}</span>
                        </Form.Item>
                        <Form.Item label="顾客">
                            <span className="ant-form-text">{this.state.data.customer.name}</span>
                        </Form.Item>
                        <Form.Item label="桌号">
                            <span className="ant-form-text">{this.state.data.seat}号</span>
                        </Form.Item>
                        <Form.Item label="状态">
                            <span className="ant-form-text" style={{textIndent: 0, marginLeft: "20px"}}>
                                {
                                    this.state.data.state === 0 ? (
                                        <div>
                                            {
                                                this.state.data.urged === 0 ? <Tag color="blue">已付款</Tag> : <Tag color="red">催单</Tag>
                                            }
                                        </div>
                                    ) : this.state.data.state === 1 ? <Tag color="red">请求取消</Tag> :
                                        this.state.data.state === 2 ? <Tag color="green">已取消</Tag> :
                                            <Tag color="green">已完成</Tag>
                                }
                            </span>
                        </Form.Item>
                        <Form.Item label="订单列表">
                            <div className="ant-form-text">
                                {
                                    this.state.data.commodity.map((item, index) => {
                                        return <div key={index}>{item.name}<Icon type="close"/> {item.count}</div>
                                    })
                                }
                            </div>
                        </Form.Item>
                        <Form.Item label="下单时间">
                            <span className="ant-form-text">{this.getTime(this.state.data.createtime)}</span>
                        </Form.Item>
                        <Form.Item label="订单总金额">
                            <span className="ant-form-text">￥{this.state.data.amount.toFixed(2)}</span>
                        </Form.Item>
                        <Form.Item label="实付金额">
                            <span className="ant-form-text">￥{this.state.data.payment.toFixed(2)}</span>
                        </Form.Item>
                        <Form.Item label="所获积分">
                            <span className="ant-form-text">{this.state.data.integral}</span>
                        </Form.Item>
                        <Form.Item label="备注">
                            <span className="ant-form-text">{this.state.data.note ? this.state.data.note : '无'}</span>
                        </Form.Item>
                        <Form.Item label="评价等级">
                            <span className="ant-form-text">
                                {
                                    this.state.data.stars === 0 ? "暂未评价" : [1,2,3,4,5].map((item, index) => {
                                        return (
                                            <Icon key={index} type="star" theme="filled"
                                                  style={{color: "yellow", marginLeft: "5px",
                                                      display: item > this.state.data.stars ? "none" : "inline"}}
                                            />
                                        )
                                    })
                                }
                            </span>
                        </Form.Item>
                        <Form.Item label="评价文字">
                            <span className="ant-form-text">
                                {
                                    this.state.data.stars === 0 ? "暂未评价" : this.state.data.evaluation
                                }
                            </span>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        )
    }
}

export default Form.create({name:'product-add-form'})(ViewOrder);
