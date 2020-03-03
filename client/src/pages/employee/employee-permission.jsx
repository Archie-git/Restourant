// import React from 'react';
// import TopNav from "../../components/top-nav";
//
// class EmployeePermission extends React.Component{
//     render(){
//         return (
//             <div>
//                 <TopNav nav={['人事管理', '权限管理']} />
//             </div>
//         )
//     }
// }
//
// export default EmployeePermission;


import {Steps, Button, message, Form, Input} from 'antd';
import React from 'react';


class EmployeePermission extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
        };
    }
    
    next() {
        const current = this.state.current + 1;
        this.setState({ current });
    }
    
    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }
    
    render() {
        const steps = [
            {
                title: '填写基本信息',
                content: (
                    <div>
                        <Form>
                            <Form.Item label="工号" hasFeedback>
                                {
                                    this.props.form.getFieldDecorator('workid', {
                                        rules: [{required: true}]
                                    })(<Input placeholder="请输入工号"/>)
                                }
                            </Form.Item>
                        </Form>
                    </div>
                ),
            },
            {
                title: '填写工作信息',
                content: (
                    <Form>
                        <Form.Item label="姓名" hasFeedback>
                            {
                                this.props.form.getFieldDecorator('name', {
                                    rules: [{required: true}]
                                })(<Input placeholder="请输入会员姓名"/>)
                            }
                        </Form.Item>
                    </Form>
                ),
            }
        ];
    
        const { current } = this.state;
        return (
            <div>
                <Steps current={current}>
                    {steps.map((item, index)=> (
                        <Steps.Step key={index} title={item.title} />
                    ))}
                </Steps>
                <div className="steps-content">{steps[current].content}</div>
                <div className="steps-action">
                    {current < steps.length - 1 && (
                        <Button type="primary" onClick={() => this.next()}>
                            下一步
                        </Button>
                    )}
                    {current === steps.length - 1 && (
                        <Button type="primary" onClick={() => message.success('Processing complete!')}>
                            完成
                        </Button>
                    )}
                    {current > 0 && (
                        <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                            上一步
                        </Button>
                    )}
                </div>
            </div>
        );
    }
}

export default Form.create({name: "arhige"})(EmployeePermission)


