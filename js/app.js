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
            when('/test', {
                templateUrl: 'partials/test.html',
                controller: 'sura_c'
            })
    }]);