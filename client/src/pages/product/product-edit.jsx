import React from 'react';
import './product.less';
import {Form, Input, Button, Switch, Cascader} from 'antd';
import {reqCategoryList} from "../../api";
import TopNav from "../../components/top-nav";

class EditProduct extends React.Component{
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
                options.push({label: item.name, value: item.id})
            });
            this.setState({category_options: options})
        }
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
            callback("请输入名称")
        }else if(value.length>5){
            callback("请输入不超过5位数")
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
    validateIntergal = (rule, value, callback) => {
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
    render(){
        const {form} = this.props;
        return (
            <div className="product-edit-container">
                <TopNav nav={['商品管理', '添加商品']}/>
                <Form layout="inline" style={{margin: "50px auto"}}>
                    <span>1. 编辑基本信息</span>
                    <Form.Item label="商品货号">
                        { form.getFieldDecorator('number', {
                            rules: [{validate: this.validateNumber}]
                        })(<Input placeholder="请输入商品货号"/>)}
                    </Form.Item>
                    <Form.Item label="商品名称">
                        { form.getFieldDecorator('name', {
                            rules: [{validate: this.validateName}]
                        })(<Input placeholder="请输入商品名称"/>)}
                    </Form.Item>
                    <Form.Item label="所属分类" className="product-category">
                        { form.getFieldDecorator('category')(
                            <Cascader options={this.state.category_options} placeholder="请选择所属分类"/>)}
                    </Form.Item>
                    <Form.Item label="售价">
                        { form.getFieldDecorator('price', {
                            rules: [{validate: this.validatePrice}]
                        })(<Input placeholder="请输入商品售价"/>)}
                    </Form.Item>
                    <Form.Item label="计量单位">
                        { form.getFieldDecorator('unit', {
                            rules: [{validate: this.validateUnit}]
                        })(<Input placeholder="请输入商品计量单位"/>)}
                    </Form.Item>
                    <Form.Item className="product-state" label="商品状态： 上架">
                        { form.getFieldDecorator('sale', {
                            valuePropName: "checked"
                        })(<Switch />)}
                    </Form.Item>
                    <Form.Item label="推荐" className="item-switch">
                        { form.getFieldDecorator('recommend', {
                            valuePropName: "checked"
                        })(<Switch />)}
                    </Form.Item>
                    <Form.Item label="新品" className="item-switch">
                        { form.getFieldDecorator('new', {
                            valuePropName: "checked"
                        })(<Switch />)}
                    </Form.Item>
                    <Form.Item label="商品备注">
                        { form.getFieldDecorator('note_product', {
                            rule: [{validate: this.validateNoteProduct}]
                        })(<Input.TextArea rows={4} style={{width: "300px"}} placeholder="请输入商品备注"/>)}
                    </Form.Item>
                    <span>2. 编辑销售信息</span>
                    <Form.Item label="赠送积分">
                        { form.getFieldDecorator('intergal', {
                            rule: [{validate: this.validateIntergal}]
                        })(<Input placeholder="请输入赠送积分"/>)}
                    </Form.Item>
                    <Form.Item label="详细页标题">
                        { form.getFieldDecorator('introduce_title', {
                            rule: [{validate: this.validateIntroduceTitle}]
                        })(<Input placeholder="请输入详细页标题"/>)}
                    </Form.Item>
                    <Form.Item label="详细页描述">
                        { form.getFieldDecorator('introduce_content', {
                            rule: [{validate: this.validateIntroduceContent}]
                        })(<Input placeholder="请输入详细页描述"/>)}
                    </Form.Item>
                    <Form.Item className="product-discount-gold" label="会员折扣： 黄金会员">
                        { form.getFieldDecorator('gold_level')(<Input />)}
                    </Form.Item>
                    <Form.Item label="白金会员"  className="product-discount-others">
                        { form.getFieldDecorator('platinum_level')(<Input />)}
                    </Form.Item>
                    <Form.Item label="钻石会员" className="product-discount-others">
                        { form.getFieldDecorator('diamond_level')(<Input />)}
                    </Form.Item>
                    <Form.Item label="优惠信息备注">
                        { form.getFieldDecorator('note_sale')(<Input />)}
                    </Form.Item>
                    <Form.Item label="相册">
                        { form.getFieldDecorator('picture')(<Input />)}
                    </Form.Item>
                    <Form.Item>
                        <Button className="submit-button" type="primary" htmlType="submit">完成，提交商品</Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

export default Form.create({name:'product-add-form'})(EditProduct);
