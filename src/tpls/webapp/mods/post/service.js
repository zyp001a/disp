rootApp.factory('^^=name$$Service', ['$http', '^^=auth$$Service', function($http, authService){
	var methods = {};
	methods.post = function(data){
		return $http({
			url: "/api/^^=posturl$$/",
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
	return methods;
}]);
