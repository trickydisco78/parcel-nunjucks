/**
 * Match Centre Controller
 * @author John Hopley <jhopley@rippleffect.com
 */
angular.module('AVFC').controller('MatchCentreController', ['$scope', '$attrs', '$http', 'timeHelper', 'restApi', function ($scope, $attrs, $http, timeHelper, restApi) {

    'use strict';

    /**
     * Match status will be updated at every request
     * @var string
     */
    var _matchStatus;

    $scope.matchTabActive = false;


    /**
     * Default Formation type
     * @type {string}
     */
    var _defaultFormationType = '442';


    /**
     * Home 
     * @type {boolean}
     */
     $scope.homePage = false;


    /**
     * Configuration for each rest request
     * @var object
     */
    var _rest = {
        matchDay: {
            uri: '/api/matchday/GetMatchDayFixture',
            scopeUpdate: 'data',
            intervalTime: 60000,
            runInit: true,
            defaultParams: {
                FixtureId: null,
                LoadClubs: true,
                LoadPlayers: true,
                LoadLineUps: true,
                LoadFormations: true,
                LoadGoalScorers: true,
                LoadGoalSummaries: true,
                LoadBookings: false,
                LoadCompetition: true,
                LoadVenue: true
            }
        },
        commentary: {
            uri: '/api/Commentary/GetCommentary',
            scopeUpdate: 'commentary',
            intervalTime: 120000,
            runInit: true,
            defaultParams: {
                FixtureItemId: null,
                StartingId: '',
                RetrieveOlderItems: false
            }
        },
        addCommentary: {
            uri: '/api/Commentary/AddCommentary',
            scopeUpdate: 'commentaryResponse',
            intervalTime: false,
            runInit: false,
            defaultParams: {
                FixtureId: null,
                Comment: null
            }
        },
        playerStats: {
            uri: '/api/PlayerStatistics/GetPlayerStatistics',
            scopeUpdate: 'playerStats',
            intervalTime: false,
            runInit: false,
            defaultParams: {
                FixtureId: null,
                PlayerId: null
            }

        }
    };


    /**
     * Grouped matched status types
     * @var object
     */
    var _matchStatusTypes = {
        live: [
            'FirstHalf',
            'HalfTime',
            'SecondHalf',
            'ExtraFirstHalf',
            'ExtraHalfTime',
            'ExtraSecondHalf',
            'ShootOut',
            'FullTime90',
            'FullTimePens'
        ],
        fullTime: [
            'Abandoned',
            'Postponed',
            'FullTime'
        ],
        preMatch: [
            'PreMatch'
        ]
    };


    /**
     * Formations Options
     * @var Object
     */
    var _formationsSettings = {
        formationsURI: '/Scripts/Logic/Angular/Data/MatchCentre/formations.json',
        pitch: {
            pitchWidth: 294,
            pitchHeight: 270
        }
    };


    /**
     * Creates initial data request and starts interval
     * @returns void
     */
    $scope.init = function (home) {

        if ($attrs.fixtureId !== null || $attrs.fixtureId !== undefined) {
            _setRequestParamsFromAttrs($attrs);
        }

        if ($scope.formations === undefined) {
            _getFormationsData();
        }

        for (var request in _rest) {
            if (_rest.hasOwnProperty(request) && _rest[request].runInit) {
                _requestData(request);
            }
        }
        if($attrs.homePage) {
            $scope.homePage = true;
        }

    };


    /**
     * Show's player stats section
     * (note: this needs to be refactored)
     * @param {object} $event
     * @param {string} teamColor
     * @return void
     */
    $scope.showPlayerStats = function ($event, teamColor) {
        teamColor = typeof teamColor !== 'undefined' ?  teamColor : "#480024";
        var $el = $($event.currentTarget);
        var showStatsClass = 'js-show-ps-content';
        var side = ($el.attr('data-team').indexOf('home') > -1) ? 'home' : 'away';
        var $teamSide = $('.' + $el.attr('data-team'));
        var optaPId = parseInt($el.attr('data-opta-pid').replace('p', ''));
        var $loader = $el.find('.js-player-loading');
        var $playerNumber = $el.find('.js-player-number');
        var checkForResponse = setInterval(function () {
            if ($scope.playerStatsHome || $scope.playerStatsAway) {
                $loader.hide();
                $playerNumber.show();
                clearCheckForResponse();
                openPlayerStats();
            }
        }, 1000);

        var clearCheckForResponse = function () {
            clearInterval(checkForResponse);
        };

        var openPlayerStats = function () {
            $teamSide.find('.line-ups-stats').addClass(showStatsClass);
            $teamSide.find('.js-line-up-wrapper .line-ups-col').css({opacity: 0});
            setOptaHeatMap();
            drawCharts(teamColor);
        };

        var drawCharts = function (homeColor) {

            homeColor = typeof homeColor !== 'undefined' ?  homeColor : "#480024";

            var $charts = $teamSide.find('.small-pie-chart');

            $charts.each(function () {
                var $this = $(this);
                var color = $this.attr('data-chart-home-color');
                var percentage = parseInt($this.attr('data-chart-percentage'));

                var params = [
                    {
                        title: 'Home',
                        value: percentage,
                        color: homeColor
                    },
                    {
                        title: 'Away',
                        value: (100 - percentage),
                        color: "#cccccc"
                    }
                ];

                var options = {
                    percentageInnerCutout: 70,
                    segmentStrokeWidth: 3
                };

                if ($(this).find('svg').length > 0) {
                    $(this).find('svg').remove();
                }


                $this.drawDoughnutChart(params, options);
            });
        };

        var setOptaHeatMap = function () {
            $('.line-up-'+side+'-team'+'.starter.selected').trigger('click');
            $('.line-up-'+side+'-team'+' *[data-pid="' + optaPId + '"]').trigger('click');
        };


        $loader.css({display: 'inline-block'});
        $playerNumber.hide();
        _rest.playerStats.defaultParams.FixtureId = $el.attr('data-fixture-id');
        _rest.playerStats.defaultParams.PlayerId = $el.attr('data-player-id');
        _rest.playerStats.scopeUpdate = (side === 'home') ? 'playerStatsHome' : 'playerStatsAway';
        _requestData('playerStats', function () {

            $scope.chartType = 'Radar';

            $scope.chartLabels = [
                'Shots',
                'TakeOns',
                'Passes',
                'Crosses',
                'Tackles',
                'Interceptions',
                'Clearances',
                'Fouls'
            ];


            $scope.chartData = [
                [
                    $scope[_rest.playerStats.scopeUpdate].Shots,
                    $scope[_rest.playerStats.scopeUpdate].TakeOns,
                    $scope[_rest.playerStats.scopeUpdate].Passes,
                    $scope[_rest.playerStats.scopeUpdate].Crosses,
                    $scope[_rest.playerStats.scopeUpdate].Tackles,
                    $scope[_rest.playerStats.scopeUpdate].Interceptions,
                    $scope[_rest.playerStats.scopeUpdate].Clearances,
                    $scope[_rest.playerStats.scopeUpdate].Fouls
                ]
            ];

            // account for negative values
            if($scope[_rest.playerStats.scopeUpdate].PassingAccuracy < 0) {
                $scope[_rest.playerStats.scopeUpdate].PassingAccuracy = 0;
            }


            if($scope[_rest.playerStats.scopeUpdate].TacklesWon < 0) {
                $scope[_rest.playerStats.scopeUpdate].TacklesWon = 0;
            }

            if (side === 'home') {
                $scope.chartDataHome = $scope.chartData;
            } else {
                $scope.chartDataAway = $scope.chartData;
            }

        });

    };


    /**
     * IsNan
     * @return string;
     */
    $scope.isNan = function (val) {
        if (isNaN(val)) {
            return '0';
        }
        return val;
    };

    /**
     * Hide's player stats
     * (note: this needs to be refactored)
     * @param {object} $event
     * @return {[type]}
     */
    $scope.hidePlayerStats = function ($event, side) {
        side = side.toLowerCase();
        $('.line-up-'+side+'-team'+' .selected[data-pid]').click();
        var $el = $($event.currentTarget);
        var $target = $(($el.attr('data-team') === 'Home') ? '.line-up-home-team' : '.line-up-away-team');
        $target.find('.line-ups-stats').removeClass('js-show-ps-content');
        $target.find('.js-line-up-wrapper .line-ups-col').removeAttr('style');
    };


    /**
     * Checks is string is empty
     * @param {string} str
     * @return boolean
     */
    $scope.isEmpty = function (str) {
        if(str === undefined || str.length === 0 || str === '') {
          return false;
        }
        return true;
    };


    /**
     * Gets a percentage
     * @param {int} total
     * @param {int} val
     * @return int
     */
    $scope.percentage = function (total, val) {
        if (total === undefined) total = 0;
        if (val === undefined) val = 0;
        return (total === 0) ? 0 : Math.round((parseFloat(val) / parseFloat(total)) * 100);
    };


    /**
     * Post comment to server
     * * NOTE *
     * There flash messages in this need to be sent back from the server with the correct http header.
     * This really needs to be refactored with the server requests
     */
    $scope.addComment = function () {
        $scope.commentResponseMsg = [];

        if ($scope.form.comment.length < 5) {
            $scope.commentResponseClass = 'form-error';
            $scope.commentResponseMsg.push('Comment must be at least 5 characters long.');
            return;
        }

        _rest.addCommentary.defaultParams.FixtureId = _rest.matchDay.defaultParams.FixtureId;
        _rest.addCommentary.defaultParams.Comment = $scope.form.comment;

        _requestData('addCommentary', function () {
            if ($scope.commentaryResponse.success) {
                $scope.commentResponseClass = 'form-success';
                $scope.commentResponseMsg.push('Your comment has been sent and is waiting approval.');
                $scope.form = null;

            } else {
                $scope.commentResponseClass = 'form-error';
                $scope.commentResponseMsg.push('Something went wrong there, please try again in a few minutes.');
            }
        });

    };


    /**
     * Get's JSON file containing formations data
     * @return void
     * Docs: https://rippleffect.atlassian.net/wiki/x/jwEXBQ
     */
    function _getFormationsData() {
        $http.get(_formationsSettings.formationsURI).then(function successCallback(response) {
            $scope.formations = response.data[0];
        }, function errorCallback(response) {
            console.log('Error: Could not load foramtions.');
        });
    }


    /**
     * Map Formations coordinates to Formations.Players
     * @return void
     */
    function _mapFormationPlayerCoordinates(team) {
        if(!$scope.formations.hasOwnProperty($scope.data[team].FormationType)) {

            $scope.data[team].FormationType = _defaultFormationType;
        }

        if ($scope.data[team] !== null) {
            var formationsTypeId = $scope.data[team].FormationType;
            var formation = $scope.formations[formationsTypeId];
            for (var i = 0, l = $scope.data[team].Players.length; i < l; i++) {

                var w = _formationsSettings.pitch.pitchWidth;
                var h = _formationsSettings.pitch.pitchHeight;
                var x = formation[(i + 1)].x;
                var y = formation[(i + 1)].y;
                var leftOffset = 4;
                var topOffset = 12;
                var left = ((x / w) * 100) - leftOffset;
                var top = ((y / h) * 100) - topOffset;

                $scope.data[team].displayOption = 'block';
                $scope.data[team].Players[i].position = {
                    xPos: x,
                    yPos: y,
                    leftPos: left,
                    topPos: top
                };
            }
        }
    }


    /**
     * Checks for data attributes in the controller template and maps
     * them to _defaultRequestParams.
     * @param {object} $attrs
     * @returns void
     */
    function _setRequestParamsFromAttrs($attrs) {
        _rest.commentary.defaultParams.FixtureItemId = $attrs.fixtureId;
        for (var prop in _rest.matchDay.defaultParams) {
            if (_rest.matchDay.defaultParams.hasOwnProperty(prop)) {
                var x = prop.charAt(0).toLowerCase() + prop.slice(1);
                if ($attrs[x] !== undefined) {
                    _rest.matchDay.defaultParams[prop] = $attrs[x];
                }
            }
        }
    }

    /**
     * Creates an interval for data updates
     * @param {string} restSettings
     * @returns void
     */
    function _requestDataInterval(restSettings) {
        if (_rest[restSettings].intervalTime !== false) {
            $scope[restSettings + 'Interval'] = setInterval(function () {
                _requestData(restSettings);
            }, _rest[restSettings].intervalTime);
        }
    }

    /**
     * Requests data from the server and sets the return onto scope data
     * @param string restSettings
     * @param object callback
     * @returns void
     */
    function _requestData(restSettings, callback) {
        if (callback === undefined || !callback) {
            callback = null;
        }

        restApi.postData(_rest[restSettings].uri, _rest[restSettings].defaultParams).then(function (response) {
            if (response !== undefined) {
                $scope[_rest[restSettings].scopeUpdate] = response;
                $scope[_rest[restSettings].scopeUpdate] = response;


                if (restSettings == 'commentary') {
                    twttr.widgets.load();
                }
                if (callback !== undefined && callback !== null) {
                    callback();
                }

                if ($scope[_rest[restSettings].scopeUpdate].MatchStatus !== undefined) {
                    if (_matchIs()) {
                        _setMatch();
                    }
                }
            }
            return true;
        });
    }


    /**
     * Sets match status in order to check if it should set intervals, count downs or remain
     * @return boolean
     */
    function _matchIs() {
        for (var matchStatus in _matchStatusTypes) {
            if (_matchStatusTypes.hasOwnProperty(matchStatus) && jQuery.inArray($scope.data.MatchStatus, _matchStatusTypes[matchStatus]) != -1) {
                _matchStatus = matchStatus;
                $scope.matchStatus = _matchStatus;
                return true;
            }

        }
        return false;
    }


    /**
     * Dictates match controls
     * @return void
     */
    function _setMatch() {
        if(!$scope.homePage) {
            _mapFormationPlayerCoordinates('HomeFormation');
            _mapFormationPlayerCoordinates('AwayFormation');
        }

        if (_matchStatus === 'live') {
            return _liveMatch();
        }
        else if (_matchStatus === 'preMatch') {
            $('.match-score-summary').addClass('pre-match');
            return _preMatch();
        } 
    }


    /**
     * Set interval on data requests
     * @return void
     */
    function _liveMatch() {
        if ($scope.data.MatchTime === 'PM') {
            $scope.data.MatchTime = 0;
        }

        if ($scope.homePage) {
            $('.match-center-home-tab').trigger('click');
            $('.slick-navigation-hero .slick-slide').removeClass('slick-active');
            $('.slick-carousel-hero, .slick-navigation-hero').slick('slickPause');
            
            $scope.homePage = false;
        }

        for (var request in _rest) {
            if (_rest.hasOwnProperty(request) && $scope[request + 'Interval'] === undefined) {
                _requestDataInterval(request);
                return;
            }
        }
    }


    /**
     * Sets count down on html widget
     * @return void
     */
    function _preMatch() {
        var kickOff = Date.parse(timeHelper.reFormatUTC($scope.data.KickOffUTC));

        if ((kickOff - Date.parse(new Date())) > 0) {
            _startCountDown(kickOff);

            $scope.preMatchInterval = setInterval(function () {
                _startCountDown(kickOff);
                $scope.$apply();
            }, 1000);

        } else {
            _updatePostMatchToLive();
        }

    }


    /**
     * Gets the remaining time from unix timestamp ($scope.data.KickOffDate)
     * @param int endTime
     * @return object
     */
    function _startCountDown(endTime) {
        var watching = [
            'matchCountDown.days',
            'matchCountDown.hours',
            'matchCountDown.minutes',
            'matchCountDown.seconds'
        ];

        $scope.matchCountDown = timeHelper.getTimeDiff(endTime);

        $scope.$watch(watching, function () {

            if ($scope.matchCountDown.days <= 0 &&
                $scope.matchCountDown.hours <= 0 &&
                $scope.matchCountDown.minutes <= 0 &&
                $scope.matchCountDown.seconds <= 0) {
                delete $scope.matchCountDown;
                clearInterval($scope.preMatchInterval);
                _updatePostMatchToLive();
            }

            if($scope.homePage) {
                if ($scope.matchCountDown.days <= 0 && $scope.matchCountDown.hours <= 2 && $scope.matchTabActive === false) {
                    $scope.matchTabActive = true;
                    $(document).ready(function () {
                        $('#MatchCenterTab').trigger('click');
                    });
                }
            }
    
        });

    }


    /**
     * Update's pre match to temp live status
     * @return void
     */
    function _updatePostMatchToLive() {
        $scope.data.MatchTime = 0;
        if($scope.homePage) {
            _liveMatch();
        } else {
            $('.match-score-summary').removeClass('pre-match');
            setTimeout(function () {
                var url = location.href;

                if (url.indexOf('?matchdetails=1') > 0) {
                    _liveMatch();
                }
                else {
                    location.href = location.href.substring(0, url.indexOf('?matchreport=1')) + '?matchdetails=1';
                }
                
                
            }, 60000);
        }
    }


}]);