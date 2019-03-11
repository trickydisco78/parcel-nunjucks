/**
 * Original date
 */
angular.module('AVFC').filter('ordinalDate', ['$filter', function ($filter) {

    var suffixes = ["th", "st", "nd", "rd"];

    return function (input, format) {

        if (!isNaN(input)) {

            var ordFilter = $filter('date')(input, format),
                day = parseInt(ordFilter.slice(-2)),
                relevantDigits = (day < 30) ? day % 20 : day % 30,
                suffix = (relevantDigits <= 3) ? suffixes[relevantDigits] : suffixes[0];

            return ordFilter + suffix;

        } else {
            return '';
        }
        
    };

}]);


/**
 * Converts section to a date object
 */
angular.module('AVFC').filter('secondsToTime', function () {
    return function (seconds) {
        if (!isNaN(seconds)) {
            var d = new Date(0, 0, 0, 0, 0, 0, 0);
            d.setSeconds(seconds);
            return d;
        } else {
            return '';
        }
    };
});


/**
 * Sanitize HTML
 */
angular.module('AVFC').filter('sanitize', ['$sce', function ($sce) {
    return function (htmlCode) {
        return $sce.trustAsHtml(htmlCode);
    };
}]);


/**
 * Range filter for ng-repeat
 */
angular.module('AVFC').filter('range', function () {
    return function (input, total) {
        total = parseInt(total);

        for (var i = 0; i < total; i++) {
            input.push(i);
        }

        return input;
    };
});


