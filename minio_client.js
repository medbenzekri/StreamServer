var config=require('config')
class minio {
   constructor(){
      this.Minio= require("minio")
      this.Client=new this.Minio.Client({
         endPoint: config.get("END_POINT"),
         port:  config.get("PORT"),
         useSSL: config.get("USE_SSL"),
         accessKey: config.get("ACCESS_KEY"),
         secretKey: config.get("SECRET_KEY")
     });
   }

}

module.exports= new minio().Client