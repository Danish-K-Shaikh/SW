var ver = "v2";
var cacheFiles = [
	"/",
	"https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"];
self.addEventListener("install",function(e){
	e.waitUntil(
		caches.open(ver).then(function(cache){
			console.log("Adding Files to cache");
			return cache.addAll(cacheFiles);
		})
	)
});

self.addEventListener("activate",function(e){
	e.waitUntil(
		caches.keys().then(function(cacheNames){
			return Promise.all(cacheNames.map(function(cacheName){
				if(cacheName!==ver){
					console.log("cacheName : ",cacheName);
					return caches.delete(cacheName);
				}
			})
			);
		})
	)
});

self.addEventListener("fetch",function(e){
	e.respondWith(
		caches.match(e.request).then(function(response){
			if(response){
				console.log("Found in cache ",e.request.url);
				return response;
			}
			if(e.request.url === "http://localhost:3000/err")
			{
				return fetch(e.request);
			}
			else{
			var reqClone = e.request.clone();
				fetch(reqClone).then(function(response){
					if(!response){
						console.log("[SW] Error fetching ",e.request);
						return response;
					}

					var respClone=response.clone();
					caches.open(ver).then(function(cacheName){
						cacheName.put(e.request,respClone);
						return response;
					})
				});
			}
		})

	)
});