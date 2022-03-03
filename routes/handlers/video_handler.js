var {spawn}= require('child_process');
const byteSize = require('byte-size');
const stream = require('stream');
const Client= require('../../minio_client');
var bucket= require('config').get("Bucket");
const { getVideoDurationInSeconds } = require('get-video-duration')
 
function Videoinfo(video){   
  return {
    title:video.name ,
    size:`${byteSize(video.size)}`,
    duration:getduration(video.name)
  }
}

async function getduration(name){
  
var offset = 0;
var minutes,seconds;
getVideoDurationInSeconds(await Client.getPartialObject(bucket,name,offset)).then((duration) => {
  duration = (duration/60);
  minutes = duration - (duration % 1);
  seconds = (duration % 1)*60;
  duration = minutes +":"+seconds.toFixed(0);
  return console.log(duration);
})
  }

module.exports = { Videoinfo };