var express = require('express');
var router = express.Router();
var {Videos,thumbnail}=require('./handlers/video_handler');


router.get('/',Videos);
router.get('/thumbnail/:id',thumbnail);


exports.router=router;
  