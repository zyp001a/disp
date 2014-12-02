rootApp.filter('slice', function() {
  return function(arr, start, end) {
		if(arr)
    return arr.slice(start, end);
  };
});

rootApp.controller('^^=name$$Controller', ['$scope', '^^=db$$Service', function($scope, dbService){
	var result = dbService.^^=api$$();
	
	result.then(function(result){
		console.log(result);
		if(result.status == 200){
			$scope.data = result.data;

			$scope.search = {};
			
	//		$scope.totalItems = $scope.data.length;
			$scope.itemsPerPage = 10;
			$scope.currentPage = 1;

			$scope.maxSize = 8;
			$scope.bigTotalItems = 175;
			$scope.bigCurrentPage = 1;
			
			$scope.pageCount = function () {
				return Math.ceil($scope.filtered.length / $scope.itemsPerPage);
			};
/*
			$scope.$watch('currentPage + itemsPerPage', function() {

				$scope.pageCount = $scope.data.slice(begin, end);
			});
*/
			// $scope.setPage = function (pageNo) {
			//   $scope.currentPage = pageNo;
			// };

			// $scope.pageChanged = function() {
			//   console.log('Page changed to: ' + $scope.currentPage);
			// };
		}
		else if(result.status){
			console.log(result.status + ": " + data.statusText);
		}
	});

	
}]);
