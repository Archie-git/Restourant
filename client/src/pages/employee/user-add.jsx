import React from 'react';
import {Form, Input, Card, Button, message, Select} from 'antd';
import TopNav from "../../components/top-nav";
import {reqRoleList, reqUserAdd} from "../../api";

const AddUser = Form.create({ name: 'user-add' })(
    class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                options: []
            }
        }
        UNSAFE_componentWillMount = async () => {
            const response = await reqRoleList();
            if(response.status === 0){
                let options = [];
                response.data.forEach(item => {
                    options.push({key: item.id, value: item.name})
                });
                this.setState({options: options});
            }
        };
        
        validateName = (rule, value, callback) =>{
            if(!value){
                callback("请输入品类名称")
            }else if(value.length>10){
                callback("请输入少于10个字符")
            }else{
                callback()
            }
        };
        handleSubmit = (e) => {
            e.preventDefault();
            this.props.form.validateFields( async (err, values) => {
                if(!err) {
                    let data=values;
                    data.createtime = new Date().getTime();
                    data.deleted = 0;
                    console.log(values);
                    const response = await reqUserAdd(data);
                    if(response.status === 0){
                        message.success("新增用户成功,即将返回用户列表页面");
                        this.timerID = setTimeout(()=>{
                            this.props.history.push('/employee/user')
                        }, 2000);
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
                    <TopNav nav={['人事管理','用户列表','创建用户']}/>
                    <Card title={<span style={{ color: "#1DA57A", fontWeight: "bolder", fontSize: "20px"}}>新增用户信息</span>}
                          extra={<Button type="primary" onClick={()=>{this.props.history.push('/employee/user')}}>返回</Button>}
                          style={{width: "100%", border: "none"}}
                    >
                        <Form {...formItemLayout} style={{marginTop: "40px"}} onSubmit={this.handleSubmit}>
                            <Form.Item label="用户名：">
                                {form.getFieldDecorator('username', {
                                    rules: [{required: true}],
                                })(<Input placeholder="请输入用户名"/>)}
                            </Form.Item>
                            <Form.Item label="密码：">
                                {form.getFieldDecorator('password', {
                                    rules: [{required: true}],
                                })(<Input placeholder="请输入用户密码"/>)}
                            </Form.Item>
                            <Form.Item label="角色：">
                                {form.getFieldDecorator('role', {
                                    rules: [{required: true}]
                                })(
                                    <Select placeholder="请选择角色">
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
                                })(<Input placeholder="请输入电话号码" addonBefore="+86" />)}
                            </Form.Item>
                            <Form.Item label="邮箱：">
                                {form.getFieldDecorator('email', {
                                    rules: [{required: true}],
                                })(<Input placeholder="请输入用户邮箱" />)}
                            </Form.Item>
                            <Form.Item label="备注：">
                                {form.getFieldDecorator('note', {
                                    initialValue: ""
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

export default AddUser;








