var {spawn}= require('child_process');
const byteSize = require('byte-size');
const Client= require('../../minio_client');
var bucket= require('config').get("Bucket");
var host=require('config').get("IP");
const genThumbnail = require('simple-thumbnail')  
const { getVideoDurationInSeconds } = require('get-video-duration');
const { Server } = require('http');
async function Videoinfo(video){   
  
  return {
    title:video.name ,
    size:`${byteSize(video.size)}`,
    duration:await getduration(video.name),
    thumbnail:await getthumbnail(video.name),

    
  }
}

async function getduration(name){
  
var offset = 0;
var duration = parseInt(
              await getVideoDurationInSeconds( 
               await Client.getPartialObject(bucket,name,offset)))

return `${String(~~(duration/60)).padStart(2,"0")}:${String(duration%60).padStart(2,"0")}`


}

async function getthumbnail(name){

  return `${host}video/thumbnail/${encodeURIComponent(name)}`;
  
}

module.exports = { Videoinfo };