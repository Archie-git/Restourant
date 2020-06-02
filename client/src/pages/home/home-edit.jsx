import React from 'react';
import {Form, Input, Card, Button, message, InputNumber, Upload, Modal, Icon} from 'antd';
import { TimePicker } from 'antd';
import moment from 'moment';
import TopNav from "../../components/top-nav";
import {reqImgDelete, reqShopInfo, updateShopInfo} from "../../api";

const EditHome = Form.create({ name: 'category-add' })(
    class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                data: [],
                fileList: [],
                previewVisible: false,
                previewImage: '',
            }
        }
        UNSAFE_componentWillMount = async () => {
            const response = await reqShopInfo();
            if(response.status === 0){
                let data = response.data;
                data.opentime = data.businesshour.split(' ~ ')[0];
                data.closetime = data.businesshour.split(' ~ ')[1];
                let fileList = [{
                    uid: 0,
                    name: data.profile,
                    status: 'done',
                    url: '/upload/'+data.profile
                }];
                this.setState({
                    data: data,
                    fileList: fileList
                });
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
        handleBack = () => {
            this.props.history.push({pathname: '/home/view', state: {data: this.state.data}})
        };
        handleSubmit = (e) => {
            e.preventDefault();
            this.props.form.validateFields( async (err, values) => {
                if(!err){
                    let data = values;
                    data.profile = this.state.fileList[0].url.split('/upload/')[1];
                    data.businesshour = moment(data.opentime, 'HH:mm')._i + ' ~ ' + moment(data.closetime, 'HH:mm')._i;
                    delete data.opentime;
                    delete data.closetime;
                    const response = await updateShopInfo(data);
                    if(response.status === 0){
                        message.success("设置成功，即将返回门店信息页面");
                        this.timerID = setTimeout(()=>{
                            this.props.history.push({pathname: '/home/view', state: {data: data}})
                        }, 2000);
                    }
                }
            });
        };
        getBase64 = (file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = error => reject(error);
            });
        };
        handleCancel = () => this.setState({ previewVisible: false });
        handlePreview = async file => {
            if (!file.url && !file.preview) {
                file.preview = await this.getBase64(file.originFileObj);
            }
            this.setState({
                previewImage: file.url || file.preview,
                previewVisible: true,
            });
        };
        handleChange = async ({ file, fileList }) => {
            if(file.status === 'done'){
                let response = file.response;
                file = fileList[fileList.length-1];
                file.name = response.data.name;
                file.url = response.data.url;
            } else if(file.status === 'removed'){
                await reqImgDelete(file.name);
            }
            this.setState({ fileList })
        };
        render() {
            const formItemLayout = {
                labelCol: {span: 8},
                wrapperCol: {span: 10}
            };
            const form = this.props.form;
            const uploadButton = (
                <div>
                    <Icon type="plus" />
                    <div className="ant-upload-text">Upload</div>
                </div>
            );
            return (
                <div>
                    <TopNav nav={['首页', '门店详情', '编辑']} />
                    <Card title={<span style={{ color: "#1DA57A", fontWeight: "bolder", fontSize: "20px"}}>编辑门店信息</span>}
                          extra={<Button type="primary" onClick={this.handleBack}>返回</Button>}
                          style={{width: "100%", border: "none"}}
                    >
                        <Form {...formItemLayout} style={{marginTop: "40px"}} onSubmit={this.handleSubmit}>
                            <Form.Item label="ID：" style={{display: "none"}}>
                                {form.getFieldDecorator('id', {
                                    initialValue: this.state.data.id
                                })(<Input/>)}
                            </Form.Item>
                            <Form.Item label="品牌名称：">
                                {form.getFieldDecorator('name', {
                                    rules: [{required: true, validator: this.validateName }],
                                    initialValue: this.state.data.name
                                })(<Input />)}
                            </Form.Item>
                            <Form.Item label="头像：">
                                {form.getFieldDecorator('profile', {
                                    rules: [{required: true}],
                                    initialValue: this.state.data.profile
                                })(
                                    <div className="clearfix">
                                        <Upload
                                            action="/file/upload"
                                            accept="image/*"
                                            name="image"
                                            listType="picture-card"
                                            fileList={this.state.fileList}
                                            onPreview={this.handlePreview}
                                            onChange={this.handleChange}
                                        >
                                            {this.state.fileList.length >= 1 ? null : uploadButton}
                                        </Upload>
                                        <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
                                            <img alt="example" style={{ width: '100%' }} src={this.state.previewImage} />
                                        </Modal>
                                    </div>
                                )}
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
