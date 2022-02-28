var express = require('express');
var router = express.Router();
var Minio = require('minio');
var videohandler=require('./handlers/video_handler');
let bucket= "video"
var minioClient = new Minio.Client({
    endPoint: '127.0.0.1',
    port: 9000,
    useSSL: false,
    accessKey: 'minioadmin',
    secretKey: 'minioadmin'
});

 
router.get('/',async function(req, res, next) {
    videos=[]
    let videoStream=await minioClient.listObjects(bucket).on("data", function (video) {
        
        videos.push(video)
    })
    videoStream.on("end",()=> res.json(videos))
    
    
  });

  module.exports = router;