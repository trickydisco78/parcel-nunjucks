// Listing controller
angular.module('AVFC').controller("FixturesListing", ['$scope', '$http', 'restApi', '$filter', 'activeToggle', 'timeHelper', function ($scope, $http, restApi, $filter, activeToggle, timeHelper) {

    "use strict";

    /**
     * Create container for fixture response
     * @type {object}
     * @private
     */
    var _fixtureList = {};

    /**
     * @description active state
     * @type boolean
     */
    $scope.active = false;

    /**
     * Set loading status
     * @type {boolean}
     */
    $scope.isLoading = false;

    /**
     * Set load previous
     * @type boolean
     */
    $scope.showPrevious = false;

    /**
     * Set has previous fixtures
     * @type boolean
     */
    $scope.hasPreviousFixtures = false;

    /**
     * Set load previous
     * @type boolean
     */
    $scope.noResults = false;


    /**
     * Set Fixture or result
     * @param {timestamp} fixtureDate
     * @returns {boolean}
     */
    $scope.isResult = function (fixtureDate) {
        var start = Date.parse(new Date(fixtureDate));
        var now = Date.parse(new Date());
        return start < now;
    };

    /**
     * Add active toggling functionality to scope
     */
    $scope.toggleFixture = activeToggle.multiTrigger;
    $scope.fixtureActive = activeToggle.multiActive;

    /**
     * Takes an integer and returns result type as single character
     * @param {int} val
     * @returns {*}
     */
    $scope.formResultText = function (val) {
        var _result = null;
        switch (val) {
            case -1:
                _result = 'L';
                break;
            case 0:
                _result = 'D';
                break;
            case 1:
                _result = 'W';
                break;
        }
        return _result;
    };

    /**
     * Takes a team name and returns a 3 letter abbreviation
     * @param {string} name
     * @returns {string}
     */
    $scope.teamAbr = function (name) {
        return name.substring(0, 3).toUpperCase();
    };

    /**
     * Gets fixture summaries data and bind to scope data
     * @param {guid} tid
     * @param {guid} sid
     */
    function _getFixtures(tid, sid) {
        $scope.isLoading = true;
        $scope.noResults = false;
        // Fetch fixture list
        restApi.getData('/api/Fixtures/GetFixtureSummaries', {
            teamId: tid,
            seasonId: sid,
            loadPrevious: $scope.showPrevious
        }).then(function (response) {
            $scope.hasPreviousFixtures = response.HasPreviousFixtures;
            _fixtureList = response.Summaries;
            $scope.fixtures = _fixtureList;
            $scope.filter();
            if (_fixtureList.length < 4 && $scope.showPrevious === false) {
                $scope.reloadFixtures();
            }

            angular.forEach($scope.fixtures, function(value, index) {
                angular.forEach(value.FixtureSummaries, function(val, i) {
                    $scope.fixtures[index].FixtureSummaries[i].KickOffDate = timeHelper.getDate($scope.fixtures[index].FixtureSummaries[i].KickOffUtc, true);
                    $scope.fixtures[index].FixtureSummaries[i].KickOffTime = timeHelper.getTime($scope.fixtures[index].FixtureSummaries[i].KickOffUtc, 'h:m');
                });
            });

            $scope.isLoading = false;
        });
    }


    /**
     * Filter results based on competition type
     */
    $scope.filter = function () {
        var _fixtures;
        var _results = [];
        var c;
        var i;
        var x;

        for (i = 0, c = 0; i < _fixtureList.length; i++) {

            _fixtures = _fixtureList[i].FixtureSummaries;

            _results.push({
                'MonthYear': _fixtureList[i].MonthYear,
                'FixtureSummaries': []
            });

            for (x = 0; x < _fixtures.length; x++) {

                if ($scope.competitionTypeId === _fixtures[x].CompetitionTypeId || $scope.competitionTypeId === '00000000-0000-0000-0000-000000000000') {
                    _results[i].FixtureSummaries.push(_fixtures[x]);
                }

            }

            if (_results[i].FixtureSummaries.length === 0) {
                delete _results[i].MonthYear;
                c++;
            }

        }

        $scope.fixtures = _results;
        $scope.noResults = (c === i);

        if ($scope.noResults === true && $scope.showPrevious === false) {
            $scope.reloadFixtures();
        }

    };

    /**
     * Initial loading calls
     */
    $scope.initFixtures = function (teamId, seasonId, compId) {
        $scope.defaultTeam = teamId;
        $scope.seasonId = seasonId;
        $scope.competitionTypeId = compId;
        _getFixtures($scope.defaultTeam, $scope.seasonId);
    };

    /**
     * Reload fixtures and reset competition filter
     */
    $scope.reloadFixtures = function () {
        $scope.showPrevious = true;
        _getFixtures($scope.defaultTeam, $scope.seasonId);
    };





}]);
