rootApp.controller('^^=name$$Controller', ['$scope', '$routeParams', '^^=db$$Service', ^^if(auth){$$'^^=auth$$Service',^^}$$ function($scope, $routeParams, DbService^^if(auth){$$, AuthService^^}$$){
^^if(param){$$
	DbService.get($routeParams.id).then(function(result){
^^}else if(single){$$
	DbService.get().then(function(result){
^^}else if(auth){$$
	DbService.get(AuthService.getUser()).then(function(result){
^^}$$
		$scope.data = result.data; 
^^schema.fields.forEach(function(field){$$
 ^^if(field.type == "Index"){$$
	$scope.^^=field.name$$map=^^=JSON.stringify(field.map)$$;
 ^^}else if(field.type == "Text"){$$
   if(!$scope.data.^^=field.name$$) $scope.data.^^=field.name$$ = "无";
//	$scope.data.^^=field.name$$ = "<div>" + $scope.data.^^=field.name$$.replace(/\n/g, "<br/>") + "<div/>";
 ^^}$$
^^})$$

	});


}]);
