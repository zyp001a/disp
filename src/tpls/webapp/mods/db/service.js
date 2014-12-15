rootApp.factory('^^=name$$Service', ['$http', '^^=auth$$Service', function($http, authService){
	var methods = {};
^^if(restful){$$
	methods.get = function(id){
		return $http({
			url: "/api/^^=name$$/" + id,
			method: "GET",
			headers: {
				"Authorization": "Bearer " + authService.getCred()
			}
		}).then(function(result){
			return result;
		}, function(err){
			return err;
		});
	}
	methods.post = function(data){
		return $http({
			url: "/api/^^=name$$",
			method: "POST",
			data: data,
			headers: {
				"Authorization": "Bearer " + authService.getCred()
			}
		}).then(function(result){
			return result;
		}, function(err){
			return err;
		});
	}
	methods.put = function(id, data){
		return $http({
			url: "/api/^^=name$$/" + id,
			method: "PUT",
			data: data,
			headers: {
				"Authorization": "Bearer " + authService.getCred()
			}
		}).then(function(result){
			return result;
		}, function(err){
			return err;
		});
	}

^^}$$
^^apis.forEach(function(api){$$
 ^^if(api.type == "gets"){$$
	methods.^^=api.name$$ = function(){
		return $http({
			url: "/api/^^=api.name$$",
			method: "GET",
			headers: {
				"Authorization": "Bearer " + authService.getCred()
			}
		}).then(function(result){
			return result;
		}, function(err){
			return err;
		});
	}
 ^^}else if(api.type == "post"){$$
	methods.^^=api.name$$ = function(data){
		return $http({
			url: "/api/^^=api.name$$",
			method: "POST",
			data: data,
			headers: {
				"Authorization": "Bearer " + authService.getCred()
			}
		}).then(function(result){
			return result;
		}, function(err){
			return err;
		});
	}
 ^^}else if(api.type == "get"){$$
	methods.^^=api.name$$ = function(id){
		return $http({
			url: "/api/^^=api.name$$/" + id,
			method: "GET",
			headers: {
				"Authorization": "Bearer " + authService.getCred()
			}
		}).then(function(result){
			return result;
		}, function(err){
			return err;
		});
	}

 ^^}else if(api.type == "put"){$$
	methods.^^=api.name$$ = function(id, data){
		return $http({
			url: "/api/^^=api.name$$/" + id,
			method: "PUT",
			data: data,
			headers: {
				"Authorization": "Bearer " + authService.getCred()
			}
		}).then(function(result){
			return result;
		}, function(err){
			return err;
		});
	}
 ^^}else if(api.type == "delete"){$$
 ^^}$$
^^})$$
	return methods;
}]);
