import React from 'react';
import { Form, Card, Button, Input, message, InputNumber, Radio} from 'antd';
import TopNav from "../../components/top-nav";
import { updateCustomerList } from '../../api/index'

const EditCustomer = Form.create({name: 'add-customer-form'})(
    class extends React.Component{
        handleSubmit = (e) => {
            e.preventDefault();
            this.props.form.validateFields(async (err, values) => {
                if(!err){
                    let data = {};
                    data.id = this.props.location.state.data.id;
                    for(let key in values){
                        if(values.hasOwnProperty(key)){
                            data[key] = values[key];
                        }
                    }
                    const response = await updateCustomerList(data);
                    if(response.status === 0){
                        message.success("编辑会员信息成功，即将返回会员列表页！");
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
            const data = this.props.location.state.data;
            return (
                <div>
                    <TopNav nav={['会员管理', '编辑会员']} />
                    <Card title={<span style={{ color: "#1DA57A", fontWeight: "bolder", fontSize: "20px"}}>编辑会员信息</span>}
                          extra={<Button type="primary" onClick={()=>{this.props.history.push('/customer')}}>返回</Button>}
                          style={{width: "100%", border: "none"}}
                    >
                        <Form {...formItemLayout} style={{marginTop: "40px"}} onSubmit={this.handleSubmit}>
                            <Form.Item label="姓名" hasFeedback>
                                {
                                    this.props.form.getFieldDecorator('name', {
                                        rules: [{required: true}],
                                        initialValue: data.name
                                    })(<Input placeholder="请输入会员姓名"/>)
                                }
                            </Form.Item>
                            <Form.Item label="Tel" hasFeedback>
                                {
                                    this.props.form.getFieldDecorator('tel', {
                                        rules: [{required: true}],
                                        initialValue: data.tel
                                    })(<Input addonBefore="+86" placeholder="请输入联系电话"/>)
                                }
                            </Form.Item>
                            <Form.Item label="等级">
                                {
                                    this.props.form.getFieldDecorator('status', {
                                        initialValue: data.status,
                                        rules: [{required: true}]
                                    })(
                                        <Radio.Group buttonStyle="solid">
                                            <Radio.Button value={1}>黄金</Radio.Button>
                                            <Radio.Button value={2}>白金</Radio.Button>
                                            <Radio.Button value={3}>钻石</Radio.Button>
                                        </Radio.Group>
                                    )
                                }
                            </Form.Item>
                            <Form.Item label="积分">
                                {
                                    this.props.form.getFieldDecorator('integral', {
                                        initialValue: data.integral
                                    })(<InputNumber style={{width: "100px"}} placeholder="请输入备注" /> )
                                }
                            </Form.Item>
                            <Form.Item label="备注" hasFeedback>
                                {
                                    this.props.form.getFieldDecorator('note', {
                                        initialValue: data.note
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

export default EditCustomer;