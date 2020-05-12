let express = require('express');
let router = express.Router();
let model = require('../model');

//获取角色列表
router.get('/list', function(req, res) {
    const sql = "SELECT * FROM role WHERE deleted=0";
    model.querySQL(sql).then(ret => {
        res.send({status: 0, data: ret})
    }, err => {
        res.send({status: 1, msg: err})
    })
});
//新增角色
router.post('/add', (req, res) => {
    const sql = model.getAddSQL('role', req.body);
    model.querySQL(sql).then(() => {
        res.send({status: 0, msg: "添加成功"})
    }, err => {
        res.send({status: 1, msg: err})
    })
});
//更新角色
router.post('/update', (req, res) => {
    const sql = model.getUpdateSQL('role', req.body);
    console.log(sql);
    model.querySQL(sql).then(() => {
        res.send({status: 0, msg: "更新成功"})
    }, err => {
        res.send({status: 1, msg: err})
    })
});
//删除角色
router.get('/delete', (req, res) => {
    const sql1 = "UPDATE role SET deleted=1 WHERE id="+req.query.id;
    model.querySQL(sql1).then(() => {
        const sql2 = "UPDATE user SET deleted=1 WHERE role="+req.query.id;
        model.querySQL(sql2).then(() => {
            res.send({status: 0, msg: '删除成功'})
        }, err => {
            res.send({status: 1, msg: err})
        })
    }, err => {
        res.send({status: 1, msg: err})
    })
});


module.exports = router;