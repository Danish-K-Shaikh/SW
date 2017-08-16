var ver="v4";
self.addEventListener("install",function(e){
	e.waitUntil(
		caches.open(ver).then(function(cache){
			
			return cache.addAll(["/"]);
		})
	)
});

self.addEventListener("activate",function(e){
	e.waitUntil(
		caches.keys().then(function(cache){
			cache.forEach(x => {
				if(x!==ver) caches.delete(x);
			});
		})
	)
});

self.addEventListener("fetch",function(e){
	e.respondWith(
			caches.match(e.request).then(function(res){
				if(res) return res;
				console.log(e.request);

				var req = e.request.clone();
				fetch(req).then(function(resp){

					if(!resp){
						console.log("error fetching : ",e.request);
						return 
					}
					var response = resp.clone();
					caches.open(ver).then(function(cache){
						cache.put(e.request,response);
					})
				return resp;
				})
			})
	);
});



self.addEventListener("push",function(e){
	e.waitUntil(
		self.registration.showNotification("ITRANKERSe",{
			body : "This is the body",
			icon : "http://itrankers.com/file/2017/06/Webp.net-resizeimage.jpg"
		})
	)
})

self.addEventListener("notificationclick",function(){
	console.log(e.notification);
})