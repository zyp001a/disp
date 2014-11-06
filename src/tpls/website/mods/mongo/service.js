rootApp.factory('^^=name$$Service', ['$http', '^^=auth$$Service', function($http, authService){
	var methods = {};
^^if(restful){$$
	methods.get = function(id, fn){
		$http({
			url: "/api/^^=name$$/"+id,
			dataType: "json",
			method: "GET",
			headers: {
				"Authorization": "Bearer " + authService.getCred()
			}
		}).success(function(data){
			fn(null, data);
		}).error(function(err){
			fn(err);
		});
	}
	methods.post = function(id, data, fn){
		$http({
			url: "/api/^^=name$$/"+id,
			dataType: "json",
			method: "POST",
			data: data,
			headers: {
				"Authorization": "Bearer " + authService.getCred()
			}
		}).success(function(data){
			fn(null, data);
		}).error(function(err){
			fn(err);
		});
	}
^^}$$
^^apis.forEach(function(api){$$
 ^^if(api.type == "getList"){$$
	methods.^^=api.name$$ = function(){
		return $http({
			url: "/api/^^=api.name$$",
			dataType: "json",
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
 ^^}else if(api.type == "get"){$$
 ^^}else if(api.type == "put"){$$
 ^^}else if(api.type == "delete"){$$
 ^^}$$
^^})$$
	return methods;
}]);
