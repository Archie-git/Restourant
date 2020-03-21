import React from 'react';
import {Form, Input, Card, Button, message, Select} from 'antd';
import TopNav from "../../components/top-nav";
import {reqRoleList, reqUserUpdate} from "../../api";

const EditUser = Form.create({ name: 'user-edit' })(
    class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                data: {},
                options: []
            }
        }
        UNSAFE_componentWillMount = async () => {
            const response = await reqRoleList();
            if(response.status === 0){
                let options = [];
                let data = this.props.location.state.data;
                response.data.forEach(item => {
                    options.push({key: item.id, value: item.name});
                    if(data.role === item.id){
                        data.rolename = item.name
                    }
                });
                this.setState({
                    options: options,
                    data: data
                });
            }
        };
        componentWillUnmount = () => {
            clearTimeout(this.timerID)
        };
        handleSubmit = (e) => {
            e.preventDefault();
            this.props.form.validateFields( async (err, values) => {
                if(!err) {
                    let data=values;
                    data.createtime = new Date().getTime();
                    this.state.options.forEach(item => {
                        if(item.value === data.role) data.role = item.key;
                    });
                    const response = await reqUserUpdate(data);
                    if(response.status === 0){
                        message.success("更新成功,即将返回用户列表");
                        this.timerID = setTimeout(()=>{
                            this.props.history.push('/user')
                        }, 1500);
                    }
                }
            });
        };
        render() {
            const formItemLayout = {
                labelCol: {span: 8},
                wrapperCol: {span: 10}
            };
            const form = this.props.form;
            return (
                <div>
                    <TopNav nav={['人事管理','用户列表','编辑用户']}/>
                    <Card title={<span style={{ color: "#1DA57A", fontWeight: "bolder", fontSize: "20px"}}>编辑用户信息</span>}
                          extra={<Button type="primary" onClick={()=>{this.props.history.push('/user')}}>返回</Button>}
                          style={{width: "100%", border: "none"}}
                    >
                        <Form {...formItemLayout} style={{marginTop: "40px"}} onSubmit={this.handleSubmit}>
                            <Form.Item label="ID：" style={{display: "none"}}>
                                {form.getFieldDecorator('id', {
                                    rules: [{required: true}],
                                    initialValue: this.state.data.id
                                })(<Input />)}
                            </Form.Item>
                            <Form.Item label="用户名：">
                                {form.getFieldDecorator('username', {
                                    rules: [{required: true}],
                                    initialValue: this.state.data.username
                                })(<Input />)}
                            </Form.Item>
                            <Form.Item label="密码：">
                                {form.getFieldDecorator('password', {
                                    rules: [{required: true}],
                                    initialValue: this.state.data.password
                                })(<Input />)}
                            </Form.Item>
                            <Form.Item label="角色：">
                                {form.getFieldDecorator('role', {
                                    rules: [{required: true}],
                                    initialValue: this.state.data.rolename,
                                })(
                                    <Select>
                                        {
                                            this.state.options.map((item) => {
                                                return <Select.Option key={item.key}>{item.value}</Select.Option>
                                            })
                                        }
                                    </Select>
                                )}
                            </Form.Item>
                            <Form.Item label="Tel：">
                                {form.getFieldDecorator('tel', {
                                    rules: [{required: true}],
                                    initialValue: this.state.data.tel
                                })(<Input addonBefore="+86" />)}
                            </Form.Item>
                            <Form.Item label="邮箱：">
                                {form.getFieldDecorator('email', {
                                    rules: [{required: true}],
                                    initialValue: this.state.data.email
                                })(<Input placeholder="请输入用户邮箱" />)}
                            </Form.Item>
                            <Form.Item label="备注：">
                                {form.getFieldDecorator('note', {
                                    initialValue: this.state.data.note
                                })(<Input.TextArea rows={4}/>)}
                            </Form.Item>
                            <Form.Item>
                                <Button style={{margin: "50px 0 0 460px"}} type="primary" htmlType="submit">完成，提交</Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </div>
            )
        }
    },
);

export default EditUser;








