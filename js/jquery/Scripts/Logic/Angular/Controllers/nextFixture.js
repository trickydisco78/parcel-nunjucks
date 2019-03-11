/**
 * Fixture Listings controller
 * @author Steve Macey <smacy@rippleffect.com>
 */
angular.module('AVFC').controller("NextFixture", ['$scope', '$http', 'restApi', '$filter', '$location', 'urlParams', 'timeHelper', function ($scope, $http, restApi, $filter, $location, urlParams, timeHelper) {

    "use strict";

    var qs = urlParams.getQuery('tid');
    var now = Date.parse(new Date());

    $scope.hasNextMatch = false;

    function _getNextMatch(tid) {

        restApi.getData('/api/Fixtures/GetNextFixture', {
            teamId: tid
        }).then(function (response) {
            $scope.nextMatch = response;
            if (response) {
                $scope.hasNextMatch = true;
                $scope.nextMatchCount = timeHelper.getTimeDiff(timeHelper.reFormatUTC(response.KickOffUtc));
                $scope.kickOffTime = timeHelper.getTime(response.KickOffUtc, 'h:m');
                $scope.kickOffDate = timeHelper.getDate(response.KickOffUtc);
            }
        });

    }



    $scope.initNextMatch = function (teamId) {
        $scope.defaultTeam = teamId;
        if (qs) {
            _getNextMatch(qs);
        } else {
            _getNextMatch($scope.defaultTeam);
        }
    };


    /**
     * FormatKickOffDate
     * Needs moving to it's own filter
     * @param {int} timestamp 
     * @return {string}
     */
    $scope.formatKickOffDate = function(timestamp){
        var months = ['January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ];
        var weekdays = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
        ];
        var a = new Date(timestamp);
        var day = weekdays[a.getDay()];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = day + ' ' + date + ordinal(date) + ' ' + month;

        function ordinal(date) {
          var d = date % 10;
          return (~~ (date % 100 / 10) === 1) ? 'th' :
                 (d === 1) ? 'st' :
                 (d === 2) ? 'nd' :
                 (d === 3) ? 'rd' : 'th';
        }

        return time;
    };

}]);
