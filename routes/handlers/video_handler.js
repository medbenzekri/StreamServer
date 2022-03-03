var {spawn}= require('child_process');
const byteSize = require('byte-size');
const stream = require('stream');
const Client= require('../../minio_client');
var bucket= require('config').get("Bucket");
 function Videoinfo(video){
   
   
  return {
    title:video.name ,
    size:`${byteSize(video.size)}`,
    duration:getduration(video.name)

  }

}

async function getduration(name){
  
  var offset=0
    var ffmpeg= spawn('ffmpeg', [
      '-i', '-',
      '-'
    ]);
    await (await Client.getPartialObject(bucket,name,offset)).pipe(ffmpeg.stdin,{end:true})
    .on("close",()=>{
      console.log("stream is closed")
    })
    ffmpeg.stdout.on("data",(output)=>{

      return console.log(output);
    })
    .on("end",()=>ffmpeg.kill()).on("error",()=>console.log("error\n"))
  
      
    
  }

module.exports = { Videoinfo };