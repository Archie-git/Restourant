import React from 'react';
import {Button, Card, Form, Input, Radio, InputNumber, Steps, DatePicker, Icon} from 'antd';
import TopNav from "../../components/top-nav";
import Select from "antd/es/select";
import PicturesWall from "../../components/picture-wall/picture-wall";
import { addEmployeeList } from '../../api/index';

const AddEmployee = Form.create({name: 'add-employee-form'})(
    class extends React.Component{
        constructor(props) {
            super(props);
            this.state = {
                current: 0,
                value1: {},
                data: {},
                key: 'tab1'
            }
        }
        handleNext = () => {
            let field = ['name','id','gender','age','nation','birthday','origin','marriage','institution','degree','graduatetime'];
            this.props.form.validateFields(field,(err,values) => {
                if(!err){
                    let data = this.state.data;
                    let current = this.state.current;
                    for(let key in values){
                        if(values.hasOwnProperty(key)){
                            data[key] = values[key]
                        }
                    }
                    this.setState({
                        current: current+1,
                        data: data
                    })
                }
            })
        };
        handlePrevious = () => {
            let current = this.state.current;
            this.setState({current: current-1})
        };
        handleSubmit = (e) => {
            e.preventDefault();
            let field = ['profile','workid','entrytime','department','duty','level','tel','address','salary','note'];
            this.props.form.validateFields(field, async (err, values) => {
                if(!err){
                    let data = this.state.data;
                    let current = this.state.current;
                    for(let key in values){
                        if(values.hasOwnProperty(key)){
                            data[key] = values[key]
                        }
                    }
                    data.birthday = new Date(data.birthday).getTime();
                    data.graduatetime = new Date(data.birthday).getTime();
                    data.entrytime = new Date(data.birthday).getTime();
                    const response = await addEmployeeList(data);
                    if(response.status === 0){
                        this.setState({
                            data: data,
                            current: current+1
                        })
                    }
                }
            })
        };
        onTabChange = (key) => {
            this.setState({ key: key });
        };
        getDateTime = (birthday) => {
            let time = new Date(birthday);
            let month = time.getMonth()+1;
            return time.getFullYear()+'-'+month+'-'+time.getDate();
        };
        getMonthTime = (date) => {
            let time = new Date(date);
            let month = time.getMonth()+1;
            return time.getFullYear()+'-'+month;
        };
        render(){
            const formItemLayout = {
                labelCol: {span: 8},
                wrapperCol: {span: 10}
            };
            const contentList = {
                tab1: (
                    <Form  {...formItemLayout} style={{marginTop: "40px", textIndent: "20px"}}>
                        <Form.Item label="姓名">
                            <span className="ant-form-text">{this.state.data.name}</span>
                        </Form.Item>
                        <Form.Item label="身份证号">
                            <span className="ant-form-text">{this.state.data.id}</span>
                        </Form.Item>
                        <Form.Item label="性别">
                        <span className="ant-form-text" style={{textIndent: "10px"}}>
                            {
                                this.state.data.gender===0 ? <span><Icon type="woman" /> 女</span> : <span><Icon type="man" /> 男</span>
                            }
                        </span>
                        </Form.Item>
                        <Form.Item label="年龄">
                            <span className="ant-form-text">{this.state.data.age}岁</span>
                        </Form.Item>
                        <Form.Item label="民族">
                            <span className="ant-form-text">{this.state.data.nation}</span>
                        </Form.Item>
                        <Form.Item label="出生日期">
                            <span className="ant-form-text">{this.getDateTime(this.state.data.birthday)}</span>
                        </Form.Item>
                        <Form.Item label="籍贯">
                            <span className="ant-form-text">{this.state.data.origin}</span>
                        </Form.Item>
                        <Form.Item label="婚姻状况">
                            <span className="ant-form-text">{this.state.data.marriage===0 ? "未婚" : "已婚" }</span>
                        </Form.Item>
                        <Form.Item label="学历">
                            <span className="ant-form-text">{this.state.data.degree}</span>
                        </Form.Item>
                        <Form.Item label="毕业院校">
                            <span className="ant-form-text">{this.state.data.institution}</span>
                        </Form.Item>
                        <Form.Item label="毕业时间">
                            <span className="ant-form-text">{this.getMonthTime(this.state.data.graduatetime)}</span>
                        </Form.Item>
                    </Form>
                ),
                tab2: (
                    <Form {...formItemLayout} style={{marginTop: "40px", textIndent: "20px"}}>
                        <Form.Item label="工号">
                            <span className="ant-form-text">{this.state.data.workid}</span>
                        </Form.Item>
                        <Form.Item label="入职时间">
                            <span className="ant-form-text">{this.getDateTime(this.state.data.entrytime)}</span>
                        </Form.Item>
                        <Form.Item label="部门">
                            <span className="ant-form-text">{this.state.data.department}</span>
                        </Form.Item>
                        <Form.Item label="职责">
                            <span className="ant-form-text">{this.state.data.duty}</span>
                        </Form.Item>
                        <Form.Item label="等级">
                            <span className="ant-form-text">
                                {this.state.data.level===0 ? "初级" : this.state.data.level===1 ?  "中级" : "高级"}
                            </span>
                        </Form.Item>
                        <Form.Item label="Tel">
                            <span className="ant-form-text">{this.state.data.tel}</span>
                        </Form.Item>
                        <Form.Item label="住址">
                            <span className="ant-form-text">{this.state.data.address}</span>
                        </Form.Item>
                        <Form.Item label="月薪">
                            <span className="ant-form-text">{this.state.data.salary} 元</span>
                        </Form.Item>
                        <Form.Item label="备注">
                            <span className="ant-form-text">{this.state.data.note}</span>
                        </Form.Item>
                        <Form.Item label="照片">
                            <span style={{width: "320px", marginLeft: "20px"}}>
                                {
                                    !this.state.data.profile ? <span>无</span> :
                                        <img src={this.state.data.profile}
                                             alt="员工照片"
                                             style={{
                                                 width: "100px",
                                                 height: "100px",
                                                 padding: "7px",
                                                 marginRight: "10px",
                                                 borderRadius: "5px",
                                                 border: "1px solid lightgray"}}
                                        />
                                }
                            </span>
                        </Form.Item>
                    </Form>
                )
            };
            const steps = [
                {
                    title: "填写基本信息",
                    content: (
                        <Form {...formItemLayout} style={{marginTop: "40px"}}>
                            <Form.Item label="姓名">
                                {
                                    this.props.form.getFieldDecorator('name', {
                                        rules: [{required: true}]
                                    })(<Input placeholder="请输入会员姓名"/>)
                                }
                            </Form.Item>
                            <Form.Item label="身份证号">
                                {
                                    this.props.form.getFieldDecorator('id', {
                                        rules: [{required: true}]
                                    })(<Input placeholder="请输入身份证号码"/>)
                                }
                            </Form.Item>
                            <Form.Item label="性别">
                                {
                                    this.props.form.getFieldDecorator('gender', {
                                        rules: [{required: true}]
                                    })(
                                        <Radio.Group>
                                            <Radio value={1} style={{margin: "0 20px"}}>男</Radio>
                                            <Radio value={0}>女</Radio>
                                        </Radio.Group>
                                    )
                                }
                            </Form.Item>
                            <Form.Item label="年龄">
                                {
                                    this.props.form.getFieldDecorator('age', {
                                        rules: [{required: true}]
                                    })(<InputNumber style={{width: "150px"}} />)
                                }
                                <span className="ant-form-text">岁</span>
                            </Form.Item>
                            <Form.Item label="民族">
                                {
                                    this.props.form.getFieldDecorator('nation', {
                                        rules: [{required: true}]
                                    })(<Input placeholder="请输入民族"/>)
                                }
                            </Form.Item>
                            <Form.Item label="出生日期">
                                {
                                    this.props.form.getFieldDecorator('birthday', {
                                        rules: [{required: true}]
                                    })(<DatePicker format='YYYY/MM/DD' />)
                                }
                            </Form.Item>
                            <Form.Item label="籍贯">
                                {
                                    this.props.form.getFieldDecorator('origin', {
                                        rules: [{required: true}]
                                    })(<Input placeholder="请输入籍贯"/>)
                                }
                            </Form.Item>
                            
                            
                            <Form.Item label="婚姻状况">
                                {
                                    this.props.form.getFieldDecorator('marriage', {
                                        rules: [{required: true}]
                                    })(
                                        <Radio.Group>
                                            <Radio value={0} style={{margin: "0 20px"}}>未婚</Radio>
                                            <Radio value={1}>已婚</Radio>
                                        </Radio.Group>
                                    )
                                }
                            </Form.Item>
                            <Form.Item label="学历">
                                {
                                    this.props.form.getFieldDecorator('degree', {
                                        rules: [{required: true}]
                                    })(
                                        <Select placeholder="请选择学历" style={{width: "187px"}}>
                                            <Select.Option value='博士'>博士</Select.Option>
                                            <Select.Option value='硕士'>硕士</Select.Option>
                                            <Select.Option value='本科'>本科</Select.Option>
                                            <Select.Option value='高中'>高中</Select.Option>
                                            <Select.Option value='初中'>初中</Select.Option>
                                            <Select.Option value='小学'>小学</Select.Option>
                                        </Select>
                                    )
                                }
                            </Form.Item>
                            <Form.Item label="毕业院校">
                                {
                                    this.props.form.getFieldDecorator('institution', {
                                        rules: [{required: true}]
                                    })(<Input placeholder="请输入毕业院校"/>)
                                }
                            </Form.Item>
                            <Form.Item label="毕业时间">
                                {
                                    this.props.form.getFieldDecorator('graduatetime', {
                                        rules: [{required: true}]
                                    })(<DatePicker.MonthPicker format='YYYY/MM' />)
                                }
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary"
                                        style={{margin: "50px 0 0 450px"}}
                                        onClick={()=>this.handleNext(0)}>下一步</Button>
                            </Form.Item>
                        </Form>
                    )
                },
                {
                    title: "填写工作信息",
                    content: (
                        <Form {...formItemLayout} style={{marginTop: "40px"}} onSubmit={this.handleSubmit}>
                            <Form.Item label="工号">
                                {
                                    this.props.form.getFieldDecorator('workid', {
                                        rules: [{required: true}]
                                    })(<Input placeholder="请输入工号"/>)
                                }
                            </Form.Item>
                            <Form.Item label="入职时间">
                                {
                                    this.props.form.getFieldDecorator('entrytime', {
                                        rules: [{required: true}]
                                    })(<DatePicker format='YYYY/MM/DD' />)
                                }
                            </Form.Item>
                            <Form.Item label="部门">
                                {
                                    this.props.form.getFieldDecorator('department', {
                                        rules: [{required: true}]
                                    })(<Input  placeholder="请输入工作部门"/>)
                                }
                            </Form.Item>
                            <Form.Item label="职责">
                                {
                                    this.props.form.getFieldDecorator('duty', {
                                        rules: [{required: true}]
                                    })(<Input placeholder="请输入工作职责"/>)
                                }
                            </Form.Item>
                            <Form.Item label="等级">
                                {
                                    this.props.form.getFieldDecorator('level', {
                                        rules: [{required: true}]
                                    })(
                                        <Radio.Group buttonStyle="solid">
                                            <Radio.Button value={0}>初 级</Radio.Button>
                                            <Radio.Button value={1}>中 级</Radio.Button>
                                            <Radio.Button value={2}>高 级</Radio.Button>
                                        </Radio.Group>
                                    )
                                }
                            </Form.Item>
                            <Form.Item label="Tel">
                                {
                                    this.props.form.getFieldDecorator('tel', {
                                        rules: [{required: true}]
                                    })(<Input addonBefore="+86" placeholder="请输入联系电话"/>)
                                }
                            </Form.Item>
                            <Form.Item label="住址">
                                {
                                    this.props.form.getFieldDecorator('address', {
                                        rules: [{required: true}]
                                    })(<Input placeholder="请输入住址"/>)
                                }
                            </Form.Item>
                            <Form.Item label="月薪">
                                {
                                    this.props.form.getFieldDecorator('salary', {
                                        rules: [{required: true}]
                                    })(<Input addonAfter="元" placeholder="请输入月薪"/>)
                                }
                            </Form.Item>
                            <Form.Item label="照片">
                                {
                                    this.props.form.getFieldDecorator('profile', {
                                        rules: [{required: true}]
                                    })(<PicturesWall />)
                                }
                            </Form.Item>
                            <Form.Item label="备注">
                                {
                                    this.props.form.getFieldDecorator('note', {
                                        initialValue: ""
                                    })(<Input.TextArea rows={4} placeholder="请输入备注" /> )
                                }
                            </Form.Item>
                            <Form.Item>
                                <Input.Group style={{marginLeft: "410px"}}>
                                    <Button type="primary" style={{marginRight: "50px"}} onClick={()=>this.handlePrevious()}>上一步</Button>
                                    <Button type="primary" htmlType="submit">完成，确认提交</Button>
                                </Input.Group>
                            </Form.Item>
                        </Form>
                    )
                },
                {
                    title: "提交成功",
                    content: (
                        <Card
                            style={{ width: "80%", margin: "20px auto"}}
                            tabList={[{key: 'tab1', tab: '基本信息'}, {key: 'tab2', tab: '工作信息'}]}
                            activeTabKey={this.state.key}
                            onTabChange={key => {
                                this.onTabChange(key);
                            }}
                        >
                            {contentList[this.state.key]}
                        </Card>
                    )
                }
            ];
            return (
                <div>
                    <TopNav nav={['人事管理', '员工列表', '新增员工']} />
                    <Card title={<span style={{ color: "#1DA57A", fontWeight: "bolder", fontSize: "20px"}}>新增员工信息</span>}
                          extra={<Button type="primary" onClick={()=>{this.props.history.push('/employee')}}>返回</Button>}
                          style={{width: "100%", border: "none"}}
                    >
                        <Steps current={this.state.current} style={{margin: "40px auto", width: "550px"}}>
                            {
                                steps.map((item, index) =>
                                    <Steps.Step key={index} title={item.title}/>)
                            }
                        </Steps>
                        <div className="steps-content">{steps[this.state.current].content}</div>
                    </Card>
                </div>
            )
        }
    }
);

export default AddEmployee;