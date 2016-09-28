var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var server = require('./routes/server');
var klien = require('./routes/klien');

var http = require('http');

var dbName = 'gambarDB';

var connectionString='mongodb://localhost/'+dbName;

mongoose.Promise = global.Promise;
mongoose.connect(connectionString);
// mongoose.connect(connectionString, function(err){
// 	mongoose.connection.db.dropDatabase();
// }); 

app.set('views',__dirname+'/views');
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(__dirname+'/public'));

app.get('/', function(req,res){
 res.render('index');
});


app.use('/tugas4/server',server);
app.use('/tugas4/klien', klien);

// To handle 404
// app.get('*', function(req, res){
//   res.render('index',{message:'[]'});
// });

app.listen(3000);
