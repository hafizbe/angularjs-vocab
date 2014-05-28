app.controller('user_cards_c', ['$scope','userService','$routeParams', 
	function($scope, userService,$routeParams) {
    var view = {};

	$scope.stats_cards = false;

	userService.getAllCardsBySuraId($routeParams.sura_id).then(function(promise){
		$scope.stats_cards = promise.data;
        //view.loadChart();
	});

    $scope.isLoaded = function(){
        if($scope.stats_cards== false)
            return false;
        else
            return true;
    }

    $scope.datePresent = function(card){
        if(card.date_response == null)
            return false;
        else
            return true;
    }

    $scope.detectClassPoint = function(card){
        switch(card.response){
            case 1:
                return "red"
            case 2:
                return "orange";
            case 3:
                return "green";
            default :
                return "";
        }
    }

    /*view.loadChart = function(){
        $('.easy-pie-chart').each(function(){
            $(this).easyPieChart({
                barColor: $(this).css('color'),//maybe take bar color from text color
                trackColor: '#EEEEEE',
                scaleColor: false,
                lineCap: 'butt',
                lineWidth: 8,
                animate: /msie\s*(8|7|6)/.test(navigator.userAgent.toLowerCase()) ? false : 1000,//don't animate for IE8 (too slow)
                size:100
            });
        });
    }*/



}]);