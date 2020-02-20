let express = require('express');
let router = express.Router();
let model = require('../model');

//渲染商品列表
router.get('/list', (req, res) => {
    let sql = "SELECT * FROM product";
    model.querySQL(sql).then((ret) => {
        res.send({status: 0, data: ret})
    }, err => {
        res.send({status: 1, msg: err})
    })
});
//删除商品
router.get('/delete', (req, res) => {
    let sql = "DELETE FROM product WHERE id="+req.query.id;
    console.log(sql);
    model.querySQL(sql).then(() => {
        res.send({status: 0, msg: "删除成功"})
    }, err => {
        res.send({status: 1, msg: err})
    })
});
//更新商品表中的数据
router.post('/update', (req, res) => {
    let sql = model.getUpdateSQL('product', req.body);
    console.log(sql);
    model.querySQL(sql).then(() => {
        res.send({status: 0, msg: "更新成功"})
    }, err => {
        res.send({status: 1, msg: err})
    })
});
//添加商品
router.post('/add', (req, res) => {
    let sql = model.getAddSQL('product', req.body);
    model.querySQL(sql).then(() => {
        res.send({status: 0, msg: "添加成功"})
    }, () => {
        res.send({statue: 1, msg: "添加失败"})
    })
});


module.exports = router;