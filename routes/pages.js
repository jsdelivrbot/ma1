var express = require("express");
var router  = express.Router();
var Page = require("../models/page");

//GET / 

router.get("/", function(req, res){
    res.render('index', {
        title: 'Home'
    });
});

//GET a page

router.get("/:slug", function(req, res){
    
    var slug = req.params.slug;
    Page.findOne({slug: slug}, function(err, page){
        if(err) console.log(err);
        if (!page) {
            res.redirect('/');
        } else {
            res.render('index1', {
                title: page.title,
                content: page.content
            }); 
        }
    });
    
});

module.exports = router;