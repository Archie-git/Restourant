import React from 'react';
import {Button,message} from 'antd';

class App extends React.Component{
    handleClick=()=>{
        message.info("kkkkkkkkk")
    };
    render(){
        return <div>
            <p>餐饮服务管理系统</p>
            <Button type="primary" onClick={this.handleClick}>Click me</Button>
        </div>
    }
}

export default App;
