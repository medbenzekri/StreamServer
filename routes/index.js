var express = require('express');
var cors = require('cors');
var router = express.Router();

router.use(cors())
/* GET home page. */
router.get('/products/:id', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})

module.exports = router;
