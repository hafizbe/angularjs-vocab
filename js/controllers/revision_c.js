app.controller('revision_c', ['$scope','statisticFactory', '$routeParams','$route','$location','interrogationFactory',
    'cardFactory','$rootScope','$cookieStore','audioFactory',
    function($scope, statisticFactory,$routeParams,$route, $location, interrogationFactory,cardFactory, $rootScope,
             $cookieStore, audioFactory) {



    $scope.show_response = false;
    $scope.card_id = $routeParams.card_id;
    $scope.sura_id = null;
    $scope.name_sura = null;
    $scope.nb_cards_restantes = statisticFactory.cards_to_revise.length;
    $scope.soundLoaded = false;


    statisticFactory.getStatisticsHome($cookieStore.get('token')).then(function(promise){
        $scope.word_arabic = promise.cards_to_revise[0].word;
        $scope.word_traducted  = promise.cards_to_revise[0].french_m;
        $scope.name_sura = promise.cards_to_revise[0].name_sura;
        $scope.playCard(promise.cards_to_revise[0].sura_id);

        $scope.sura_id = promise.cards_to_revise[0].sura_id;



        $rootScope.ariane = {
            name : "Révision  - "+$scope.name_sura ,
            histo : [
                {name :"Accueil",
                    link :"/#"
                }
                ]
        };
    });

    $scope.aRepondu = function(){
        $scope.show_response = true;
    }

    $scope.updateRevision = function(response, card_id){
        interrogationFactory.updateInterrogation(card_id,response, $cookieStore.get('token')).then(function(promise){
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

    $scope.playCard = function(sura_id){
        console.log(sura_id);
        AWS.config.update({accessKeyId: audioFactory.accessKeyId, secretAccessKey: audioFactory.secretAccessKey});
        var params = {
            Bucket: 'word-audio', // required
            Key: sura_id+'/'+$routeParams.card_id+'.mp3'
        }

        new AWS.S3().getSignedUrl('getObject', params, function (err, url) {
            // TODO : Faire en sorte que si le son est déjà créer, ne pas le re-télécharger


            var mySound = soundManager.createSound({
                url: url,
                id: $routeParams.card_id
            });
            mySound.play({
                onload: function() {
                    $scope.$apply(function() {
                        $scope.soundLoaded = true;
                    });
                },
                onfinish: function(){
                    $scope.$apply(function(){
                        $scope.soundLoaded = true;
                    });

                }
            });
        });
    };

    $scope.replay = function(){
        $scope.playCard($scope.sura_id);
    }




}]);
