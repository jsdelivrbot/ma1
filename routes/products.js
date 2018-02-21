var express = require("express");
var router  = express.Router();
var Product = require("../models/product");
var Category = require("../models/category");
var fs = require("fs-extra");

//GET all products/ 

// router.get("/", function(req, res){
//     res.render('index', {
//         title: 'Home'
//     });
// });

router.get("/", function(req, res){
    var noMatch = null;
    if (req.query.search) {
       const regex = new RegExp(escapeRegex(req.query.search), 'gi');
    Product.find({desc: regex}, function(err, products) {
        if(err) { 
            console.log(err); 
        } else {
        if (products.length < 1) {
            
            noMatch = req.flash('danger', 'Нет такого названия в базе данных');
        }
            res.render('search', {
                title: 'Ответ на Ваш Запрос',
                products: products,
                noMatch: noMatch
            });
        }
    });
    
    } else {
    
    Product.find(function(err, products){
        if(err)  {
            console.log(err);
        } else {
        
            res.render('all_products', {
                title: 'All products',
                products: products,
                noMatch: noMatch
            });
        }
     });
}
});    





// Get products by category

router.get("/:category", function(req, res){
    
    var categorySlug = req.params.category;
    
    Category.findOne({slug: categorySlug}, function(err, category) {
        
            Product.find({category: categorySlug}, function(err, products){
        if(err)  console.log(err);
        
            res.render('cat_products', {
                title: category.title,
                products: products
            }); 
});
});

});
// Get product details 

router.get("/:category/:product", function(req, res){
    
    var galleryImages = null;
    
    Product.findOne({slug: req.params.product}, function(err, product){
        if(err) {
            console.log(err);
        } else {
            var galleryDir = 'public/product_images/' + product._id + '/gallery';
            fs.readdir(galleryDir, function(err, files){
                if(err) {
                    console.log(err);
                } else {      
                    galleryImages = files;
                    res.render('product', {
                        title:product.title,
                        p:product,
                        galleryImages:galleryImages
                    });       
                }
            });
        }    
    });
    
});

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router;