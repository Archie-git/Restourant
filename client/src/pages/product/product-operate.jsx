import React from 'react';
import {Button, Cascader, Form} from 'antd';

const ProductOperate = Form.create({name: 'product-operate-form'})(
    class extends React.Component{
        render(){
            return (
                <Form layout="inline" onSubmit={this.props.onSubmit} style={{marginLeft: "123px"}}>
                    <Form.Item>
                        { this.props.form.getFieldDecorator('operation', {
                            initialValue: []
                        })(
                            <Cascader options={this.props.options1} placeholder="&nbsp;批量操作"/>)}
                    </Form.Item>
                    <Form.Item style={{width: "60px"}}>
                        <Button type="primary" htmlType="submit">确定</Button>
                    </Form.Item>
                </Form>
            )
        }
    }
);

export default ProductOperate