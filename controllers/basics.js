var router = require('express').Router();
var pollModel = require('../models/poll');
var voteModel = require('../models/vote')
router.get('/',function(req,res){
	res.render('index',{title : "PollMe",err : req.flash('err')});
});
router.post('/',function(req,res){
	var qn = req.sanitize(req.body.qn);
	var ips = req.sanitize(req.body.ips);
	ips = ips.split(',');
	for(let i=0;i<ips.length;i++){
		let indexa = i+1;
		req.assert('ips['+i+']','Option '+indexa+' is  empty !').notEmpty();
	}
	req.assert('qn','Your question cannot be empty').notEmpty();
	req.getValidationResult().then(function(resu){
		if(!resu.isEmpty()){
			req.flash('err',resu.array());
			res.redirect('/');
		}
		else{
			var data = new pollModel({
				username : req.session.username || "noteme",
				question : qn,
				answer : ips
			});
			data.save(function(err){
				if(err){res.send(err)}
				else{
					pollModel.findOne().sort('-id').exec(function(err,succ){
						if(err){res.send(err)}
						if(succ){
							res.redirect('/'+succ.id);
						}
						else{console.log("Nothing Found So error : "+err)}
					})
					
				}
			})
				



		}
	})

})


//for getting polls


router.get('/:pid',function(req,res){
	var pid = req.sanitize(req.params.pid);
	if(isNaN(pid)){
		res.redirect("/");
	}
	else{

		pollModel.findOne({'id': pid}).exec(function(err,succ){
			if(err){res.send(err)}
			if(succ){
				res.render('show-poll',{title : succ.question,data : succ,errv : req.flash('errv')});

			}
			else{
				req.flash('err',{msg : "The requested poll doesnot exists !!"});
				res.redirect("/");
			}
		})

	}
})



// for vote

router.post('/vote/:vid',function(req,res){
	var vid = req.sanitize(req.params.vid);
	var ans = req.sanitize(req.body.ans);
	var qn = req.sanitize(req.body.dmxz);
	var ip = req.sanitize(req.ip);
	pollModel.findOne({'id':vid}).exec(function(err,succ){
		if(err){res.send(err)};
		if(!succ){
			req.flash('errv',"Oops , the poll doesnot exists");
			res.redirect('/'+vid);
		}
		else{
			var qnan = succ.answer;
			if (qnan.includes(ans)){
				//if the answer through input is in answer option
				
				voteModel.findOne({ $and : [{'ip':ip},{'vid':vid}] }).exec(function(err,succ){
					if(err){res.send(err)};
					if(succ){
						req.flash('errv',"You have already voted !!");
						res.redirect('/'+vid);
					}
					else{
						var data = new voteModel({
							qn : qn,
							vid : vid,
							ans : ans ,
							ip : ip
						});
						data.save(function(err){
							if(err){res.send(err)}
							else{
								req.flash('errv',"Done voted")
								res.redirect('/'+vid+'/r');
							}
						})
					}
				})
			}
			else{
				req.flash('errv',"Invalid Answer !!! ")
				res.redirect('/'+vid);
			}


		}
	
	})
})



//for result 
router.get('/:id/r',function(req,res){
	var id = req.sanitize(req.params.id);
	pollModel.findOne({'id':id}).exec(function(err,succ){
		if(err){res.send(err)}
		if(succ){
			voteModel.find({'vid':id}).exec(function(err,succ){
				res.render('show-votes',{title : "Votes Count",data : succ});
			})
		}
		else{
			req.flash('errv',"The poll doesnot exists !!!");
			res.redirect('/'+id);
		}
	})
})


module.exports = router;