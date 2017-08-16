var http = require("http");
var fs = require('fs');
var serv = http.createServer(function(req,res){
	if(req.url== "/"){
		res.writeHead(200,{
			'Content-type':'text/html',
			'name'		  : 'danish'
		});
		res.end("demoApp");
		// fs.createReadStream("practice.html").pipe(res);
	}
	else if(req.url=="/sw"){
		res.writeHead(200,{
			"content-type" : "text/javascript"
		});
		fs.createReadStream("test/sw.js").pipe(res);
	}
	else if(req.url=="/data"){
		var form = new formidable.IncomingForm();
		form.parse(req,function(err,fields,files){
			console.log(fields.name);
		});
		res.writeHead(200,{
			'Content-type':'text/plain'
		});
		res.end("This is data from Server");
	}
	else if(req.url=="/datafetch"){
		res.writeHead(200,{
			'Content-type':'text/plain'
		});
			res.end("This is data from second Server");
	}
	else if(req.url=="/err"){
		res.writeHead(200,{
			'Content-type':'text/plain'
		});
		console.log("errr");
			res.end("This is data from second Server");
	}
	else{
		res.writeHead(404,{

		});
		res.end("Page really not found");
	}
}).listen(5000);