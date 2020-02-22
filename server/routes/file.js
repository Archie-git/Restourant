let express = require('express');
let router = express.Router();
let multer = require('multer');
let path = require('path');
let fs = require('fs');

const dirPath = path.join(__dirname, '..', 'public/upload');

let storage = multer.diskStorage({
    destination: (req, file, callback) => {
        if(!fs.existsSync(dirPath)){
            fs.mkdir(dirPath, err => {
                err ? callback(err) : callback(null, dirPath)
            })
        }else{
            callback(null, dirPath)
        }
    },
    filename: (req, file, callback) => {
        callback(null, file.fieldname+'-'+Date.now()+path.extname(file.originalname))
    }
});

const upload = multer({storage});
const uploadImage = upload.single('image', 8);

router.post('/upload', (req, res) => {
   uploadImage(req, res, err => {
       if(err){
           res.send({status: 0, msg: err})
       }else{
           res.send({
               status: 1,
               data: {
                   name: req.file.filename,
                   url: 'http://localhost:3001/upload/'+req.file.filename
               }
           })
       }
   })
});
router.get('/delete', (req, res) => {
    fs.unlink(path.join(dirPath, String(req.query.name)), err => {
        if (err) {
            console.log(err);
            res.send({
                status: 1,
                msg: '删除文件失败'
            })
        } else {
            res.send({
                status: 0,
                msg: '删除文件成功'
            })
        }
    })
});



module.exports = router;

















