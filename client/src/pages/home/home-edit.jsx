import React from 'react';
import {Form, Input, Card, Button, message, InputNumber} from 'antd';
import { TimePicker } from 'antd';
import moment from 'moment';
import TopNav from "../../components/top-nav";
import Avatar from '../../components/avatar';
import {reqShopInfo, updateShopInfo} from "../../api";

const EditHome = Form.create({ name: 'category-add' })(
    class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                data: []
            }
        }
        componentWillMount = async () => {
            const response = await reqShopInfo();
            if(response.status === 0){
                let data = response.data;
                data.opentime = data.businesshour.split(' ~ ')[0];
                data.closetime = data.businesshour.split(' ~ ')[1];
                this.setState({
                    data: data
                });
                console.log(data);
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
                if(!err){
                    let data = values;
                    data.profile = data.profile.split('upload/')[1];
                    data.businesshour = moment(data.opentime, 'HH:mm')._i + ' ~ ' + moment(data.closetime, 'HH:mm')._i;
                    delete data.opentime;
                    delete data.closetime;
                    const response = await updateShopInfo(data);
                    if(response.status === 0){
                        message.success("更新成功,即将返回品类列表", 2);
                        this.timerID = setTimeout(()=>{
                            this.props.history.push('/home')
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
                    <TopNav nav={['首页', '编辑']} />
                    <Card title={<span style={{ color: "#1DA57A", fontWeight: "bolder", fontSize: "20px"}}>编辑门店信息</span>}
                          extra={<Button type="primary" onClick={()=>{this.props.history.push('/home')}}>返回</Button>}
                          style={{width: "100%", border: "none"}}
                    >
                        <Form {...formItemLayout} style={{marginTop: "40px"}} onSubmit={this.handleSubmit}>
                            <Form.Item label="品牌名称：">
                                {form.getFieldDecorator('name', {
                                    rules: [{required: true, validator: this.validateName }],
                                    initialValue: this.state.data.name
                                })(<Input />)}
                            </Form.Item>
                            <Form.Item label="头像：">
                                {form.getFieldDecorator('profile', {
                                    rules: [{required: true}],
                                    // initialValue: this.state.data.profile
                                })(<Avatar img={this.state.data.profile} />)}
                            </Form.Item>
                            <Form.Item label="地址：">
                                {form.getFieldDecorator('address', {
                                    rules: [{required: true}],
                                    initialValue: this.state.data.address
                                })(<Input />)}
                            </Form.Item>
                            <Form.Item label="桌数：">
                                {form.getFieldDecorator('seats', {
                                    initialValue: this.state.data.seats
                                })(<InputNumber />)}
                            </Form.Item>
                            <Form.Item label="电话：">
                                {form.getFieldDecorator('tel', {
                                    rules: [{required: true}],
                                    initialValue: this.state.data.tel
                                })(<Input />)}
                            </Form.Item>
                            <Form.Item label="公告：">
                                {form.getFieldDecorator('notice', {
                                    rules: [{required: true}],
                                    initialValue: this.state.data.notice
                                })(<Input />)}
                            </Form.Item>
                            <Form.Item label="营业时间：">
                                {form.getFieldDecorator('opentime', {
                                    rules: [{required: true}],
                                    initialValue: moment(this.state.data.opentime, 'HH:mm')
                                })(<TimePicker format={'HH:mm'} />)}
                            </Form.Item>
                            <Form.Item label="打烊时间：">
                                {form.getFieldDecorator('closetime', {
                                    rules: [{required: true}],
                                    initialValue: moment(this.state.data.closetime, 'HH:mm')
                                })(<TimePicker format={'HH:mm'} />)}
                            </Form.Item>
                            <Form.Item label="品牌故事：">
                                {form.getFieldDecorator('story', {
                                    initialValue: this.state.data.story
                                })(<Input.TextArea rows={10}/>)}
                            </Form.Item>
                            <Form.Item label="会员条款：">
                                {form.getFieldDecorator('treaty', {
                                    initialValue: this.state.data.treaty
                                })(<Input.TextArea rows={5}/>)}
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

export default EditHome;
