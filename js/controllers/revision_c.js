app.controller('revision_c', ['$scope','statisticFactory', function($scope, statisticFactory) {

    statisticFactory.getStatisticsHome().then(function(promise){
        $scope.cardsToRevise = promise.cards_to_revise[0];
    });



}]);
