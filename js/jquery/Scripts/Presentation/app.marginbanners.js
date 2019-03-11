function MarginBanners() {

  var $elements = {
      image: $('.page-margin-banners img'),
      container: $('.page-margin-banners__inner')
    },
    $variables = {
      totalWidth: 0,
      pageWidth: 0
    };

  function detectWidth() {
    $variables.totalWidth = $elements.container.outerWidth() + 20;
    $elements.image.each(function () {
      $variables.totalWidth += $(this).outerWidth(true);
    });
  }

  function checkWidth() {
    $variables.pageWidth = $('body').outerWidth();
    
    if ($variables.pageWidth < $variables.totalWidth) {
      $elements.container.hide();
    } else {
      $elements.container.show();
    }
  }


  this.initialise = function () {
    window.onload = function () {
      detectWidth();
      checkWidth();
    };
    window.onresize = function () {
      checkWidth();
    };
  };

}

var marginBanners = new MarginBanners();
marginBanners.initialise();