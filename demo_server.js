var http = require("http");

var serv = http.createServer(function(req,res){
	res.writeHead(404,{
		'Content-type':'text/html',
		'name'		  : 'danish'
	});
	res.end("index.html");
}).listen(3000);


serv.on('connect',(req,cltsocket,head)=>{
	console.log("connect called");
})

console.log(serv);
console.log("Server Started");
