const multer = require('multer');
let fs = require('fs-extra');


const storage = multer.diskStorage({ 
    destination:(req,file, cb)=>{
        const {body:{MangaId}} = req;
        let path = `./public/images/${MangaId}`;
        fs.mkdirsSync(path);
        cb(null, path);
    },
    filename: (req,file, cb)=>{
        cb(null,req.body.MangaId + file.originalname);
    }
})


module.exports = multer({storage:storage})