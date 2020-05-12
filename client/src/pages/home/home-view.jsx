import React from 'react';
import {Form, Card, Button} from 'antd';
import TopNav from "../../components/top-nav";

const ViewHome = Form.create({ name: 'category-add' })(
    class extends React.Component {
        handleEdit = () => {
            this.props.history.push('/home/edit');
        };
        render() {
            const formItemLayout = {
                labelCol: {span: 8},
                wrapperCol: {span: 10}
            };
            let data = this.props.location.state.data;
            const BtnGroup = (
                <div>
                    <Button type="primary" style={{marginRight: "20px"}} onClick={this.handleEdit}>编辑</Button>
                    <Button type="primary" onClick={() => this.props.history.push('/home')}>返回</Button>
                </div>
            );
            return (
                <div>
                    <TopNav nav={['首页', '门店详情']} />
                    <Card title={<span style={{ color: "#1DA57A", fontWeight: "bolder", fontSize: "20px"}}>门店信息</span>}
                          extra={BtnGroup}
                          style={{width: "100%", border: "none"}}
                    >
                        <Form {...formItemLayout} style={{marginTop: "20px"}} onSubmit={this.handleSubmit}>
                            <Form.Item label="店名">
                                <span style={{paddingLeft:"20px"}}>{data.name}</span>
                            </Form.Item>
                            <Form.Item label="头像">
                                <span style={{paddingLeft:"20px"}}>
                                    <img
                                        src={'/upload/'+data.profile}
                                        style={{
                                            width: "80px",
                                            height: "80px",
                                            borderRadius: "5px",
                                            padding: "5px",
                                            border: "1px solid lightgray"
                                        }}
                                        alt="头像"/>
                                </span>
                            </Form.Item>
                            <Form.Item label="地址">
                                <span style={{paddingLeft:"20px"}}>{data.address}</span>
                            </Form.Item>
                            <Form.Item label="桌数">
                                <span style={{paddingLeft:"20px"}}>{data.seats}</span>
                            </Form.Item>
                            <Form.Item label="电话">
                                <span style={{paddingLeft:"20px"}}>{data.tel}</span>
                            </Form.Item>
                            <Form.Item label="公告">
                                <span style={{paddingLeft:"20px"}}>{data.notice}</span>
                            </Form.Item>
                            <Form.Item label="营业时间">
                                <span style={{paddingLeft:"20px"}}>{data.businesshour}</span>
                            </Form.Item>
                        </Form>
                    </Card>
                </div>
            )
        }
    },
);

export default ViewHome;
