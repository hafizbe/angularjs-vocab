app.controller('sura_c', ['$scope','userService', function($scope, userService) {

	$scope.suras = [];
	$scope.helloWorld = "Bonjour Adel";

	userService.getSurasReport().then(function(promise){
		$scope.suras = promise.data;
	})
	
}]);