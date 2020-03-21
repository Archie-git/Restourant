import React from 'react';
import TopNav from "../../components/top-nav";

class Finance extends React.Component{
    render(){
        return (
            <div>
                <TopNav nav={['财务管理', '财务报表']} />
            </div>
        )
    }
}

export default Finance;