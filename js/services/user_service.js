app.service("userService", ["$http",
    function($http) {

		this.getAllCards = function(){
			var promise = $http({method:'GET', url:'http://vocab-api.herokuapp.com/api/v1/users/cards?' +
                'token=da34a57ce3e0582f56459a23bb8fe3d7&sura_id=1'})
				.success(function (response, status, headers, config) {
					return response;
				})
				.error(function (data, status, headers, config) {
					return {"status": false};
				});
		
			return promise;
		}

		this.getAllCardsBySuraId = function(sura_id){
			var promise = $http({method:'GET', url:'http://vocab-api.herokuapp.com/api/v1/users/'+
				'cards_by_sura?sura_id='+sura_id+'&token=da34a57ce3e0582f56459a23bb8fe3d7'})
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
                'token=da34a57ce3e0582f56459a23bb8fe3d7&sura_id=1'})
                .success(function (response, status, headers, config) {
                    return response;
                })
                .error(function (data, status, headers, config) {
                    return {"status": false};
                });

            return promise;
		}

}]);
