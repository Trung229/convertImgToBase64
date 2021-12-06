var express = require('express');
var router = express.Router();
const upload = require('../middlewares/upload');
const deletePost = require('../middlewares/deletePost');
const fs = require('fs');
const path = require('path');
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
  console.log(file);
  let thumbnail;
  if(file){
    if(body.MangaId){
      thumbnail = 'https://handleimg.travel4t.bandn.online/images/'+ body.MangaId+ "/" + body.count + "/" + file.filename;
    }else{
      thumbnail = 'https://handleimg.travel4t.bandn.online/images/others' + "/" + file.originalname + "/" + file.filename;

    }
  }
  res.json({ url: thumbnail });
})

router.post("/upload/chaps/delete", async function(req, res,next){
  let {params, body, file} = req;
  let myPath;
  myPath = '../public'+body.pathFromClient;
  console.log(myPath)
  fs.unlink(myPath,(err)=>{
    console.log(err);
  })
  res.json({status:true});
})

module.exports = router;
