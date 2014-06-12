app.controller('learning_card_c', ['$scope','cardService','userService','$routeParams','$route','$location','cardFactory','interrogationFactory','suraFactory',
    function($scope, cardService,userService, $routeParams,$route, $location, cardFactory, interrogationFactory, suraFactory) {
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

    cardFactory.getCardBySuraIdAndCardId($routeParams.sura_id, $routeParams.card_id).then(function(promise){
        $scope.word_arabic = promise.word;
        $scope.word_traducted  = promise.english_m;
        $scope.name_sura = promise.sura_name_phonetic;
    });

    $scope.createInterrogation = function(card_id, response)
    {
        interrogationFactory.createInterrogation(card_id,response).then(function(promise){

           cardFactory.modifyResponseCardAndDate(promise.sura_id, card_id, promise.response, promise.date_response);
           cardFactory.modifyPercentage(promise.percentage_sura, promise.sura_id);
           suraFactory.updateSurasReport(promise.statistics_sura, promise.sura_id)
           $location.path("/user/suras/"+$scope.sura_id+"/cards");
        });

    }

    /*
    cardService.getCard($routeParams.card_id).then(function(promise){
        console.log("Je suis la")
        
        //view.loadChart();
    });*/

    $scope.returnLearningSuraCtrl = function(){
        //$location.path("/user/learning/sura/"+90);
    }

    $scope.startLearning = function(sura_id){

    };

    $scope.restartLearning = function(){
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