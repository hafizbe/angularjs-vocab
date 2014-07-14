app.service("cardService", ["$http",
    function($http) {



       this.getCard = function(card_id, token){
           var promise = $http({method:'GET', url:'http://vocab-api.herokuapp.com/api/v1/cards/'+card_id+'?' +
               'token='+token})
               .success(function (response, status, headers, config) {
                   return response;
               })
               .error(function (data, status, headers, config) {
                   return {"status": false};
               });

           return promise;
       }

    }]);
/**
 * Created by adel on 29/05/2014.
 */
