angular.module('AVFC').controller('StartingXIController', ['$scope', '$location', '$anchorScroll', '$http', '$attrs', 'restApi', function($scope, $location, $anchorScroll, $http, $attrs, restApi) {

    /**
     * Rest request settings
     * @type object
     */
    var _rest = {
        getNextFixture: {
            uri: '/api/StartingXI/GetNextFixture',
            method: 'GET',
            scopeUpdate: 'fixture',
            params: null
        },
        getTeam: {
            uri: '/api/StartingXI/GetTeam',
            method: 'GET',
            scopeUpdate: 'team',
            params: null,
            collections: {
                getAcronyms: function() {
                    $scope.team.Goalkeepers.acrom = 'GK';
                    $scope.team.Defenders.acrom = 'DF';
                    $scope.team.Midfielders.acrom = 'MF';
                    $scope.team.Forwards.acrom = 'FD';
                }
            }
        },
        getFormation: {
            uri: '/Scripts/Logic/Angular/Data/StartingXI/formations.json',
            method: 'GET',
            scopeUpdate: 'formations',
            params: null
        },
        saveFormation: {
            uri: '/api/StartingXI/SaveFormation',
            scopeUpdate: 'images',
            method: 'POST',
            params: {
                FixtureId: null,
                FormationType: null,
                PlayerIds: []
            }
        }
    };


    /**
     * Stores The current formation
     * @type object
     */
    $scope.currentFormation = {
        GK: 1,
        DF: 4,
        MF: 3,
        FD: 3
    };


    /**
     * Hold selected players
     * @type array
     */
    $scope.selectedPlayers = [];



    /**
     * Initializes controller
     * @return void
     */
    $scope.initialize = function() {
        _setSelectPlayerPlaceholders();

        _getFormations();

        _requestData('getTeam', 'getAcronyms');

        _requestData('getNextFixture', null, function() {
            _rest.saveFormation.params.FixtureId = $scope.fixture.FixtureId;
        });

    };


    /**
     * Formations change event
     * @param object selectedFormation
     * @return void 
     */
    $scope.formationChange = function(selectedFormation) {
        $scope.currentFormation = selectedFormation;
        _rest.saveFormation.params.FormationType = selectedFormation.title;
        _reset();
    };


    /**
     * Player change event
     * @param object selectedPlayer
     * @return void 
     */
    $scope.playerChange = function(playerId) {
        _registerPlayer(playerId);
    };


    /**
     * Show toggle on player type lists
     * @param  object $event 
     * @return void 
     */
    $scope.listToggle = function($event) {
        $('.starting-XI__select h3').removeClass('active');
        $($event.currentTarget).toggleClass('active');
    };



    /**
     * Filter out players that are already select else where
     * @param player
     * @return boolean
     */
    $scope.filterByPlayerRegister = function(player, selectId) {
        return function(item) {
            if ((item.taken && item.selectId == selectId) ||
                (item.taken === undefined && item.selectId === undefined)) {
                return true;
            }
            return false;
        };
    };



    /**
     * Checks validation then requests my starting XI image from server
     * @return void 
     */
    $scope.create = function($event) {
        var validate = _validateSelectedPlayersList();

        $event.preventDefault();
        _setPlayersIdsInRequestParams();

        if (validate === true) {
            $('.js-starting-XI-loading').show();
            $('.starting-XI__form--submit .btn').hide();
            _requestData('saveFormation', null, function(){
                if($scope.images.Url === undefined) {
                    $scope.validatedClass = 'error';
                    $scope.validated = 'Server error.';
                }
                delete $scope.validatedClass;
                delete $scope.validated;
                delete $scope.preview;
                _openPopup();
            });
            return;
        }
        $anchorScroll('startingXI');
        $scope.validatedClass = 'error';
        $scope.validated = 'Line up was not complete, you have missed '+validate+' players.';
    };


    /**
     * Toggle preview value
     * @return void 
     */
     $scope.togglePreview = function($event) {
        var $target = $($event.currentTarget);
        if($scope.preview === false || $scope.preview === undefined) {
           $target.text('Hide quick preview');
           $scope.preview = true;
        } else {
           $target.text('Show quick preview');
           $scope.preview = false;
        }
    };



    /**
     * Validates selected players list
     * @return boolean|int
     */
    function _validateSelectedPlayersList() {
        var amount = $scope.selectedPlayers.length;
        var failed = 0;
        for (var i = 0, x = amount; i < x; i++) {
            if ($scope.selectedPlayers[i].PlayerId === undefined) {
                failed++;
            }
        }
        return (amount != 11 || failed > 0) ? failed : true;
    }



    /**
     * Sets the SaveFormation playerIds in requests params
     * @return void 
     */
    function _setPlayersIdsInRequestParams() {
        var playerIds = [];
        for (var i = 0, x = $scope.selectedPlayers.length; i < x; i++) {
            playerIds.push($scope.selectedPlayers[i].PlayerId);
        }
        _rest.saveFormation.params.PlayerIds = playerIds;
    }


    /**
     * Opens pop-up model with image
     * @return void 
     */
    function _openPopup() {
        var $img = $('.starting-XI-image img');
        $img.on('load', function(){
            $('.starting-XI__form--submit .btn').show();
            $('.js-starting-XI-loading').hide();
            $('.starting-XI-image').trigger('click');
        });
    }



    /**
     * Returns formations from Json file
     * @return void
     */
    function _getFormations() {
        $http.get(_rest.getFormation.uri).success(function(data) {
            $scope.formations = data[0];
            _setFirstFormation();
        });
    }



    /**
     * Set first formation from scope.
     * @return void 
     */
    function _setFirstFormation() {
        $scope.currentFormation = $scope.formations[0];
        _rest.saveFormation.params.FormationType = $scope.currentFormation.title;
    }



    /**
     * 1. Flags player as taken in it's object container
     * 2. Sets Value in position to store
     * @param  int playerId 
     * @return void       
     */
    function _registerPlayer(args) {
        var playerId = args[0].PlayerId;
        var selectId = args[1];

        // from scope.team object
        for (var type in $scope.team) {
            for (var i = 0, x = $scope.team[type].length; i < x; i++) {

                // unregister
                if ($scope.team[type][i].selectId == selectId) {
                    delete $scope.team[type][i].selectId;
                    delete $scope.team[type][i].taken;
                }

                // register
                if ($scope.team[type][i].PlayerId == playerId) {
                    $scope.team[type][i].taken = true;
                    $scope.team[type][i].selectId = selectId;

                    for (var k = 0, v = $scope.selectedPlayers.length; k < v; k++) {
                        if ($scope.selectedPlayers[k] !== undefined) {
                            if ($scope.selectedPlayers[k].selectId == selectId) {
                                delete $scope.selectedPlayers[k];
                            }
                        }
                    }


                    if ($scope.team[type][i].selectId !== undefined) {
                        var key = _getSelectedPlayerPositionOffset($scope.team[type].acrom, $scope.team[type][i].selectId);

                        $scope.selectedPlayers[key] = {
                            Forename: $scope.team[type][i].Forename,
                            Surname: $scope.team[type][i].Surname,
                            ShirtNumber: $scope.team[type][i].ShirtNumber,
                            PlayerId: $scope.team[type][i].PlayerId,
                            selectId: $scope.team[type][i].selectId,
                            taken: $scope.team[type][i].taken,
                            position: $scope.team[type].acrom
                        };
                    }

                }
            }
        }
    }


    /**
     * Gets the player positions offset value for the selected players list
     * @param  string position 
     * @param  string selectId 
     * @return int          
     */
    function _getSelectedPlayerPositionOffset(position, selectId) {
        var offetPosition;
        switch (position) {
            case 'FD':
                offetPosition = ($scope.currentFormation.MF + $scope.currentFormation.DF + 1);
                break;
            case 'DF':
                offetPosition = 1;
                break;
            case 'MF':
                offetPosition = ($scope.currentFormation.DF + 1);
                break;
            default:
                offetPosition = 0;
                break;
        }

        return (parseInt(selectId.split('-')[1]) + offetPosition);
    }


    /**
     * Sets a bank list of object placeholders in selectedPlayer
     * @return void 
     */
    function _setSelectPlayerPlaceholders() {
        for (var i = 0, x = 11; i < x; i++) {
            $scope.selectedPlayers[i] = {};
        }
    }


    /**
     * Resets Form and selected players
     * @return void
     */
    function _reset() {
        $scope.selectedPlayers = [];
        _setSelectPlayerPlaceholders();
        $('.player-select').each(function() {
            $(this).val(this.defaultValue).trigger('change');
        });
    }



    /**
     * Requests data using restAPI service
     * @param string settings 
     * @param callback callback
     * @return boolean      
     */
    function _requestData(settings, collection, callback) {
        var method = (_rest[settings].method == 'GET') ? 'getData' : 'postData';

        restApi[method](_rest[settings].uri, _rest[settings].params).then(function(response) {
            if (response !== undefined) {
                $scope[_rest[settings].scopeUpdate] = response;

                if (callback !== undefined) {
                    callback();
                }

                if (collection !== null && collection !== undefined) {
                    _rest[settings].collections[collection]();
                }
            }
            return true;
        });
    }


}]);