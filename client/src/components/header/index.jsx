import React from 'react';
import {withRouter} from 'react-router-dom';
import {Button, Popconfirm} from 'antd';
import './index.less';
// import {reqWeather, reqCity} from '../../api/index';
import memoryUtil from '../../util/memoryUtils';
import storageUtil from '../../util/storageUtils';

class Header extends React.Component{
    constructor(props){
        super(props);
        this.state={
            username: "-",
            location: "-",
            weather_txt: "-",
            weather_code: "100",
            date: "-",
            loading:false
        }
    }
    UNSAFE_componentWillMount = async () => {
        // const response1=await reqCity();
        // response1.status===0 ? memoryUtil.others.location=response1.result.ad_info.district : console.log("请求位置信息失败  "+response1.message);
        // const response2=await reqWeather(memoryUtil.others.location);
        // if(response2.HeWeather6[0].status==="ok"){
        //     memoryUtil.others.weather_txt=response2.HeWeather6[0].now.cond_txt;
        //     memoryUtil.others.weather_code=response2.HeWeather6[0].now.cond_code;
        // }else{
        //     console.log("请求天气信息失败  "+response2.HeWeather6[0].status)
        // }
        this.intervalId=setInterval(() => {
            let time=new Date();
            let month=time.getMonth()+1;
            this.setState({
                username: memoryUtil.user.username,
                location: memoryUtil.others.location,
                weather_txt: memoryUtil.others.weather_txt,
                weather_code: memoryUtil.others.weather_code,
                date: time.getFullYear()+"-"+month+"-"+time.getDate()
            })
        }, 1000)
    };
    componentWillUnmount() {
        clearInterval(this.intervalId)
    };
    logout= () => {
        this.setState({ loading: true });
        return new Promise((resolve) => {
            setTimeout(() => {
                memoryUtil.user={};
                memoryUtil.others={};
                storageUtil.removeUser();
                this.props.history.replace('/login');
                resolve()
            }, 1000);
        }).catch(() => console.log('登出失败'));
    };
    render(){
        return (
            <div className="header">
                <span>{this.state.date}</span>
                <span>{this.state.location}</span>
                {/*<img src={"https://cdn.heweather.com/cond_icon/"+this.state.weather_code+".png"} alt="weather" />*/}
                {/*<span style={{marginRight: "100px"}}>{this.state.weather_txt}</span>*/}
                <span style={{marginRight: "20px"}}>欢迎! {this.state.username}</span>
                <Popconfirm
                    placement="bottomRight"
                    title="确定要退出系统吗？"
                    okType="danger"
                    onConfirm={this.logout}
                    okText="确认"
                    cancelText="取消"
                >
                    <Button style={{marginRight: "50px"}} type="primary" loading={this.state.loading}>退出</Button>
                </Popconfirm>
            </div>
        )
    }
}

export default  withRouter(Header);