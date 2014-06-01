app.controller('learning_sura_c', ['$scope','$location','userService',
    function($scope , $location, userService) {
        userService.getCardsToWorkBySuraId(1).then(function(promise){
            $location.path("/user/learning/card/"+promise.data[0].id);
        });


    }]);/**
 * Created by adel on 01/06/2014.
 */
