app.controller('home_c',['$scope','statisticFactory','$location','$rootScope','$cookieStore',
    function($scope, statisticFactory, $location, $rootScope, $cookieStore) {
    $rootScope.ariane = {
        name : "Accueil",
        histo : []
    };
    $rootScope.classLayout = function(){
        return "no-skin";
    };
    $rootScope.pageContent = function(){
        return "page-content";
    };
    $rootScope.hideLayout = function(){
        return false;
    };
    //da34a57ce3e0582f56459a23bb8fe3d7
    //$cookieStore.put('token','adel');


    console.log("Le token est :"+$cookieStore.get('token'));
    statisticFactory.getStatisticsHome($cookieStore.get('token')).then(function(promise){
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
