import React from 'react';
import {Button, Select, Form, Input} from 'antd'

const ProductSearch = Form.create({name: 'product-operate-form'})(
    class extends React.Component{
        render(){
            return (
                <Form layout="inline" onSubmit={this.props.onSubmit}>
                    <Form.Item>
                        { this.props.form.getFieldDecorator('status', {
                            initialValue: []
                        })(<Select style={{width: "100px", textAlign: "left"}} placeholder="选择状态">
                            <Select.Option value="">全部</Select.Option>
                            <Select.Option value="onsale-1">已上架</Select.Option>
                            <Select.Option value="onsale-0">未上架</Select.Option>
                            <Select.Option value="isnew-1">新品</Select.Option>
                            <Select.Option value="isnew-0">非新品</Select.Option>
                            <Select.Option value="recommend-1">已推荐</Select.Option>
                            <Select.Option value="recommend-0">未推荐</Select.Option>
                        </Select>)}
                    </Form.Item>
                    <Form.Item>
                        { this.props.form.getFieldDecorator('nameOrNumber', {
                            initialValue: ""
                        })(<Input placeholder="输入名称/货号"
                                  style={{width: "120px", textAlign: "left"}} />)}
                    </Form.Item>
                    <Form.Item>
                        <Button.Group>
                            <Button type="primary" htmlType="submit">筛选搜索</Button>
                        </Button.Group>
                    </Form.Item>
                </Form>
            )
        }
    }
);

export default ProductSearch