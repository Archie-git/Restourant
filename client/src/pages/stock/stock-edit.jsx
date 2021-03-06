import React from 'react';
import {Form, Card, Input, Button, Select, InputNumber, Modal, message} from 'antd';
import TopNav from '../../components/top-nav/index';
import PictureWall from "../../components/picture-wall/picture-wall";
import {reqStockCategory, addStocklogList, updateStockList} from "../../api";
import memoryUtils from "../../util/memoryUtils";

const EditStock = Form.create({name: 'edit-stock-form'})(
    class extends React.Component{
        constructor(props){
            super(props);
            this.state = {
                category: [],
                categoryAdd: "",
                visible: false
            }
        }
        UNSAFE_componentWillMount = async () => {
            const response = await reqStockCategory();
            if(response.status === 0){
                let category = [];
                response.data.forEach(item => {
                    category.push(item.category)
                });
                this.setState({category: category})
            }
        };
        handleSubmit = (e) => {
            e.preventDefault();
            this.props.form.validateFields( async (err, values) => {
                if(!err){
                    let data1 = {};
                    let data2 = JSON.parse(JSON.stringify(this.props.location.state.data));
                    data1.id = data2.id;
                    for(let key in values){
                        if(values.hasOwnProperty(key)){
                            data1[key] = values[key]
                        }
                    }
                    data2.pictures = data2.pictures.join(',');
                    let tag = 0;
                    for(let key in data1){
                        if(data1[key] !== data2[key]) tag = 1
                    }
                    console.log(tag);
                    let response1 = await updateStockList(data1);
                    //当库存信息未发生改变时，不更新日志
                    if(response1.status === 0 && tag === 1){
                        let log = {...data1};
                        log.stockid = log.id;
                        log.stockname = log.name;
                        log.time = new Date().getTime();
                        log.operation = "修改";
                        log.manager = memoryUtils.user.username;
                        delete log.id;
                        delete log.name;
                        let response2 = await addStocklogList(log);
                        if(response2.status === 0){
                            message.success("更新库存信息成功,即将返回库存列表页面");
                            this.timerID = setTimeout(()=>{
                                this.props.history.push('/stock')
                            }, 2000);
                        }
                    }else{
                        message.success("更新库存信息成功,即将返回库存列表页面");
                        this.timerID = setTimeout(()=>{
                            this.props.history.push('/stock')
                        }, 2000);
                    }
                    
                }
            })
        };
        handleAddClick = () => {
            this.setState({visible: true})
        };
        handleNameChange = (e) => {
            this.setState({categoryAdd: e.target.value})
        };
        onOk = () => {
            let category = this.state.category;
            category.push(this.state.categoryAdd);
            this.setState({
                category: category,
                visible: false
            })
        };
        onCancel = () => {
            this.setState({visible: false})
        };
        render(){
            const formItemLayout = {
                labelCol: {span: 8},
                wrapperCol: {span: 10}
            };
            let initialData = this.props.location.state.data;
            return (
                <div>
                    <TopNav nav={['库存管理', '库存信息', '编辑库存']}/>
                    <Card title={<span style={{ color: "#1DA57A", fontWeight: "bolder", fontSize: "20px"}}>编辑库存记录</span>}
                          extra={<Button type="primary" onClick={()=>{this.props.history.push('/stock')}}>返回</Button>}
                          style={{width: "100%", border: "none"}}
                    >
                        <Form {...formItemLayout} style={{marginTop: "40px"}} onSubmit={this.handleSubmit}>
                            <Form.Item label="货物名称">
                                {
                                    this.props.form.getFieldDecorator('name', {
                                        initialValue: initialData.name,
                                        rules: [{required: true}]
                                    })(<Input placeholder="请输入货物名称"/>)
                                }
                            </Form.Item>
                            <Form.Item label="货物种类">
                                {
                                    this.props.form.getFieldDecorator('category', {
                                        initialValue: initialData.category,
                                        rules: [{required: true}]
                                    })(
                                        <Select style={{width: "75%"}} placeholder="请选择货物品类">
                                            {this.state.category.map(item => (
                                                <Select.Option key={item}>{item}</Select.Option>
                                            ))}
                                        </Select>
                                    )
                                }
                                {
                                    <div style={{display: "inline-block", float: "right"}}>
                                        <Button type="primary"
                                                onClick={this.handleAddClick}>新增品类</Button>
                                        <Modal
                                            title="新增品类"
                                            visible={this.state.visible}
                                            okText="确认"
                                            onOk={this.onOk}
                                            cancelText="取消"
                                            onCancel={this.onCancel}
                                        >
                                            <Input placeholder="请输入品类名称" onChange={this.handleNameChange}/>
                                        </Modal>
                                    </div>
                                }
                            </Form.Item>
                            <Form.Item label="库存单价">
                                {
                                    this.props.form.getFieldDecorator('price', {
                                        initialValue: initialData.price,
                                        rules: [{required: true}]
                                    })(<InputNumber />)
                                }
                                <span style={{marginLeft: "10px"}}>元</span>
                            </Form.Item>
                            <Form.Item label="库存数量">
                                {
                                    this.props.form.getFieldDecorator('amount', {
                                        initialValue: initialData.amount,
                                        rules: [{required: true}]
                                    })(<Input placeholder="请输入库存数量" />)
                                }
                            </Form.Item>
                            <Form.Item label="单位">
                                {
                                    this.props.form.getFieldDecorator('unit', {
                                        initialValue: initialData.unit,
                                        rules: [{required: true}]
                                    })(<Input placeholder="请输入货物单位" />)
                                }
                            </Form.Item>
                            <Form.Item label="库存监控">
                                <Input.Group compact>
                                    <Form.Item>
                                        {
                                            this.props.form.getFieldDecorator('warning', {
                                                initialValue: initialData.warning,
                                                rules: [{required: true}]
                                            })(<InputNumber placeholder="下限"/> )
                                        }
                                    </Form.Item>
                                    <span style={{margin: "8px 20px 0 20px"}}>~</span>
                                    <Form.Item>
                                        {
                                            this.props.form.getFieldDecorator('excess', {
                                                initialValue: initialData.excess,
                                                rules: [{required: true}]
                                            })(<InputNumber placeholder="上限"/> )
                                        }
                                    </Form.Item>
                                </Input.Group>
                            </Form.Item>
                            <Form.Item label="图片">
                                {
                                    this.props.form.getFieldDecorator('pictures', {
                                        initialValue: initialData.pictures.join(',')
                                    })(<PictureWall imgs={initialData.pictures.join(",")} />)
                                }
                            </Form.Item>
                            <Form.Item label="备注">
                                {
                                    this.props.form.getFieldDecorator('note', {
                                        initialValue: initialData.note
                                    })(<Input.TextArea rows={4} placeholder="请输入库存备注" /> )
                                }
                            </Form.Item>
                            <Form.Item>
                                <Button style={{margin: "50px 0 0 460px"}} type="primary" htmlType="submit">完成，提交</Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </div>
            )
        }
    }
);

export default EditStock;