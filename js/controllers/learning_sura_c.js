app.controller('learning_sura_c', ['$scope','$location','userService','$routeParams',
    function($scope , $location, userService, $routeParams) {

        userService.getCardsToWorkBySuraId($routeParams.sura_id).then(function(promise){
            $location.path("/user/learning/card/"+promise.data[0].id);
        });


    }]);/**
 * Created by adel on 01/06/2014.
 */
