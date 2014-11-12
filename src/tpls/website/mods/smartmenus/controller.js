rootApp.controller('^^=name$$Controller', function($rootScope, $scope, $location, ^^=auth$$Service){
	$scope.isActive=function(path){
		return $location.url() == path;
	};
	$scope.isSignedin = ^^=auth$$Service.getUser;

	$scope.getName = ^^=auth$$Service.getName;;

	$scope.collapseMenu = function(){
		console.log("click");
		document.getElementById("toggle-menu").click();
//		$("#toggle-menu").click();
		}
^^function expandSubNavbar(sn){$$
	^^sn.forEach(function(navitem){$$
		^^if(navitem.signedin){$$
	$scope.signout = ^^=auth$$Service.signout;
		^^}$$
	^^})$$
^^}$$
^^if(left){
	expandSubNavbar(left)
}if(right){
	expandSubNavbar(right)
}$$



});
