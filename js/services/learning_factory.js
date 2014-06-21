app.factory('learningFactory', function(cardFactory){
    var factory = {
        fiveCardsToLearn: [],
        cardsJustLearned: [],
        modeLearningSura: false
    };

    return factory;
});
