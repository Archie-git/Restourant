import React from 'react';
import {Switch,Redirect,Route} from 'react-router-dom';
import './admin.less';
import memoryUtils from '../../util/memoryUtils';
import {Layout} from 'antd';
import Header from '../../components/header';
import LeftNav from '../../components/left-nav';
import Home from '../../pages/home/home';
import Category from '../../pages/category/category';
import Product from '../../pages/product/product';
import Order from '../../pages/order/order';
import Customer from '../../pages/customer/customer';
import Employee from '../../pages/employee/employee';
import Stock from '../../pages/stock/stock';
import Finance from '../../pages/finance/finance';

const {Sider,Content,Footer}=Layout;

class Admin extends React.Component{
    render(){
        const user=memoryUtils.user;
        if(JSON.stringify(user)==='{}'){
            return <Redirect to='/login' />
        }else{
            return (
                <Layout className="container">
                    <Sider>
                        <LeftNav />
                    </Sider>
                    <Layout className='right-part'>
                        <Header />
                        <Content>
                            <Switch>
                                <Route path='/home' component={Home} />
                                <Route path='/product' component={Product} />
                                <Route path='/category' component={Category} />
                                <Route path='/order' component={Order} />
                                <Route path='/stock' component={Stock} />
                                <Route path='/customer' component={Customer} />
                                <Route path='/employee' component={Employee} />
                                <Route path='/finance' component={Finance} />
                                <Redirect to='/home' />
                            </Switch>
                        </Content>
                        <Footer>推荐使用谷歌浏览器，可获得更佳的页面操作体验</Footer>
                    </Layout>
                </Layout>
            )
        }
    }
}

export default Admin