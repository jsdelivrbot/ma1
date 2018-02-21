var express = require("express");
var router  = express.Router();
var Product = require("../models/product");

//GET all products/ 

router.use(function(err, res) {
  if (err) {
      res.redirect("/products/");
  } else {
     res.redirect("/products/");
  }
});




module.exports = router;