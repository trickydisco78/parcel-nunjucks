angular.module('AVFC').controller("ArticleWidget", ['$scope', '$http', 'restApi', function ($scope, $http, restApi) {

    "use strict";

    // Fetch Related articles
    $scope.loadRelated = function (currentItemId) {
        var params = {
            itemId: currentItemId
        };

        $scope.showRelated = false;

        restApi.getData('/api/RelatedArticles/Get', params).then(function (response) {
            $scope.related = response;
            if (response.length) {
                $scope.showRelated = true;
            }
        });
    };

    // Fetch Related articles
    $scope.loadArticles = function (tag) {
        var params = JSON.stringify({
            Page: 1,
            NumberPerPage: 5,
            SelectedTagId: tag
        });

        restApi.postData('/api/ArticleListing/GetLatestArticles', params).then(function (response) {
            $scope.articles = response;
        });
    };

    // Fetch Related articles
    $scope.loadPopular = function () {
        restApi.getData('/api/ArticleListing/GetPopularArticles').then(function (response) {
            $scope.popular = response;
        });
    };

}]);
