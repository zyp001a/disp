rootApp.factory('^^=name$$Service', function($http, $cookieStore, $location){
  var currentUser = $cookieStore.get('user') || { username: ''};
	function getUser(){
		return $cookieStore.get('username');
	}
	function getName(){
		return $cookieStore.get('name');
	}
	function getCred(){
		return $cookieStore.get('token');
	};
  return {
		getName: getName,
		getCred: getCred,
		getUser: getUser,
    signin: function(user, done) {

      $http.post('/api/^^=signin$$', user).success(function(data){
        $cookieStore.put("token", data.token);
        $cookieStore.put("username", data.username);
        $cookieStore.put("name", data.name);
				if(done) done(null, data);
      }).error(function(err){
				if(done) done(err, null);
			});

    },
    signup: function(user) {
      $http.post('/api/^^=signup$$', user).success(function(data) {
      }).error(function(err){
			});
    },
    signout: function() {
			$cookieStore.remove("token");
			$cookieStore.remove("username");
			$cookieStore.remove("name");
			$location.path("/");
    }
  };
});

/*
rootApp.factory('^^=name$$TokenInterceptor', function ($q, $window, $location, ^^=name$$Service) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            if ($window.sessionStorage.token) {
                config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
            }
            return config;
        },
 
        requestError: function(rejection) {
            return $q.reject(rejection);
        },
 
        //Set Authentication.isAuthenticated to true if 200 received 
        response: function (response) {
            if (response != null && response.status == 200 && $window.sessionStorage.token && !^^=name$$Service.isAuthenticated) {
                ^^=name$$Service.isAuthenticated = true;
            }
            return response || $q.when(response);
        },
 
        //Revoke client authentication if 401 is received 
        responseError: function(rejection) {
            if (rejection != null && rejection.status === 401 && ($window.sessionStorage.token || ^^=name$$Service.isAuthenticated)) {
                delete $window.sessionStorage.token;
                ^^=name$$
Service.isAuthenticated = false;
                $location.path("/admin/login");
            }
 
            return $q.reject(rejection);
        }
    };
});
*/
