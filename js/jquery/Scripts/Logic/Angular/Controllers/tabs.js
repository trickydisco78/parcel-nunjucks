angular.module('AVFC').controller("Tabs", ['$scope', function ($scope) {

    "use strict";

    $scope.viewTab = null;

    $scope.setTab = function(newValue){
        if ($scope.viewTab === newValue) {
            $scope.viewTab = null;
        } else {
            $scope.viewTab = newValue;
        }
    };

    $scope.activePanel = function(tabName){
        return $scope.viewTab === tabName;
    };

}]);
