
rootApp.run(function ($rootScope, ^^=name$$Service) {
    $rootScope.$on("$routeChangeStart", function (event, next, current) {
        if (next.access<3) {
          if(!^^=name$$Service.getUser()){
						
						console.log("redirect");
						event.preventDefault();
						window.location = "#/^^=signin$$?redirect=" + 
							encodeURIComponent(next.\$\$route.originalPath);		
					}
        }
    });
});
/*
rootApp.config(function ($httpProvider) {
    $httpProvider.interceptors.push('^^=name$$TokenInterceptor');
});
*/
