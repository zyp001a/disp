rootApp.controller('^^=name$$Controller', ['$scope', '$routeParams', '^^=name$$Service', function($scope, $routeParams, PostService){
	$scope.result = "";
	$scope.data = {};
^^fields.forEach(function(field){
	if(field.example){$$
	$scope.data.^^=field.name$$ = "^^=field.example$$";
^^}})$$

	$scope.submit = function() {
^^if(defaultParams){$$
		var defaultParams = ^^=JSON.stringify(defaultParams, undefined, 2)$$;
		for (var key in defaultParams){
			$scope.data[key] = defaultParams[key];
		}
^^}$$
^^if(withId){$$
		var id = $scope.data.id;
		PostService.request(id, $scope.data).then(function(result){
^^}else{$$
		PostService.request($scope.data).then(function(result){
^^}$$
			if(result.status == 200){
				$scope.result = JSON.stringify(result.data, undefined, 2);
			}
		});
	}
}]);
