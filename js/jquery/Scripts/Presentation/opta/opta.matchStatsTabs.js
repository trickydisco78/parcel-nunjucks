var data = {};

var matchCentreTabs = function () {

    var $container = $('#OptaMatchStats');
    var $tabs;
    var home = false;
    var scappedData = {};
    var homeTeamColor;
    var awayTeamColor;


    /**
     * Active Tabs
     * @type {object}
     */
    this.matchCenter = {
        matchTeamstatsDefence: false,
        matchTeamstatsAttack: false,
        matchTeamstatsGeneralplay: false,
        matchTeamstatsDistribution: false
    };

    /**
     * Initialise Contorller
     * @return {void}
     */
    this.initialise = function () {
        var _inst = this;
        $container.on('DOMSubtreeModified', function () {
            if ($container.find('.tabs-selected').length > 0) {
                $container.off('DOMSubtreeModified');
                homeTeamColor = $container.attr('data-home-team-color');
                awayTeamColor = $container.attr('data-away-team-color');
                $tabs = $('.tabs-nav li a');
                _inst.checkMatchCentreTabs();
                _inst.setSection();
                _inst.checkProgressBarPseudo();
            }
        });
    };


    /**
     * Update method for live widget
     * @return {void}
     */
    this.update = function () {
        var _inst = this;

        for (var obj in this.matchCenter) {
            if (typeof scappedData === 'undefined') {
                break;
            }

            var id = obj.replace(/([A-Z])/g, function ($1) {
                    return '-' + $1.toLowerCase();
                }) + '-';

            var check = _inst.scapeData(id);
            if (obj === 'matchTeamstatsGeneralplay' && typeof scappedData[obj] !== 'undefined') {
                if (typeof scappedData[obj].home === 'string') {
                    scappedData[obj].home = scappedData[obj].home.replace('%', '');

                }
                if (typeof scappedData[obj].away === 'string') {
                    scappedData[obj].away = scappedData[obj].away.replace('%', '');
                }
            }

            if (typeof scappedData[obj] !== 'undefined') {
                if (check.away !== scappedData[obj].away || check.home !== scappedData[obj].home) {

                    scappedData[obj] = check;

                    var params = [
                        { title: 'Home', value: check.home, color: homeTeamColor },
                        { title: 'Away', value: check.away, color: awayTeamColor }
                    ];

                    var displayValueAway = check.away;
                    var displayValueHome = check.home;

                    if (obj === 'matchTeamstatsGeneralplay') {
                        displayValueAway = Number(Math.round(check.away.toFixed(1) + 'e' + 1) + 'e-' + 1) + '%';
                        displayValueHome = Number(Math.round(check.home.toFixed(1) + 'e' + 1) + 'e-' + 1) + '%';
                    }

                    var $chart = $('#' + id + 'chart');

                    $chart.empty().parent().find('.doughnut-chart__away-total').html(displayValueAway);
                    $chart.empty().parent().find('.doughnut-chart__home-total').html(displayValueHome);

                    _inst.createChart(id + 'chart', params);
                }
            }
            
        }
    };


    /**
     * Check if pseudo element on progress bar is at 0/100
     * @return {void}
     */
    this.checkProgressBarPseudo = function () {

        for (var prop in this.matchCenter) {
            var id = prop.replace(/([A-Z])/g, function ($1) {
                return '-' + $1.toLowerCase();
            });

            checkAndUpadate($container.find('.tabs-content div[id^="' + id + '"]'));
        }

        function checkAndUpadate($section) {
            $section.each(function () {
                $(this).find('dl dd').each(function () {
                    var $progressBar = $(this);
                    var $homeElm = $progressBar.find('.stat-home').next();
                    var homeElmWidth = $homeElm.find('span:first-of-type').width();
                    if (Math.floor(homeElmWidth) === 0 || Math.floor(homeElmWidth) === 100) {
                        $homeElm.addClass('fullbar');
                    }
                });
            });
        }
    };


    /**
     * Checks what tabs are available on the widget
     * @return {void}
     */
    this.checkMatchCentreTabs = function () {
        if ($container.find('div[id^="match-teamstats-attack-"]').length) {
            this.matchCenter.matchTeamstatsAttack = true;
        }

        if ($container.find('div[id^="match-teamstats-generalplay-"]').length) {
            this.matchCenter.matchTeamstatsGeneralplay = true;
        }

        if ($container.find('div[id^="match-teamstats-distribution-"]').length) {
            this.matchCenter.matchTeamstatsDistribution = true;
        }

        if ($container.find('div[id^="match-teamstats-defence-"]').length) {
            this.matchCenter.matchTeamstatsDefence = true;
        }
    };


    /**
     * Generates html fot create pie chart tabs
     * @return {void}
     */
    this.setSection = function () {
        var i = 0;
        for (var prop in this.matchCenter) {
            if (this.matchCenter[prop]) {

                var id = prop.replace(/([A-Z])/g, function ($1) {
                        return '-' + $1.toLowerCase();
                    }) + '-';

                var data = this.scapeData(id);
                var $nav = $('.opta-chart-tabs ul');
                var target = id + 'chart';
                var params = [
                    {title: 'Home', value: data.home, color: homeTeamColor},
                    {title: 'Away', value: data.away, color: awayTeamColor}
                ];


                scappedData[prop] = data;

                var dataHome;
                var dataAway;
                if ((data.home + data.away) === 100) {
                    dataHome = data.home + '<small>%</small>';
                    dataAway = data.away + '<small>%</small>';
                } else {
                    dataHome = data.home;
                    dataAway = data.away;
                }

                if (data.setZeroValues) {
                    dataHome = 0;
                    dataAway = 0;
                }

                $nav.prepend($('<li>', {
                    class: 'opta-chart-tabs__list-item',
                    'data-trigger': id,
                    html: '<div id="' + target + '" class="doughnut-chart"></div>'
                }));


                var $currentTab = $('#' + target);

                $currentTab.after($('<span>', {
                    class: 'doughnut-chart__home-total',
                    style: 'color:' + homeTeamColor + ' !important',

                    html: dataHome
                }));


                $currentTab.after($('<span>', {
                    class: 'doughnut-chart__away-total doughnut-chart__away-total--away',
                    style: 'color:' + awayTeamColor + ' !important',
                    html: dataAway
                }));

                $currentTab.after($('<div>', {
                    class: 'opta-chart-tabs__list-item-title',
                    text: data.title
                }));

                this.activeTab($currentTab.parent());

                if (i == 3) {
                    $currentTab.parent().trigger('click');
                }

                this.createChart(target, params);
            }
            i++;
        }
    };


    /**
     * Set pie chart tab
     * @param  {object} $tabElm
     * @return {void}
     */
    this.activeTab = function ($tabElm) {
        $tabElm.on('click', null, function () {
            $('.opta-chart-tabs ul').find('li').removeClass('is-active');
            $(this).addClass('is-active');
            $('a[href^="#' + $(this).attr('data-trigger') + '"]').parent().trigger('click');
        });
    };


    /**
     * Create chart
     * @param {string} id
     * @param {object} params
     * @return {void}
     */
    this.createChart = function (id, params) {
        $('#' + id).drawDoughnutChart(params);
    };


    /**
     * Scraped data from opta widget tab
     * @param {string} id
     * @return {object}
     */
    this.scapeData = function (id) {
        var $targetArea = $container.find('div[id^="' + id + '"] dl dd:first-of-type');
        var title = $container.find('div[id^="' + id + '"] dl dt:first-of-type').text();
        var data = {
            targetTab: id,
            title: title,
            away: parseFloat($targetArea.find('.stat-away').text().replace('%', '')),
            home: parseFloat($targetArea.find('.stat-home').text().replace('%', '')),
            setZeroValues: false
        };

        // account for zero values
        if (data.away === 0 && data.home === 0 || isNaN(data.away) && isNaN(data.home)) {
            data.away = 50;
            data.home = 50;
            data.setZeroValues = true;
        }

        return data;
    };


};


(function () {

    var matchCentre = new matchCentreTabs();
    matchCentre.initialise();

    setTimeout(function () {
        setInterval(function () {
            matchCentre.update();
        }, 1000);
    }, 5000);

})();






    


