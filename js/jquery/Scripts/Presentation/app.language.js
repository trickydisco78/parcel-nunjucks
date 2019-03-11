/**
 * @description Language Selector - Dropdown to select a language and set it as active
 */
function languageSelector() {
    function languageDropdown(){
        $('#lang-switcher').on('click touchStart', function() {
            $(this).toggleClass('active');
        });
    }

    this.init = function () {
        languageDropdown();
    };
}

var language = new languageSelector();
language.init();