angular.module('AVFC').controller("VideoListing", ['$scope', '$http', 'restApi', '$sce', '$filter', '$attrs', function ($scope, $http, restApi, $sce, $filter, $attrs) {

    "use strict";

    var _endPoint = "/api/videolisting/GetVideos";
    var _page = 1;
    var _perPage = 12;

    $scope.videos = [];
    $scope.showLoadMore = true;


    $scope.init = function() {
        _fetchVideos($attrs.channel);
    };

    /**
     * Get videos from API
     * @param {string} channel
     * @private
     */
    function _fetchVideos(channel) {

        var _params = {
            ChannelId: channel,
            NumberPerPage: _perPage,
            Page: _page,
            Tag: ""
        };

        restApi.postData(_endPoint, _params).then(function (response) {

            if ($scope.videos.length === 0) {
                $scope.videos = response;
            } else {
                for (var i = 0; i < response.length; i++) {
                    $scope.videos.push(response[i]);
                }
            }

            if (response.length < _perPage) {
                $scope.showLoadMore = false;
            }

            _page++;

        });

    }

    /**
     * Scoped function to call videos from view
     * @param {string} channel
     */
    $scope.loadVideos = function (channel) {
        _fetchVideos(channel);
    };

    /**
     * Creates Google rich snippet
     * @param {string} title
     * @param {string} summary
     * @param {string} thumb
     * @param {string} date
     * @returns {object} jsonId
     */
    $scope.jsonSnippet = function (title, summary, thumb, date) {
        var _json = {
            "@context": "http://schema.org",
            "@type": "VideoObject",
            "name": title,
            "description": summary,
            "thumbnailUrl": thumb,
            "uploadDate": date
        };

        return $sce.trustAsHtml($filter('json')(_json));

    };

}]);