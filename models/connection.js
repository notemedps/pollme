var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var connect = mongoose.connect('mongodb://localhost/poll',{useMongoClient : true});
mongoose.connection.once('open',function(){
	console.log("Connection to database has been established");
}).on('error',function(err){
	console.log("Connection to the database couldnot be esatablished . "+err);
});