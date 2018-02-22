var express    = require("express"),
    path       = require("path"),
    app        = express(),
    mongoose   = require("mongoose"),
    config     = require('./config/database'),
    bodyParser = require("body-parser"),
    session    = require("express-session"),
    expressValidator = require("express-validator"),
    fileUpload = require("express-fileupload"),
    nodemailer = require("nodemailer"),
    passport   = require("passport");
    
    // Connect to db
    mongoose.connect("mongodb://Marat1985:1234Mr1985@ds243798.mlab.com:43798/mgidro");
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open',function(){
        console.log('Connected to mongodb!')
    })
    

    app.set('views', path.join(__dirname, 'views'));
    app.set("view engine", "ejs");
    
    // express-fileupload middleware
    app.use(fileUpload());
    
    // seeDB
    app.use(bodyParser.urlencoded({extended:false}));
    app.use(bodyParser.json());
    
    // Express-session middleware
    app.use(session({
    secret: "1234mr1985",
    resave: true,
    saveUninitialized: true,
    // cookie: { secure:true }
}));
    
        // Express-validator middleware
        app.use(expressValidator({
            errorFormatter: function(param, msg, value) {
                var namespace = param.split('.')
                , root = namespace.shift ()
                , formParam = root;
            while(namespace.length) {
                formParam += '[' + namespace.shift() + ']';
            }    
            return {
                param : formParam,
                msg : msg,
                value : value
            };
        },
        
        customValidators:{
            isImage: function(value, filename) {
                var extension = (path.extname(filename)).toLowerCase();
                switch(extension) {
                    case '.jpg':
                        return '.jpg';
                    case '.jpeg':
                        return '.jpeg';
                    case '.png':
                        return '.png';
                     case '':
                        return '.jpg' ;
                    default:
                        return false;
                }
            }
        }
    }));
    
    // Express-messages middleware
    app.use(require('connect-flash')());
    app.use(function (req, res, next) {
      res.locals.messages = require('express-messages')(req, res);
      next();
    });
    

      
    // Passport config
    require("./config/passport") (passport);
    // Passport middleware
    app.use(passport.initialize());
    app.use(passport.session());
    
    app.get('*', function(req, res, next) {
        res.locals.cart = req.session.cart;
        res.locals.user = req.user || null;
        next ();
    });
        
    // Set public folder
    app.use(express.static(path.join(__dirname, 'public')));
    
    // Set global errors variable
    app.locals.errors = null;
    
    // Get Page model
    var Page = require("./models/page");
    
    // Get all pages to pass to header.ejs
    Page.find({}).sort({sorting: 1}).exec(function(err, pages){
        if(err) {
            console.log(err);
        } else {
            app.locals.pages = pages;
        }
    });
    
    // Get Category model
    var Category = require("./models/category");
    
    // Get all Categories to pass to header.ejs
    Category.find(function(err, categories){
        if(err) {
            console.log(err);
        } else {
            app.locals.categories = categories;
        }
    });    
    
    app.get('/', function(req, res){
        res.render('index')
    });
    
    // Set routes
    var pages    = require("./routes/pages.js");
    var products    = require("./routes/products.js");
    var cart    = require("./routes/cart.js");
    var users    = require("./routes/users.js");
    var adminPages = require("./routes/admin_pages.js");
    var adminCategories = require("./routes/admin_categories.js");
    var adminProducts = require("./routes/admin_products.js");
    var productsss = require("./routes/productsss.js");
    
    app.use('/admin/pages', adminPages);
    app.use('/admin/categories', adminCategories);
    app.use('/admin/products', adminProducts);
    app.use('/products', products);
    app.use('/cart', cart);
    app.use('/users', users);
    app.use('/%D0%BA%D0%B0%D1%82%D0%B0%D0%BB%D0%BE%D0%B3-%D1%82%D0%BE%D0%B2%D0%B0%D1%80%D0%BE%D0%B2', productsss);
    app.use('/', pages);

    
    
    app.listen(59999, process.env.IP, function(){
    console.log("Server has started!!!");
});