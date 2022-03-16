var express = require('express');
var router = express.Router();

/* auth user  */
router.post('/', function(req, res, next) {
    console.log(req.body);
  res.send('hello');
});
 
module.exports = router;
