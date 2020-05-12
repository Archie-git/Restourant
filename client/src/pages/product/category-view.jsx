import React from 'react';
import TopNav from "../../components/top-nav";
import {Button, Card, Form} from "antd";

class ViewCategory extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        }
    }
    UNSAFE_componentWillMount = async () => {
        let data = this.props.location.state.data;
        console.log(data);
        this.setState({
            data: data
        })
    };
    render() {
        const formItemLayout = {
            labelCol: {span: 8},
            wrapperCol: {span: 10}
        };
        return (
            <div>
                <TopNav nav={['商品管理', '商品分类', '品类详情']} />
                <Card title={<span style={{ color: "#1DA57A", fontWeight: "bolder", fontSize: "20px"}}>查看品类详情</span>}
                      extra={<Button type="primary" onClick={()=>{this.props.history.push('/product/category')}}>返回</Button>}
                      style={{width: "100%", border: "none"}}
                >
                    <Form {...formItemLayout} style={{marginTop: "40px", textIndent: "20px"}} onSubmit={this.handleSubmit}>
                        <Form.Item label="名称">
                            <span className="ant-form-text">{this.state.data.name}</span>
                        </Form.Item>
                        <Form.Item label="级别">
                            <span className="ant-form-text">{this.state.data.levelText}</span>
                        </Form.Item>
                        <Form.Item label="是否显示">
                            <span className="ant-form-text">{this.state.data.isnav ? '是' : '否'}</span>
                        </Form.Item>
                        <Form.Item label="子项数量">
                            <span className="ant-form-text">{this.state.data.son}</span>
                        </Form.Item>
                        <Form.Item label="备注">
                            <span className="ant-form-text">{this.state.data.note}</span>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        )
    }
}

export default ViewCategory;


