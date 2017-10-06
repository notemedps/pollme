var app = require('express')();
var bparser = require('body-parser');
var validator = require('express-validator');
var sanitizer = require('express-sanitizer');
var session = require('express-session');
var flash = require('express-flash');
app.use(session({
	secret : 'fdjf937923720@)#(*&(YHEYT@',
	saveUninitialized : true,
	resave : false
}));
app.use(flash())
app.use(bparser.urlencoded({extended : true}));
app.use(validator());
app.use(sanitizer());
//static files on assets folder
app.use(require('express').static('assets'));
//setting view engine
app.set('view engine','ejs')
//using all routes at once
var normalizedPath = require("path").join(__dirname, "controllers");
require("fs").readdirSync(normalizedPath).forEach(function(file) {
 app.use(require('./controllers/'+file));
});
//connecting to database
require('./models/connection');
var port = 3030 || process.env.PORT;
app.listen(port, function(){
	console.log("App is up at port "+port);
});
