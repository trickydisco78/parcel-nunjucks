function CookieBanner() {
	var $element = $('.js-cookie-banner');
	var $body = $('body');

	this.initialise = function () {

		function setCookie(key, value, days) {
			var expires = new Date();
			if (days) {
				expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
				document.cookie = key + '=' + value + ';expires=' + expires.toUTCString();
			} else {
				document.cookie = key + '=' + value + ';expires=Fri, 30 Dec 9999 23:59:59 GMT;';
			}
		}

		function getCookie(name) {
			var cookie = {};
			var _slicedToArray = (function() {
				function a(b, c) {
				  var d = [],
					e = !0,
					f = !1,
					g = void 0;
				  try {
					for (
					  var j, h = b[Symbol.iterator]();
					  !(e = (j = h.next()).done) &&
					  (d.push(j.value), !(c && d.length === c));
					  e = !0
					);
				  } catch (l) {
					(f = !0), (g = l);
				  } finally {
					try {
					  !e && h["return"] && h["return"]();
					} finally {
					  if (f) throw g;
					}
				  }
				  return d;
				}
				return function(b, c) {
				  if (Array.isArray(b)) return b;
				  if (Symbol.iterator in Object(b)) return a(b, c);
				  throw new TypeError(
					"Invalid attempt to destructure non-iterable instance"
				  );
				};
			  })(),
			  cookie = {};
			document.cookie.split(";").forEach(function(a) {
			  var _el$split = a.split("="),
				_el$split2 = _slicedToArray(_el$split, 2),
				b = _el$split2[0],
				c = _el$split2[1];
			  cookie[b.trim()] = c;
			});

			return cookie[name];
		}


		if(getCookie('18+')){
			$element.removeClass('active');
			$element.removeClass('is-fixed');

		}else{
			$element.addClass('active');
			$element.addClass('is-fixed');
			setTimeout(function(){
				$body.css('padding-top',$element.height()+'px');
			},500);

		}

		function amountscrolled(){
			var winheight = $(window).height()
			var docheight = $(document).height()
			var scrollTop = $(window).scrollTop()
			var trackLength = docheight - winheight
			var pctScrolled = Math.floor(scrollTop/trackLength * 100) // gets percentage scrolled (ie: 80 NaN if tracklength == 0)
			return pctScrolled;
		}

		$('.js-cookie-btn').on('click', function (e) {

			var val = $(this).data('cookie');
			if( val){
				setCookie('18+', 1, 30);
				$element.removeClass('active');
			}else{
				$body.animate({
				'padding-top' : 0,
				}, 800);
				$element.removeClass('active');
				setCookie('18+', 0, 30);
			}

		});
	};

}

var cookieBanner = new CookieBanner();
cookieBanner.initialise();
