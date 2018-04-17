var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongojs = require('mongojs');
var db = mongojs('catalog', ['products']);
var ObjectId = mongojs.ObjectId;
var app = express();

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Set Static Path for index.html file
app.use(express.static(path.join(__dirname, 'public')));

// Global Vars
app.use(function(req,res,next){
    res.locals.errors = null;
    next();
});


app.get('/', function(req, res){

    db.products.find(function (err,docs) {
            res.render('index', {
                title: 'Product Catalog',
                products: docs
            });
    })

});

app.post('/products/add', function(req, res){

    var myDate = new Date();

    var dateFormat = (myDate.getMonth() + 1) + "/" + myDate.getDate() + "/" + myDate.getFullYear();
    
        var newProduct = {
            title: req.body.title,
            price: req.body.price,
            summary: req.body.summary,
            date_posted: dateFormat,
            user_id: req.body.userid,
            user_name: req.body.username,
            category: req.body.category,
            img: req.body.img
        }

        db.products.insert(newProduct, function(err, result){
            if(err) {
                console.log(err);
            }
            res.redirect('/');
        });


        console.log(newProduct);


});

app.post('/products/update', function(req,res, err){


});

app.delete('/products/delete/:id', function(req,res,err){

    db.products.remove({_id: ObjectId(req.params.id)}, function(){
        if(err){
            console.log(err);
        }
        res.redirect('/');
    });

});

app.get('/products/category/:id', function(req, res){

    db.products.aggregate([ { $match : { category : req.params.id } } ], function (err, docs) {

        res.render('category', {
            title: req.params.id + ' Category',
            products: docs
        });

    })

});

app.listen(3000, function(){
    console.log("Server Started on Port 3000...");
});