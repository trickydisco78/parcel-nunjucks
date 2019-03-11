function Splash() {

    this.initialise = function () {

        var _popup = $('#splash-popup'),
            _popupButton = $('#splash-button'),
            _popupId = _popup.attr('data-id').replace(/[{}]/g, "");

        if (!Cookies.set('splashId_' + _popupId) && _popup.length) {

            $.magnificPopup.open({
                type: 'inline',
                removalDelay: 300,
                mainClass: 'mfp-fade',
                items: {
                    src: _popup
                },
                callbacks: {
                    open: function () {
                        $('body').css('overflow', 'hidden').scrollTop(0);
                    },
                    close: function () {
                        $('body').css('overflow', 'visible');
                    }
                }
            }, 0);

            _popup.show();
            _popupButton.on('click', function () {
                $.magnificPopup.close();
            });
            
            Cookies.set('splashId_' + _popupId, 'viewed');

        }

    };

}

var splashPopup = new Splash();
splashPopup.initialise();