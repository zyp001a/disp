rootApp.controller('^^=name$$Controller', ['$scope', '$routeParams', '^^=name$$Service', function($scope, $routeParams, PostService){
	$scope.submit = function() {
		PostService.post($scope.data).then(function(result){
			if(result.status == 200){
				alert("good");
			}
		});
	}
}]);
