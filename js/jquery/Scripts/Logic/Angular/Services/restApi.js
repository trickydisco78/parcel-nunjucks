angular.module('AVFC').service("restApi", ['$http', function ($http) {

    "use strict";

    var promise;

    // GET
    this.getData = function (apiUrl, apiParams) {

        apiParams = typeof apiParams !== 'undefined' ? apiParams : null;

        promise = $http({
            method: 'GET',
            url: apiUrl,
            params: apiParams
        }).then(function successCallback(response) {
            return response.data;
        }, function errorCallback(response) {
            if (response.statusText) {
                console.log(response.statusText);
            } else {
                console.log("Error: Web service not found");
            }
            return false;
        });
        return promise;
    };

    // POST
    this.postData = function (apiUrl, apiData) {

        apiData = typeof apiData !== 'undefined' ? apiData : null;

        promise = $http({
            method: 'POST',
            url: apiUrl,
            data: apiData,
            headers: {'Content-Type': 'application/json'}
        }).then(function successCallback(response) {
            return response.data;
        }, function errorCallback(response) {
            if (response.statusText) {
                console.log(response.statusText);
            } else {
                console.log("Error: Web service not found");
            }
            return false;
        });
        return promise;

    };

}]);


