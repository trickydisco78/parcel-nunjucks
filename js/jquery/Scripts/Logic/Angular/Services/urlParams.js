angular.module('AVFC').service("urlParams", [function () {

    this.getQuery = function (qs) {

        function _getQueryParams() {
            var params = window.location.search.substring(1);

            if (params.length) {
                var pairs = params.split('&');
                var result = {};
                pairs.forEach(function (pair) {
                    pair = pair.split('=');
                    result[pair[0]] = decodeURIComponent(pair[1] || '');
                });
                return result;
            }
        }

        if (_getQueryParams() !== undefined) {
            if (qs !== undefined && _getQueryParams()[qs] !== undefined) {
                return _getQueryParams()[qs];
            } else {
                return _getQueryParams();
            }
        } else {
            return false;
        }
    };
}]);