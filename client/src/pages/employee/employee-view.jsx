import React from "react";
import { Form, Card, Button, Icon } from "antd";
import TopNav from "../../components/top-nav";

class ViewEmployee extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            key: 'tab1'
        }
    }
    onTabChange = (key) => {
        this.setState({key: key})
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
        const data = this.props.location.state.data;
        const contentList = {
            tab1: (
                <Form  {...formItemLayout} style={{marginTop: "40px", textIndent: "20px"}}>
                    <Form.Item label="姓名">
                        <span className="ant-form-text">{data.name}</span>
                    </Form.Item>
                    <Form.Item label="身份证号">
                        <span className="ant-form-text">{data.id}</span>
                    </Form.Item>
                    <Form.Item label="性别">
                        <span className="ant-form-text" style={{textIndent: "10px"}}>
                            {
                                data.gender===0 ? <span><Icon type="woman" /> 女</span> : <span><Icon type="man" /> 男</span>
                            }
                        </span>
                    </Form.Item>
                    <Form.Item label="年龄">
                        <span className="ant-form-text">{data.age}岁</span>
                    </Form.Item>
                    <Form.Item label="民族">
                        <span className="ant-form-text">{data.nation}</span>
                    </Form.Item>
                    <Form.Item label="出生日期">
                        <span className="ant-form-text">{this.getDateTime(data.birthday)}</span>
                    </Form.Item>
                    <Form.Item label="籍贯">
                        <span className="ant-form-text">{data.origin}</span>
                    </Form.Item>
                    <Form.Item label="婚姻状况">
                        <span className="ant-form-text">{data.marriage===0 ? "未婚" : "已婚" }</span>
                    </Form.Item>
                    <Form.Item label="学历">
                        <span className="ant-form-text">{data.degree}</span>
                    </Form.Item>
                    <Form.Item label="毕业院校">
                        <span className="ant-form-text">{data.institution}</span>
                    </Form.Item>
                    <Form.Item label="毕业时间">
                        <span className="ant-form-text">{this.getMonthTime(data.graduatetime)}</span>
                    </Form.Item>
                </Form>
            ),
            tab2: (
                <Form {...formItemLayout} style={{marginTop: "40px", textIndent: "20px"}}>
                    <Form.Item label="工号">
                        <span className="ant-form-text">{data.workid}</span>
                    </Form.Item>
                    <Form.Item label="入职时间">
                        <span className="ant-form-text">{this.getDateTime(data.entrytime)}</span>
                    </Form.Item>
                    <Form.Item label="部门">
                        <span className="ant-form-text">{data.department}</span>
                    </Form.Item>
                    <Form.Item label="职责">
                        <span className="ant-form-text">{data.duty}</span>
                    </Form.Item>
                    <Form.Item label="等级">
                        <span className="ant-form-text">{data.level===0 ? "初级" : data.level===1 ?  "中级" : "高级"}</span>
                    </Form.Item>
                    <Form.Item label="Tel">
                        <span className="ant-form-text">{data.tel}</span>
                    </Form.Item>
                    <Form.Item label="住址">
                        <span className="ant-form-text">{data.address}</span>
                    </Form.Item>
                    <Form.Item label="月薪">
                        <span className="ant-form-text">{data.salary} 元</span>
                    </Form.Item>
                    <Form.Item label="备注">
                        <span className="ant-form-text">{data.note}</span>
                    </Form.Item>
                    <Form.Item label="照片">
                            <span style={{width: "320px", marginLeft: "20px"}}>
                                {
                                    data.profile==="" ? <span>无</span> :
                                        data.profile.split(",").map((item, index)=> {
                                            return (<img key={index}
                                                         src={item}
                                                         alt="员工照片"
                                                         style={{width: "100px",
                                                             height: "100px",
                                                             padding: "7px",
                                                             marginRight: "10px",
                                                             borderRadius: "5px",
                                                             border: "1px solid lightgray"}}
                                                    />)
                                        })
                                }
                            </span>
                    </Form.Item>
                </Form>
            )
        };
        return (
            <div className="employee-view-container">
                <TopNav nav={['人事管理', '员工列表', '员工详情']} />
                <Card title={<span style={{ color: "#1DA57A", fontWeight: "bolder", fontSize: "20px"}}>查看员工详情</span>}
                      extra={<Button type="primary" onClick={()=>{this.props.history.push('/employee')}}>返回</Button>}
                      style={{width: "100%", border: "none"}}
                      tabList={[{key: 'tab1', tab: '基本信息'}, {key: 'tab2', tab: '工作信息'}]}
                      activeTabKey={this.state.key}
                      onTabChange={key=>this.onTabChange(key)}
                >
                    {contentList[this.state.key]}
                </Card>
            </div>
        )
    }
}

export default ViewEmployee;