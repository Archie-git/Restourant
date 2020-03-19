import React from 'react';
import TopNav from "../../components/top-nav";
import {Button, Card, Form, Tag} from "antd";

class ViewInventory extends React.Component{
    getTime = (time) => {
        time = new Date(Number(time));
        let month = time.getMonth()+1;
        return time.getFullYear()+"-"+month+"-"+time.getDate()+"\xa0\xa0"+time.getHours()+":"+time.getMinutes();
    };
    getDetail = () => {
    
    };
    render() {
        const formItemLayout = {
            labelCol: {span: 8},
            wrapperCol: {span: 10}
        };
        const data = this.props.location.state.data;
        return (
            <div>
                <TopNav nav={['库存管理', '库存盘点', '盘点详情']} />
                <Card title={<span style={{ color: "#1DA57A", fontWeight: "bolder", fontSize: "20px"}}>查看盘点详情</span>}
                      extra={<Button type="primary" onClick={()=>{this.props.history.push('/inventory')}}>返回</Button>}
                      style={{width: "100%", border: "none"}}
                >
                    <Form {...formItemLayout} style={{marginTop: "40px", textIndent: "20px"}} onSubmit={this.handleSubmit}>
                        <Form.Item label="盘点单号">
                            <span className="ant-form-text">{data.id}</span>
                        </Form.Item>
                        <Form.Item label="盘点时间">
                            <span className="ant-form-text">{this.getTime(data.time)}</span>
                        </Form.Item>
                        <Form.Item label="盘点人">
                            <span className="ant-form-text">{data.managername}</span>
                        </Form.Item>
                        <Form.Item label="盘点金额">
                            <span className="ant-form-text">￥{data.amount}</span>
                        </Form.Item>
                        <Form.Item label="差异金额">
                            <span className="ant-form-text">￥{data.variance}</span>
                        </Form.Item>
                        <Form.Item label="状态">
                            <span className="ant-form-text" style={{marginLeft: "20px", textIndent: 0}}>
                                {data.state===0 ? <Tag color='green'>已处理</Tag> : <Tag color='red'>未处理</Tag>}
                            </span>
                        </Form.Item>
                        <Form.Item label="备注">
                            <span className="ant-form-text">{data.note}</span>
                        </Form.Item>
                        <Form.Item label="详情">
                            {
                                data.detail.map((item, index) => {
                                    return <span key={index} className="ant-form-text">{item}</span>
                                })
                            }
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        )
    }
}

export default ViewInventory;


