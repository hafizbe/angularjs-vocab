var app = angular.module('nomAppli', ['ngRoute','ngAnimate']);

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
            })

    }]);