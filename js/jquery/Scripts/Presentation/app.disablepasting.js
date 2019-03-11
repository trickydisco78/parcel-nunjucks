function DisablePasting() {

    "use strict";

    var $elements = {
        target: $(".js-disable-paste")
    };

    function disablePaste() {
        $elements.target.each(function () {
            $(this).bind("paste", function (e) {
                alert('Pasting into this field is disabled, please re-enter.');
                e.preventDefault();
            });
        });
    }

    this.init = function () {
        disablePaste();
    };

}

var disable = new DisablePasting();
disable.init();