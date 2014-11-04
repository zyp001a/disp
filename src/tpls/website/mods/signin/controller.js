rootApp.controller('^^=name$$Controller', function($rootScope, $scope, $routeParams, ^^=auth$$Service){

    $scope.rememberme = true;
    $scope.submit = function() {
        ^^=auth$$Service.signin({
          username: $scope.username,
          password: $scope.password,
          rememberme: $scope.rememberme
        }, function(err, data){
//					console.log("done"+data);
					if(!err)
						window.location = "#"+ decodeURIComponent($routeParams.redirect);
				});
    };

/*
    $scope.loginOauth = function(provider) {
        $window.location.href = '/auth/' + provider;
    };
*/
});
