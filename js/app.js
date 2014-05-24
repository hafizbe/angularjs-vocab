var app = angular.module('nomAppli', ['ngRoute']);

/*app.config(['$httpProvider', function ($httpProvider) {
  //Reset headers to avoid OPTIONS request (aka preflight)
  $httpProvider.defaults.headers.common = {};
  $httpProvider.defaults.headers.post = {};
  $httpProvider.defaults.headers.put = {};
  $httpProvider.defaults.headers.patch = {};
}]);*/

app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/user/suras', {
                templateUrl: 'templates/user/suras.html',
                controller: 'sura_c'
            })
    }]);