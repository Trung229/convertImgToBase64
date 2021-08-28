const multer = require('multer');

const storage = multer.diskStorage({ 
    destination:(req,file, cb)=>{
        cb(null, './public/images/')
    },
    filename: (req,file, cb)=>{
        console.log(file)
        cb(null, file.originalname)
    }
})


module.exports = multer({storage:storage})