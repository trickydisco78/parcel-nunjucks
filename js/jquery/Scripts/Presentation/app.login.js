// Login Popup
function Popup() {

  "use strict";

  var $elements = {
      button: $('.js-login-popup')
  };

  function bindPopup() {
    $elements.button.magnificPopup({
        type: 'inline',
        prependTo: document.body.getElementsByTagName("form"),
      midClick: true
    });
  }

  this.init = function () {
    bindPopup();
  };
}

var loginPopup = new Popup();
loginPopup.init();

// Account drop list
function AccountList() {
  "use strict";

  var $elements = {
    button: $('.js-account-button'),
    list: $('.js-account-list')
  };

  function toggleList() {
    // Toggle list
    $elements.button.on('click', function () {
      $elements.button.toggleClass('is-active');
      $elements.list.toggleClass('is-active');
    });

    // Close more list on click away
    $(document).on('click', function (event) {
      if ((!$(event.target).closest($elements.button).length) && (!$(event.target).closest($elements.list).length)) {
        $elements.button.removeClass('is-active');
        $elements.list.removeClass('is-active');
      }
    });

    $(document).on('click', '.mfp-close', function () {
        $('.mfp-bg, .mfp-wrap').hide();
    });
  }

  this.init = function () {
    toggleList();
  };

}

var accountList = new AccountList();
accountList.init();