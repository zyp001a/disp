rootApp.controller('^^=name$$Controller', ['$scope', '$routeParams', '^^=db$$Service', ^^if(!param){$$'^^=auth$$Service',^^}$$ function($scope, $routeParams, DbService^^if(!param){$$, AuthService^^}$$){
^^if(param){$$
	DbService.get($routeParams.id).then(function(result){
		$scope.data = result.data;

^^}else{$$
	DbService.get(AuthService.getUser()).then(function(result){
		$scope.data = result.data; 
^^}$$

^^schema.fields.forEach(function(field){$$
 ^^if(field.type == "Index"){$$
	$scope.^^=field.name$$map=^^=JSON.stringify(field.map)$$;
 ^^}else if(field.type == "Text"){$$
//	$scope.data.^^=field.name$$ = "<div>" + $scope.data.^^=field.name$$.replace(/\n/g, "<br/>") + "<div/>";
 ^^}$$
^^})$$

	});


}]);
