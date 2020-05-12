import React from 'react';
import {Form, Tag, Modal, Row, Col, Card} from 'antd';

class StocklogView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            key: 'tab1'
        }
    }
    onTabChange = (key) => {
        this.setState({key: key})
    };
    content = (header) => header ? (
        <div>
            <Row>
                <Col span={7} style={{textAlign: "right"}}>
                    <Form.Item>名称：</Form.Item>
                </Col>
                <Col span={5}>
                    <Form.Item>{header.stockname}</Form.Item>
                </Col>
                <Col span={4} style={{textAlign: "right"}}>
                    <Form.Item>种类：</Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item>{header.category}</Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={7} style={{textAlign: "right"}}>
                    <Form.Item>数量：</Form.Item>
                </Col>
                <Col span={5}>
                    <Form.Item>{header.amount}</Form.Item>
                </Col>
                <Col span={4} style={{textAlign: "right"}}>
                    <Form.Item>单位：</Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item>{header.unit}</Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={7} style={{textAlign: "right"}}>
                    <Form.Item>状态：</Form.Item>
                </Col>
                <Col span={5}>
                    <Form.Item>
                        {header.amout > header.excess ? <Tag size="small" color="blue">过剩</Tag> :
                            header.state < header.warning ? <Tag size="small" color="red">告罄</Tag> :
                                <Tag size="small" color="green">正常</Tag>}
                    </Form.Item>
                </Col>
                <Col span={4} style={{textAlign: "right"}}>
                    <Form.Item>监控：</Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item>
                        下限:{header.warning}&nbsp;&nbsp;
                        上限:{header.excess}
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={7}>
                    <Form.Item style={{textAlign: "right"}}>图片：</Form.Item>
                </Col>
                <Col span={17}>
                    {
                        String(header.pictures).split(',').map((item, index) => {
                            return item==="" ? null : <img
                                key={index} src={'http://localhost:3001/upload/'+item} alt="货物图片"
                                style={{
                                    width: "80px",
                                    height: "80px",
                                    padding: "5px",
                                    marginRight: "10px",
                                    borderRadius: "5px",
                                    border: "1px solid lightgray"
                                }}
                            />
                        })
                    }
                </Col>
            </Row>
            <Row style={{marginTop: '10px'}}>
                <Col span={7}>
                    <Form.Item style={{textAlign: "right"}}>备注：</Form.Item>
                </Col>
                <Col span={17}>
                    <Form.Item>{header.note ? header.note : '无'}</Form.Item>
                </Col>
            </Row>
        </div>
    ) : null;
    render() {
        const contentList = {
            tab1: this.content(this.props.info.before),
            tab2: this.content(this.props.info),
        };
        return (
            <Modal
                visible={this.props.visible}
                // title={<span style={{color: "#1DA57A"}}>日志详情-{this.props.info.operation || "修改"}</span>}
                okText="确认"
                cancelText="取消"
                onOk={this.props.onOk}
                onCancel={this.props.onCancel}
                footer={null}
            >
                {
                    Object.getOwnPropertyNames(this.props.info).length === 0 ? null :
                        this.props.info.hasOwnProperty('before') ? (
                            <Card
                                style={{width: "100%", border: "none"}}
                                tabList={[{key: 'tab1', tab: '修改前'}, {key: 'tab2', tab: '修改后'}]}
                                activeTabKey={this.state.key}
                                onTabChange={key=>this.onTabChange(key)}
                            >
                                {contentList[this.state.key]}
                            </Card>
                        ) : (
                            <Card
                                style={{width: "100%", border: "none"}}
                                title={<span style={{ color: "#1DA57A", marginLeft: "10px"}}>{this.props.info.operation}记录</span>}
                            >
                                {this.content(this.props.info)}
                            </Card>
                        )
                }
            </Modal>
        )
    }
}

export default StocklogView;

