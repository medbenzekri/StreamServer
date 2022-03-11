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
   var path={
       path:require('config').get("ffmpeg")
     }
  var id=decodeURIComponent(req.params.id)
  

 var  thumbstream=await genThumbnail(null,null,"400x?",path);
   await (await Client.getObject(bucket,id))
   .pipe(thumbstream)
   .pipe(res)
   thumbstream.on("error",(error)=>{
     if(error.code!="EPIPE")
      console.log("error")
     
    })




})


  exports.router=router;
  