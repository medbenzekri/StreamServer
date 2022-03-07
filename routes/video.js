var express = require('express');
var router = express.Router();
var {Videoinfo}=require('./handlers/video_handler');
var Client=require("../minio_client");
var bucket= require('config').get("Bucket");
var async = require("async");
const genThumbnail = require('simple-thumbnail')  


router.get('/',async function(req, res, next) {
    var videos=[]
    var streamQueue = async.queue(
      async (video)=>videos.push(await Videoinfo(video))
    );
    Client.listObjects(bucket).
      on("data",streamQueue.push);
      streamQueue.drain(()=>res.json(videos))
  });

router.get('/thumbnail/:id',async(req,res,next)=>{
  var id=decodeURIComponent(req.params.id)
  await genThumbnail(await Client.getPartialObject(bucket,id,0),res,"150x100")
  res.on("finish",res.end)
  
})


  exports.router=router;
  