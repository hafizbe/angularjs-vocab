app.factory('suraFactory', function($http, $q){
	var factory = {
		surasReport: [],

		getSurasReport: function(token){
			var deferred = $q.defer();
            if(factory.surasReport.length > 0)
            {
                deferred.resolve(factory.surasReport);
            }
            else
            {
            	$http({method:'GET', url:'http://vocab-api.herokuapp.com/api/v1/users/suras?' +
                'token='+token+'&sura_id=1'})
                .success(function (response, status, headers, config) {
                	factory.surasReport = response;
                	deferred.resolve(response);
                })
                .error(function (data, status, headers, config) {
                    deferred.reject("Impossible de récupérer la liste des sourates pour l'utilisateur")
                });
            }
            return deferred.promise;
		},

        updateSurasReport: function(statistics, sura_id){
            if(factory.surasReport != undefined && factory.surasReport.length > 0){
                factory.surasReport[sura_id - 1].point1 = statistics.point1
                factory.surasReport[sura_id - 1].point2 = statistics.point2
                factory.surasReport[sura_id - 1].point3 = statistics.point3
                factory.surasReport[sura_id - 1].points_total_user = statistics.points_total_user
            }
        }
	}

	return factory;
});