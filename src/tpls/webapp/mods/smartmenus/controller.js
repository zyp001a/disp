rootApp.controller('^^=name$$Controller', function($rootScope, $scope, $location^^if(auth){$$, ^^=auth$$Service^^}$$){
	$scope.isActive=function(path){
		return path && $location.url() == path;
	};

^^if(auth){$$
	$scope.isSignedin = ^^=auth$$Service.getUser;
	$scope.getName = ^^=auth$$Service.getName;;
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
^^}$$

/*
	$scope.collapseMenu = function(){
		console.log("click");
		document.getElementById("toggle-menu").click();
//		$("#toggle-menu").click();
		}
*/


});
