import React from 'react';
import TopNav from "../../components/top-nav";
import {Button, Divider, Icon, Input, Table, Tag, Modal} from "antd";
import Loading from "../../components/loading";
import { reqEmployeeList, reqEmployeeDelete, reqEmployeeSearch } from '../../api/index';

class Employee extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            data: [],
            dutyFilter: [],
            departmentFilter: []
        }
    }
    UNSAFE_componentWillMount = async () => {
        const response = await reqEmployeeList();
        this.refreshTable(response)
    };
    componentWillUnmount = () => {
        clearTimeout(this.timerID)
    };
    refreshTable = (response) => {
        if(response.status === 0){
            let department = [], departmentFilter = [], duty = [], dutyFilter = [];
            response.data.forEach(item => {
                department.push(item.department);
                duty.push(item.duty)
            });
            new Set(department).forEach(item => {
                departmentFilter.push({text: item, value: item})
            });
            new Set(duty).forEach(item => {
                dutyFilter.push({text: item, value: item})
            });
            this.setState({isLoading: true});
            this.timerID = setTimeout(() => {
                this.setState({
                    isLoading: false,
                    data: response.data,
                    departmentFilter: departmentFilter,
                    dutyFilter: dutyFilter
                })
            })
        }
    };
    handleSearch = async (value) => {
        const response = value === "" ? await reqEmployeeList() : await reqEmployeeSearch(value);
        this.refreshTable(response)
    };
    handleDelete = (record) => {
        Modal.confirm({
            title: '警告',
            content: "确定要删除员工\""+record.name+"(工号："+record.workid+")\"吗？",
            okText: '确认',
            onOk: async () => {
                const response = await reqEmployeeDelete(record.workid);
                if(response.status === 0){
                    let data = [];
                    this.state.data.forEach(item => {
                        item.workid===record.workid ? data.push() : data.push(item)
                    });
                    this.setState({data})
                }
            },
            cancelText: '取消',
            onCancel: () => {}
        })
    };
    handleAdd = () => {
        this.props.history.push("/employee/add")
    };
    handleView = (record) => {
        console.log(record);
        this.props.history.push({pathname: '/employee/view', state: {data: record}})
    };
    handleEdit = (record) => {
        this.props.history.push({pathname: '/employee/edit', state: {data: record}})
    };
    render(){
        const columns = [
            {
                title: '工号',
                key: 'workid',
                dataIndex: 'workid',
                render: (text, record) => <Button type="link" onClick={()=>this.handleView(record)}>{text}</Button>
            },
            {
                title: '姓名',
                key: 'name',
                dataIndex: 'name'
            },
            {
                title: '性别',
                key: 'gender',
                dataIndex: 'gender',
                render: (text) => <span>{text === 0 ? '女' : '男'}</span>,
                filters: [{text: '男', value: 1},{text: '女', value: 0}],
                onFilter: (value, record) => value===record.gender
            },
            {
                title: '年龄',
                key: 'age',
                dataIndex: 'age',
                sorter: (a, b) => a.age-b.age
            },
            {
                title: '电话',
                key: 'tel',
                dataIndex: 'tel',
                render: (text)=><span><Icon type="phone" /> {text}</span>
            },
            {
                title: '工龄',
                key: 'workage',
                dataIndex: 'entrytime',
                render: (text) => <span>{new Date().getFullYear()-new Date(text).getFullYear() || "未满一年"}</span>,
                sorter: (a, b) => a.entrytime-b.entrytime
            },
            {
                title: '部门',
                key: 'department',
                dataIndex: 'department',
                filters: this.state.departmentFilter,
                onFilter: (value, record) => value===record.department
            },
            {
                title: '职责',
                key: 'duty',
                dataIndex: 'duty',
                render: (text,record) => record.level===0 ? <span>{text} <Tag color="blue">初级</Tag></span> :
                    record.level===1 ? <span>{text} <Tag color="green">中级</Tag></span> :
                        <span>{text} <Tag color="red">高级</Tag></span>,
                filters: this.state.dutyFilter,
                onFilter: (value, record) => value===record.duty
            },
            {
                title: '月薪',
                key: 'salary',
                dataIndex: 'salary',
                render: (text) => <span>￥{text.toFixed(2)}</span>,
                sorter: (a, b) => a.salary-b.salary
            },
            {
                title: '操作',
                key: 'operation',
                render: (record) => (
                    <div>
                        <Button size="small" type="primary" onClick={()=>this.handleEdit(record)}>编辑</Button>
                        <Divider type="vertical"/>
                        <Button size="small" type="danger" onClick={()=>this.handleDelete(record)}>删除</Button>
                    </div>
                )
            }
        ];
        return (
            <div>
                <TopNav nav={['人事管理', '员工列表']} />
                <div style={{margin: "20px 22px 0 20px"}}>
                    <Button type="primary" onClick={this.handleAdd}><Icon type="plus"/>新增员工</Button>
                    <Input.Search
                        style={{width: "200px", float: "Right"}}
                        placeholder="查询工号/姓名"
                        onSearch={(value) => this.handleSearch(value)}
                        enterButton
                    />
                </div>
                {
                    this.state.isLoading ? <Loading/> :
                        <Table size="small"
                               style={{margin: "20px"}}
                               columns={columns}
                               dataSource={this.state.data}
                               rowKey={record => record.workid}
                               bordered
                        />
                }
            </div>
        )
    }
}

export default Employee;