angular.module('AVFC', ['chart.js', 'ngAnimate', 'ngSanitize', 'streamPayments']).config(['ChartJsProvider', '$animateProvider', function (ChartJsProvider, $animateProvider) {

    $animateProvider.classNameFilter(/is-animated/);

    ChartJsProvider.setOptions({
        chartColors: ['#FF5252', '#FF8A80'],
        responsive: true,
		maintainAspectRatio: false,
    });
}]);

angular.module('AVFC').config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);