import React from 'react';
import {Form, Input, Card, Button, message, Select, Switch} from 'antd';
import TopNav from "../../components/top-nav";
import { updateCategoryList } from "../../api";

const EditCategory = Form.create({ name: 'category-add' })(
    class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                data: []
            }
        }
        UNSAFE_componentWillMount = () => {
            this.setState({
                data: this.props.location.state.data
            })
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
                    let data = this.props.location.state.data;
                    for(let key in values){
                        if(values.hasOwnProperty(key)){
                            data[key] = values[key]
                        }
                    }
                    data.isnav = data.isnav ? 1 : 0;
                    data.level = Number(data.level);
                    delete data.index;
                    const response = await updateCategoryList(data);
                    if(response.status === 0){
                        message.success("更新成功,即将返回品类列表", 2);
                        this.timerID = setTimeout(()=>{
                            this.props.history.push('/category')
                        }, 2000);
                    }
                }
            });
        };
        getLevel = (level) => {
            let temp = "";
            switch(level){
                case 0 : temp="一级";break;
                case 1 : temp="二级";break;
                case 2 : temp="三级";break;
                case 3 : temp="四级";break;
                case 4 : temp="五级";break;
                case 5 : temp="六级";break;
                case 6 : temp="七级";break;
                case 7 : temp="八级";break;
                default: temp="八级"
            }
            return temp
        };
        render() {
            const formItemLayout = {
                labelCol: {span: 8},
                wrapperCol: {span: 10}
            };
            const form = this.props.form;
            return (
                <div>
                    <TopNav nav={['商品管理', '商品分类', '编辑品类']}/>
                    <Card title={<span style={{ color: "#1DA57A", fontWeight: "bolder", fontSize: "20px"}}>编辑商品品类</span>}
                          extra={<Button type="primary" onClick={()=>{this.props.history.push('/category')}}>返回</Button>}
                          style={{width: "100%", border: "none"}}
                    >
                        <Form {...formItemLayout} style={{marginTop: "40px"}} onSubmit={this.handleSubmit}>
                            <Form.Item label="名称：">
                                {form.getFieldDecorator('name', {
                                    rules: [{required: true, validator: this.validateName }],
                                    initialValue: this.state.data.name
                                })(<Input />)}
                            </Form.Item>
                            <Form.Item label="级别：">
                                {form.getFieldDecorator('level', {
                                    rules: [{required: true}],
                                    initialValue: this.state.data.level
                                })(
                                    <Select>
                                        <Select.Option key={0}>一级</Select.Option>
                                        <Select.Option key={1}>二级</Select.Option>
                                        <Select.Option key={2}>三级</Select.Option>
                                        <Select.Option key={3}>四级</Select.Option>
                                        <Select.Option key={4}>五级</Select.Option>
                                        <Select.Option key={5}>六级</Select.Option>
                                        <Select.Option key={6}>七级</Select.Option>
                                        <Select.Option key={7}>八级</Select.Option>
                                    </Select>
                                )}
                            </Form.Item>
                            <Form.Item label="是否显示">
                                {form.getFieldDecorator('isnav', {
                                    rules: [{required: true}],
                                    valuePropName: "checked",
                                    initialValue: this.state.data.isnav===1
                                })(<Switch />)}
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

export default EditCategory;
