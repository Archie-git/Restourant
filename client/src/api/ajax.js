/*能发送异步ajax的函数模块，
*封装Axios库，
* 返回的是一个promise对象*/

import axios from 'axios';
import {message} from 'antd';

export default function ajax(url,data={},type='GET') {
    return new Promise(resolve => {
        let promise = null;
        if(type === 'GET'){
            promise = axios.get(url, {
                params: data
            });
        } else {
            promise = axios.post(url, data)
        }
        promise.then(response=>{
            resolve(response.data)
        }).catch((err)=>{
            message.error("请求失败  "+err.message)
        })
    })
}