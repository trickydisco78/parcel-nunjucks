function tabController() {

    var $elements = {
        tabLink    : $(".tab-pane__list-link"),
        tabs       : $(".tab-pane__list"),
        tabWrapper : $(".tab-pane__content")
    };

    function tabAction(){
        $elements.tabLink.on("click", function() {
            var $this = $(this);
            var parent = $this.closest('.tab-pane');
            var tab_id = $this.attr('data-tab');

            parent.find('.tab-pane__list-link').removeClass('is-current');
            parent.find('.tab-pane__content-part').removeClass('is-current');

            $this.addClass('is-current');
            parent.find("#" + tab_id).addClass('is-current');
        });
    }

    /**
     * @description Add active states to chairman admin panels
     * @private
     */
    function chairmanTabs() {
        var url = window.location.href;
        var endUrl = url.substr(url.lastIndexOf('/') + 1);

        var chairmanTabs = $('.account-parent-tabs__options li');
        var clubTab = $('.account-parent-tabs__options li:nth-child(2)');
        var toolBoxTab = $('.account-parent-tabs__options li:nth-child(3)');
        var chairmanTabActive = 'chairman-tab-active';
        var chairmanTabDisabled = 'chairman-tab-disabled';

        /**
         * @description Apply active tab class to tab based on URL
         * @return boolean
         */
        if (endUrl === 'Club') {
            chairmanTabs.addClass(chairmanTabDisabled);
            clubTab.removeClass(chairmanTabDisabled).addClass(chairmanTabActive);
        } else if(endUrl === 'Toolbox') {
            chairmanTabs.removeClass(chairmanTabDisabled);
            toolBoxTab.removeClass(chairmanTabDisabled).addClass(chairmanTabActive);
        }
    }

    this.init = function () {
        tabAction();
        chairmanTabs();
    };
}

var tabs = new tabController();
    tabs.init();

