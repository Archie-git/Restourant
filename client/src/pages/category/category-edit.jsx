import React from 'react';
import {Modal, Input, Form, Radio} from 'antd';

const EditCategoryModal = Form.create({ name: 'category-edit' })(
    class extends React.Component{
        validateName = (rule, value, callback) => {
            if(!value){
                callback("请输入品类名称")
            }else if(value.length>10){
                callback("请输入少于10个字符")
            }else{
                callback()
            }
        };
        render(){
            const {form} = this.props;
            return (
                <Modal
                    visible={this.props.visible}
                    title="编辑品类信息"
                    okText="确认"
                    cancelText="取消"
                    onOk={this.props.onOk}
                    onCancel={this.props.onCancel}
                >
                    <Form layout="inline">
                        <Form.Item label="名称：">
                            { form.getFieldDecorator('name', {
                                rules: [{validator: this.validateName}],
                                initialValue: this.props.info.name
                            })(<Input placeholder={this.props.info.name} style={{width: "414px", marginBottom: "20px"}}/>)}
                        </Form.Item>
                        <Form.Item label="描述：">
                            { form.getFieldDecorator('description', {
                                initialValue: this.props.info.description
                            })(<Input.TextArea style={{width:"414px",height:"100px",marginBottom:"20px"}}
                                               placeholder={this.props.info.description}/>)}
                        </Form.Item>
                        <Form.Item label="级别：">
                            { form.getFieldDecorator('level',{
                                initialValue: this.props.info.level
                            })(
                                <Radio.Group buttonStyle="solid">
                                    <Radio.Button value={0}>一级</Radio.Button>
                                    <Radio.Button value={1}>二级</Radio.Button>
                                    <Radio.Button value={2}>三级</Radio.Button>
                                    <Radio.Button value={3}>四级</Radio.Button>
                                    <Radio.Button value={4}>五级</Radio.Button>
                                    <Radio.Button value={5}>六级</Radio.Button>
                                    <Radio.Button value={6}>七级</Radio.Button>
                                </Radio.Group>,
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
            )
        }
    }
);

export default EditCategoryModal;