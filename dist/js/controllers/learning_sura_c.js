app.controller('learning_sura_c', ['$scope','$location','userService','$routeParams','cardFactory',
    function($scope , $location, userService, $routeParams, cardFactory) {

        cardFactory.getCardsToWorkBySuraId($routeParams.sura_id).then(function(promise){
            //console.log(cardFactory.cardsToWork);


            console.log('Je suis dans le controller');
            $location.path("/user/learning/card/"+promise[0].id);
        });


    }]);/**
 * Created by adel on 01/06/2014.
 */
