app.controller('learning_c', ['$scope', function($scope) {

    $scope.disableBtnBack = true;
    $scope.disableBtnNext = false;
    $scope.step = 1 ;
    $scope.steps_selected = [false,false,false,false];
    $scope.response = false;

    $scope.aRepondu = function(step){

        // On passe par ce tableau car cela permet 
        $scope.steps_selected[step-1] = true;
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