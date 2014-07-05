var app = angular.module('nomAppli', ['ngRoute','ngAnimate', 'ngCookies']);

/*app.config(['$httpProvider', function ($httpProvider) {
  //Reset headers to avoid OPTIONS request (aka preflight)
  $httpProvider.defaults.headers.common = {};
  $httpProvider.defaults.headers.post = {};
  $httpProvider.defaults.headers.put = {};
  $httpProvider.defaults.headers.patch = {};
}]);*/
// register the interceptor as a service
app.factory('HttpInterceptor', ['$q', '$rootScope','$location', 
    function($q, $rootScope, $location) {
       return {
            // On request success
            request : function(config) {
                console.log(config)
                return config || $q.when(config);
            },

            // On request failure
            requestError : function(rejection) {
                //console.log(rejection); // Contains the data about the error on the request.  
                // Return the promise rejection.
                return $q.reject(rejection);
            },

            // On response success
            response : function(response) {
                //console.log(response); // Contains the data from the response.
                // Return the response or promise.
                return response || $q.when(response);
            },

            // On response failure
            responseError : function(rejection) {
                //console.log(rejection); // Contains the data about the error.
                //Check whether the intercept param is set in the config array. 
                //If the intercept param is missing or set to true, we display a modal containing the error
                $location.path('/login')
                // Return the promise rejection.
                return $q.reject(rejection);
            }
        };
 }]);

app.config(['$routeProvider','$httpProvider',
    function($routeProvider, $httpProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'templates/home.html',
                controller: 'home_c'
            }).
            when('/user/suras', {
                templateUrl: 'templates/user/suras.html',
                controller: 'sura_c'
            }).
            when('/user/suras/:sura_id/cards', {
                templateUrl: 'templates/user/cards.html',
                controller: 'user_cards_c'
            }).
            when('/user/learning/sura/:sura_id/card/:card_id', {
                templateUrl: 'templates/user/learning_card.html',
                controller: 'learning_card_c'
            }).when('/user/learning/sura/:sura_id' , {
                template: ' ',
                controller: "learning_sura_c"
            }).when('/user/revision/card/:card_id' , {
                templateUrl: "templates/revision/revision_card.html",
                controller: "revision_c"
            }).when('/error404' , {
                templateUrl: "templates/error404.html",
                controller: "simple_c"
            }).otherwise({redirectTo: '/error404'});

            $httpProvider.interceptors.push('HttpInterceptor');

        $httpProvider.defaults.headers.patch = {
            'Content-Type': 'application/json;charset=utf-8'
        }


    }]);




