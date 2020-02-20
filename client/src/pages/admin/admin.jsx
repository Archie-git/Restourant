import React from 'react';
import {Switch,Redirect,Route} from 'react-router-dom';
import memoryUtils from '../../util/memoryUtils';
import {Layout} from 'antd';
import Header from '../../components/header';
import LeftNav from '../../components/left-nav';
import Home from '../../pages/home/home';
import Category from '../../pages/category/category';
import Product from '../../pages/product/product';
import AddProduct from '../product/product-add';
import EditProduct from '../product/product-edit';
import ViewProduct from '../product/product-view';
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
                <Layout>
                    <Sider style={{height: "100vh", position: "fixed"}}>
                        <LeftNav />
                    </Sider>
                    <Layout id="right" style={{marginLeft: "200px"}}>
                        <Header />
                        <Content style={{margin: "0 20px", paddingBottom: "100px", backgroundColor: "white"}}>
                            <Switch>
                                <Route path='/home' component={Home} />
                                <Route path='/category' component={Category} />
                                <Route path='/product' component={Product} />
                                <Route path='/product-add' component={AddProduct} />
                                <Route path='/product-edit' component={EditProduct} />
                                <Route path='/product-view' component={ViewProduct} />
                                <Route path='/order' component={Order} />
                                <Route path='/stock' component={Stock} />
                                <Route path='/customer' component={Customer} />
                                <Route path='/employee' component={Employee} />
                                <Route path='/finance' component={Finance} />
                                <Redirect to='/home' />
                            </Switch>
                        </Content>
                        <Footer>推荐使用Chrome浏览器，可获得更佳的页面操作体验。</Footer>
                    </Layout>
                </Layout>
            )
        }
    }
}

export default Admin