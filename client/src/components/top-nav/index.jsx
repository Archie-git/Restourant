import React from 'react';
import {withRouter} from 'react-router-dom';
import './index.less';

class TopNav extends React.Component{
    handleNavClick = (item) => {
        let nav = "";
        switch(item){
            case "首页": nav="/home";break;
            case "商品管理": nav="/category";break;
            case "商品分类": nav="/category";break;
            case "商品列表": nav="/product";break;
            case "添加商品": nav="/add-product";break;
            case "库存管理": nav="/stock";break;
            case "库存信息": nav="/stock";break;
            case "库存盘点": nav="/inventory";break;
            case "库存日志": nav="/stock-log";break;
            case "编辑库存": nav="/stock-edit";break;
            case "会员管理": nav="/customer";break;
            case "会员列表": nav="/customer";break;
            case "编辑会员": nav="/customer-edit";break;
            case "新增会员": nav="/customer-add";break;
            case "会员详情": nav="/customer-view";break;
            case "人事管理": nav="/employee";break;
            case "员工列表": nav="/employee";break;
            case "新增员工": nav="/employee-add";break;
            case "编辑员工": nav="/employee-edit";break;
            case "员工详情": nav="/employee-view";break;
            case "权限管理": nav="/employee-permission";break;
            default : nav="home";break;
        }
        this.props.history.replace(nav)
    };
    render(){
        return (
            <div className="top-nav-container">
                {
                    this.props.nav.map((item,index) => {
                        if(index+1 === this.props.nav.length){
                            return <span key={item} className="nav-light"
                                         onClick={()=>this.handleNavClick(item)}>{item}</span>
                        }else{
                            return (
                                <span key={item}>
                                    <span className="nav-bold" onClick={()=>this.handleNavClick(item)}>{item}</span>
                                    <span className="nav-light">&nbsp;&nbsp;/&nbsp;&nbsp;</span>
                                </span>
                            )
                        }
                    })
                }
            </div>
        )
    }
}

export default withRouter(TopNav);