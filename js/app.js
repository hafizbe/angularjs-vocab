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
            })

    }]);


var paginator = angular.module('paginator', []);
paginator.directive('paginator', function () {
    var pageSizeLabel = "Page size";
    return {
        priority: 0,
        restrict: 'A',
        scope: {items: '&'},
        template:
            '<button ng-disabled="isFirstPage()" ng-click="decPage()">&lt;</button>'
            + '{{paginator.currentPage+1}}/{{numberOfPages()}}'
            + '<button ng-disabled="isLastPage()" ng-click="incPage()">&gt;</button>'
            + '<span>' + pageSizeLabel + '</span>'
            + '<select ng-model="paginator.pageSize" ng-options="size for size in pageSizeList"></select>',
        replace: false,
        compile: function compile(tElement, tAttrs, transclude) {
            return {
                pre: function preLink(scope, iElement, iAttrs, controller) {
                    scope.pageSizeList = [10, 20, 50, 100];
                    scope.paginator = {
                        pageSize: 10,
                        currentPage: 0
                    };

                    scope.isFirstPage = function () {
                        return scope.paginator.currentPage == 0;
                    };
                    scope.isLastPage = function () {
                        return scope.paginator.currentPage
                            >= scope.items().length / scope.paginator.pageSize - 1;
                    };
                    scope.incPage = function () {
                        if (!scope.isLastPage()) {
                            scope.paginator.currentPage++;
                        }
                    };
                    scope.decPage = function () {
                        if (!scope.isFirstPage()) {
                            scope.paginator.currentPage--;
                        }
                    };
                    scope.firstPage = function () {
                        scope.paginator.currentPage = 0;
                    };
                    scope.numberOfPages = function () {
                        return Math.ceil(scope.items().length / scope.paginator.pageSize);
                    };
                    scope.$watch('paginator.pageSize', function(newValue, oldValue) {
                        if (newValue != oldValue) {
                            scope.firstPage();
                        }
                    });

                    // ---- Functions available in parent scope -----

                    scope.$parent.firstPage = function () {
                        scope.firstPage();
                    };
                    // Function that returns the reduced items list, to use in ng-repeat
                    scope.$parent.pageItems = function () {
                        var start = scope.paginator.currentPage * scope.paginator.pageSize;
                        var limit = scope.paginator.pageSize;
                        return scope.items().slice(start, start + limit);
                    };
                },
                post: function postLink(scope, iElement, iAttrs, controller) {}
            };
        }
    };
});