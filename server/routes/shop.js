let express = require('express');
let router = express.Router();
let model = require('../model');

//获取商家列表
router.get('/info', function(req, res) {
    const sql = "SELECT * FROM shop";
    model.querySQL(sql).then(ret => {
        res.send({status: 0, data: ret[0]})
    }, err => {
        res.send({status: 1, msg: err})
    })
});
//更新商店信息
router.post('/update', (req, res) => {
    const sql = model.getUpdateSQL('shop', req.body);
    model.querySQL(sql).then(() => {
        res.send({status: 0, msg: "更新成功"})
    }, err => {
        res.send({status: 1, msg: err})
    })
});


module.exports = router;



