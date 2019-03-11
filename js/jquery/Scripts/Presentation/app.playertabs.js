function playerTabs() {

    this.initialise = function () {
        
        //Detect height of default open tab
        var $defaultTabContent = $('.js-player-tab-active');
        var defaultTabHeight = $('#' + $defaultTabContent.attr('data-tab')).outerHeight(true);

        $('.player-list-contain, .player-list-contain__inner').css({
            'height': defaultTabHeight
        });
        
        $('.player-tabs__options--tab').click(function () {
            var tab_id = $(this).attr('data-tab');
            var $this = $(this);
            $('.player-tabs__options--tab').removeClass('js-player-tab-active');
            $('.player-list-block').removeClass('js-show-player-block');
            $this.addClass('js-player-tab-active');
            $("#" + tab_id).addClass('js-show-player-block');
            
            //detect height of specific tab that's click and apply the height of the content to the container and inner container
            var activeContentHeight = $('#' + $this.attr('data-tab')).outerHeight(true);
            
            $('.player-list-contain, .player-list-contain__inner').css({
                'height': activeContentHeight
            });
        });
    };
}

var playertabs = new playerTabs();
playertabs.initialise();
