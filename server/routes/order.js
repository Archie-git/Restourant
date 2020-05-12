let express = require('express');
let router = express.Router();
let model = require('../model');

//获取order数据
router.get('/list', (req, res) => {
    let sql = "SELECT * FROM orders";
    model.querySQL(sql).then(ret => {
        res.send({status: 0, data: ret})
    }, err => {
        res.send({status: 1, msg: err})
    })
});
//获取前台order数据
router.get('/frontdesk-list', (req, res) => {
    let sql = "SELECT * FROM orders WHERE state IN (0, 1)";
    model.querySQL(sql).then(ret => {
        res.send({status: 0, data: ret})
    }, err => {
        res.send({status: 1, msg: err})
    })
});
//获取最近一周的订单数据
router.get('/week-list', (req, res) => {
    let time = new Date().getTime() - 6*24*60*60*1000;
    let time1 = new Date(time).setHours(0,0,0,0);
    let time2 = new Date(time).setHours(23,59,59,999);
    let sql = "SELECT * FROM orders WHERE state=3 AND createtime>"+time1;
    model.querySQL(sql).then(ret => {
        let data = {
            amount: [],
            quantity: [],
            amountToday: 0.00,
            quantityToday: 0
        };
        for(let i=0; i<7; i++){
            let count = 0;
            let amount = 0;
            ret.forEach(item => {
                if(item.createtime > time1 && item.createtime <time2){
                    count++;
                    amount = amount + item.payment
                }
            });
            time1 = time1 + 24*60*60*1000;
            time2 = time2 + 24*60*60*1000;
            data.quantity.push(count);
            data.amount.push(amount.toFixed(2))
        }
        data.amountToday = data.amount[data.amount.length-1];
        data.quantityToday = data.quantity[data.quantity.length-1];
        data.amountPercent = data.amountToday/data.amount[data.amount.length-2];
        data.amountPercent = data.amountPercent.toFixed(3);
        data.quantityPercent = data.quantityToday/data.quantity[data.quantity.length-2];
        data.quantityPercent = data.quantityPercent.toFixed(3);
        res.send({status: 0, data: data})
    }, err => {
        res.send({status: 1, msg: err})
    })

});
//根据订单ID搜索记录
router.get('/search', (req, res) => {
    let sql = "SELECT * FROM orders WHERE id="+req.query.id;
    model.querySQL(sql).then(ret => {
        res.send({status: 0, data: ret})
    }, err => {
        res.send({status: 1, msg: err})
    })
});
//搜索一定时间范围内的全部订单
router.get('/range', (req, res) => {
    let sql = "SELECT * FROM orders WHERE createtime>="+req.query.start+" AND createtime<="+req.query.end;
    console.log(sql);
    model.querySQL(sql).then(ret => {
        res.send({status: 0, data: ret})
    }, err => {
        res.send({status: 1, msg: err})
    })
});
//根据订单的顾客ID搜素记录
router.get('/list-mini', (req, res) => {
    let sql = "SELECT * FROM orders WHERE customer="+req.query.customer;
    model.querySQL(sql).then(ret => {
        res.send({status: 0, data: ret})
    }, err => {
        res.send({status: 1, msg: err})
    })
});
//根据订单ID更新订单信息
router.post('/update', (req, res) => {
    let sql = model.getUpdateSQL('orders', req.body);
    console.log(sql);
    model.querySQL(sql).then(ret => {
        res.send({status: 0, msg: '更新成功'})
    }, err => {
        res.send({status: 1, msg: err})
    })
});
//微信小程序获取某一位用户的所有订单信息
router.get('/list-customer', (req, res) => {
    let sql = "SELECT * FROM orders WHERE id IN("+req.query.customer+")";
    model.querySQL(sql).then(ret => {
        res.send({status: 0, data: ret})
    }, err => {
        res.send({status: 1, msg: err})
    })
});
//小程序新增订单
router.post('/add', (req, res) => {
    let sql = model.getAddSQL('orders', req.body);
    console.log(sql);
    model.querySQL(sql).then(ret => {
        res.send({status: 0, data: ret})
    }, err => {
        res.send({status: 1, msg: err})
    })
});

module.exports = router;