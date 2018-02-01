// Server.js

var express = require('express');
var nodemailer = require('nodemailer');
var multer = require('multer');
var upload = multer();
var app = express();

app.set('port', (process.env.PORT || 8080));

//set view engine to ejs
app.set('view engine', 'ejs');

app.use(express.static('public'));

// Home
app.get('/', function(req, res) {
  var drink
  res.render('index');
});

//About
app.get('/work', function(req, res) {
  res.render('work');
});

//Contact
app.get('/contact', function(req, res) {
  res.render('contact')
})

//Contact Submit
app.post('/contact', upload.single(), function(req, res, next) {


//nodemailer config
var transporter = nodemailer.createTransport('smtps://'+ process.env.emailUN +'%40gmail.com:' + process.env.emailPass +'@smtp.gmail.com');

var mailOptions = {
  from: req.body.email + req.body.name,
  to: process.env.email,
  subject: 'New Message: '+req.body.subject,
  text: req.body.body,
  html: '<b> from: ' + req.body.email + ' - ' + req.body.name +'</b><br /><hr><br /> ' + req.body.body
}

transporter.sendMail(mailOptions, function(error, info) {
  if(error) {
    console.log(error);
  } else {
    console.log('sent!' + info.response);
  }
});


//After the form is submitted display success message for a bit then refresh
setTimeout(function() {
  res.redirect('/contact');
}, 3000)

})



app.listen(app.get('port'), function() {
  console.log("Express server started on port: " + app.get('port'));
});
