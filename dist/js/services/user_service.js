app.service("userService", ["$http",
    function($http) {
        
        this.cardsToWorks = "Adel";


		this.getAllCards = function(token){
			var promise = $http({method:'GET', url:'http://vocab-api.herokuapp.com/api/v1/users/cards?' +
                'token='+token+'&sura_id=1'})
				.success(function (response, status, headers, config) {
                    
					return response;
				})
				.error(function (data, status, headers, config) {
					return {"status": false};
				});
		    
			return promise;
		}


        this.getCardsToWorkBySuraId = function(sura_id, token){
                var promise = $http({method:'GET', url:'http://vocab-api.herokuapp.com/api/v1/users/cards_to_work/' +
                    sura_id+'?token='+token})
                .success(function (response, status, headers, config) {
                    return response;
                })
                .error(function (data, status, headers, config) {
                    return {"status": false};
                });
            return promise;
        };

		this.getAllCardsBySuraId = function(sura_id){
			var promise = $http({method:'GET', url:'http://vocab-api.herokuapp.com/api/v1/users/'+
				'cards_by_sura?sura_id='+sura_id+'&token='+token})
                .success(function (response, status, headers, config) {
                    return response;
                })
                .error(function (data, status, headers, config) {
                    return {"status": false};
                });

            return promise;
		}

		this.getSurasReport = function(){

            var promise = $http({method:'GET', url:'http://vocab-api.herokuapp.com/api/v1/users/suras?' +
                'token='+token+'&sura_id=1'})
                .success(function (response, status, headers, config) {
                    return response;
                })
                .error(function (data, status, headers, config) {
                    return {"status": false};
                });

            return promise;
		}

}]);
