app.controller('user_cards_c', ['$scope','userService','$routeParams','cardFactory','$anchorScroll','$location',
	function($scope, userService,$routeParams, cardFactory,$anchorScroll, $location) {
    var view = {};

    $anchorScroll();
	$scope.stats_cards = false;
    $scope.sura_id = $routeParams.sura_id;
    cardFactory.cardsJustLearned = [];
    //cardFactory.fiveCardsToLearn[$routeParams.sura_id] = [];

    cardFactory.getAllCardsBySuraId($routeParams.sura_id).then(function(promise){
		$scope.stats_cards = promise;
        //view.loadChart();
	});

    $scope.redirectToLearningCard = function(sura_id, card_id, isLearningMode)
    {
        cardFactory.modeLearningSura = isLearningMode;
        $location.path("/user/learning/sura/"+sura_id+"/card/"+card_id);
    }



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
            case 0:
                return "red";
            case 3:
                return "orange";
            case 5:
                return "green";
            default :
                return "";
        }
    }

    $scope.hasCardsToLearn = function(){
        return cardFactory.hasCardsToLearn($routeParams.sura_id);
    }

    $scope.startLearning = function(){
        //Récupération des cartes à réviser
        cardFactory.getCardsToLearn($routeParams.sura_id);

        firstCardToLearn = cardFactory.getFirstCardToLearn($routeParams.sura_id);
        $scope.redirectToLearningCard($routeParams.sura_id, firstCardToLearn.id, true)
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