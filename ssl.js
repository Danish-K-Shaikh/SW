var http = require("https");
var fs = require('fs');
var path =require("path");
const webpush = require('web-push');
var httpsOptions = {
	cert:fs.readFileSync(path.join(__dirname,"ssl","PRAC","device.crt")),
	key:fs.readFileSync(path.join(__dirname,"ssl","PRAC","device.key"))
}
const vapidKeys = webpush.generateVAPIDKeys();
 
webpush.setGCMAPIKey('AAAAIMcOMeo:APA91bGsY3V3Uur7GERH-NkQggwxBmHJ4oj8sUwTyDgx9oyhkKmu_54OW00V-TZ8TKxifvfsCETtVWixm0z1nugO11o6X9MaoasuAQlTS1-UkNr8ZKseBHQJHAQmywW8XjWuCzFD7Dyf');
webpush.setVapidDetails(
  'mailto:shaikh.danish241@gmail.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

var serv = http.createServer(httpsOptions,function(req,res){
	if(req.url== "/"){
		res.writeHead(200,{
			'Content-type':'text/html',
			'name'		  : 'danish'
		});
		fs.createReadStream("sw.html").pipe(res);
	}
	else if(req.url=="/mysw.js"){
		res.writeHead(200,{
			"content-type" : "text/javascript"
		});
		fs.createReadStream("mysw.js").pipe(res);
	}
	else if(req.url=="/pushSubscribe"){
		// webpush.sendNotification(subscribeObj, 'Your Push Payload Text').then(function(e){

		// }).catch(function(err){
		// 	console.log("error : ",err);
		// })			
		res.writeHead(200,{
			'Content-type':'text/plain'
		});
		res.end("Data Recieved");
	}
	else if(req.url=="/publicKey"){
		res.writeHead(200,{
			'Content-type':'text/plain'
		});
			res.end(vapidKeys.publicKey);
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
}).listen(3000);