import React from 'react';
import { Form, Select, InputNumber, Button, Checkbox, Row, Col, Card, Input, message } from 'antd';
import TopNav from '../../components/top-nav';
import PictureWall from '../../components/picture-wall/picture-wall';
import { addProductList, reqCategoryList } from '../../api';


class AddProduct extends React.Component {
    constructor(props){
        super(props);
        this.state=({
            category_options: [],
        })
    }
    UNSAFE_componentWillMount = async () => {
        const response = await reqCategoryList();
        if(response.status === 0){
            let options = [];
            response.data.forEach((item) => {
                options.push({key: item.name, value: item.id})
            });
            this.setState({category_options: options})
        }
    };
    componentWillUnmount = () => {
        clearTimeout(this.timerID)
    };
    validateNumber = (rule, value, callback) => {
        if(!value){
            callback("请输入商品货号")
        }else if(value.length<5 || value.length>10){
            callback("请输入少于5个，且不多于10个字符")
        }else if((/^[0-9a-zA-Z]*$/g).test(value)){
            callback("请输入字母、数字或其组合")
        }else{
            callback()
        }
    };
    validateName = (rule, value, callback) => {
        if(!value){
            callback("请输入名称")
        }else if(value.length<2 || value.length>10){
            callback("请输入不少于2个，且不超过10个字符")
        }else{
            callback()
        }
    };
    validatePrice = (rule, value, callback) => {
        if(!value){
            callback("请输入商品价格")
        }else if(value<0){
            callback("请按正确格式输入商品价格")
        }else{
            callback()
        }
    };
    validateUnit = (rule, value, callback) => {
        if(!value){
            callback("请输入商品单位")
        }else{
            callback()
        }
    };
    validateNoteProduct = (rule, value, callback) => {
        if(!value){
            callback("请输入产品备注")
        }else{
            callback()
        }
    };
    validateIntegral = (rule, value, callback) => {
        if(!value){
            callback("请输入商品积分值")
        }else{
            callback()
        }
    };
    validateIntroduceTitle = (rule, value, callback) => {
        if(!value){
            callback("请输入详情页标题")
        }else{
            callback()
        }
    };
    validateIntroduceContent =(rule, value, callback) => {
        if(!value){
            callback("请输入详情页内容")
        }else{
            callback()
        }
    };
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                values.category = Number(values.category);
                values.price = Number(values.price);
                values.integral = Number(values.integral);
                values.onsale = values.state.indexOf('onsale')===-1 ? 0 : 1;
                values.isnew = values.state.indexOf('isnew')===-1 ? 0 : 1;
                values.recommend = values.state.indexOf('recommend')===-1 ? 0 : 1;
                delete values.state;
                const response = await addProductList(values);
                if(response.status === 0){
                    message.success(response.msg+",即将返回商品列表", 2);
                    this.timerID = setTimeout(()=>{
                        this.props.history.replace('/product')
                    }, 3000);
                }
            }else{
                console.log(err)
            }
        });
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
                      extra={<Button type="primary" onClick={()=>{this.props.history.push('/product')}}>返回</Button>}
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
                                        return <Select.Option key={item.value}>{item.key}</Select.Option>
                                    })}
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item label="售价" hasFeedback>
                            { form.getFieldDecorator('price', {
                                rules: [{required: true, message: "请输入商品售价",validate: this.validatePrice}]
                            })(<Input addonAfter="元 &nbsp;&nbsp;&nbsp;" placeholder="请输入商品售价"/>)}
                        </Form.Item>
                        <Form.Item label="计量单位" hasFeedback>
                            { form.getFieldDecorator('unit', {
                                rules: [{required: true, message: "请输入商品计量单位", validate: this.validateUnit}]
                            })(<Input placeholder="请输入商品计量单位"/>)}
                        </Form.Item>
                        <Form.Item label="商品状态">
                            {form.getFieldDecorator('state', {
                                initialValue: ['isNew'],
                            })(
                                <Checkbox.Group style={{ width: '100%', margin: "10px 0 0 20px"}}>
                                    <Row>
                                        <Col span={8}>
                                            <Checkbox value="onsale">上架</Checkbox>
                                        </Col>
                                        <Col span={8}>
                                            <Checkbox value="isnew">新品</Checkbox>
                                        </Col>
                                        <Col span={8}>
                                            <Checkbox value="recommend">推荐</Checkbox>
                                        </Col>
                                    </Row>
                                </Checkbox.Group>,
                            )}
                        </Form.Item>
                        <Form.Item label="赠送积分" hasFeedback>
                            { form.getFieldDecorator('integral', {
                                rules: [{required: true, message: "请输入积分值", validate: this.validateIntegral}]
                            })(<Input placeholder="请输入积分值"/>)}
                        </Form.Item>
                        <Form.Item label="详细页标题">
                            { form.getFieldDecorator('introduce', {
                                rule: [{validate: this.validateIntroduceTitle}]
                            })(<Input.TextArea rows={2} placeholder="请输入详细页标题"/>)}
                        </Form.Item>
                        <Form.Item label="详细页描述">
                            { form.getFieldDecorator('description', {
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
                        <Form.Item label="上传图片">
                            {form.getFieldDecorator('pictures', {
                                rules: [{required: true, message: "请上传商品图片"}]
                            })(<PictureWall imgs={null} />)}
                        </Form.Item>
                        <Form.Item label="商品备注">
                            { form.getFieldDecorator('note')(
                                <Input.TextArea rows={4} />
                            )}
                        </Form.Item>
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

















