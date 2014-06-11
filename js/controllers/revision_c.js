app.controller('revision_c', ['$scope','statisticFactory', '$routeParams','$route','$location','interrogationFactory',
    'cardFactory',
    function($scope, statisticFactory,$routeParams,$route, $location, interrogationFactory,cardFactory) {

    $scope.show_response = false;
    $scope.card_id = $routeParams.card_id;
    $scope.name_sura = null;
    $scope.nb_cards_restantes = statisticFactory.cards_to_revise.length;

    statisticFactory.getStatisticsHome().then(function(promise){
        $scope.word_arabic = promise.cards_to_revise[0].word;
        $scope.word_traducted  = promise.cards_to_revise[0].english_m;
        $scope.name_sura = promise.cards_to_revise[0].name_sura;
    });

    $scope.aRepondu = function(){
        $scope.show_response = true;
    }

    $scope.updateRevision = function(response, card_id){
        interrogationFactory.updateInterrogation(card_id,response).then(function(promise){
            statisticFactory.deleteFirstCard();
            cardFactory.modifyStatistics(promise.statistics_sura,promise.sura_id, card_id, promise.response,
                promise.date_response, promise.percentage_sura)
           //cardFactory.modifyResponseCardAndDate(promise.sura_id, card_id, promise.response, promise.date_response);
            //cardFactory.modifyPercentage(promise.percentage_sura, promise.sura_id);
            var card = statisticFactory.getFirstCardToRevise();
            if(card != false)
                $location.path("/user/revision/card/"+card.id);
        });

    }



}]);
