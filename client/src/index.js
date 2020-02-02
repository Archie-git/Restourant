import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import storageUtil from './util/storageUtils';
import memoryUtil from './util/memoryUtils';

const user=storageUtil.getUser();
memoryUtil.user=user;

ReactDOM.render(<App />, document.getElementById('root'));

