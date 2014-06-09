app.factory('statisticFactory', function($http, $q){
    var factory = {
        cards_to_revise: [],
        percentage_total: 0,
        getStatisticsHome : function(){
            var deferred = $q.defer();
            //console.log(factory.cards_to_revise)
            if(factory.cards_to_revise.length > 0)
            {

                deferred.resolve(factory);
            }
            else
            {
                $http({method:'GET', url:'http://vocab-api.herokuapp.com/api/v1/users/statistics_home?' +
                    'token=da34a57ce3e0582f56459a23bb8fe3d7'})
                    .success(function (response, status, headers, config) {
                        //console.log(response)
                        factory.cards_to_revise = response.cards_to_revise;
                        //console.log(factory.cards_to_revise)
                        factory.percentage_total = response.percentage_total;
                        deferred.resolve(response);
                    })
                    .error(function (data, status, headers, config) {
                        deferred.reject("Impossible de récupérer les cartes");
                    });

            }
            return deferred.promise;
        }
    }

    return factory;
});
