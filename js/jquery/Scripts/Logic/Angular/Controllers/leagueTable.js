angular.module('AVFC').controller("LeagueTable", ['$scope', '$http', 'restApi', 'activeToggle', 'urlParams', function ($scope, $http, restApi, activeToggle, urlParams) {

    "use strict";

    /**
     * Get league overview and bind to scope
     */
    function _getLeagueOverview() {
        $scope.isLoading = true;
        restApi.getData('/api/LeagueTable/GetLeagueRankings', {
            competitionId: $scope.competition
        }).then(function (response) {
            $scope.league = response;
            $scope.isLoading = false;
            $scope.leagueSize = response.Rankings.length - 1;
        });
    }

    /**
     * Initial loading calls
     */
    $scope.initLeague = function (cid) {
        var _q = urlParams.getQuery(cid);
        if (_q !== false) {
            $scope.competition = _q.cid;
        } else {
            $scope.competition = cid;
        }
        _getLeagueOverview();
    };

    /**
     * Reload league table
     */
    $scope.reloadLeague = function () {
        _getLeagueOverview();
    };


}]);