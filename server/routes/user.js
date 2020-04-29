let express = require('express');
let router = express.Router();
let model = require('../model');

//获取用户列表
router.get('/list', function(req, res) {
    const sql = "SELECT * FROM user";
    model.querySQL(sql).then(ret => {
        res.send({status: 0, data: ret})
    }, err => {
        res.send({status: 1, msg: err})
    })
});
router.get('/kkk', function(req, res) {
    const sql = "SELECT * FROM user";
    model.querySQL(sql).then(ret => {
        res.send({status: 0, data: ret})
    }, err => {
        res.send({status: 1, msg: err})
    })
});
//删除用户
router.get('/delete', (req, res) => {
    const sql = "DELETE FROM user WHERE id="+req.query.id;
    model.querySQL(sql).then(() => {
        res.send({status: 0, msg: "删除成功"})
    }, err => {
        res.send({status: 1, msg: err})
    })
});
//新增用户
router.post('/add', (req, res) => {
    const sql = model.getAddSQL('user', req.body);
    console.log(sql);
    model.querySQL(sql).then(() => {
        res.send({status: 0, msg: "删除成功"})
    }, err => {
        res.send({status: 1, msg: err})
    })
});
//更新用户
router.post('/update', (req, res) => {
    const sql = model.getUpdateSQL('user', req.body);
    console.log(sql);
    model.querySQL(sql).then(() => {
        res.send({status: 0, msg: "更新成功"})
    }, err => {
        res.send({status: 1, msg: err})
    })
});


module.exports = router;
