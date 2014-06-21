app.factory('learningFactory', function(cardFactory){
    var factory = {
        fiveCardsToLearn: [],
        cardsJustLearned: [],
        cardsToLearn: [],
        modeLearningSura: false,
        hasCardsToLearn : function(sura_id){
            if(cardFactory.allCards[sura_id] != undefined){
                if(cardFactory.allCards[sura_id].nb_cards_unknown == 0)
                    return false;
                else
                    return true;
            }
        },
        getCardsToLearn : function(sura_id){

            if(cardFactory.allCards[sura_id] != undefined)
            {
                if(factory.cardsToLearn[sura_id] == undefined)
                {
                    factory.cardsToLearn[sura_id] = [];
                    angular.forEach(cardFactory.allCards[sura_id].cards, function(card_temp){
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
        get5CardsToLearn : function(sura_id){
            var numberCardsToLearn =  5 - factory.cardsJustLearned.length;

            if(factory.cardsToLearn[sura_id] != undefined){
                tabCardsToLearn = [];
                for(var i = 0 ; i < numberCardsToLearn ; i++){
                    tabCardsToLearn.push(factory.cardsToLearn[sura_id][i]);
                }
                console.log()
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
        },
        getLearningStepStatistic : function (nbCardsLearned){
            return (factory.cardsJustLearned.length * 100) / 5;
        }
    };

    return factory;
});
