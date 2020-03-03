import React from 'react';
import './home.less';
import TopNav from "../../components/top-nav";

class Home extends React.Component{
    render(){
        return (
            <div>
                <TopNav nav={['首页']} />
            </div>
        )
    }
}

export default Home;