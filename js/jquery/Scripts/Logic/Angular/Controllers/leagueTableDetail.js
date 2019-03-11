// Fixture Item controller
angular.module('AVFC').controller("LeagueTableDetail", ['$scope', '$http', 'restApi', function ($scope, $http, restApi) {

    "use strict";

    /**
     * Set loaded status to false
     * @type {boolean}
     * @private
     */
    var _isLoaded = false,
        _cid,
        _clid;

    $scope.setClubDetails = function (cid, clid) {
        _cid = cid;
        _clid = clid;
    };

    $scope.detailsLoading = false;

    /**
     * Get details from web service and set loaded to true
     * @param {array} leagueSize
     * @private
     */
    function _getData(leagueSize) {
        if (!_isLoaded) {
            $scope.detailsLoading = true;
            restApi.getData('/api/leaguetable/GetLeagueData', {
                competitionId: _cid,
                clubId: _clid
            }).then(function (response) {
                $scope.clubDetail = response;
                _isLoaded = true;
                _setChartData(response.Position, leagueSize);
                $scope.detailsLoading = false;
            });
        }
    }

    /**
     * Call _getData
     */
    $scope.getLeagueDetail = function (leagueSize) {
        _getData(leagueSize);
    };

    /**
     * Check for home team and call _getData
     */
    $scope.getHomeTeamDetails = function (homeTeam, leagueSize) {
        if (homeTeam) {
            _getData(leagueSize);
            $scope.panelActive = true;
            $scope.homeTeamActive = true;
        }
    };

    /**
     * Takes an integer and returns result type as single character
     * @param {int} val
     */
    $scope.formResultText = function (val) {
        var _result = null;
        switch (val) {
            case -1:
                _result = 'Lose';
                break;
            case 0:
                _result = 'Draw';
                break;
            case 1:
                _result = 'Win';
                break;
        }
        return _result;
    };

    function _setChartData(posData, leagueSize) {

        var _labels = [];

        for (var i = 0; i < posData.length; i++) {

            _labels.push((i + 1).toString());

        }

        $scope.labels = _labels;
        $scope.options = {
            pointDot: false,
            bezierCurve: false,
            datasetFill: false,
            scaleOverride: true,
            scaleSteps: leagueSize,
            scaleStepWidth: -1,
            scaleStartValue: leagueSize + 1,
            scaleFontSize: 10,
            responsive: true,
            showTooltips: false
        };
        $scope.data = [posData];
        $scope.colours = [
            {
                strokeColor: '#999'
            }
        ];
    }


}]);
