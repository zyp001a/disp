rootApp.factory('^^=name$$Service', ['$http', '^^=auth$$Service', function($http, authService){
	var methods = {};

		^^if(withId){$$
	methods.request = function(id, data){
		var url = "/api/^^=posturl$$/" + id;
		^^}else{$$
	methods.request = function(data){
		var url = "/api/^^=posturl$$/";
		^^}$$
		^^if(method == "post"){$$
		var method = "POST";
		^^}else if(method = "put"){$$
		var method = "PUT";
		^^}$$
		return $http({
			url: url,
			method: method,
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

	return methods;
}]);
