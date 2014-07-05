app.controller('sura_c', ['$scope','userService','suraFactory','$rootScope','$cookieStore',
    function($scope, userService, suraFactory,$rootScope, $cookieStore) {

    alert($cookieStore.get("token"));
    $rootScope.ariane = {
        name : "Sourates",
        histo : [{
            name :"Accueil",
            link :"/#"
        }]
    };

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