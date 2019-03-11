/*global gigya:false*/
angular.module('AVFC').controller('CommentsStatisticsController', [
    '$scope', '$attrs', function ($scope, $attrs) {
        $scope.comments = -1;
        $scope.shares = -1;

        /**
        * Initializes controller
        * @return void
        */
        $scope.initialize = function () {
            /*
            var streamId = $attrs.streamid;
            var categoryId = $attrs.categoryid;
            var url = $attrs.url;

            if (url !== undefined) {
                _getSharesCount(url);
            }

            if (streamId !== undefined && categoryId !== undefined) {
                _getCommentsCount(categoryId, streamId);
            }
            */
        };

        /**
         * Loads the comments count for the specified category and stream IDs
         * @param {} categoryId 
         * @param {} streamId 
         * @returns void
         */
        function _getCommentsCount(categoryId, streamId) {
            /*
            var params = {
                categoryID: categoryId,
                streamID: streamId,
                callback: function (response) {
                    $scope.$apply(function () {
                        if (response.errorCode === 0) {
                            $scope.comments = response.streamInfo.commentCount;
                        } else {
                            console.log("gigya.comments.getStreamInfo() failed. Error = " + response.errorMessage);
                            $scope.commentCount = -1;
                        }
                    });
                }
            };

            gigya.comments.getStreamInfo(params);*/
        }

        /**
         * Loads the share count for the specified url
         * @param {} url 
         * @returns void
         */
        function _getSharesCount(url) {
            /*
            var params = {
                URL: url,
                enabledProviders: 'facebook',
                callback: function(response) {
                    $scope.$apply(function () {
                        if (response.errorCode === 0) {
                            $scope.shares = response.shareCounts.facebook;
                        } else {
                            console.log("gigya.socialize.getProviderShareCounts() failed. Error = " + response.errorMessage);
                            $scope.shares = -1;
                        }
                    });
                }
            };

            gigya.socialize.getProviderShareCounts(params);
            */
        }
    }
]);