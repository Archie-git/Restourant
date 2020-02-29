import React from 'react';
import { Form, Tag, Modal, Row, Col } from 'antd';

class StocklogView extends React.Component {
    render() {
        return (
            <Modal
                visible={this.props.visible}
                title={<span style={{color: "#1DA57A"}}>日志详情</span>}
                okText="确认"
                cancelText="取消"
                onOk={this.props.onOk}
                onCancel={this.props.onCancel}
                footer={null}
            >
                <Row>
                    <Col span={7} style={{textAlign: "right"}}>
                        <Form.Item>货物名称：</Form.Item>
                    </Col>
                    <Col span={5}>
                        <Form.Item>{this.props.info.stockname}</Form.Item>
                    </Col>
                    <Col span={4} style={{textAlign: "right"}}>
                        <Form.Item>货物种类：</Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item>{this.props.info.category}</Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={7} style={{textAlign: "right"}}>
                        <Form.Item>货物数量：</Form.Item>
                    </Col>
                    <Col span={5}>
                        <Form.Item>{this.props.info.amount}</Form.Item>
                    </Col>
                    <Col span={4} style={{textAlign: "right"}}>
                        <Form.Item>货物单位：</Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item>{this.props.info.unit}</Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={7} style={{textAlign: "right"}}>
                        <Form.Item>库存状态：</Form.Item>
                    </Col>
                    <Col span={5}>
                        <Form.Item>
                            {this.props.info.state===0 ? <Tag size="small" color="blue">正常</Tag> :
                                this.props.info.state===1 ? <Tag size="small" color="red">告罄</Tag> :
                                    <Tag size="small" color="green">过剩</Tag>}
                        </Form.Item>
                    </Col>
                    <Col span={4} style={{textAlign: "right"}}>
                        <Form.Item>库存监控：</Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item>
                            上限:{this.props.info.excess}&nbsp;&nbsp;
                            下限:{this.props.info.warning}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={6}>
                        <Form.Item style={{paddingLeft: "67px"}}>图片：</Form.Item>
                    </Col>
                    <Col span={18}>
                        {
                            String(this.props.info.pictures).split(',').map((item, index) => {
                                return item==="" ? null : <img
                                    key={index} src={item} alt="货物图片"
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
                <Row>
                    <Col span={6}>
                        <Form.Item style={{paddingLeft: "67px"}}>备注：</Form.Item>
                    </Col>
                    <Col span={16}>
                        <Form.Item>{this.props.info.note}</Form.Item>
                    </Col>
                </Row>
            </Modal>
        )
    }
}

export default StocklogView;

