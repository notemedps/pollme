var mongoose = require('mongoose');
var ai = require('mongoose-auto-increment');
ai.initialize(mongoose.connection);
var schema = mongoose.Schema;
var voteSchema = new schema({
	vid : {type : Number},
	qn : {type : String},
	ans : {type : String},
	ip : {type : String}
});
var voteModel = mongoose.model('voteModel',voteSchema);
module.exports = voteModel;