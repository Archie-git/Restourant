let express = require('express');
let router = express.Router();
let model = require('../model');

router.get('/list', (req, res) => {
    let sql = "SELECT * FROM inventory";
    model.querySQL(sql).then(ret => {
        res.send({status: 0, data: ret})
    }, err => {
        res.send({status: 1, msg: err})
    })
});
//新增盘点记录
router.post('/add', (req, res) => {
    console.log(req.body);
    let sql = model.getAddSQL('inventory', req.body);
    console.log(sql);
    model.querySQL(sql).then(()=>{
        res.send({status: 0, msg: '更新成功'})
    }, err => {
        res.send({status: 1, msg: err})
    })
});
//更新盘点记录
router.post('/update', (req, res) => {
    console.log(req.body);
    let sql = model.getUpdateSQL('inventory', req.body);
    console.log(sql);
    model.querySQL(sql).then(()=>{
        res.send({status: 0, msg: '更新成功'})
    }, err => {
        res.send({status: 1, msg: err})
    })
});
//更新盘点记录
router.get('/delete', (req, res) => {
    let sql = "DELETE FROM inventory WHERE id="+req.query.id;
    console.log(sql);
    model.querySQL(sql).then(()=>{
        res.send({status: 0, msg: '更新成功'})
    }, err => {
        res.send({status: 1, msg: err})
    })
});





module.exports = router;



