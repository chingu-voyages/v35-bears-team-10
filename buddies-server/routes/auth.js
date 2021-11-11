var express = require('express');
var router = express.Router();

router.get("/",(req,res)=>{
  res.send("hey its auth route")
})

module.exports = router;