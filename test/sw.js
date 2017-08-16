var ver="v1";
self.addEventListener('install',function(event){
	event.waitUntil(
		caches.open(ver).then(function(mycache){
			console.log("file added");
			mycache.addAll(["/"])
		})
	)
});

self.addEventListener("activate",function(e){
	e.waitUntil(
		caches.keys().then(function(mycache){
			mycache.forEach(function(x){
				if(x!=ver) caches.delete(x);
			})
		})
		)
})

self.addEventListener("fetch",function(e){
	e.respondWith(
		caches.match(e.request).then(function(response){
			if(response) return response;
			if(e.request.url === "http://localhost:3000/datafetch")
			{
				console.log(e.request);
				return fetch(e.request);
			}
			var req= e.request.clone();
			fetch(e.request).then(function(resp){
				res = resp.clone();
				caches.open(ver).then(function(c){
					c.put(req,resp);
				})
				return res;
			})
		})

		)
})