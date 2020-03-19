import React from 'react';
// import './order.less';
import {Form, Button, Card, Icon} from 'antd';
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
        console.log(data);
        this.setState({
            data: data
        })
    };
    getTime = (time) => {
        let temp = new Date(time);
        let month = temp.getMonth()+1;
        return temp.getFullYear()+"-"+month+"-"+temp.getDate()+" "+temp.getHours()+":"+temp.getMinutes()
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
                        <Form.Item label="订单ID" hasFeedback>
                            <span className="ant-form-text">{this.state.data.id}</span>
                        </Form.Item>
                        <Form.Item label="顾客ID" hasFeedback>
                            <span className="ant-form-text">{this.state.data.customer}</span>
                        </Form.Item>
                        <Form.Item label="状态" hasFeedback>
                            <span className="ant-form-text">{this.state.data.state}</span>
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
                        <Form.Item label="下单时间" hasFeedback>
                            <span className="ant-form-text">{this.getTime(this.state.data.createtime)}</span>
                        </Form.Item>
                        <Form.Item label="订单总金额" hasFeedback>
                            <span className="ant-form-text">￥{this.state.data.amount}</span>
                        </Form.Item>
                        <Form.Item label="实付金额">
                            <span className="ant-form-text">￥{this.state.data.payment}</span>
                        </Form.Item>
                        <Form.Item label="所获积分">
                            <span className="ant-form-text">{this.state.data.integral}</span>
                        </Form.Item>
                        <Form.Item label="评价">
                            <span className="ant-form-text">{this.state.data.evalution}</span>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        )
    }
}

export default Form.create({name:'product-add-form'})(ViewOrder);
