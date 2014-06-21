app.factory('cardFactory', function($http, $q){
    var factory = {
        stepToWork: 0,
        stepSuraToWork: null,
        modeLearningSura: false,
        allCards: [],
        cardsToLearn: [],
        fiveCardsToLearn: [],
        cardsJustLearned: [],
        stepCardToLearn: null,
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
                    if(card_id == card_temp.id){
                        card = card_temp
                        card.sura_name_phonetic = factory.allCards[sura_id].sura_name_phonetic
                    }
                        
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

        hasCardsToLearn : function(sura_id){
            if(factory.allCards[sura_id] != undefined){
                if(factory.allCards[sura_id].nb_cards_unknown == 0)
                    return false;
                else
                    return true;
            }
        },

        getCardsToLearn : function(sura_id){

            if(factory.allCards[sura_id] != undefined)
            {
                if(factory.cardsToLearn[sura_id] == undefined)
                {
                    factory.cardsToLearn[sura_id] = [];
                    angular.forEach(factory.allCards[sura_id].cards, function(card_temp){
                        if(card_temp.response === -1)
                        {
                            factory.cardsToLearn[sura_id].push(card_temp)
                        }

                    })


                }
            }
        },

        getFirstCardToLearn : function(sura_id){
            if(factory.cardsToLearn[sura_id] != undefined && factory.cardsToLearn[sura_id].length > 0){
                return factory.cardsToLearn[sura_id][0];
            }
        },

        deleteCardToLearn : function(card_id, sura_id){
            var i = 0;
            if(factory.cardsToLearn[sura_id] != undefined){
                angular.forEach(factory.cardsToLearn[sura_id], function(card_temp){

                    if(card_temp.id == card_id)
                    {
                        factory.cardsToLearn[sura_id].splice(i,1);
                    }
                    i = i +1;
                })
            }
        },
        
        get5CardsToLearn : function(sura_id){
            var numberCardsToLearn =  5 - factory.cardsJustLearned.length;

            if(factory.cardsToLearn[sura_id] != undefined){
                tabCardsToLearn = [];
                for(var i = 0 ; i < numberCardsToLearn ; i++){
                    tabCardsToLearn.push(factory.cardsToLearn[sura_id][i]);
                }

                return tabCardsToLearn;
            }



           /* var cardsToLearn = [];
            if(factory.cardsToLearn[sura_id] != undefined)
            {
               if(factory.fiveCardsToLearn.length == 0)
               {
                   factory.fiveCardsToLearn[sura_id] = []; // Initialisation
                   for(var i = 0 ; i <= 4; i++){
                       factory.fiveCardsToLearn[sura_id].push(factory.cardsToLearn[sura_id][i])
                   }
               }

               return factory.fiveCardsToLearn[sura_id];
            }*/
        }
    }
    return factory;
});