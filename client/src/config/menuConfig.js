const menuList=[
    {
        key: "/home",
        title: "首页",
        icon: "home",
        display: 1
    },
    {
        key: "/order",
        title: "订单管理",
        icon: "account-book",
        display: 1,
        children: [
            {
                key: "/order",
                title: "全部订单",
                display: 1
            },
            {
                key: "/order-stage",
                title: "前台管理",
                display: 1
            }
        ]
    },
    {
        key: "/product",
        title: "商品管理",
        icon: "shopping",
        display: 1,
        children: [
            {
                key: "/category",
                title: "商品分类",
                display: 1
            },
            {
                key: "/product",
                title: "商品列表",
                display: 1
            },
            {
                key: "/product-add",
                title: "添加商品",
                display: 1
            }
        ]
    },
    {
        key: "/stock",
        title: "库存管理",
        icon: "appstore",
        display: 1,
        children: [
            {
                key: "/stock",
                title: "库存信息",
                display: 1
            },
            {
                key: "/inventory",
                title: "库存盘点",
                display: 1
            }
        ]
    },
    {
        key: "/member",
        title: "会员管理",
        icon: "crown",
        display: 1,
        children: [
            {
                key: "/member",
                title: "会员列表",
                display: 1
            },
            {
                key: "/member-add",
                title: "新增会员",
                display: 1
            }
        ]
    },
    {
        key: "/employee",
        title: "人事管理",
        icon: "team",
        display: 1,
        children: [
            {
                key: "/employee",
                title: "员工列表",
                display: 1
            },
            {
                key: "/user",
                title: "用户列表",
                display: 1
            },
            {
                key: "/role",
                title: "角色管理",
                display: 1
            }
        ]
    },
    {
        key: "/finance",
        title: "财务管理",
        icon: "area-chart",
        display: 1,
        children: [
            {
                key: "/finance",
                title: "财务报表",
                display: 1
            }
        ]
    }
];




export default menuList;