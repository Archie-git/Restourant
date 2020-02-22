import React from 'react';
import {Button, Cascader, Form, Input} from 'antd'

const ProductSearch = Form.create({name: 'product-operate-form'})(
    class extends React.Component{
        handleReset = () => {
            this.props.form.resetFields();
        };
        render(){
            return (
                <Form layout="inline" onSubmit={this.props.onSubmit} style={{marginLeft: "100px"}}>
                    <Form.Item style={{width: "120px"}}>
                        { this.props.form.getFieldDecorator('nameOrNumber', {
                            initialValue: ""
                        })(<Input placeholder="输入名称/货号" />)}
                    </Form.Item>
                    <Form.Item>
                        { this.props.form.getFieldDecorator('category', {
                            initialValue: []
                        })(
                            <Cascader options={this.props.options2} placeholder="选择品类"/>)}
                    </Form.Item>
                    <Form.Item>
                        { this.props.form.getFieldDecorator('status', {
                            initialValue: []
                        })(
                            <Cascader options={this.props.options3} placeholder="选择状态"/>)}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">筛选搜索</Button>
                    </Form.Item>
                    <Form.Item style={{marginLeft: "-30px", width: "60px"}}>
                        <Button type="primary" onClick={this.handleReset}>重置</Button>
                    </Form.Item>
                </Form>
            )
        }
    }
);

export default ProductSearch