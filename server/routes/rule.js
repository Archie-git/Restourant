let express = require('express');
let router = express.Router();
let model = require('../model');

//获取会员规则
router.get('/list', (req, res) => {
    const sql = "SELECT * FROM rule";
    model.querySQL(sql).then(ret => {
        res.send({status: 0, data: ret})
    }, err => {
        res.send({status: 1, msg: err})
    })
});
//更新会员规则,并更新整个customer列表
router.post('/update', (req, res) => {
    const sql1 = model.getUpdateSQL('rule', req.body);
    model.querySQL(sql1).then(() => {
        const sql2 = "UPDATE customer SET status=1 WHERE integral<"+req.body.gold;
        model.querySQL(sql2).then(()=>{
            const sql3 = "UPDATE customer SET status=2 WHERE integral>"+req.body.gold;
            model.querySQL(sql3).then(()=>{
                const sql4 = "UPDATE customer SET status=3 WHERE integral>"+req.body.diamond;
                model.querySQL(sql4).then(()=>{
                    res.send({status: 0, msg: "设置成功"})
                }, err=>{
                    res.send({status: 1, msg: err})
                })
            }, err=>{
                res.send({status: 1, msg: err})
            })
        }, err => {
            res.send({status: 1, msg: err})
        })
    }, err => {
        res.send({status: 1, msg: err})
    })
});

module.exports = router;