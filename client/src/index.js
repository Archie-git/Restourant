import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import storageUtil from './util/storageUtils';
import memoryUtil from './util/memoryUtils';
import { ConfigProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const user=storageUtil.getUser();
memoryUtil.user=user;

ReactDOM.render(<ConfigProvider locale={zh_CN}><App /></ConfigProvider>, document.getElementById('root'));

