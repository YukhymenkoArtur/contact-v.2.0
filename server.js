var express = require('express');
var app = express();
var mongojs = require('mongojs')
var databaseUrl = 'mongodb://sujan:test@ds037234.mongolab.com:37234/meandb';
var collection = ['contactlist'];



var db = mongojs(databaseUrl, collection, {authMechanism: 'ScramSHA1'});
//var db = mongojs('contactlist', ['contactlist']);
var bodyparser = require('body-parser');



app.use(express.static(__dirname + "/public"));
app.use(bodyparser.json());

app.get('/controller', function(req,res){
	
	db.contactlist.find(function(err, docs){
		
		res.json(docs);
	});
	
});

app.post('/controller', function(req,res){
	console.log(req.body);
	db.contactlist.insert(req.body, function(err, docs){
		console.log("erro"  + err);
		console.log("docs: " + docs); 
		res.json(docs);
	});

});

app.delete('/controller/:id', function(req,res){
	var id = req.params.id;
	console.log("Delete Called");
	db.contactlist.remove({_id: mongojs.ObjectId(id)}, function(err, docs){
		
		res.json(docs);
	});

});

app.get('/controller/:id', function(req,res){
	var id = req.params.id;
	db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function(err, docs){
		console.log("inside server edit"+ docs);
		res.json(docs);
	});

});

app.put('/controller/:id', function(req,res){
	var id = req.params.id;
	db.contactlist.findAndModify({Query: {_id: mongojs.ObjectId(id)},
		update:{$set:{name: req.body.name, email: req.body.email, number:req.body.number}},
		new: false}, function(err, docs){
		
		res.json(docs);
	});

});
app.listen(3000);
console.log('server running');