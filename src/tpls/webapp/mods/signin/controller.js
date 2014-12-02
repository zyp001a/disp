rootApp.controller('^^=name$$Controller', function($scope, $routeParams, ^^=auth$$Service){

    $scope.rememberme = true;
    $scope.submit = function() {
        ^^=auth$$Service.signin({
          username: $scope.username,
          password: $scope.password,
          rememberme: $scope.rememberme
        }, function(err, data){
//					console.log("done"+data);
					if(!err){
						if($routeParams.redirect)
							window.location = "#"+ decodeURIComponent($routeParams.redirect);
						else
							window.location = "#/";
					}
				});
    };

/*
    $scope.loginOauth = function(provider) {
        $window.location.href = '/auth/' + provider;
    };
*/
});
