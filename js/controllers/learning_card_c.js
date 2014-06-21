app.controller('learning_card_c', ['$scope','cardService','$routeParams','$route','$location','cardFactory',
    'interrogationFactory','suraFactory','learningFactory',
    function($scope, cardService, $routeParams,$route, $location, cardFactory, interrogationFactory,
             suraFactory, learningFactory) {
    $scope.cardsToWork = [];
    $scope.disableBtnBack = true;
    $scope.disableBtnNext = false;
    $scope.step = 1 ;
    $scope.steps_selected = [false,false,false,false];
    $scope.response = false;
    $scope.step3_show = false;

    $scope.word_arabic = null;
    $scope.word_traducted = null;
    $scope.name_sura = null;
    $scope.card_id = $routeParams.card_id;
    $scope.sura_id = $routeParams.sura_id;
    $scope.fiveCardsToLearn = null;
    $scope.cardsJustLearned = learningFactory.cardsJustLearned;
    $scope.learningStepsStatistics = learningFactory.getLearningStepStatistic(5);

    cardFactory.getCardBySuraIdAndCardId($routeParams.sura_id, $routeParams.card_id).then(function(promise){
        $scope.word_arabic = promise.word;
        $scope.word_traducted  = promise.english_m;
        $scope.name_sura = promise.sura_name_phonetic;
        if(learningFactory.modeLearningSura)
        {
            $scope.fiveCardsToLearn = learningFactory.get5CardsToLearn($routeParams.sura_id);
            if(cardFactory.stepCardToLearn == null)
                cardFactory.stepCardToLearn = 0;
            else
                cardFactory.stepCardToLearn++;

            console.log("Etape : "+cardFactory.stepCardToLearn);
        }

    });

    $scope.createInterrogation = function(card_id, response)
    {
        interrogationFactory.createInterrogation(card_id,response).then(function(promise){
            cardFactory.modifyResponseCardAndDate(promise.sura_id, card_id, promise.response, promise.date_response);
            cardFactory.modifyPercentage(promise.percentage_sura, promise.sura_id);
            suraFactory.updateSurasReport(promise.statistics_sura, promise.sura_id)

            // Ici on test si le mode Learning est activé. Si c'est le cas, on va s'assureait de redirigé vers la carte
            // suivante
            if(learningFactory.modeLearningSura)
            {
                cardJustLearned = learningFactory.cardsToLearn[promise.sura_id].shift();
                learningFactory.cardsJustLearned.push(cardJustLearned);
                firstCardToLearn = learningFactory.getFirstCardToLearn(promise.sura_id);
                if(firstCardToLearn != undefined)
                {
                    $location.path("/user/learning/sura/"+$routeParams.sura_id+"/card/"+firstCardToLearn.id);
                }
            }
            else
            {
                cardFactory.deleteCardToLearn(card_id, promise.sura_id);
                $location.path("/user/suras/"+$scope.sura_id+"/cards");
            }
        });
    }

    $scope.returnLearningSuraCtrl = function(){
        //$location.path("/user/learning/sura/"+90);
    }

    $scope.startLearning = function(sura_id){

    };

    $scope.restartLearning = function(){
        // Ici on diminue le nombre de l'étape, car on anticipe le fait que il va
        // être réaugmenter au rechargement de la page. Comme cette fonction sert à réinitialiser l'apprentissage
        // de la carte, cette instruction nous permet d'éviter d'incrémenter l'étape.
        cardFactory.stepCardToLearn--;

        $route.reload();
    }

    $scope.aRepondu = function(step){

        // On passe par ce tableau car cela permet de masquet tous les onglet excepté les onglets concernés
        $scope.steps_selected[step-1] = true;

        // On test si c'est différent de 3 afin de ne pas sauter l'étape pour afficher l'étape en front
        if(step != 3)
            $scope.nextStep();
        else
            $scope.step3_show = true;
        $scope.response = true;
    }

    $scope.detectActive = function(step){
        if($scope.step == step)
            return "active";
        else if($scope.step > step)
            return "complete";
    }

    $scope.nextStep = function(){
        $scope.step++;
        $scope.response = false;
    }

    $scope.previousStep = function(){
        $scope.step--;
        $scope.steps_selected[$scope.step - 1] = false;
        $scope.response = false;
    }

    $scope.switchToStep = function(step)
    {   
        if($scope.step != 4)
        {
            // TODO //
        }
        $scope.step = step;
    }

    $scope.detectClassStep = function(index){
        if(cardFactory.stepCardToLearn == index)
        {
            return "fa fa-question-circle orange";
        }
        else if(cardFactory.stepCardToLearn < index)
        {
            return "fa  fa-square-o red";
        }
        else if(cardFactory.stepCardToLearn > index)
        {
            return "fa fa-check-square-o green";
        }
    }

    $scope.$watch('step',function(step){
        if(step == 1)
        {
            $scope.disableBtnBack = true;
            $scope.disableBtnNext = false;
        }
        else if(step == 4){
            $scope.disableBtnNext = true;
            $scope.disableBtnBack = false;
        }
        else
        {
            $scope.disableBtnNext = false;
            $scope.disableBtnBack = false;
        }
            
    });

    $scope.$watch('cardsJustLearned', function(cardsJustLearned){
        if(cardsJustLearned.length == 4)
            learningFactory.cardsJustLearned = [];
    })

    // Initialisation du plugin JS
    $scope.$on('$viewContentLoaded', function(){


        /*var $validation = false;
        $('#fuelux-wizard')
            .ace_wizard({
                //step: 2 //optional argument. wizard will jump to step "2" at first
            })
            .on('change' , function(e, info){
                if(info.step == 1 && $validation) {
                    if(!$('#validation-form').valid()) return false;
                }
            })
            .on('finished', function(e) {
                alert("ok terminé");
                bootbox.dialog({
                 message: "Thank you! Your information was successfully saved!",
                 buttons: {
                 "success" : {
                 "label" : "OK",
                 "className" : "btn-sm btn-primary"
                 }
                 }
                 });
            }).on('stepclick', function(e){
                alert("ok");
                //e.preventDefault();//this will prevent clicking and selecting steps
            });*/
    });

}]);