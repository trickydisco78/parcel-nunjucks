// Listing controller
angular.module('AVFC').controller("PlayerLinking", ['$scope', '$http', 'restApi', function ($scope, $http, restApi) {

    "use strict";

    /**
     * Takes a string and replaces the specified accented characters with standard characters
     * @param {string} value
     * @returns {string}
     * @private
     */
    function _removeAccents(value) {
        return value
            .replace(/á/g, 'a')
            .replace(/é/g, 'e')
            .replace(/í/g, 'i')
            .replace(/ó/g, 'o')
            .replace(/ú/g, 'u');
    }

    /**
     * Takes player details and replaces each with a linked player name
     * @param {string} playerName
     * @param {string} playerUrl
     * @param {object} container
     * @private
     */
    function _insertLink(playerName, playerUrl, container) {

        var name = playerName.replace(/  +/g, ' '),
            regex = new RegExp('\\b' + _removeAccents(name).toLowerCase() + '\\b', "i"),
            el = container.find('p');

        el.contents().filter(function () {
            return this.nodeType === 3 && regex.test(this.nodeValue.toLowerCase());
        }).replaceWith(function () {
            return (this.nodeValue || "").replace(regex, function (match) {
                if (match) {
                    return '<a href="' + playerUrl + '">' + name + '</a>';
                }
            });
        });

    }


    /**
     * Takes response object from the web services and calls _insertLink
     * @param {object} data
     * @private
     */
    function _replaceNames(data) {

        var target = $('.cms-content');

        for (var i = 0; i < data.length; i++) {
            _insertLink(data[i].Name, data[i].ProfileUrl, target);
        }

    }

    /**
     * Initialize player linking
     * @private
     */
    (function _initPlayerLinking() {
        restApi.getData('/api/PLayerLink/AllPlayers').then(function (response) {
            _replaceNames(response);
        });
    })();

}]);

