import React from 'react';
import TopNav from "../../components/top-nav";

class EmployeePermission extends React.Component{
    render(){
        return (
            <div>
                <TopNav nav={['人事管理', '权限管理']} />
            </div>
        )
    }
}

export default EmployeePermission;




