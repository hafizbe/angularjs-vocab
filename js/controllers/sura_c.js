app.controller('sura_c', ['$scope','userService','suraFactory','$rootScope','$cookieStore',
    function($scope, userService, suraFactory,$rootScope, $cookieStore) {

    // Définition du rootScope //
    $rootScope.hideLayout = function(){
        return false;
    };
    $rootScope.classLayout = function(){
        return "no-skin";
    };
    $rootScope.pageContent = function(){
        return "page-content";
    };
    $rootScope.ariane = {
            name : "Sourates",
            histo : [{
                name :"Accueil",
                link :"/#"
            }]
        };
    /***************************************************************************************************************/
    /***************************************************************************************************************/
    /***************************************************************************************************************/

	$scope.suras = [];
    $scope.limit = 20;
	suraFactory.getSurasReport($cookieStore.get('token')).then(function(promise){
		$scope.suras = promise;
	});

    $scope.showAllSuras = function(){
       $scope.limit = 114;

    };
    $scope.isLoaded = function(){
        if($scope.suras.length >0)
            return true;
        else
            return false;
    }

}]);