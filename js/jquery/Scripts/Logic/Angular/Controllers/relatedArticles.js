angular.module('AVFC').controller("RelatedArticles", ['$scope', '$http', 'restApi', function ($scope, $http, restApi) {

    "use strict";

    /*
        Article API parameters
        ----------------------
        itemId = Content type ID
    */

    // Fetch data from web service and bind to scope variable
    function requestData(currentItemId) {

        var params = {
            itemId: currentItemId
        };

        restApi.getData('/api/RelatedArticles', params).then(function(response) {
            $scope.articles = response;
        });
    }

    $scope.loadArticles = function (currentItemId) {
        requestData(currentItemId);
    };

}]);
