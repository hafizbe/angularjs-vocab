app.controller('learning_card_c', ['$scope','cardService','$routeParams','$route','$location','cardFactory',
    'interrogationFactory','suraFactory','learningFactory','audioFactory','$rootScope',
    function($scope, cardService, $routeParams,$route, $location, cardFactory, interrogationFactory,
             suraFactory, learningFactory, audioFactory,$rootScope) {
    $scope.cardsToWork = [];
    $scope.disableBtnBack = true;
    $scope.disableBtnNext = false;
    $scope.step = 1 ;
    $scope.steps_selected = [false,false,false,false];
    $scope.response = false;
    $scope.step3_show = false;
    $scope.soundLoaded = false;


    $scope.word_arabic = null;
    $scope.word_traducted = null;
    $scope.name_sura = null;
    $scope.card_id = $routeParams.card_id;
    $scope.sura_id = $routeParams.sura_id;
    $scope.fiveCardsToLearn = null;
    $scope.cardsJustLearned = learningFactory.cardsJustLearned;
    $scope.learningStepsStatistics = learningFactory.getLearningStepStatistic(learningFactory.getNbCardsToLearnInStep($routeParams.sura_id));

    cardFactory.getCardBySuraIdAndCardId($routeParams.sura_id, $routeParams.card_id).then(function(promise){
        $scope.word_arabic = promise.word;
        $scope.word_traducted  = promise.fr_m;
        $scope.name_sura = promise.sura_name_phonetic;
        $rootScope.ariane = {
            name : promise.word,
            histo : [
                {name :"Accueil",
                    link :"/#"
                },
                {name :"Sourates",
                    link :"/user/suras"
                },
                {name :promise.sura_name_phonetic,
                link : "user/suras/"+$routeParams.sura_id+"/cards"}]
        };
        if(learningFactory.modeLearningSura)
        {
            $scope.fiveCardsToLearn = learningFactory.getCardsToLearnStep(
                learningFactory.getNbCardsToLearnInStep($routeParams.sura_id),promise.sura_id);

            console.log($scope.fiveCardsToLearn);

            if(cardFactory.stepCardToLearn == null)
                cardFactory.stepCardToLearn = 0;
            else
                cardFactory.stepCardToLearn++;
        }



    });


    $scope.createInterrogation = function(card_id, response)
    {
        interrogationFactory.createInterrogation(card_id,response).then(function(promise){
            cardFactory.modifyResponseCardAndDate(promise.sura_id, card_id, promise.response, promise.date_response);
            cardFactory.modifyPercentage(promise.percentage_sura, promise.sura_id);
            suraFactory.updateSurasReport(promise.statistics_sura, promise.sura_id)
            learningFactory.setStepToFalse();


            // Ici on test si le mode Learning est activé. Si c'est le cas, on va s'assureait de redirigé vers la carte
            // suivante
            if(learningFactory.modeLearningSura) {
                learningFactory.cardsToLearn[promise.sura_id].shift();
                firstCardToLearn = learningFactory.getFirstCardToLearn(promise.sura_id);
                if(learningFactory.learningStepFinished())
                {
                    bootbox.dialog({
                        message: "<span class='bigger-110'>Félicitation ! Vous venez de travailler " +
                            "<span class=\"red\">"+learningFactory.cardsToLearnStep.length+" </span>" +
                            "Mots ! Que voulez-vous faire à présent ?",
                        buttons:
                        {
                            "success" :
                            {
                                "label" : "<i class='ace-icon fa fa-check'></i> Continuer !",
                                "className" : "btn-block btn-success",
                                "callback": function() {
                                    firstCardToLearn = learningFactory.getFirstCardToLearn($scope.sura_id);
                                    if(firstCardToLearn != undefined)
                                    {
                                        $scope.$apply(function() {
                                            $location.path("/user/learning/sura/"+$scope.sura_id+"/card/"+firstCardToLearn.id);
                                        });
                                    }
                                }
                            },
                            "click" :
                            {
                                "label" : "Retour vers la sourate <strong> "+$scope.name_sura+"</strong>",
                                "className" : "btn-block btn-primary",
                                "callback": function() {
                                    $scope.redirectToSura($scope.sura_id);
                                }
                            }
                        }
                    });
                }
                else
                {
                    if(firstCardToLearn != undefined)
                    {
                        $location.path("/user/learning/sura/"+promise.sura_id+"/card/"+firstCardToLearn.id);
                    }
                }



                /*









                 var drapeau = false;
                 var cardJustLearned = learningFactory.cardsToLearn[promise.sura_id].shift();
                 learningFactory.cardsJustLearned.push(cardJustLearned);
                 if(learningFactory.getNbCardsToLearnInStep($routeParams.sura_id) < 5){
                 if(learningFactory.getNbCardsToLearnInStep($routeParams.sura_id) == 0){
                 drapeau = true;
                 }
                 }
                 else if(learningFactory.cardsJustLearned.length == learningFactory.getNbCardsToLearnInStep($routeParams.sura_id)) {

                 drapeau = true;
                 }
                 if(drapeau) {
                 learningFactory.cardsJustLearned = [];

                 }
                 else
                 {
                 firstCardToLearn = learningFactory.getFirstCardToLearn(promise.sura_id);
                 if(firstCardToLearn != undefined)
                 {
                 $location.path("/user/learning/sura/"+$routeParams.sura_id+"/card/"+firstCardToLearn.id);
                 }
                 }
                 }*/
            }
            else
            {
                cardFactory.deleteCardToLearn(card_id, promise.sura_id);
                $location.path("/user/suras/"+$scope.sura_id+"/cards");
            }

        });
    }

    $scope.redirectToSura = function(sura_id){
        $scope.$apply( function() {
            $location.path("user/suras/"+sura_id+"/cards");
        });
    };

    $scope.startLearning = function(sura_id){

    };

    $scope.restartLearning = function(){
        // Ici on diminue le nombre de l'étape, car on anticipe le fait que il va
        // être réaugmenter au rechargement de la page. Comme cette fonction sert à réinitialiser l'apprentissage
        // de la carte, cette instruction nous permet d'éviter d'incrémenter l'étape.
        cardFactory.stepCardToLearn--;

        $route.reload();
    };

    $scope.aRepondu = function(step){

        // On passe par ce tableau car cela permet de masquet tous les onglet excepté les onglets concernés
        $scope.steps_selected[step-1] = true;

        // On test si c'est différent de 3 afin de ne pas sauter l'étape pour afficher l'étape en front
        if(step != 3)
            $scope.nextStep();
        else
            $scope.step3_show = true;
        $scope.response = true;
    };

    $scope.detectActive = function(step){
        if($scope.step == step)
            return "active";
        else if($scope.step > step)
            return "complete";
    };

    $scope.nextStep = function(){
        $scope.step++;
        $scope.response = false;
    };

    $scope.previousStep = function(){
        $scope.step--;
        $scope.steps_selected[$scope.step - 1] = false;
        $scope.response = false;
    };

    $scope.switchToStep = function(step){
        if($scope.step != 4)
        {
            // TODO //
        }
        $scope.step = step;
    };

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
    };

    $scope.$watch('step',function(step){
        if(step == 1)
        {
            $scope.disableBtnBack = true;
            $scope.disableBtnNext = false;
            $scope.playCard();
        }
        else if(step == 4){
            $scope.disableBtnNext = true;
            $scope.disableBtnBack = false;
        }
        else if(step == 3){
            $scope.playCard();
        }
        else
        {
            $scope.disableBtnNext = false;
            $scope.disableBtnBack = false;
        }
            
    });

    $scope.playCard = function(){
        AWS.config.update({accessKeyId: audioFactory.accessKeyId, secretAccessKey: audioFactory.secretAccessKey});
        var params = {
            Bucket: 'word-audio', // required
            Key: ''+$routeParams.sura_id+'/'+$routeParams.card_id+'.mp3'
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
                }
            });
        });
    };




    // Initialisation du plugin JS
    $scope.$on('$viewContentLoaded', function(){

        /*$.gritter.add({
            title: 'Bravo !',
            text: 'Plus que 3 mots',
            image: 'assets/avatars/avatar5.png',
            sticky: false,
            time: 1500,
            class_name: ''
        });

       // $("#gritter-notice-wrapper").css('left',"100px");
        $("#gritter-notice-wrapper").css('top',"60px");*/

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