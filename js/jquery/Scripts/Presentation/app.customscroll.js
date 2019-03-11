function CustomScroller(container) {

  "use strict";

  var $elements = {
    container: $(container),
    prevBtn: null,
    nextBtn: null
  };

  function standardScroller() {
    $elements.container.mCustomScrollbar({
      axis: "x",
      scrollbarPosition: "outside",
      scrollButtons: {
        enable: true,
        scrollType: "stepped",
        scrollAmount: 320
      },
      keyboard: {
        scrollType: "stepped"
      },
      autoDraggerLength: false,
      mouseWheel: false,
      autoExpandScrollbar: 0,
      alwaysShowScrollbar: 2,
      scrollInertia: 400,
      advanced: {
        autoExpandHorizontalScroll: true
      },
      callbacks: {
        onInit: function () {
          $elements.prevBtn = $('.mCSB_buttonLeft');
          $elements.nextBtn = $('.mCSB_buttonRight');
          $elements.prevBtn.addClass('is-hidden');
        },
        onTotalScroll: function () {
          $elements.nextBtn.addClass('is-hidden');
        },
        onTotalScrollOffset: 120,
        onTotalScrollBack: function () {
          $elements.prevBtn.addClass('is-hidden');
        },
        onTotalScrollBackOffset: 120,
        onScrollStart: function () {
          $elements.prevBtn.removeClass('is-hidden');
          $elements.nextBtn.removeClass('is-hidden');
        }
      }
    });
  }

  function touchScroller() {
    $elements.container.mCustomScrollbar({
      axis: "x",
      scrollbarPosition: "outside",
      scrollButtons: {
        enable: false
      },
      autoDraggerLength: false,
      mouseWheel: false,
      autoExpandScrollbar: 0,
      alwaysShowScrollbar: 2,
      scrollInertia: 300,
      advanced: {
        autoExpandHorizontalScroll: true
      }
    });
  }

  this.initialise = function () {
    if (Modernizr.touch) {
      touchScroller();
    } else {
      standardScroller();
    }
  };

}

var videoScroller = new CustomScroller('.video-listing__scroll-container');
videoScroller.initialise();