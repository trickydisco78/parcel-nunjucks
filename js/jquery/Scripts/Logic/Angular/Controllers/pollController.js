angular.module('AVFC').controller('PollController', ['$scope', '$location', '$http', 'restApi', function($scope, $location, $http, restApi) {

    /**
     * Rest Interface
     * @type object
     */
    var _rest = {
        sendPoll: {
            uri: '/api/Poll/Post',
            method: 'POST',
            scopeUpdate: 'results',
            params: {
                PollId:  null,
                SelectedOptionId: null
            }
        }
    };


    

    /**
     * Initialize poll
     * @return void 
     */
    $scope.initialize = function() {
        _rest.sendPoll.params.PollId = $('.poll-answers input[type="hidden"').val();
    };



    /**
     * Send poll
     * @param pollAnswer
     * @return void 
     */
    $scope.send = function(pollAnswer) {
        if(pollAnswer !== undefined) {
            _rest.sendPoll.params.SelectedOptionId = pollAnswer;
            _requestData('sendPoll', null, function(){
                $('.poll-answers').hide();
            });
            return;
        } else {
            console.log('error');
        }
    };

    

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