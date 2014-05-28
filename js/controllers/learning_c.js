app.controller('learning_c', ['$scope', function($scope) {


    $scope.step = 0 ;

    $scope.$on('$viewContentLoaded', function(){
        var $validation = false;
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
                /*bootbox.dialog({
                 message: "Thank you! Your information was successfully saved!",
                 buttons: {
                 "success" : {
                 "label" : "OK",
                 "className" : "btn-sm btn-primary"
                 }
                 }
                 });*/
            }).on('stepclick', function(e){
                //e.preventDefault();//this will prevent clicking and selecting steps
            });
    });

}]);