import React from 'react';
import { Form, Button, Input } from 'antd';

const StockSearch = Form.create({name: "stock-operate-form"})(
    class extends React.Component{
        render(){
            return (
                <Form layout="inline">
                    <Form.Item>
                        {this.props.form.getFieldDecorator('name', {
                            initialValue: ""
                        })(<Input style={{width: "200px"}} placeholder="输入名称"/>)}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" onClick={this.props.onSubmit}>搜索</Button>
                    </Form.Item>
                </Form>
            )
        }
    }
);

export default StockSearch;