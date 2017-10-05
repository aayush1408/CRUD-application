var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var connect = mongoose.connect('mongodb://localhost/crud');
var db = mongoose.connection;

var Schema = new mongoose.Schema({
	name:{type:String,required:true},
	email:{type:String}
},{collection:'table'});


var User = mongoose.model('User',Schema);
/* GET home page. */


router.get('/', function(req, res, next) {
  res.render('index', { title: 'CRUD Application' });
});

router.get('/insert', function(req, res, next) {
  res.render('insert');
});

router.get('/update', function(req, res, next) {
  res.render('update');
});

router.get('/delete', function(req, res, next) {
  res.render('delete');
});

//Insert Data

router.post('/insertdata', function(req, res, next) {
  var name = req.body.name;
  var email = req.body.email;
  var newSchema = {
  	name:name,
  	email:email
  }
  var newUser = new User(newSchema);
  newUser.save(function(err){
  	if(err) throw err;
  	console.log('Saved');
  	res.redirect('/');
  });
});


//Read Data
router.get('/read',function(req,res,next){

User.find({}).exec(function(err,result){
   if(err){
    res.send('Error has occured');
   }
   else{
    console.log(result);
    res.json(result);
   }
});
});

//Update data

router.post('/updatedata',function(req,res,next){
  var id = req.body.id;
  console.log(id);
User.findOneAndUpdate({_id:id}, 
                    { $set : {name:req.body.name,email:req.body.email} },
                    {upsert:true},
                    function(err,doc){
                      if(err){
                        console.log('Error has occured');
                      }
                      else{
                        console.log(doc);
                        res.redirect('/');
                      }
                    });

});

//Delete
router.post('/deletedata',function(req,res,next){
  User.findOneAndRemove({_id:req.body.id},function(err,doc){
  if(err){
    console.log('Error has occured');
}
else{
  console.log(doc);
  res.redirect('/');
}
  });
  });

module.exports = router;
