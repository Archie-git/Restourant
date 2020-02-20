import React from 'react';
import {Form, Button, Input, Cascader} from 'antd';
import {reqCategoryList} from "../../api";

const ProductHeader = Form.create({name:'product-header'})(
    class extends React.Component{
        constructor(props){
            super(props);
            this.state=({
                options_category: [],
                options_action: [],
            })
        }
    
        UNSAFE_componentWillMount = async () =>{
            let response = await reqCategoryList();
            let options1 = [];
            let options2 = [
                {
                    value: 'sale',
                    label: '商品上架',
                },
                {
                    value: 'unsale',
                    label: '商品下架',
                },
                {
                    value: 'recommend',
                    label: '设为推荐',
                },
                {
                    value: 'unrecommend',
                    label: '取消推荐',
                },
                {
                    value: 'new',
                    label: '设为新品',
                },
                {
                    value: 'unnew',
                    label: '取消新品',
                },
                {
                    value: 'remove',
                    label: '删除商品',
                }
            ];
            if(response.status === 0){
                response.data.forEach((item) => {
                    options1.push({label: item.name, value: item.id})
                })
            }
            options2.push({
                label: '转移到分类',
                value: 'move',
                children: options1
            });
            this.setState({
                options_category: options1,
                options_action: options2
            });
        };
        handleSearchSubmit = () => {
            console.log("表单提交")
        };
        options_state = [
            {
                value: 'sale',
                label: '已上架',
            },
            {
                value: 'unsale',
                label: '未上架',
            },
            {
                value: 'recommend',
                label: '已推荐',
            },
            {
                value: 'unrecommend',
                label: '未推荐',
            },
            {
                value: 'new',
                label: '新品',
            },
            {
                value: 'unnew',
                label: '非新品',
            }
        ];
        
        render(){
            const { form, onAddClick} = this.props;
            return (
                <div className="product-header">
                    <Button type="primary" className="add-product" onClick={onAddClick}>新增商品</Button>
                    {/*批量操作*/}
                    <Form layout="inline" className="product-header-search" onSubmit={this.handleSearchSubmit}>
                        <Form.Item>
                            { form.getFieldDecorator('action')(
                                <Cascader options={this.state.options_action} placeholder="批量操作"/>)}
                        </Form.Item>
                        <Form.Item>
                            { form.getFieldDecorator('submit_action')(
                                <Button type="primary" htmlType="submit">确定</Button>
                            )}
                        </Form.Item>
                    </Form>
                    {/*筛选搜索*/}
                    <Form layout="inline" onSubmit={this.handleSearchSubmit}>
                        <Form.Item style={{width: "120px"}}>
                            { form.getFieldDecorator('name')(<Input placeholder="输入名称/货号" />)}
                        </Form.Item>
                        <Form.Item>
                            { form.getFieldDecorator('category')(
                                <Cascader options={this.state.options_category} placeholder="选择品类"/>)}
                        </Form.Item>
                        <Form.Item>
                            { form.getFieldDecorator('status')(
                                <Cascader options={this.options_state} placeholder="选择状态"/>)}
                        </Form.Item>
                        <Form.Item>
                            { form.getFieldDecorator('submit_search')(
                                <Button type="primary" htmlType="submit">筛选搜索</Button>
                            )}
                        </Form.Item>
                    </Form>
                </div>
            )
        }
    }
);

export default ProductHeader;