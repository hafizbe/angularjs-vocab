app.factory('cardFactory', function($http, $q){
    var factory = {
        stepToWork: 0,
        stepSuraToWork: null,
        allCards: [],
        modifyStatistics : function(new_statistic,sura_id, card_id,  response, dateResponse, percentage_sura){
            if(factory.allCards[sura_id] != undefined)
            {
                angular.forEach(factory.allCards[sura_id].cards, function(card_temp){
                        if(card_id == card_temp.id)
                        {
                            card_temp.response = response
                            card_temp.date_response = dateResponse

                            factory.allCards[sura_id].point1 = new_statistic.point1;
                            factory.allCards[sura_id].point2 = new_statistic.point2;
                            factory.allCards[sura_id].point3 = new_statistic.point3;
                        }
                })
                factory.allCards[sura_id].percentage_sura = percentage_sura
            }
        },
        modifyPercentage : function(newPercentage, sura_id){
            if(factory.allCards[sura_id] != undefined)
            {
                console.log(factory)
                factory.allCards[sura_id].percentage_sura = newPercentage;
            }
        },
        modifyResponseCardAndDate : function(sura_id, card_id, response, dateResponse){
            if(factory.allCards[sura_id] != undefined)
            {
                angular.forEach(factory.allCards[sura_id].cards, function(card_temp){
                    if(card_id == card_temp.id)
                    {
                        card_temp.response = response
                        card_temp.date_response = dateResponse
                        switch(card_temp.response){
                            case 0:
                                factory.allCards[sura_id].point1 =  factory.allCards[sura_id].point1 + parseInt(1);
                                factory.allCards[sura_id].nb_cards_unknown =  factory.allCards[sura_id].nb_cards_unknown -
                                    parseInt(1);

                                break;
                            case 3:
                                factory.allCards[sura_id].point2 =  factory.allCards[sura_id].point2  + parseInt(1);
                                factory.allCards[sura_id].nb_cards_unknown =  factory.allCards[sura_id].nb_cards_unknown -
                                    parseInt(1);
                                break;
                            case 5:
                                factory.allCards[sura_id].point3 =  factory.allCards[sura_id].point3 + parseInt(1);
                                factory.allCards[sura_id].nb_cards_unknown =  factory.allCards[sura_id].nb_cards_unknown -
                                    parseInt(1);
                                break;


                        }
                    }

                })
            }

        },

        /*
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
*/
        // Récupère une carte dans l'api, sans vérifier si elle existe dans notre tableau
        getCardByIdFromApi : function(card_id){
            var deferred = $q.defer();
            $http({method:'GET', url:'http://vocab-api.herokuapp.com/api/v1/cards/'+card_id+'?' +
               'token=da34a57ce3e0582f56459a23bb8fe3d7'})
               .success(function (response, status, headers, config) {
                   deferred.resolve(response);
               })
               .error(function (data, status, headers, config) {
                   deferred.reject("Impossible de récupérer la carte");
               });
            return deferred.promise;
        },

        //Récupère toutes les cartes par sura_id
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

        //Récupère une carte par card_id et sura_id en vérifiant si elle existe dans le tableau 
        getCardBySuraIdAndCardId : function(sura_id, card_id){
            var deferred = $q.defer();
            if(factory.allCards[sura_id] != undefined)
            {
                var card = null;
                angular.forEach(factory.allCards[sura_id].cards, function(card_temp){
                    if(card_id == card_temp.id)
                        card = card_temp
                })
                deferred.resolve(card);
            }
            else
            {
                factory.getCardByIdFromApi(card_id).then(function(promise){
                    deferred.resolve(promise);
                });
            }
            return deferred.promise;
        },



    }
    return factory;
});