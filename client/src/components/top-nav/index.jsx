import React from 'react';
import {withRouter} from 'react-router-dom';
import './index.less';

class TopNav extends React.Component{
    // handleNavClick = (item) => {
    //     let nav = "";
    //     switch(item){
    //         case "首页": nav="/home";break;
    //         // 订单管理
    //         case "全部订单": nav="/order";break;
    //         case "订单详情": nav="/order-view";break;
    //         case "前台管理": nav="/order-stage";break;
    //         // 商品管理
    //         case "商品分类": nav="/category";break;
    //         case "新增品类": nav="/category-add";break;
    //         case "编辑品类": nav="/category-edit";break;
    //         case "品类详情": nav="/category-view";break;
    //         case "商品列表": nav="/product";break;
    //         case "添加商品": nav="/product-add";break;
    //         case "编辑商品": nav="/product-edit";break;
    //         case "商品详情": nav="/product-view";break;
    //         // 库存管理
    //         case "库存信息": nav="/stock";break;
    //         case "新增库存": nav="/stock-add";break;
    //         case "编辑库存": nav="/stock-add";break;
    //         case "货物详情": nav="/stock-view";break;
    //         case "库存日志": nav="/stock-log";break;
    //         case "库存盘点": nav="/inventory";break;
    //         case "新建盘点单": nav="/inventory-add";break;
    //         case "盘点详情": nav="/inventory-view";break;
    //         //会员管理
    //         case "会员列表": nav="/customer";break;
    //         case "编辑会员": nav="/customer-edit";break;
    //         case "新增会员": nav="/customer-add";break;
    //         case "会员详情": nav="/customer-view";break;
    //         //人事管理
    //         case "员工列表": nav="/employee";break;
    //         case "新增员工": nav="/employee-add";break;
    //         case "编辑员工": nav="/employee-edit";break;
    //         case "员工详情": nav="/employee-view";break;
    //         case "用户列表": nav="/user";break;
    //         case "创建用户": nav="/user-add";break;
    //         case "角色管理": nav="/role";break;
    //         case "新增角色": nav="/role-add";break;
    //         case "编辑角色": nav="/role-edit";break;
    //         //财务管理（待完善）
    //         default : nav="home";break;
    //     }
    //     this.props.history.replace(nav)
    // };
    render(){
        return (
            <div className="top-nav-container">
                {
                    this.props.nav.map((item,index) => {
                        // return index===0 ? (
                        //     <span key={index}>
                        //         <span style={{fontWeight: "bold", cursor: "pointer"}}>{item}</span>
                        //         <span style={{margin: "0 10px", color: "#98a9c4"}}>/</span>
                        //     </span>
                        // ) : index+1===this.props.nav.length ? (
                        //     <span key={index}
                        //           style={{cursor: "pointer", color: "#98a9c4"}}
                        //           onClick={()=>this.handleNavClick(item)}
                        //     >{item}</span>
                        // ) : (
                        //     <span key={index}>
                        //         <span key={index}
                        //               style={{fontWeight: "bold", cursor: "pointer"}}
                        //               onClick={()=>this.handleNavClick(item)}>{item}</span>
                        //         <span style={{margin: "0 10px", color: "#98a9c4"}}>/</span>
                        //     </span>
                        // )
                        return index===0 && index===this.props.nav.length ? (
                            <span key={index}>
                                <span style={{fontWeight: "bold", cursor: "default"}}>{item}</span>
                                <span style={{
                                    margin: "0 10px",
                                    color: "#98a9c4",
                                }}>/</span>
                            </span>
                        ) : index+1===this.props.nav.length ? (
                            <span key={index} style={{color: "#98a9c4",  cursor: "default"}}>{item}</span>
                        ) : (
                            <span key={index}>
                                <span key={index} style={{fontWeight: "bold",  cursor: "default"}}>{item}</span>
                                <span style={{margin: "0 10px", color: "#98a9c4"}}>/</span>
                            </span>
                        )
                    })
                }
            </div>
        )
    }
}

export default withRouter(TopNav);