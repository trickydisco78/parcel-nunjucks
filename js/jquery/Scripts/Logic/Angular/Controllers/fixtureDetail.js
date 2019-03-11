// Fixture Item controller
angular.module('AVFC').controller("FixtureDetail", ['$scope', '$http', 'restApi', function ($scope, $http, restApi) {

    "use strict";

    /**
     * Set isLoaded to false
     * @type {boolean}
     */
    var isLoaded = false;


    /**
     * Takes an integer and returns result type as single character
     * @param {int} val
     * @returns {*}
     */
    $scope.formResultText = function (val) {
        var _result = null;
        switch (val) {
            case -1:
                _result = 'L';
                break;
            case 0:
                _result = 'D';
                break;
            case 1:
                _result = 'W';
                break;
        }
        return _result;
    };


    /**
     * Get fixture details and bind to scope
     * Set isLoaded to true
     * @param {guid} fixture
     */
    $scope.getFixtureDetail = function (fixture) {
        if (!isLoaded) {
            $scope.detailsLoading = true;
            restApi.getData('/api/Fixtures/GetFixtureDetails', {
                fixtureId: fixture
            }).then(function (response) {
                $scope.details = response;
                if (response) {
                    isLoaded = true;
                    $scope.detailsLoading = false;
                }
            });
        }
    };

}]);
