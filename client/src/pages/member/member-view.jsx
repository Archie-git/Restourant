import React from 'react';
import './member.less';
import {Button, Card, Form, Tag} from 'antd';
import TopNav from "../../components/top-nav";

class ViewCustomer extends React.Component{
    getTime = (time) => {
        time = new Date(time);
        let month = time.getMonth()+1;
        return <span>{time.getFullYear()+'-'+month+'-'+time.getDate()}&nbsp;&nbsp;{time.getHours()+':'+time.getMinutes()}</span>;
    };
    render(){
        const formItemLayout = {
            labelCol: {span: 8},
            wrapperCol: {span: 10}
        };
        let data = this.props.location.state.data;
        return (
            <div className="customer-view-container">
                <TopNav nav={['会员管理', '会员列表', '会员详情']} />
                <Card title={<span style={{ color: "#1DA57A", fontWeight: "bolder", fontSize: "20px"}}>查看会员详情</span>}
                      extra={<Button onClick={()=>{this.props.history.push('/member')}}>返回</Button>}
                      style={{width: "100%", border: "none"}}
                >
                    <Form {...formItemLayout} style={{marginTop: "40px"}}>
                        <Form.Item label="会员ID">
                            <span className="ant-form-text">{data.id}</span>
                        </Form.Item>
                        <Form.Item label="姓名">
                            <span className="ant-form-text">{data.name}</span>
                        </Form.Item>
                        <Form.Item label="Tel">
                            <span className="ant-form-text">{data.tel}</span>
                        </Form.Item>
                        <Form.Item label="积分">
                            <span className="ant-form-text">{data.integral}</span>
                        </Form.Item>
                        <Form.Item label="等级">
                            <span style={{marginLeft: "20px"}}>
                                {
                                    data.status===1 ? <Tag color="blue">黄金</Tag> :
                                        data.status===2 ? <Tag color="green">白金</Tag> : <Tag color="red">钻石</Tag>
                                }
                            </span>
                        </Form.Item>
                        <Form.Item label="创建时间">
                            <span className="ant-form-text">{this.getTime(data.createtime)}</span>
                        </Form.Item>
                        <Form.Item label="备注">
                            <span className="ant-form-text">{data.note ? data.note : '无'}</span>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        )
    }
}

export default ViewCustomer;