import React from 'react';
import './index.less';
import {Spin} from 'antd';

class Loading extends React.Component{
    render(){
        return (
            <div className="loading-container">
                <Spin size="large" />
                <span>Loading. . .</span>
            </div>
        )
    }
}

export default Loading;