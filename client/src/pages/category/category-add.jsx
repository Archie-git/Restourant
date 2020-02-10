import React from 'react';
import {Modal, Form, Input, Radio} from 'antd';

const AddCategoryModal = Form.create({ name: 'category-add' })(
    class extends React.Component {
        validateName = (rule, value, callback) =>{
            if(!value){
                callback("请输入品类名称")
            }else if(value.length>10){
                callback("请输入少于10个字符")
            }else{
                callback()
            }
        };
        render() {
            const { form } = this.props;
            return (
                <Modal
                    visible={this.props.visible}
                    title="新增商品品类"
                    okText="确认"
                    cancelText="取消"
                    onOk={this.props.onOk}
                    // onOk={()=>{console.log(this.props)}}
                    onCancel={this.props.onCancel}>
                    <Form layout="vertical">
                        <Form.Item label="品类名称：">
                            {form.getFieldDecorator('name', {
                                rules: [{ validator: this.validateName }],
                            })(<Input type="text" />)}
                        </Form.Item>
                        <Form.Item label="描述：">
                            {form.getFieldDecorator('description')(<Input type="textarea" />)}
                        </Form.Item>
                        <Form.Item>排序：
                            {form.getFieldDecorator('level')(
                                <Radio.Group buttonStyle="solid">
                                    <Radio.Button value="1">一级</Radio.Button>
                                    <Radio.Button value="2">二级</Radio.Button>
                                    <Radio.Button value="3">三级</Radio.Button>
                                    <Radio.Button value="4">四级</Radio.Button>
                                    <Radio.Button value="5">五级</Radio.Button>
                                    <Radio.Button value="6">六级</Radio.Button>
                                    <Radio.Button value="7">七级</Radio.Button>
                                </Radio.Group>,
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }
    },
);

export default AddCategoryModal;








