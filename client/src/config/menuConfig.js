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
                title: "订单管理1"
            },
            {
                key: "/order2",
                title: "订单管理2"
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
                key: "/stock2",
                title: "盘点管理"
            },
            {
                key: "/stock3",
                title: "库存报警"
            },
            {
                key: "/stock4",
                title: "库存记录"
            }
        ]
    },
    {
        key: "/customer",
        title: "客户管理",
        icon: "smile",
        children: [
            {
                key: "/customer",
                title: "客户管理1"
            }
        ]
    },
    {
        key: "/employee",
        title: "员工管理",
        icon: "smile",
        children: [
            {
                key: "/employee",
                title: "员工管理1"
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