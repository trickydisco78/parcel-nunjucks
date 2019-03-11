var // Map over jQuery in case of overwrite
  _jQuery = window.jQuery,
  // Map over the $ in case of overwrite
  _$ = window.$;

jQuery.noConflict = function(deep) {
  if (window.$ === jQuery) {
    window.$ = _$;
  }

  if (deep && window.jQuery === jQuery) {
    window.jQuery = _jQuery;
  }

  return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if (!noGlobal) {
  window.jQuery = window.$ = jQuery;
}

import "./*.js";

function Accordion() {
  var $elements = {
    dt: $(".accordion dt"),
    dd: $(".accordion dd")
  };

  this.initialise = function() {
    $elements.dd.first().addClass("active");
    $elements.dt.first().addClass("active");

    $elements.dt.click(function() {
      var $this = $(this);

      if ($this.hasClass("active")) {
        $this
          .removeClass("active")
          .next()
          .slideUp();
      } else {
        $elements.dt.removeClass("active");
        $this.addClass("active");
        $elements.dd.slideUp();
        $this.next().slideDown();
      }

      return false;
    });
  };
}

var accordion = new Accordion();
accordion.initialise();
