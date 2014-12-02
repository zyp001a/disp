rootApp.factory('^^=name$$Service', ['$http', ^^if(auth){$$'^^=auth$$Service',^^}$$ function($http^^if(auth){$$, authService^^}$$){
	var methods = {};
^^if(file){$$
	methods.get = function(){
		return $http({
			url: "/api/^^=name$$",
			method: "GET"^^if(auth){$$,
			headers: {
				"Authorization": "Bearer " + authService.getCred()
			}^^}$$
		}).then(function(result){
			return result;
		}, function(err){
			return err;
		});
	}
	methods.put = function(data){
		return $http({
			url: "/api/^^=name$$",
			method: "PUT",
			data: data^^if(auth){$$,,
			headers: {
				"Authorization": "Bearer " + authService.getCred()
			}^^}$$
		}).then(function(result){
			return result;
		}, function(err){
			return err;
		});
	}
^^}else{$$
^^}$$

	return methods;
}]);
