var mongoose = require('mongoose');
var ai = require('mongoose-auto-increment');
ai.initialize(mongoose.connection);
var schema = mongoose.Schema;
var pollSchema = new schema ({
	username : {type : String, default : 'noteme'},
	question : {type : String},
	answer : {type : Array},
	time : {type : Date , default : Date.now}
});
pollSchema.plugin(ai.plugin,{
	model : 'pollModel',
	field : 'id',
	startAt  : 1,
	incrementBy : 1
});
var pollModel = mongoose.model('pollModel',pollSchema);
module.exports = pollModel;