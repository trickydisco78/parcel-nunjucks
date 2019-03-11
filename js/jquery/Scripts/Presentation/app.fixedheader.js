function fixedHeader() {

	this.initialise = function () {
		var $windowWidth = $(window).width();
		var $headerBottom = $('.site-header__bottom');
		var $headerTop = $('.site-header__top');
    	var $defaultPosition = $(window).scrollTop();
		var offset = 86;

		var removeStickyHeader = function() {
			$headerBottom.removeClass('js-header-fixed');
			$headerTop.removeClass('js-top-fixed');
		};

		var applyBottomStickyHeader = function() {
			$headerBottom.addClass('js-header-fixed');
		};

		var applyTopStickyHeader = function() {
			$headerTop.addClass('js-top-fixed');
		};


        //Detect if screen size is greater than tablet size - enable scroll functionality if greater than tablet
	    if ($windowWidth > 980 && $headerBottom.is(':visible')) {
		    $(window).scroll(function () {
			    var scrollPos = $(window).scrollTop();

			    if(scrollPos <= offset) {
				    removeStickyHeader();
			    }

			    else if (scrollPos >= $headerBottom.offset().top) {
				    applyBottomStickyHeader();
				    if($(window).scrollTop() < $defaultPosition) {
					    applyTopStickyHeader();
				    }
			    }

			    $defaultPosition = scrollPos;

		    });
		}
	};

    /**
     * @name reportClub
     * @description scroll to the Report Club form when Report Club Button is clicked.
     */
    var docWindowWidth = $(window).width();
    var docBody = $('body, html');
    var reportForm = $('#content_0_plReport, #plReport');

    // Scroll to Report Club Form
    if (reportForm.length > 0 && docWindowWidth > 769) {
        docBody.animate({
            scrollTop: reportForm.offset().top - 250
        }, 'slow')
    } else if (reportForm.length > 0 && docWindowWidth < 769) {
        docBody.animate({
            scrollTop: reportForm.offset().top - 50
        }, 'slow')
    }

}

var fixedheader = new fixedHeader();
fixedheader.initialise();
