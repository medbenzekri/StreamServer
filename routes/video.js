var express = require('express');
var router = express.Router();
var {Videoinfo}=require('./handlers/video_handler');
var Client=require("../minio_client");
var bucket= require('config').get("Bucket");
var async = require("async");


router.get('/',async function(req, res, next) {
    var videos=[]
    var streamQueue = async.queue(
      async (video)=>videos.push(await Videoinfo(video))
    );
    Client.listObjects(bucket).
      on("data",streamQueue.push);
      streamQueue.drain(()=>res.json(videos))
  });

  exports.router=router;
  