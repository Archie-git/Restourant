let express = require('express');
let router = express.Router();
let model = require('../model');

//获取库存列表
router.get('/list', (req, res) => {
    let sql = "SELECT * FROM stock";
    model.querySQL(sql).then(ret => {
        res.send({status: 0, data: ret})
    }, err => {
        res.send({status: 1, msg: err})
    })
});
//获取库存品类
router.get('/category', (req, res) => {
    let sql = "SELECT DISTINCT category FROM stock";
    model.querySQL(sql).then(ret => {
        res.send({status: 0, data: ret})
    }, err => {
        res.send({status: 1, msg: err})
    })
});
//删除某条库存记录
router.get('/delete', (req, res) => {
    let sql = "DELETE FROM stock WHERE id="+req.query.id;
    model.querySQL(sql).then(() => {
        res.send({status: 0, msg: "删除成功"})
    }, err => {
        res.send({status: 1, msg: err})
    })
});
//根据库存名称查找库存信息
router.get('/search', (req, res) => {
    let sql = "SELECT * FROM stock WHERE NAME=\""+req.query.name+"\"";
    model.querySQL(sql).then(ret => {
        res.send({status: 0, data: ret})
    }, err => {
        res.send({status: 1, msg: err})
    })
});
//获取库存日志表
router.get('/stocklog-list', (req, res) => {
    let sql = req.query.id ? "SELECT * FROM stocklog WHERE id="+req.query.id : "SELECT * FROM stocklog";
    console.log(sql);
    model.querySQL(sql).then(ret => {
        res.send({status: 0, data: ret})
    }, err => {
        res.send({status: 1, msg: err})
    })
});
//新增库存记录
router.post('/add', (req, res) => {
    let sql = model.getAddSQL('stock', req.body);
    console.log(sql);
    model.querySQL(sql).then(ret => {
        res.send({status: 0, data: ret})
    }, err => {
        res.send({status: 1, msg: err})
    })
});
//更新库存列表
router.post('/update', (req, res) => {
    console.log(req.body);
    let sql = model.getUpdateSQL('stock', req.body);
    console.log(sql);
    model.querySQL(sql).then(ret => {
        res.send({status: 0, msg: "更新成功"})
    }, err => {
        res.send({status: 0, msg: err})
    })
});
//新增库存日志
router.post('/stocklog-add', (req, res) => {
    let sql = model.getAddSQL('stocklog', req.body);
    console.log(sql);
    model.querySQL(sql).then(() => {
        res.send({status: 0, msg: "更新库存日志成功"})
    }, err => {
        res.send({status: 1, msg: err})
    })
});





















//insert into stock values(1000,"芒果汁","酒水饮料",20,"箱","kkkkkkkkkkkkkkkkkk","kkk","2020-02-01 00:00:00.000000",5,20);

module.exports = router;