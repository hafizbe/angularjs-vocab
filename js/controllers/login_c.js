app.controller('login_c', ['$scope','$rootScope','authenticationFactory','$cookieStore','$location',
    function($scope, $rootScope, authenticationFactory, $cookieStore, $location) {
    $rootScope.hideLayout = function(){
        return true;
    };
    $rootScope.classLayout = function(){
        return "login-layout";
    };
    $rootScope.pageContent = function(){
        return "";
    };

    /***************************************************************************************************************/
    /***************************************************************************************************************/
    /***************************************************************************************************************/

    // Variables
    $scope.currentBox = 1;

    // Business Function
    $scope.login = function(email){
        authenticationFactory.authenticate(email, 'adel').then(function(promise){
            console.log(promise.message)
            $cookieStore.put('token', promise.message)

            $location.path("/");


        });
    };
    $scope.register = function(){

    };

    // Displaying Function
    $scope.boxVisible = function(currentBox){
        if(currentBox == $scope.currentBox)
            return true;
        else
            return false;
    };
    $scope.switchBox = function(targetBox){
        $scope.currentBox = targetBox;
    };




}]);