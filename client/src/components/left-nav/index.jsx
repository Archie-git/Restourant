import React from 'react';
import './index.less';
import Logo from '../../assets/images/logo.png';
import {Link,withRouter} from 'react-router-dom';
import {Menu,Icon} from 'antd';
import menuList from '../../config/menuConfig';

const {SubMenu}=Menu;

class LeftNav extends React.Component{
    constructor(props){
        super(props);
        this.state={
            openKeys: [this.props.location.pathname]
        }
    }
    rootSubmenuKeys = ['/order', '/product','/category','/stock', '/customer','/employee','/financial'];
    onOpenChange = openKeys => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    };
    closeSubmenuAll = () =>{
        this.setState({openKeys:[]});
    };
    getMenuNodes = menuList =>{
        return menuList.map((item) => {
            if(!item.children){
                return (
                    <Menu.Item key={item.key} onClick={!item.icon ? null : this.closeSubmenuAll}>
                        <Link to={item.key}>
                            {!item.icon ? null : <Icon type={item.icon} />}
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            }else{
                return  (
                    <SubMenu key={item.key} title={<span><Icon type={item.icon} /><span>{item.title}</span></span>}>
                        {this.getMenuNodes(item.children)}
                    </SubMenu>
                )
            }
        })
    };
    
    render(){
        const path=this.props.location.pathname;
        return (
            <div className="left-nav">
                <Link to="/">
                    <div className="left-nav-header">
                        <img src={Logo} alt="logo"/>
                        <h1>餐饮后台</h1>
                    </div>
                </Link>
                <Menu
                    selectedKeys={[path]}
                    mode="inline"
                    openKeys={this.state.openKeys}
                    onOpenChange={this.onOpenChange}
                    // style={{backgroundColor:"#0354d9"}}
                    theme="dark">
                    {
                        this.getMenuNodes(menuList)
                    }
                </Menu>
            
            
            </div>
        )
    }
}

export default withRouter(LeftNav);