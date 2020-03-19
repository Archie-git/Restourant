const menuList=[
    {
        key: "/home",
        title: "首页",
        icon: "home"
    },
    {
        key: "/order",
        title: "订单管理",
        icon: "account-book",
        children: [
            {
                key: "/order",
                title: "全部订单"
            },
            {
                key: "/order-stage",
                title: "前台管理"
            }
        ]
    },
    {
        key: "/product",
        title: "商品管理",
        icon: "shopping",
        children: [
            {
                key: "/category",
                title: "商品分类"
            },
            {
                key: "/product",
                title: "商品列表"
            },
            {
                key: "/product-add",
                title: "添加商品"
            }
        ]
    },
    {
        key: "/stock",
        title: "库存管理",
        icon: "smile",
        children: [
            {
                key: "/stock",
                title: "库存信息"
            },
            {
                key: "/inventory",
                title: "库存盘点"
            }
        ]
    },
    {
        key: "/customer",
        title: "会员管理",
        icon: "smile",
        children: [
            {
                key: "/customer",
                title: "会员列表"
            },
            {
                key: "/customer-setting",
                title: "营销管理"
            }
        ]
    },
    {
        key: "/employee",
        title: "人事管理",
        icon: "smile",
        children: [
            {
                key: "/employee",
                title: "员工列表"
            },
            {
                key: "/employee-role",
                title: "角色管理"
            },
            {
                key: "/employee-permission",
                title: "权限管理"
            }
        ]
    },
    {
        key: "/finance",
        title: "财务管理",
        icon: "smile",
        children: [
            {
                key: "/finance",
                title: "财务管理1"
            }
        ]
    }
];




export default menuList;