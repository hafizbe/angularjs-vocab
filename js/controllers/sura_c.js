app.controller('sura_c', ['$scope','userService', function($scope, userService) {

	$scope.suras = [];

	userService.getSurasReport().then(function(promise){
		$scope.suras = promise.data;
	})

    isLoaded = function(){
        if($scope.suras.length >0)
            return true;
        else
            return false;
    }

    
	
}]);