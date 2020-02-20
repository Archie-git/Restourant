import React from 'react';
import {withRouter} from 'react-router-dom';
import './index.less';

class TopNav extends React.Component{
    handleNavClick = (item) => {
        console.log(item);
        let nav = "";
        switch(item){
            case "商品管理": nav="/category";break;
            case "商品分类": nav="/category";break;
            case "商品列表": nav="/product";break;
            case "添加商品": nav="/add-product";break;
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