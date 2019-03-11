function Browser() {

	this.initialise = function () {

		if (navigator !== undefined && navigator.userAgent !== undefined) {
			user_agent = navigator.userAgent.toLowerCase();

			if (user_agent.indexOf('android') > -1) { // Is Android.
				var $androidBanner = $('.android-banner');
				var $show = 'js-show';
				var $cookie = 'close_banner';

				$('html').addClass('android');

				$androidBanner.addClass($show);

				$('.android-banner__close').on('click touchStart', function() {
					$androidBanner.removeClass($show);

					Cookies($cookie, 'true');
				});

				var $count = 0;

				$('.android-banner__link').on('click touchStart', function() {

					$count = $count +1;

					if($count === 3){
						$androidBanner.removeClass($show);

						Cookies($cookie, 'true');
					}
				});

				if (Cookies.set($cookie)) {
					$androidBanner.hide();
				}
			}
		}

		if ( /Edge/.test(navigator.userAgent)) {
			$('html').addClass('edge');
		}
	};

}

var browserDetect = new Browser();
browserDetect.initialise();

