import React from 'react';
import {Form, Input, Card, Button, message, Switch, Select} from 'antd';
import TopNav from "../../components/top-nav";
import { addCategoryList } from "../../api";

const AddCategory = Form.create({ name: 'category-add' })(
    class extends React.Component {
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
                    data.level = Number(data.level);
                    data.isnav = data.isnav ? 1 : 0;
                    data.son = 0;
                    const response = await addCategoryList(data);
                    if(response.status === 0){
                        message.success("新增成功,即将返回品类列表", 2);
                        this.timerID = setTimeout(()=>{
                            this.props.history.push('/product/category')
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
                    <TopNav nav={['商品管理', '商品分类', '新增品类']}/>
                    <Card title={<span style={{ color: "#1DA57A", fontWeight: "bolder", fontSize: "20px"}}>新增商品品类</span>}
                          extra={<Button type="primary" onClick={()=>{this.props.history.push('/product/category')}}>返回</Button>}
                          style={{width: "100%", border: "none"}}
                    >
                        <Form {...formItemLayout} style={{marginTop: "40px"}} onSubmit={this.handleSubmit}>
                            <Form.Item label="名称：">
                                {form.getFieldDecorator('name', {
                                    rules: [{required: true, validator: this.validateName }],
                                })(<Input />)}
                            </Form.Item>
                            <Form.Item label="级别：">
                                {form.getFieldDecorator('level', {
                                    rules: [{required: true}]
                                })(
                                    <Select>
                                        <Select.Option key={0}>第一级</Select.Option>
                                        <Select.Option key={1}>第二级</Select.Option>
                                        <Select.Option key={2}>第三级</Select.Option>
                                        <Select.Option key={3}>第四级</Select.Option>
                                        <Select.Option key={4}>第五级</Select.Option>
                                        <Select.Option key={5}>第六级</Select.Option>
                                        <Select.Option key={6}>第七级</Select.Option>
                                        <Select.Option key={7}>第八级</Select.Option>
                                        <Select.Option key={9}>第九级</Select.Option>
                                        <Select.Option key={10}>第十级</Select.Option>
                                    </Select>
                                )}
                            </Form.Item>
                            <Form.Item label="是否显示">
                                {form.getFieldDecorator('isnav', {
                                    rules: [{required: true}],
                                    valuePropName: "checked",
                                    initialValue: false
                                })(<Switch />)}
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

export default AddCategory;








