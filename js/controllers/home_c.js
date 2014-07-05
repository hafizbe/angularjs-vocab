app.controller('home_c',['$scope','statisticFactory','$location','$rootScope', function($scope, statisticFactory,
                                                                                        $location, $rootScope) {
    $rootScope.ariane = {
        name : "Accueil",
        histo : []
    };

    statisticFactory.getStatisticsHome().then(function(promise){
        $scope.cardsToReviseCount = promise.cards_to_revise.length;
        $scope.percentageQuran = promise.percentage_total;

        //view.loadChart();
    });

    $scope.isLoaded = function(){
        if($scope.cardsToReviseCount != undefined)
            return true;
        else
            return false;
    }

    $scope.redirectToRevisionCard = function(){
        var card = statisticFactory.getFirstCardToRevise();
        if(card != false)
            $location.path("/user/revision/card/"+card.id);
    }



}]);/**
 * Created by adel on 30/05/2014.
 */
