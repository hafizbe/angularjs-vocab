app.service("testService", ["$http",
    function($http) {


    	//$http.get('http://api.openweathermap.org/data/2.5/weather?q=London,uk');
    	this.getData =  function () {
			var promise = $http({method:'GET', url:'http://api.openweathermap.org/data/2.5/weather?q=London,uk'})
				.success(function (response, status, headers, config) {
					return response;
				})
				.error(function (data, status, headers, config) {
					return {"status": false};
				});
		
			return promise;
		};


}]);
