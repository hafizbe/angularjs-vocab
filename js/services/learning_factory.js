app.factory('learningFactory', function(cardFactory){
    var factory = {
        cardsToLearnStep: [],
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
        get5CardsToLearn : function(sura_id, nbCardsToLearnByStep){

            if(nbCardsToLearnByStep < 5)
                var numberCardsToLearn =  nbCardsToLearnByStep;
            else
                var numberCardsToLearn =  nbCardsToLearnByStep - factory.cardsJustLearned.length;

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
        },
        getLearningStepStatistic : function (nbCardsLearned){
            return (factory.cardsJustLearned.length * 100) / nbCardsLearned;
        },
        clearCardsJustLearned : function(){
            factory.cardsJustLearned = [];
        },

        // Indique le nombre de carte à réviser pour une étape
        getNbCardsToLearnInStep : function(sura_id, nbCardsByStep){
            var nb = null;
            if(factory.cardsToLearn[sura_id] != undefined)
            {
                if(factory.cardsToLearn[sura_id].length < nbCardsByStep)
                    nb = factory.cardsToLearn[sura_id].length;
                else
                    nb = nbCardsByStep;
            }
            return nb;
        },
        getCardsToLearnStep : function(nbCardsByStep, sura_id){
            if(factory.cardsToLearn[sura_id] != undefined){
                if(factory.cardsToLearnStep.length == 0 || factory.learningStepFinished())
                {
                    factory.cardsToLearnStep = [];
                    for(var i = 0 ; i < nbCardsByStep ; i++)
                    {
                        factory.cardsToLearnStep.push(factory.cardsToLearn[sura_id][i]);
                        factory.cardsToLearnStep[i].state_learning = false;
                    }
                }
            }
            return factory.cardsToLearnStep;

        },
        learningStepFinished : function(){
            var finished = false;
            var nb_step_finished = 0;

            for(var i = 0; i < factory.cardsToLearnStep.length ; i ++){
                if(factory.cardsToLearnStep[i].state_learning)
                    nb_step_finished++;
            }

            if(nb_step_finished == factory.cardsToLearnStep.length)
                finished = true;

            return finished;
        },
        setStepToFalse : function(){
            for(var i = 0; i < factory.cardsToLearnStep.length ; i ++){
                if(!factory.cardsToLearnStep[i].state_learning){
                    factory.cardsToLearnStep[i].state_learning = true;
                    break;
                }
            }
        }
    };

    return factory;
});
