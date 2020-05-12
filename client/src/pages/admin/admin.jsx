import React from 'react';
import {Switch, Redirect, Route} from 'react-router-dom';
import memoryUtils from '../../util/memoryUtils';
import {Layout} from 'antd';
import Header from '../../components/header';
import LeftNav from '../../components/left-nav';
import Home from '../../pages/home/home';
import EditHome from '../../pages/home/home-edit';
import ViewHome from '../../pages/home/home-view';
import Category from '../product/category';
import AddCategory from '../product/category-add';
import EditCategory from '../product/category-edit';
import ViewCategory from '../product/category-view';
import Product from '../../pages/product/product';
import AddProduct from '../product/product-add';
import EditProduct from '../product/product-edit';
import ViewProduct from '../product/product-view';
import Order from '../../pages/order/order';
import ViewOrder from '../../pages/order/order-view';
import Stage from '../order/stage';
import Member from '../member/member';
import AddMember from '../member/member-add';
import EditMember from '../member/member-edit';
import ViewMember from '../member/member-view';
import Employee from '../../pages/employee/employee';
import AddEmployee from '../../pages/employee/employee-add';
import ViewEmployee from '../../pages/employee/employee-view';
import EditEmployee from '../../pages/employee/employee-edit';
import Role from '../../pages/employee/role';
import AddRole from '../../pages/employee/role-add';
import EditRole from '../../pages/employee/role-edit';
import User from '../../pages/employee/user';
import AddUser from '../../pages/employee/user-add';
import EditUser from '../../pages/employee/user-edit';
import Stock from '../../pages/stock/stock';
import AddStock from '../../pages/stock/stock-add';
import StockLog from '../../pages/stock/stock-log';
import ViewStock from '../../pages/stock/stock-view';
import EditStock from '../../pages/stock/stock-edit';
import Inventory from '../stock/inventory';
import ViewInventory from "../stock/inventory-view";
import AddInventory from '../stock/inventory-add';


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
                                {/*首页*/}
                                <Route exact path='/home' component={Home} />
                                <Route path='/home/view' component={ViewHome} />
                                <Route path='/home/edit' component={EditHome} />
                                
                                {/*订单管理*/}
                                <Route exact path='/order' component={Order} />
                                <Route path='/order/view' component={ViewOrder} />
                                <Route exact path='/order/stage' component={Stage} />
                                <Route path='/order/stage/view' component={ViewOrder} />
                                
                                {/*商品管理*/}
                                <Route exact path='/product' component={Product} />
                                <Route path='/product/add' component={AddProduct} />
                                <Route path='/product/edit' component={EditProduct} />
                                <Route path='/product/view' component={ViewProduct} />
                                <Route exact path='/product/category' component={Category} />
                                <Route path='/product/category/add' component={AddCategory} />
                                <Route path='/product/category/edit' component={EditCategory} />
                                <Route path='/product/category/view' component={ViewCategory} />
                                
                                {/*库存管理*/}
                                <Route exact path='/stock' component={Stock} />
                                <Route path='/stock/add' component={AddStock} />
                                <Route path='/stock/view' component={ViewStock} />
                                <Route path='/stock/log' component={StockLog} />
                                <Route path='/stock/edit' component={EditStock} />
                                <Route exact path='/stock/inventory' component={Inventory} />
                                <Route path='/stock/inventory/view' component={ViewInventory} />
                                <Route path='/stock/inventory/add' component={AddInventory} />
                                
                                {/*会员管理*/}
                                <Route exact path='/member' component={Member} />
                                <Route path='/member/add' component={AddMember} />
                                <Route path='/member/edit' component={EditMember} />
                                <Route path='/member/view' component={ViewMember} />
                                
                                {/*人事管理*/}
                                <Route exact path='/employee' component={Employee} />
                                <Route path='/employee/add' component={AddEmployee} />
                                <Route path='/employee/view' component={ViewEmployee} />
                                <Route path='/employee/edit' component={EditEmployee} />
                                <Route exact path='/employee/user' component={User} />
                                <Route path='/employee/user/add' component={AddUser} />
                                <Route path='/employee/user/edit' component={EditUser} />
                                <Route exact path='/employee/role' component={Role} />
                                <Route path='/employee/role/add' component={AddRole} />
                                <Route path='/employee/role/edit' component={EditRole} />
                                
                                {/*重定向*/}
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