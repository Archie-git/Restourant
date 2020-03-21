import React from 'react';
import {Form, Input, Card, Button, Checkbox, message} from 'antd';
import TopNav from "../../components/top-nav";
import { reqRoleUpdate } from '../../api/index';

const EditRole = Form.create({ name: 'role-add' })(
    class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                data: []
            }
        }
        UNSAFE_componentWillMount = () => {
            let data = this.props.location.state.data;
            let permission = [];
            data.permission.forEach(item => {
                permission = permission.concat(item.children)
            });
            data.permission = permission;
            this.setState({data: data.permission});
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
                if(!err) {
                    let arr = [];
                    this.state.data.forEach(item => {
                        item.display===1 ? arr.push(item.title) : arr.push();
                    });
                    let data=values;
                    data.permission = arr.join('-');
                    data.creater = this.props.location.state.data.creater;
                    const response = await reqRoleUpdate(data);
                    if(response.status === 0){
                        message.success("新增角色成功, 即将返回角色管理列表");
                        this.timerID = setTimeout(()=>{
                            this.props.history.push('/role')
                        }, 2000);
                    }
                }
            });
        };
        handleChange = (e, temp) => {
            let data = this.state.data;
            if(typeof(temp)==="object"){
                if(e.target.checked){
                    temp.forEach(item => {
                        data[item].display = 1
                    })
                }else{
                    temp.forEach(item => {
                        data[item].display = 0
                    })
                }
            }else{
                data[temp].display = 1 - data[temp].display
            }
            this.setState({data: data})
        };
        getTime = () => {
            let temp = new Date();
            let month = temp.getMonth()+1;
            return temp.getFullYear()+"-"+month+"-"+temp.getDate()+" "+temp.getHours()+":"+temp.getMinutes()
        };
        getFatherChecked = (arr) => {
            let checked = true;
            arr.forEach(item => {
                if(this.state.data[item].display === 0) checked = false
            });
            return checked
        };
        render() {
            const formItemLayout = {
                labelCol: {span: 8},
                wrapperCol: {span: 10}
            };
            const form = this.props.form;
            let data = this.props.location.state.data;
            return (
                <div>
                    <TopNav nav={['人事管理', '角色管理', '编辑角色']}/>
                    <Card title={<span style={{ color: "#1DA57A", fontWeight: "bolder", fontSize: "20px"}}>新增角色信息</span>}
                          extra={<Button type="primary" onClick={()=>{this.props.history.push('/role')}}>返回</Button>}
                          style={{width: "100%", border: "none"}}
                    >
                        <Form {...formItemLayout} style={{marginTop: "40px"}} onSubmit={this.handleSubmit}>
                            <Form.Item label="ID：" style={{display: "none"}}>
                                {form.getFieldDecorator('id', {
                                    initialValue: data.id
                                })(<Input/>)}
                            </Form.Item>
                            <Form.Item label="创建时间：">
                                {form.getFieldDecorator('createtime', {
                                    rules: [{required: true}],
                                    initialValue: data.createtime
                                })(<Input disabled/>)}
                            </Form.Item>
                            <Form.Item label="创建人：">
                                {form.getFieldDecorator('creater', {
                                    rules: [{required: true}],
                                    initialValue: data.creatername
                                })(<Input disabled/>)}
                            </Form.Item>
                            <Form.Item label="角色名：">
                                {form.getFieldDecorator('name', {
                                    rules: [{required: true, validator: this.validateName }],
                                    initialValue: data.name
                                })(<Input />)}
                            </Form.Item>
                            <Form.Item label="权限：">
                                {form.getFieldDecorator('permission', {
                                    initialValue: "perimission",
                                    rules: [{required: true}]
                                })(<Input style={{display: "none"}} />)}
                            </Form.Item>
                            <div style={{margin: "-53px 0 40px 340px"}}>
                                {/*订单管理*/}
                                <Checkbox
                                    onChange={(e)=>this.handleChange(e, [0, 1])}
                                    defaultChecked={this.getFatherChecked([0, 1])}
                                >订单管理</Checkbox>
                                <div style={{marginLeft: "30px"}}>
                                    <Checkbox
                                        onChange={(e)=>this.handleChange(e, 0)}
                                        checked={this.state.data[0].display===1}
                                    >全部订单</Checkbox><br/>
                                    <Checkbox
                                        onChange={(e)=>this.handleChange(e, 1)}
                                        checked={this.state.data[1].display===1}
                                        style={{marginBottom: "10px"}}
                                    >前台订单</Checkbox><br/>
                                </div>
                                {/*商品管理*/}
                                <Checkbox
                                    onChange={(e)=>this.handleChange(e, [2, 3, 4])}
                                    defaultChecked={this.getFatherChecked([2, 3, 4])}
                                >商品管理</Checkbox>
                                <div style={{marginLeft: "30px"}}>
                                    <Checkbox
                                        onChange={(e)=>this.handleChange(e, 2)}
                                        checked={this.state.data[2].display===1}
                                    >商品分类</Checkbox><br/>
                                    <Checkbox
                                        onChange={(e)=>this.handleChange(e, 3)}
                                        checked={this.state.data[3].display===1}
                                    >商品列表</Checkbox><br/>
                                    <Checkbox
                                        onChange={(e)=>this.handleChange(e, 4)}
                                        checked={this.state.data[4].display===1}
                                        style={{marginBottom: "10px"}}
                                    >添加商品</Checkbox><br/>
                                </div>
                                {/*库存管理*/}
                                <Checkbox
                                    onChange={(e)=>this.handleChange(e, [5, 6])}
                                    defaultChecked={this.getFatherChecked([5, 6])}
                                >库存管理</Checkbox>
                                <div style={{marginLeft: "30px"}}>
                                    <Checkbox
                                        onChange={(e)=>this.handleChange(e, 5)}
                                        checked={this.state.data[5].display===1}
                                    >库存信息</Checkbox><br/>
                                    <Checkbox
                                        onChange={(e)=>this.handleChange(e, 6)}
                                        checked={this.state.data[6].display===1}
                                    >库存盘点</Checkbox><br/>
                                </div>
                                {/*会员管理*/}
                                <Checkbox
                                    onChange={(e)=>this.handleChange(e, [7, 8])}
                                    defaultChecked={this.getFatherChecked([7, 8])}
                                >会员管理</Checkbox>
                                <div style={{marginLeft: "30px"}}>
                                    <Checkbox
                                        onChange={(e)=>this.handleChange(e, 7)}
                                        checked={this.state.data[7].display===1}
                                    >会员列表</Checkbox><br/>
                                    <Checkbox
                                        onChange={(e)=>this.handleChange(e, 8)}
                                        checked={this.state.data[8].display===1}
                                    >新增会员</Checkbox><br/>
                                </div>
                                {/*人事管理*/}
                                <Checkbox
                                    onChange={(e)=>this.handleChange(e, [9, 10, 11])}
                                    defaultChecked={this.getFatherChecked([9, 10, 11])}
                                >人事管理</Checkbox>
                                <div style={{marginLeft: "30px"}}>
                                    <Checkbox
                                        onChange={(e)=>this.handleChange(e, 9)}
                                        checked={this.state.data[9].display===1}
                                    >员工列表</Checkbox><br/>
                                    <Checkbox
                                        onChange={(e)=>this.handleChange(e, 10)}
                                        checked={this.state.data[10].display===1}
                                    >用户列表</Checkbox><br/>
                                    <Checkbox
                                        onChange={(e)=>this.handleChange(e, 11)}
                                        checked={this.state.data[11].display===1}
                                        style={{marginBottom: "10px"}}
                                    >角色管理</Checkbox><br/>
                                </div>
                                {/*财务管理*/}
                                <Checkbox
                                    onChange={(e)=>this.handleChange(e, [12])}
                                    defaultChecked={this.getFatherChecked([12])}
                                >财务管理</Checkbox>
                                <div style={{marginLeft: "30px"}}>
                                    <Checkbox
                                        onChange={(e)=>this.handleChange(e, 12)}
                                        checked={this.state.data[12].display===1}
                                        style={{marginBottom: "10px"}}
                                    >财务报表</Checkbox><br/>
                                </div>
                            </div>
                            <Form.Item label="备注：">
                                {form.getFieldDecorator('note', {
                                    initialValue: data.note
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

export default EditRole;