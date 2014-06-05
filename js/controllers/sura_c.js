app.controller('sura_c', ['$scope','userService','suraFactory', function($scope, userService, suraFactory) {

	$scope.suras = [];

    $scope.limit = 20;
	suraFactory.getSurasReport().then(function(promise){
		$scope.suras = promise;
	});


    $scope.showAllSuras = function(){
       $scope.limit = 114;

    }

    $scope.isLoaded = function(){
        if($scope.suras.length >0)
            return true;
        else
            return false;
    }

    
	
}]);