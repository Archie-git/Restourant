let express = require('express');
let router = express.Router();
let model = require('../model');

/* GET users listing. */
router.get('/list', function(req, res) {
    const sql = "SELECT * FROM user";
    model.querySQL(sql).then(ret => {
        res.send({status: 0, data: ret})
    }, err => {
        res.send({status: 1, msg: err})
    })
});


module.exports = router;
