app.controller('home_c',['$scope','statisticFactory', function($scope, statisticFactory) {


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



}]);/**
 * Created by adel on 30/05/2014.
 */
