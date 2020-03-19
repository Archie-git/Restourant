import React from 'react';
import {Form, Input, Card, Button, message} from 'antd';
import TopNav from "../../components/top-nav";
import { addCategoryList } from "../../api";
import memoryUtils from "../../util/memoryUtils";

const AddInventory = Form.create({ name: 'inventory-add-form' })(
    class extends React.Component {
        handleSubmit = (e) => {
            e.preventDefault();
            this.props.form.validateFields( async (err, values) => {
                if(!err) {
                    let data=values;
                    data.level = Number(data.level);
                    data.isnav = data.isnav ? 1 : 0;
                    const response = await addCategoryList(data);
                    if(response.status === 0){
                        message.success("新增成功,即将返回品类列表", 2);
                        this.timerID = setTimeout(()=>{
                            this.props.history.push('/category')
                        }, 2000);
                    }
                }
            });
        };
        getTime = () => {
            let temp = new Date();
            let month = temp.getMonth()+1;
            return temp.getFullYear()+"-"+month+"-"+temp.getDate()+" "+temp.getHours()+":"+temp.getMinutes()
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
                    <Card title={<span style={{ color: "#1DA57A", fontWeight: "bolder", fontSize: "20px"}}>新建盘点单</span>}
                          extra={<Button type="primary" onClick={()=>{this.props.history.push('/inventory')}}>返回</Button>}
                          style={{width: "100%", border: "none"}}
                    >
                        <Form {...formItemLayout} style={{marginTop: "40px"}} onSubmit={this.handleSubmit}>
                            <Form.Item label="盘点日期">
                                {form.getFieldDecorator('name', {
                                    rules: [{required: true}],
                                    initialValue: this.getTime(),
                                })(<Input disabled/>)}
                            </Form.Item>
                            <Form.Item label="盘点人">
                                {form.getFieldDecorator('level', {
                                    rules: [{required: true}],
                                    initialValue: memoryUtils.user.username
                                })(<Input disabled/>)}
                            </Form.Item>
                            <Form.Item label="备注">
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

export default AddInventory;