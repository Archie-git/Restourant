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
//根据订单ID搜索记录
router.get('/search', (req, res) => {
    let sql = "SELECT * FROM orders WHERE id="+req.query.id;
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


module.exports = router;