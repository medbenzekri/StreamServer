var {spawn}= require('child_process');
const byteSize = require('byte-size');
const stream = require('stream');
const Client= require('../../minio_client');
var bucket= require('config').get("Bucket");
const { getVideoDurationInSeconds } = require('get-video-duration')

async function Videoinfo(video){   
  
  return {
    title:video.name ,
    size:`${byteSize(video.size)}`,
    duration:await getduration(video.name)
  }
}

async function getduration(name){
  
var offset = 0;
var duration = parseInt(
              await getVideoDurationInSeconds( 
               await Client.getPartialObject(bucket,name,offset)))

return `${String(~~(duration/60)).padStart(2,"0")}:${String(duration%60).padStart(2,"0")}`


}
module.exports = { Videoinfo };