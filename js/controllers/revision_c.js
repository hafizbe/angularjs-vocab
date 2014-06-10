app.controller('revision_c', ['$scope','statisticFactory', '$routeParams','$route','$location',
    function($scope, statisticFactory,$routeParams,$route, $location) {

    $scope.show_response = false;
    $scope.card_id = $routeParams.card_id;

    statisticFactory.getStatisticsHome().then(function(promise){
        $scope.word_arabic = promise.cards_to_revise[0].word;
        $scope.word_traducted  = promise.cards_to_revise[0].english_m;
        $scope.name_sura = "Nom de la sourate a définir ..";
    });

    $scope.aRepondu = function(){
        $scope.show_response = true;
    }

    $scope.updateRevision = function(response, card_id){
        statisticFactory.deleteFirstCard();
        var card = statisticFactory.getFirstCardToRevise();
        if(card != false)
            $location.path("/user/revision/card/"+card.id);
    }



}]);
