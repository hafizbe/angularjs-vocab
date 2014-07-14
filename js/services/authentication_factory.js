app.factory('authenticationFactory', function($http, $q, $cookieStore, $rootScope){
    var factory = {
        login: null,
        authenticate : function(email, password){
            var deferred = $q.defer();
            var params = {email: email, password: password};
            var transform = function(data){
                return $.param(data);
            }

            $http({
                method: 'post',
                url: 'http://vocab-api.herokuapp.com/api/v1/users/authenticate',
                data: params,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                transformRequest: transform
            }).success(function (response, status, headers, config) {
                $cookieStore.put("login", response.login);
                $rootScope.login = response.login;
                deferred.resolve(response);
            })
                .error(function (data, status, headers, config) {
                    deferred.reject("Erreur lors de la connexion");
                });
            return deferred.promise;
        },
        
        register : function(email, password, pseudo){
            var deferred = $q.defer();
            var params = {email: email, password: password, pseudo: pseudo};
            console.log(params);
            var transform = function(data){
                return $.param(data);
            }

            $http({
                method: 'post',
                url: 'http://vocab-api.herokuapp.com/api/v1/users/create',
                data: params,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                transformRequest: transform
            }).success(function (response, status, headers, config) {
                $cookieStore.put("login", pseudo);
                $rootScope.login = pseudo;
                deferred.resolve(response);
            })
                .error(function (data, status, headers, config) {
                    deferred.reject("Erreur lors de la connexion");
                });
            return deferred.promise;
        }
    }

    return factory;
});
