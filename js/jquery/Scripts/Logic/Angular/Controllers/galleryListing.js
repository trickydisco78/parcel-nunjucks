angular.module('AVFC').controller("GalleryListing", ['$scope', '$http', 'restApi', function ($scope, $http, restApi) {

    "use strict";

    /*
        Gallery API parameters
        ----------------------
        Page = Page number
        NumberPerPage = Number of results to display per page
        SelectedSeasonId = Season
        SelectedMonth = month
        SelectedTagId = Tag
    */

    var paged = [];

    $scope.pageNumber = 1;
    $scope.resultCount = null;
    $scope.resultsEnd = false;

    // Set default model values
    $scope.formModel = {
        Items: 10,
        SelectedSeasonId: '',
        SelectedMonth: '',
        SelectedTagId: ''
    };

    // Fetch data from web service and bind to scope variable
    function requestData(items) {

        var params = JSON.stringify({
            Page: $scope.pageNumber,
            NumberPerPage: items,
            SelectedSeasonId: $scope.formModel.SelectedSeasonId,
            SelectedMonth: $scope.formModel.SelectedMonth,
            SelectedTagId: $scope.formModel.SelectedTagId
        });

        restApi.postData('/api/Gallery/GetGalleries', params).then(function(response) {
            paged = paged.concat(response);
            $scope.resultCount = paged.length;
            $scope.galleries = paged;
            $scope.pageNumber++;
            if (response.length === 0) {
                $scope.resultsEnd = true;
            } else {
                $scope.resultsEnd = false;
            }
        });

    }

    $scope.loadGalleries = function (items) {
        // Set default parameter values
        items = typeof items !== 'undefined' ? items : 10;
        requestData(items);
    };

    $scope.reloadGalleries = function (items) {
        paged = [];
        $scope.pageNumber = 1;
        // Set default parameter values
        items = typeof items !== 'undefined' ? items : 10;
        requestData(items);
    };

}]);
