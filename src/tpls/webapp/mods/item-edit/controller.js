rootApp.controller('^^=name$$Controller', ['$scope', '$routeParams', '^^=db$$Service', ^^if(auth){$$'^^=auth$$Service',^^}$$ function($scope, $routeParams, DbService^^if(auth){$$, AuthService^^}$$){

^^if(param){$$
	DbService.get($routeParams.id).then(function(result){
^^}else if(single){$$
	DbService.get().then(function(result){
^^}else if(auth){$$
	DbService.get(AuthService.getUser()).then(function(result){
^^}$$
		$scope.data = result.data; 
		$scope.submit = function() {
^^if(param){$$
	    DbService.put($routeParams.id, $scope.data).then(function(result){
^^}else if(single){$$
	    DbService.put($scope.data).then(function(result){
^^}else if(auth){$$
	    DbService.put(AuthService.getUser(), $scope.data).then(function(result){
^^}$$				
				if(result.status == 200){
					alert("good");
				}
			});
		}
	});
^^schema.fields.forEach(function(field){$$
 ^^if(field.type == "Index"){$$
 ^^}else if(field.type == "Text"){$$
 ^^}$$
^^})$$


}]);
