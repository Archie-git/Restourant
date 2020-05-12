import React from 'react';
import {Form, Input, InputNumber, Card, Button, message} from 'antd';
import TopNav from "../../components/top-nav";
import {reqInventoryAdd, reqStockList} from "../../api";
import memoryUtils from "../../util/memoryUtils";

const AddInventory = Form.create({ name: 'inventory-add-form' })(
    class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                expect: 0
            }
        }
        UNSAFE_componentWillMount = async () => {
            const response = await reqStockList();
            if(response.status === 0){
                let expect = 0;
                response.data.forEach(item => {
                    expect = expect + item.amount * item.price;
                });
                this.setState({expect: expect.toFixed(2)})
            }
        };
        handleSubmit = (e) => {
            e.preventDefault();
            this.props.form.validateFields( async (err, values) => {
                if(!err) {
                    let data = values;
                    data.createtime = new Date(data.createtime).getTime();
                    data.state = 0;
                    data.creater = memoryUtils.user.id;
                    data.amount = data.amount.toFixed(2);
                    const response = await reqInventoryAdd(data);
                    if(response.status === 0){
                        message.success("新增盘点记录成功,即将返回盘点列表页面");
                        this.timerID = setTimeout(()=>{
                            this.props.history.push('/stock/inventory')
                        }, 1500);
                    }
                }
            });
        };
        getTime = () => {
            let time = new Date();
            let month = time.getMonth()+1;
            month = month>=10 ? month : "0"+month;
            let date = time.getDate()>=10 ? time.getDate() : "0"+time.getDate();
            let hour = time.getHours()>=10 ? time.getHours() : "0"+time.getHours();
            let minute = time.getMinutes()>=10 ? time.getMinutes() : "0"+time.getMinutes();
            let second = time.getSeconds()>=10 ? time.getSeconds() : "0"+time.getSeconds();
            return time.getFullYear()+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
        };
        render() {
            const formItemLayout = {
                labelCol: {span: 8},
                wrapperCol: {span: 10}
            };
            const form = this.props.form;
            return (
                <div>
                    <TopNav nav={['库存管理', '库存盘点', '新建盘点单']}/>
                    <Card title={<span style={{ color: "#1DA57A", fontWeight: "bolder", fontSize: "20px"}}>新建盘点单</span>}
                          extra={<Button type="primary" onClick={()=>{this.props.history.push('/stock/inventory')}}>返回</Button>}
                          style={{width: "100%", border: "none"}}
                    >
                        <Form {...formItemLayout} style={{marginTop: "40px"}} onSubmit={this.handleSubmit}>
                            <Form.Item label="盘点日期">
                                {form.getFieldDecorator('createtime', {
                                    rules: [{required: true}],
                                    initialValue: this.getTime(),
                                })(<Input disabled/>)}
                            </Form.Item>
                            <Form.Item label="盘点人">
                                {form.getFieldDecorator('creater', {
                                    rules: [{required: true}],
                                    initialValue: memoryUtils.user.username
                                })(<Input disabled/>)}
                            </Form.Item>
                            <Form.Item label="预期金额">
                                {form.getFieldDecorator('expect', {
                                    rules: [{required: true}],
                                    initialValue: this.state.expect
                                })(<Input addonBefore="￥" disabled/>)}
                            </Form.Item>
                            <Form.Item label="盘点金额">
                                {form.getFieldDecorator('amount', {
                                    rules: [{required: true}]
                                })(<InputNumber style={{width: "100%"}} placeholder="请输入盘点金额"/>)}
                            </Form.Item>
                            <Form.Item label="详情">
                                {form.getFieldDecorator('detail', {
                                    rules: [{required: true}]
                                })(<Input.TextArea rows={4}/>)}
                            </Form.Item>
                            <Form.Item label="备注">
                                {form.getFieldDecorator('note', {
                                    initialValue: ""
                                })(<Input.TextArea rows={2}/>)}
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