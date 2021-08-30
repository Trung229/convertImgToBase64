const multer = require('multer');
let fs = require('fs-extra');


const storage = multer.diskStorage({ 
    destination:(req,file, cb)=>{
        const {body:{chap}} = req;
        let path = `./public/images/${chap}`;
        fs.mkdirsSync(path);
        cb(null, path);
    },
    filename: (req,file, cb)=>{
        cb(null,req.body.chap + file.originalname);
    }
})


module.exports = multer({storage:storage})