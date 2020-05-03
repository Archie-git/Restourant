import React from 'react';
import { Form, Card, Button, Input, message } from 'antd';
import TopNav from "../../components/top-nav";
import { reqMemberAdd } from '../../api/index'

const AddCustomer = Form.create({name: 'add-customer-form'})(
    class extends React.Component{
        handleSubmit = (e) => {
            e.preventDefault();
            this.props.form.validateFields(async (err, values) => {
                if(!err){
                    let data = values;
                    data.createtime = new Date().getTime();
                    data.status = 1;
                    data.integral = 0;
                    const response = await reqMemberAdd(data);
                    if(response.status === 0){
                        message.success("新增会员成功，即将返回会员列表页！");
                        this.timerID = setTimeout(() => {
                            this.props.history.push('/customer')
                        }, 2000)
                    }
                }
            })
        };
        render(){
            const formItemLayout = {
                labelCol: {span: 8},
                wrapperCol: {span: 10}
            };
            return (
                <div>
                    <TopNav nav={['会员管理', '新增会员']} />
                    <Card title={<span style={{ color: "#1DA57A", fontWeight: "bolder", fontSize: "20px"}}>新增会员信息</span>}
                          extra={<Button type="primary" onClick={()=>{this.props.history.push('/customer')}}>返回</Button>}
                          style={{width: "100%", border: "none"}}
                    >
                        <Form {...formItemLayout} style={{marginTop: "40px"}} onSubmit={this.handleSubmit}>
                            <Form.Item label="姓名" hasFeedback>
                                {
                                    this.props.form.getFieldDecorator('name', {
                                        rules: [{required: true}]
                                    })(<Input placeholder="请输入会员姓名"/>)
                                }
                            </Form.Item>
                            <Form.Item label="Tel" hasFeedback>
                                {
                                    this.props.form.getFieldDecorator('tel', {
                                        rules: [{required: true}]
                                    })(<Input addonBefore="+86" placeholder="请输入联系电话"/>)
                                }
                            </Form.Item>
                            <Form.Item label="备注" hasFeedback>
                                {
                                    this.props.form.getFieldDecorator('note', {
                                        initialValue: ""
                                    })(<Input.TextArea rows={4} placeholder="请输入备注" /> )
                                }
                            </Form.Item>
                            <Form.Item>
                                <Button style={{margin: "50px 0 0 460px"}} type="primary" htmlType="submit">完成，提交</Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </div>
            )
        }
    }
);

export default AddCustomer;