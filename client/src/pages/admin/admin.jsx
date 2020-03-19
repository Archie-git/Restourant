import React from 'react';
import {Switch, Redirect, Route} from 'react-router-dom';
import memoryUtils from '../../util/memoryUtils';
import {Layout} from 'antd';
import Header from '../../components/header';
import LeftNav from '../../components/left-nav';
import Home from '../../pages/home/home';
import Category from '../../pages/category/category';
import AddCategory from '../../pages/category/category-add';
import EditCategory from '../../pages/category/category-edit';
import ViewCategory from '../../pages/category/category-view';
import Product from '../../pages/product/product';
import AddProduct from '../product/product-add';
import EditProduct from '../product/product-edit';
import ViewProduct from '../product/product-view';
import Order from '../../pages/order/order';
import ViewOrder from '../../pages/order/order-view';
import OrderStage from '../../pages/order/order-stage';
import Customer from '../../pages/customer/customer';
import AddCustomer from '../../pages/customer/customer-add';
import EditCustomer from '../../pages/customer/customer-edit';
import ViewCustomer from '../../pages/customer/customer-view';
import Employee from '../../pages/employee/employee';
import AddEmployee from '../../pages/employee/employee-add';
import ViewEmployee from '../../pages/employee/employee-view';
import EditEmployee from '../../pages/employee/employee-edit';
import EmployeePermission from '../../pages/employee/employee-permission';
import Stock from '../../pages/stock/stock';
import AddStock from '../../pages/stock/stock-add';
import StockLog from '../../pages/stock/stock-log';
import ViewStock from '../../pages/stock/stock-view';
import EditStock from '../../pages/stock/stock-edit';
import Inventory from '../../pages/inventory/inventory';
import ViewInventory from "../inventory/inventory-view";
import AddInventory from '../inventory/inventory-add';
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
                        <Content style={{margin: "0 20px", paddingBottom: "100px", backgroundColor: "white", minHeight: "500px"}}>
                            <Switch>
                                <Route path='/home' component={Home} />
                                <Route path='/category' component={Category} />
                                <Route path='/category-add' component={AddCategory} />
                                <Route path='/category-edit' component={EditCategory} />
                                <Route path='/category-view' component={ViewCategory} />
                                <Route path='/product' component={Product} />
                                <Route path='/product-add' component={AddProduct} />
                                <Route path='/product-edit' component={EditProduct} />
                                <Route path='/product-view' component={ViewProduct} />
                                <Route path='/order' component={Order} />
                                <Route path='/stock' component={Stock} />
                                <Route path='/stock-add' component={AddStock} />
                                <Route path='/stock-view' component={ViewStock} />
                                <Route path='/stock-log' component={StockLog} />
                                <Route path='/stock-edit' component={EditStock} />
                                <Route path='/inventory' component={Inventory} />
                                <Route path='/inventory-view' component={ViewInventory} />
                                <Route path='/inventory-add' component={AddInventory} />
                                <Route path='/customer' component={Customer} />
                                <Route path='/customer-add' component={AddCustomer} />
                                <Route path='/customer-edit' component={EditCustomer} />
                                <Route path='/customer-view' component={ViewCustomer} />
                                <Route path='/employee' component={Employee} />
                                <Route path='/employee-add' component={AddEmployee} />
                                <Route path='/employee-view' component={ViewEmployee} />
                                <Route path='/employee-edit' component={EditEmployee} />
                                <Route path='/employee-permission' component={EmployeePermission} />
                                <Route path='/order' component={Order} />
                                <Route path='/order-view' component={ViewOrder} />
                                <Route path='/order-stage' component={OrderStage} />
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