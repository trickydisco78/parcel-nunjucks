function matchCentreTabs() {

    this.initialise = function () {
        $('.mc-parent-tabs__options--tab').click(function () {
            var $this =$(this);
            var tab_id = $(this).attr('data-tab');
            
            $('.mc-parent-tabs__options--tab').removeClass('js-mc-tab-active');
            $('.mc-tab-content').removeClass('js-show-mc-content');
            $this.addClass('js-mc-tab-active');
            $("#" + tab_id).addClass('js-show-mc-content');
        });
    };

}

var mctabs = new matchCentreTabs();
mctabs.initialise();
