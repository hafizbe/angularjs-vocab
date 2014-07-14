app.factory('interrogationFactory', function($http, $q){
   var factory = {
    createInterrogation : function(card_id, response, token){
        var deferred = $q.defer();
        $http({method:'GET', url:'http://vocab-api.herokuapp.com/api/v1/users/create_interrogation?' +
            'token='+token+'&card_id='+card_id+'&response='+response})
            .success(function (response, status, headers, config) {
                deferred.resolve(response);
            })
            .error(function (data, status, headers, config) {
                deferred.reject("Impossible de créer l'interrogation");
            });

        return deferred.promise;
    },
    updateInterrogation : function(card_id, response, token){
        var deferred = $q.defer();
        $http({method:'GET', url:'http://vocab-api.herokuapp.com/api/v1/users/update_interrogation?' +
            'token='+token+'&card_id='+card_id+'&response='+response})
            .success(function (response, status, headers, config) {
                deferred.resolve(response);
            })
            .error(function (data, status, headers, config) {
                deferred.reject("Impossible de créer l'interrogation");
            });

        return deferred.promise;
    }
   }

    return factory;
});
