angular.module('AVFC').controller("ArticleListing", ['$scope', '$http', 'restApi', function ($scope, $http, restApi) {

    "use strict";

    var paged = [];
    $scope.pageNumber = 1;
    $scope.resultCount = null;
    $scope.resultsEnd = false;
    $scope.formModel = {
        Items: 10,
        SelectedSeasonId: '',
        SelectedMonth: '',
        SelectedContentTypeId: '',
        SelectedTagId: '',
        SelectedAuthorId: ''
    };

    $scope.initialize = function (items) {
        $scope.formModel.SelectedAuthorId = $('#SelectedAuthorId').val();
        $scope.formModel.SelectedTagId = $('#CategoryDropDownList').val();
        $scope.formModel.SelectedContentTypeId = $('#ContentTypeDropDownList').val();
        $scope.formModel.SelectedSeasonId = $('#SeasonDropDownList').val();
        
        $scope.loadArticles(items);
    };

    $scope.loadArticles = function (items) {
        // Set default parameter values
        items = typeof items !== 'undefined' ? items : 10;        
        _requestData(items);
    };

    $scope.reloadArticles = function (items) {
        paged = [];
        $scope.pageNumber = 1;
        // Set default parameter values
        items = typeof items !== 'undefined' ? items : 10;
        _requestData(items);
    };

    function _mapArticles(currentArticles, newArticles) {
        for (var i = 0, x = newArticles.length; i < x; i++) {
            var newArticleDate = newArticles[i].Date;

            for (var k = 0, l = currentArticles.length; k < l; k++) {
                var previousArticleDate = currentArticles[k].Date;

                if (newArticleDate == previousArticleDate) {

                    for (var c = 0, a = newArticles[i].Articles.length; c < a; c++) {
                        currentArticles[k].Articles.push(
                            newArticles[i].Articles[c]
                        );
                    }

                    delete newArticles[i];
                }

            }
        }
        return currentArticles.concat(newArticles);
    }

    function _requestData(items) {
        var params = JSON.stringify({
            Page: $scope.pageNumber,
            NumberPerPage: items,
            SelectedSeasonId: $scope.formModel.SelectedSeasonId,
            SelectedMonth: $scope.formModel.SelectedMonth,
            SelectedContentTypeId: $scope.formModel.SelectedContentTypeId,
            SelectedTagId: $scope.formModel.SelectedTagId,
            SelectedAuthorId: $scope.formModel.SelectedAuthorId
        });

        restApi.postData('/api/ArticleListing/GetArticles', params).then(function (response) {

            if ($scope.articles !== undefined) {
                paged = _mapArticles(paged, response);
            } else {
                paged = paged.concat(response);
            }

            $scope.resultCount = paged.length;
            $scope.articles = paged;
            $scope.pageNumber++;
            $scope.resultsEnd = response.length === 0;
        });
    }
}]);
