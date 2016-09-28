var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var request = require('request');

router.route('/')
.get(function(req,res){
	request.get('http://152.118.33.94:3000/tugas4/server/getImages', function(err, response, body){
		if (err)
			res.render('afterUpload', {message:'err'});//if error, show error message
		//else show all images in index
		var result = JSON.parse(body);
		res.render('index', {message: result});
	});
});

router.route('/viewImage/:name')
.get(function(req,res){
	if (!req.params.name) {//If param not specified, send error message
		res.status(500);
		res.send({success: false, message: 'Error when retrieve the product'});
	}
	request.get('http://152.118.33.94:3000/tugas4/server/getImage/'+req.params.name, function(err, response, body){
		var result = JSON.parse(body);
		if (!err) {
			return res.render('singles',result);
		}
	});
});

router.route('/uploadImage')
.get(function(req,res){
	res.render('upload');
});

module.exports=router;