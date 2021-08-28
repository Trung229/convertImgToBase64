var express = require('express');
var router = express.Router();
const upload = require('../middlewares/upload');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/upload/chaps",[upload.array('chaps')],async function(req, res, next) {
  let {params, body, files} = req
  let arrUrl = [];
  console.log(files)
  if(files){
    arrUrl = files.map((item,index) => {
      return 'http://localhost:7000/images/' + item.originalname;
    })
  }
  res.json({ url: arrUrl });
})

router.post("/upload/thumbnailManga",[upload.single('thumbnail')],async function(req, res, next) {
  let {params, body, file} = req
  let thumbnail;
  if(file){
    thumbnail = 'http://localhost:7000/images/' + file.originalname;
  }
  res.json({ url: thumbnail });
})

// router.post("/upload/thumbnailManga",function(req, res, next) {
//   let {body} = req
//   res.json({ body: body });
// })
module.exports = router;
