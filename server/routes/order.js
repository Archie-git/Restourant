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
//根据订单ID搜索记录
router.get('/search', (req, res) => {
    let sql = "SELECT * FROM orders WHERE id="+req.query.id;
    model.querySQL(sql).then(ret => {
        res.send({status: 0, data: ret})
    }, err => {
        res.send({status: 1, msg: err})
    })
});


module.exports = router;