angular.module("AVFC").controller("SearchController", ['$scope', 'restApi', 'urlParams', function ($scope, restApi, urlParams) {

    "use strict";

    var _rest = {
        search: {
            uri: 'api/Search/Search',
            method: 'POST',
            scopeUpdate: 'searchResultsPage'
        },
        searchPlayers: {
            uri: 'api/Search/SearchPlayers',
            method: 'POST',
            scopeUpdate: 'playersSearchResults'
        }
    };

    $scope.pageNumber = 1;
    $scope.numItems = 10;
    $scope.searchResults = {};

    $scope.formModel = {
        searchTerms: '',
        selectedCategory: '',
        selectedContentType: '',
        selectedSeason: '',
        selectedMonth: ''
    };

    $scope.initialize = function (numItems) {
        $scope.formModel.numItems = numItems;

        $scope.$watchGroup([
            'formModel.selectedCategory',
            'formModel.selectedContentType',
            'formModel.selectedSeason',
            'formModel.selectedMonth'
        ], function (newVal, oldVal) {
            if (newVal !== oldVal) {
                _loadSearchResults();
            }
        });

        var searchTerms = urlParams.getQuery('q');

        if (searchTerms !== false) {
            $scope.formModel.searchTerms = searchTerms;
        }

        _loadSearchResults();
    };

    $scope.search = function() {
        _loadSearchResults();
    };

    $scope.loadMore = function() {
        $scope.pageNumber += 1;
        _loadSearchResults();
    };

    $scope.handleKeypress = function(key) {
        if (key === 13) {
            _loadSearchResults();
        }
    };

    /**
     * Loads search results
     * @returns {}
     */
    function _loadSearchResults() {
        var params = {
            page: $scope.pageNumber,
            numberPerPage: $scope.numItems,
            searchTerm: $scope.formModel.searchTerms,
            selectedContent: $scope.formModel.selectedContentType,
            selectedTag: $scope.formModel.selectedCategory,
            selectedSeason: $scope.formModel.selectedSeason,
            selectedMonth: $scope.formModel.selectedMonth
        };

        if (params.page === 1) {
            _requestData('searchPlayers', params, _updateSlider);
        }

        if (params.page === 1) {
            $scope.searchResults.ContentSearchResults = [];
        }

        _requestData('search', params, _appendResults);
    }

    function _appendResults() {
        if ($scope.searchResults.ContentSearchResults === undefined) {
            $scope.searchResults.ContentSearchResults = [];
        }

        $scope.searchResults.ContentSearchResults = $scope.searchResults.ContentSearchResults.concat($scope.searchResultsPage.ContentSearchResults);
    }

    function _updateSlider() {
        var $playerSlider = $('.search-player');

        if ($playerSlider.hasClass('slick-initialized')) {
            $playerSlider.slick('unslick');
        }

        setTimeout(function () {
            $playerSlider.slick({
                arrows: true,
                dots: true,
                infinite: false,
                slidesToShow: 1,
                slidesToScroll: 1,
                dotsClass: 'custom_paging',
                customPaging: function (slider, i) {
                    return (i + 1);
                }
            });
        }, 1);
    }

    /**
     * Requests data using restAPI service
     * @param string settings 
     * @param callback callback
     * @return boolean      
     */
    function _requestData(action, params, callback) {
        var method = (_rest[action].method === 'GET') ? 'getData' : 'postData';

        restApi[method](_rest[action].uri, params).then(function (response) {
            if (response !== undefined) {
                $scope[_rest[action].scopeUpdate] = response;

                if (callback !== undefined) {
                    callback();
                }
            }

            return true;
        });
    }
}]);