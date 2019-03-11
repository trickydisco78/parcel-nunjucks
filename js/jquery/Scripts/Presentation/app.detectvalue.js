/**
 * Detect value and reduce font size
 */

(function detectValue() {
    var $value = $('.js-value');

    $value.each(function () {
        if (parseInt($(this).text()) >= 99) {
            $value.addClass('js-reduce-font');
        }
    });
}());
