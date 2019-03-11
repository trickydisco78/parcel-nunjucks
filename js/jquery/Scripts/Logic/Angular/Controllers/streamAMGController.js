angular.module('AVFC').controller("streamAMGController", ['$scope', 'streamPayments', function ($scope, streamPayments) {

    "use strict";

    $scope.init = function (entryId) {
        streamPayments.getKSession({ "entryId": entryId }, function (data) {
            $scope.EntrySession = data;
            $scope.$apply();
        });
    };
}]);