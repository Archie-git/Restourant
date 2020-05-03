import React from 'react';
import './home.less';
import TopNav from "../../components/top-nav";
import {Button, Card, Form} from "antd";
import {reqShopInfo} from "../../api";

class Home extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        }
    }
    UNSAFE_componentWillMount = async () => {
        const response = await reqShopInfo();
        if(response.status === 0){
            let data = response.data;
            data.profile = 'http://localhost:3001/upload/'+data.profile;
            this.setState({
                data: data
            })
        }
    };
    handleEdit = () => {
        this.props.history.push({
            pathname: '/home-edit',
            state: {
                data: this.state.data
            }
        })
    };
    render() {
        const formItemLayout = {
            labelCol: {span: 7},
            wrapperCol: {span: 11}
        };
        return (
            <div className='home-container'>
                <TopNav nav={['首页']} />
                <Card title={<span style={{ color: "#1DA57A", fontWeight: "bolder", fontSize: "20px"}}>门店信息</span>}
                      extra={<Button type="primary" onClick={this.handleEdit}>编辑</Button>}
                      style={{width: "100%", border: "none"}}
                >
                    <Form {...formItemLayout} style={{marginTop: "20px", textIndent: "20px", fontWeight: "bold"}} onSubmit={this.handleSubmit}>
                        <Form.Item label="店名">
                            <span className="ant-form-text">{this.state.data.name}</span>
                        </Form.Item>
                        {/*<Form.Item label="头像">*/}
                        {/*    <span className="ant-form-pictures">*/}
                        {/*        <img src={this.state.data.profile} alt="头像"/>*/}
                        {/*    </span>*/}
                        {/*</Form.Item>*/}
                        <Form.Item label="地址">
                            <span className="ant-form-text">{this.state.data.address}</span>
                        </Form.Item>
                        <Form.Item label="桌数">
                            <span className="ant-form-text">{this.state.data.seats}</span>
                        </Form.Item>
                        <Form.Item label="电话">
                            <span className="ant-form-text">{this.state.data.tel}</span>
                        </Form.Item>
                        <Form.Item label="公告">
                            <span className="ant-form-text">{this.state.data.notice}</span>
                        </Form.Item>
                        <Form.Item label="营业时间">
                            <span className="ant-form-text">{this.state.data.businesshour}</span>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        )
    }
}

export default Home;