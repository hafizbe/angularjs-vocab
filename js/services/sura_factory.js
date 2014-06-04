app.factory('suraFactory', function($http, $q){
	var factory = {
		surasReport: [],

		getSurasReport: function(){
			var deferred = $q.defer();
            if(factory.surasReport.length > 0)
            {
                deferred.resolve(factory.surasReport);
            }
            else
            {
            	$http({method:'GET', url:'http://vocab-api.herokuapp.com/api/v1/users/suras?' +
                'token=da34a57ce3e0582f56459a23bb8fe3d7&sura_id=1'})
                .success(function (response, status, headers, config) {
                	factory.surasReport = response;
                	deferred.resolve(response);
                })
                .error(function (data, status, headers, config) {
                    deferred.reject("Impossible de récupérer la liste des sourates pour l'utilisateur")
                });
            }
            return deferred.promise;
		}
	}

	return factory;
});