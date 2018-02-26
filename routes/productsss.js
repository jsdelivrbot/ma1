var express = require("express");
var router  = express.Router();
var Product = require("../models/product");

//GET all products/ 

router.use(function(err, res) {
  if (err) {
      res.redirect("/products/p/1");
  } else {
     res.redirect("/products/p/1");
  }
});




module.exports = router;