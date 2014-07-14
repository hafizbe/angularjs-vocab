app.controller('login_c', ['$scope','$rootScope','authenticationFactory','$cookieStore','$location','$route',
    function($scope, $rootScope, authenticationFactory, $cookieStore, $location, $route) {
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
    $scope.login = function(email, passwordLogIn){
        authenticationFactory.authenticate(email, passwordLogIn).then(function(promise){
            $cookieStore.put('token', promise.message)
            $cookieStore.put('login', promise.login);
            $location.path("/");
            $route.reload();
        });
    };
    $scope.register = function(email, pseudo, password){
        authenticationFactory.register(email, password, pseudo).then(function(promise) {
            if(promise.success == true)
            {
                $cookieStore.put('token', promise.message)
                $cookieStore.put('login', pseudo);
                $location.path("/");
            }
            else
            {
                alert("Erreur lors de l'inscription");
            }
        });
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