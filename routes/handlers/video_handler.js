const byteSize = require('byte-size');
const Client= require('../../minio_client');
//get configurations from config file 
var bucket= require('config').get("Bucket");
var host=require('config').get("IP");
const genThumbnail = require('simple-thumbnail') ; 
const { getVideoDurationInSeconds } = require('get-video-duration');
const async= require('async');

async function Videoinfo(video){   
  //gets video info from object storage 
  return {
    title:video.name ,
    size:`${byteSize(video.size)}`,
    duration:await getduration(video.name),
    thumbnail:await getthumbnailurl(video.name),

    
  }
}

async function getduration(name){
  //get duration of each video 
var offset = 0;
var duration = parseInt(
              await getVideoDurationInSeconds( 
               await Client.getPartialObject(bucket,name,offset)))

return `${String(~~(duration/60)).padStart(2,"0")}:${String(duration%60).padStart(2,"0")}`


}

 function getthumbnailurl(name){

  return `${host}video/thumbnail/${encodeURIComponent(name)}`;
  
}


async function Videos(req,res){
  //send videos info as json 
  var videos=[]
  var streamQueue = async.queue(
    async (video)=>videos.push(await Videoinfo(video))
  );
  Client.listObjects(bucket).
    on("data",streamQueue.push);
    streamQueue.drain(()=>res.json(videos))
}

async function thumbnail(req,res){
  //send thumbnail of a video 
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




}
  


module.exports = { Videos , thumbnail};