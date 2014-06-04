app.controller('sura_c', ['$scope','userService','suraFactory', function($scope, userService, suraFactory) {

	$scope.suras = [];

	suraFactory.getSurasReport().then(function(promise){
		$scope.suras = promise;
	});

    $scope.isLoaded = function(){
        if($scope.suras.length >0)
            return true;
        else
            return false;
    }

    
	
}]);