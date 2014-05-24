app.controller('user_cards_c', ['$scope','userService','$routeParams', 
	function($scope, userService,$routeParams) {


	$scope.cards = [];

	userService.getAllCardsBySuraId($routeParams.sura_id).then(function(promise){
		$scope.cards = promise.data;
	})

}]);