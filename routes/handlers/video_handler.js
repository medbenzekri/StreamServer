var {spawn}= require('child_process');
const byteSize = require('byte-size');
const stream = require('stream');
const Client= require('../../minio_client');
var bucket= require('config').get("Bucket");
const genThumbnail = require('simple-thumbnail');
const { getVideoDurationInSeconds } = require('get-video-duration');
const pathToFfmpeg = require('ffmpeg-static');

async function Videoinfo(video){   
  
  return {
    title:video.name ,
    size:`${byteSize(video.size)}`,
    duration:await getduration(video.name),
    thumbnail:await download(video.name)
  }
}

async function getduration(name){
  
var offset = 0;
var duration = parseInt(
              await getVideoDurationInSeconds( 
               await Client.getPartialObject(bucket,name,offset)))

return `${String(~~(duration/60)).padStart(2,"0")}:${String(duration%60).padStart(2,"0")}`


}

async function download (name) {
  const ffmpeg = require('ffmpeg-static')
  var offset = 0;
  var output = new stream.Writable();
  output = await genThumbnail(await Client.getPartialObject(bucket,name,offset),'150x',{
    path:ffmpeg.path,
  })
  console.log('Done')
  return output
  
}

module.exports = { Videoinfo };