app.controller('controller1', ['$scope', 'testService', function($scope, testService) {


	
	testService.getData().then(function(promise){
		$scope.helloWorld = promise.data;
	})

}]);