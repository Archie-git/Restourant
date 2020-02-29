import React from 'react';
import './product.less';
import {Form, Button, Card, Icon} from 'antd';
import TopNav from "../../components/top-nav";

class EditProduct extends React.Component{
    constructor(props){
        super(props);
        this.state=({
            data: {}
        })
    }
    UNSAFE_componentWillMount = async () => {
        let data = this.props.location.state.data;
        this.setState({
            data: data
        })
    };
    render(){
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 10 },
        };
        let stateYes = (string) => (<span><Icon type="check" style={{color: "#1DA57A"}}/>{string}</span>);
        let stateNo = (string) => (<span><Icon type="close" style={{color: "#1DA57A"}}/>{string}</span>);
        return (
            <div className="product-view-container">
                <TopNav nav={['商品管理', '商品列表', '商品详情']}/>
                <Card title={<span style={{ color: "#1DA57A", fontWeight: "bolder", fontSize: "20px"}}>查看商品信息</span>}
                      extra={<Button type="primary" onClick={()=>this.props.history.push('/product')}>返回</Button>}
                      style={{ border: "none", width: "100%"}}
                >
                    <Form {...formItemLayout} style={{marginTop: "40px"}}>
                        <Form.Item label="商品货号" hasFeedback>
                            <span className="ant-form-text">{this.state.data.number}</span>
                        </Form.Item>
                        <Form.Item label="商品名称" hasFeedback>
                            <span className="ant-form-text">{this.state.data.name}</span>
                        </Form.Item>
                        <Form.Item label="所属分类" hasFeedback>
                            <span className="ant-form-text">{this.state.data.category_name}</span>
                        </Form.Item>
                        <Form.Item label="售价">
                            <span className="ant-form-text">{this.state.data.price}</span>
                        </Form.Item>
                        <Form.Item label="计量单位" hasFeedback>
                            <span className="ant-form-text">{this.state.data.unit}</span>
                        </Form.Item>
                        <Form.Item label="商品状态">
                            <span className="ant-form-text" style={{marginLeft: "-20px"}}>
                                {this.state.data.onsale ? stateYes("上架") : stateNo("上架")}
                                {this.state.data.onsale ? stateYes("新品") : stateNo("新品")}
                                {this.state.data.onsale ? stateYes("推荐") : stateNo("推荐")}
                            </span>
                        </Form.Item>
                        <Form.Item label="赠送积分" hasFeedback>
                            <span className="ant-form-text">{this.state.data.integral}</span>
                        </Form.Item>
                        <Form.Item label="详细页标题">
                            <span className="ant-form-text">{this.state.data.introduce}</span>
                        </Form.Item>
                        <Form.Item label="详细页描述">
                            <span className="ant-form-text">{this.state.data.description}</span>
                        </Form.Item>
                        <Form.Item label="黄金会员折扣">
                            <span className="ant-form-text">
                                {this.state.data.discount_gold===10 ? "无" : this.state.data.discount_gold+"折" }
                            </span>
                        </Form.Item>
                        <Form.Item label="黄金会员折扣">
                            <span className="ant-form-text">
                                {this.state.data.discount_platinum===10 ? "无" : this.state.data.discount_platinum+"折" }
                            </span>
                        </Form.Item>
                        <Form.Item label="黄金会员折扣">
                            <span className="ant-form-text">
                                {this.state.data.discount_diamond===10 ? "无" : this.state.data.discount_diamond+"折" }
                            </span>
                        </Form.Item>
                        <Form.Item label="商品图片">
                            <span className="ant-form-pictures">
                                {
                                    this.state.data.pictures==="" ? <span>无</span> :
                                        this.state.data.pictures.split(",").map((item, index)=> {
                                            return (<img key={index} src={item} alt="商品图片"/>)
                                        })
                                }
                            </span>
                        </Form.Item>
                        <Form.Item label="优惠信息备注">
                            <span className="ant-form-text">{this.state.data.note}</span>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        )
    }
}

export default Form.create({name:'product-add-form'})(EditProduct);
