import React from 'react';
import {Redirect} from 'react-router-dom';
import memoryUtils from '../../util/memoryUtils';

class Admin extends React.Component{
    render(){
        const user=memoryUtils.user;
        if(JSON.stringify(user)==='{}'){
            return <Redirect to='/login' />
        }else{
            return (
                <div>Hello {user.username}</div>
            )
        }
    }
}

export default Admin