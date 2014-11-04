rootApp.controller('^^=name$$Controller', function($rootScope, $scope, ^^=auth$$Service){

    $scope.rememberme = true;
    $scope.submit = function() {
        ^^=auth$$Service.signin({
          username: $scope.username,
          password: $scope.password,
          rememberme: $scope.rememberme
        }, function(err, data){
					console.log("done"+data);
				});
    };

/*
    $scope.loginOauth = function(provider) {
        $window.location.href = '/auth/' + provider;
    };
*/
});
