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
      if(body.MangaId){
        return 'http://mangaimg.herokuapp.com/images/'+ body.MangaId + "/" +body.count+ "/" + item.filename;
      }
      return 'http://mangaimg.herokuapp.com/images/thumbnails'+ "/" + item.filename;
    })
  }
  res.json({ url: arrUrl });
})

router.post("/upload/thumbnailManga",[upload.single('thumbnail')],async function(req, res, next) {
  let {params, body, file} = req;
  let thumbnail;
  if(file){
    if(body.MangaId){
      thumbnail = 'http://mangaimg.herokuapp.com/images/'+ body.MangaId+ "/" + body.count + "/" + file.filename;
    }else{
      thumbnail = 'http://mangaimg.herokuapp.com/images/thumbnails' + "/" + file.filename;

    }
  }
  res.json({ url: thumbnail });
})

// router.post("/upload/thumbnailManga",function(req, res, next) {
//   let {body} = req
//   res.json({ body: body });
// })
module.exports = router;
