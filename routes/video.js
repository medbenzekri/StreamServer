var express = require('express');
var router = express.Router();
var {Videoinfo}=require('./handlers/video_handler');
var Client=require("../minio_client");
var bucket= require('config').get("Bucket");

router.get('/',async function(req, res, next) {
    var videos=[]
    let videoStream=await Client.listObjects(bucket).
    on("data", (video)=>videos.push(Videoinfo(video)));
    videoStream.on("end",()=> res.json(videos))
  });

  exports.router=router;
 