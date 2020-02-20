import React from 'react';
import {reqCategoryList, reqProductList} from "../../api";
import { Form, Select, InputNumber, Button, Checkbox, Row, Col, Card, Input,  } from 'antd';
import TopNav from '../../components/top-nav';
// import PictureWall from '../../../components/picture-wall/picture-wall';

const { Option } = Select;

class AddProduct extends React.Component {
    constructor(props){
        super(props);
        this.state=({
            category_options: [],
        })
    }
    UNSAFE_componentWillMount = async () => {
        const response1 = await reqProductList();
        
        
        
        
        
        const response = await reqCategoryList();
        if(response.status === 0){
            let options = [];
            response.data.forEach((item) => {
                options.push({key: item.name, value: item.id})
            });
            this.setState({category_options: options})
        }
    };
    render() {
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 10 },
        };
        const {form} = this.props;
        return (
            <div>
                <TopNav nav={['商品管理', '添加商品']}/>
                <Card title="新增商品信息"
                      extra={<Button type="primary" href="#">返回</Button>}
                      style={{ border: "none", width: "100%"}}
                >
                    <Form {...formItemLayout} style={{marginTop: "40px"}} onSubmit={this.handleSubmit}>
                        <Form.Item label="商品货号" hasFeedback>
                            { form.getFieldDecorator('number', {
                                rules: [{required: true, message: "请输入商品货号", validate: this.validateNumber}]
                            })(<Input placeholder="请输入商品货号"/>)}
                        </Form.Item>
                        <Form.Item label="商品名称" hasFeedback>
                            { form.getFieldDecorator('name', {
                                rules: [{required: true, message: "请输入商品名称", validate: this.validateName}]
                            })(<Input placeholder="请输入商品名称"/>)}
                        </Form.Item>
                        <Form.Item label="所属分类" hasFeedback>
                            { form.getFieldDecorator('category', {
                                rules: [{ required: true, message: '请选择所属分类' }],
                            })(
                                <Select onChange={this.handleChange}>
                                    { this.state.category_options.map((item) => {
                                        return <Option key={item.value}>{item.key}</Option>
                                    })}
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item label="售价">
                            { form.getFieldDecorator('price', {
                                rules: [{required: true, message: "请输入商品售价",validate: this.validatePrice}]
                            })(<Input addonAfter="元" placeholder="请输入商品售价"/>)}
                        </Form.Item>
                        <Form.Item label="计量单位" hasFeedback>
                            { form.getFieldDecorator('unit', {
                                rules: [{required: true, message: "请输入商品计量单位", validate: this.validateUnit}]
                            })(<Input placeholder="请输入商品计量单位"/>)}
                        </Form.Item>
                        <Form.Item label="商品状态">
                            {form.getFieldDecorator('state', {
                                initialValue: ['B'],
                            })(
                                <Checkbox.Group style={{ width: '100%', margin: "10px 0 0 20px"}}>
                                    <Row>
                                        <Col span={8}>
                                            <Checkbox value="A">上架</Checkbox>
                                        </Col>
                                        <Col span={8}>
                                            <Checkbox value="B">新品</Checkbox>
                                        </Col>
                                        <Col span={8}>
                                            <Checkbox value="C">推荐</Checkbox>
                                        </Col>
                                    </Row>
                                </Checkbox.Group>,
                            )}
                        </Form.Item>
                        <Form.Item label="商品备注" hasFeedback>
                            { form.getFieldDecorator('note_product', {
                                rule: [{validate: this.validateNoteProduct}]
                            })(<Input.TextArea rows={4} placeholder="请输入商品备注"/>)}
                        </Form.Item>
                        <Form.Item label="赠送积分" hasFeedback>
                            { form.getFieldDecorator('intergal', {
                                rules: [{required: true, message: "请输入积分值", validate: this.validateIntergal}]
                            })(<Input placeholder="请输入积分值"/>)}
                        </Form.Item>
                        <Form.Item label="详细页标题">
                            { form.getFieldDecorator('introduce_title', {
                                rule: [{validate: this.validateIntroduceTitle}]
                            })(<Input.TextArea rows={2} placeholder="请输入详细页标题"/>)}
                        </Form.Item>
                        <Form.Item label="详细页描述">
                            { form.getFieldDecorator('introduce_content', {
                                rule: [{validate: this.validateIntroduceContent}]
                            })(<Input.TextArea rows={4} placeholder="请输入详细页描述"/>)}
                        </Form.Item>
                        <Form.Item label="黄金会员折扣：">
                            {form.getFieldDecorator('discount_gold', { initialValue: 10 })(
                                <InputNumber min={1} max={10} step={0.5} />)}
                            <span className="ant-form-text">折</span>
                        </Form.Item>
                        <Form.Item label="白金会员折扣">
                            {form.getFieldDecorator('discount_platinum', { initialValue: 10 })(
                                <InputNumber min={1} max={10} step={0.5} />)}
                            <span className="ant-form-text">折</span>
                        </Form.Item>
                        <Form.Item label="钻石会员折扣">
                            {form.getFieldDecorator('discount_diamond', { initialValue: 10 })(
                                <InputNumber min={1} max={10} step={0.5} />)}
                            <span className="ant-form-text">折</span>
                        </Form.Item>
                        <Form.Item label="优惠信息备注">
                            { form.getFieldDecorator('note_sale')(
                                <Input.TextArea rows={4} />
                            )}
                        </Form.Item>
                        
                        {/*<Form.Item label="上传图片">*/}
                        {/*    {form.getFieldDecorator('pictures', {*/}
                        {/*        valuePropName: 'fileList',*/}
                        {/*        getValueFromEvent: this.normFile,*/}
                        {/*    })(*/}
                        {/*        <Upload name="files" action="/upload.do">*/}
                        {/*            <p className="ant-upload-drag-icon">*/}
                        {/*                <Icon type="inbox" />*/}
                        {/*            </p>*/}
                        {/*            <p className="ant-upload-text">Click or drag file to this area to upload</p>*/}
                        {/*        </Upload>,*/}
                        {/*    )}*/}
                        {/*</Form.Item>*/}
                        {/*<PictureWall />*/}
                        <Form.Item>
                            <Button style={{margin: "50px 0 0 450px"}} type="primary" htmlType="submit">完成，提交商品</Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        
        
        
        );
    }
}

export default Form.create({ name: 'add-product-form' })(AddProduct);
