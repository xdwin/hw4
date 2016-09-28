var Gambar = require('../models/gambar');
var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var mime = require('mime');

//Multer to handle upload functionality
var multer = require('multer');
//Multer instance
var upload = multer({dest: 'public/uploads/', 
	fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|bmp)$/)) {
        return cb(new Error('Only image files are allowed!'));
    }
    var extension = file.mimetype.split('/')[1];
    console.log(extension);
    return cb(null, Date.now()+'.'+extension);
  }
}).single('image');


//Get All Images	
router.route('/getImages')
.get(function(req,res){
	Gambar.find(function(err,gambar){
		if(err)
			return res.send({success: false, message: 'Gambar not found'});
		return res.json(gambar);
	});
});


//Get Single Images
router.route('/getImage/:name')
.get(function(req,res){
	Gambar.findOne({asli_berkas: req.params.name}, function(err, gambar){
		if (err)
			return res.send({success: false, message: 'Gambar not found'});
		if (gambar==null)
			return res.send({success: false, message: 'Gambar not found'});
		return res.json(gambar);
	});
});

router.post('/postImage', function(req,res){
	upload(req, res, function(err){
		if (err) 
			return res.render('afterUpload',{message: 'An error has been occured'});
		var filename = req.file.filename;
		var fileInfo = ({
			'asli_berkas': req.file.originalname,
			'nama_berkas': req.file.filename,
			'ukuran_berkas': (req.file.size/1000)+'KB',
			'lokasi_berkas': __dirname + '/' + req.file.path,
			'mime': req.file.mimetype,
			'isi_berkas': new Buffer(fs.readFileSync(req.file.path)).toString('base64')
		});
		
	
		//Save it to db
		var gambar = new Gambar(fileInfo);
		gambar.save(function(err){
			if (err) 
				res.render('afterUpload',{message: 'An error has been occured'});
			res.render('afterUpload',{message: 'Your file has been successfully uploaded'});
		});
	});
});

module.exports=router; 