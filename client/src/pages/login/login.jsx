import React from 'react';
import {Form,Input,Icon,Button,message} from 'antd';
import {Redirect} from 'react-router-dom';
import './login.less';
import logo from '../../assets/images/logo.png';
import {reqLogin} from '../../api';
import memoryUtils from '../../util/memoryUtils';
import storageUtils from '../../util/storageUtils'
//登录的路由组件
class Login extends React.Component{
    handleSubmit=(e)=>{
        e.preventDefault();
        this.props.form.validateFields(async (err,values)=>{
            if(!err){
                const {username,password}=values;
                const ret=await reqLogin(username,password);
                if(ret.status===0){
                    message.success('登录成功');
                    memoryUtils.user=ret.data;
                    storageUtils.saveUser(ret.data);
                    this.props.history.replace('/')
                }else{
                    message.error(ret.msg)
                }
            }else{
                console.log("校验失败")
            }
        })
    };
    validatePwd=(rule,value,callback)=>{
        if(!value){
            callback("请输入密码")
        }else if(value.length<4){
            callback("密码长度不能小于4位")
        }else if(!/^[a-zA-Z0-9_]+$/.test(value)){
            callback("密码必须由字母、数字或字符串组成")
        }else if(value.length>12){
            callback("密码长度不能大于12位")
        }else{
            callback()
        }
    };
    validateUser=(rule,value,callback)=>{
        if(!value){
            callback("请输入用户名")
        }else if(value.length<4){
            callback("用户名长度不能小于4位")
        }else if(!/^[a-zA-Z0-9_]+$/.test(value)){
            callback("用户名必须由字母、数字或字符串组成")
        }else if(value.length>12){
            callback("用户名长度不能大于12位")
        }else{
            callback()
        }
    };
    render(){
        const user=memoryUtils.user;
        if(JSON.stringify(user)!=='{}'){
            return <Redirect to="/" />
        }
        const form=this.props.form;
        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="logo"/>
                    <h3>餐饮后台管理系统</h3>
                </header>
                <section className="login-content">
                    <h2>用户登录</h2>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {
                                form.getFieldDecorator('username',{
                                    rules:[
                                        {validator:this.validateUser}
                                    ]
                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="请输入用户名"
                                    />
                                )
                            }
                        </Form.Item>
                        
                        <Form.Item>
                            {
                                form.getFieldDecorator('password',{
                                    rules:[
                                        {validator:this.validatePwd}
                                    ]
                                })(
                                    <Input
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        placeholder="请输入密码"
                                    />
                                )
                            }
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
   
}

export default Form.create()(Login);

