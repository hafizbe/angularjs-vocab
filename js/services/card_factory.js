app.factory('cardFactory', function($http, $q){
    var factory = {
        stepToWork: 0,
        stepSuraToWork: null,
        cardsToWork: [],
        allCards: [],
        getCardsToWorkBySuraId : function(sura_id){
            var deferred = $q.defer();
            if(factory.cardsToWork.length > 0)
            {
                deferred.resolve(factory.cardsToWork);
            }
            else
            {
                $http({method:'GET', url:'http://vocab-api.herokuapp.com/api/v1/users/cards_to_work/' +
                    sura_id+'?token=da34a57ce3e0582f56459a23bb8fe3d7'})
                    .success(function (response, status, headers, config) {
                        factory.cardsToWork = response;
                        deferred.resolve(response);
                    })
                    .error(function (data, status, headers, config) {
                        deferred.reject("Impossible de récupérer les cartes");
                    });

            }
            return deferred.promise;
        },

        getAllCardsBySuraId : function(sura_id){
            var deferred = $q.defer();
            if(factory.allCards[sura_id] != undefined)
            {
                deferred.resolve(factory.allCards[sura_id]);
            }
            else
            {
                $http({method:'GET', url:'http://vocab-api.herokuapp.com/api/v1/users/'+
                    'cards_by_sura?sura_id='+sura_id+'&token=da34a57ce3e0582f56459a23bb8fe3d7'})
                    .success(function (response, status, headers, config) {
                        factory.allCards[sura_id] = response;
                        // TODO ! Faire un traitement qui stock toutes les cartes non travaillées dans cardsToWork
                        deferred.resolve(response);
                    })
                    .error(function (data, status, headers, config) {
                        deferred.reject("Impossible de récupérer les cartes");
                    });

            }
            return deferred.promise;
        },
        getCardBySuraIdAndCardId : function(sura_id, card_id){
            var deferred = $q.defer();
            if(factory.allCards[sura_id] != undefined)
            {
                angular.forEach(factory.allCards[sura_id], function(value,key){
                    console.log(key);
                })
            }
        }

    }
    return factory;
});