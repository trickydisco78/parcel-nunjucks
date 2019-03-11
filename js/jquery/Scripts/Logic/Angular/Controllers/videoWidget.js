angular.module('AVFC').controller("VideoWidgetController", ['$scope', '$http', 'restApi', function ($scope, $http, restApi) {

    "use strict";

    // Fetch Related Videos
    $scope.loadRelated = function (currentItemId) {
        var params = {
            itemId: currentItemId
        };

        $scope.showRelated = false;

        restApi.getData('/api/VideoListing/GetRelatedVideos', params).then(function (response) {
            $scope.related = response;
            if (response.length) {
                $scope.showRelated = true;
            }
        });
    };

    // Fetch Latest Videos
    $scope.loadLatest = function () {
        restApi.getData('/api/VideoListing/GetLatestVideos').then(function (response) {
            $scope.latest = response;
        });
    };

}]);