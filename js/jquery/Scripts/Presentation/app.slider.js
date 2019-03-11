function Carousel() {

    function slickCarousel() {
        
        var maxWidth = 540;
        
        initSlick = function() {
            // Tablet/Mobile Carousel
            $('.slick-carousel').slick({
                responsive: [
                    {
                        breakpoint: 9999,
                        settings: "unslick"
                    },
                    {
                        breakpoint: maxWidth,
                        settings: {
                            dots: true
                        }
                    }
                ]
            });
        };

        initSlick();
        
        // check for window resize
        $(window).on('resize', function(){
            var width = $(window).width();
            if(width < maxWidth) {
                // reinit slick
                initSlick();
            }
        });

        // Tablet/Mobile Carousel
        $('.slick-carousel-news').slick({
            responsive: [
                {
                    breakpoint: 9999,
                    settings: "unslick"
                },
                {
                    breakpoint: 600,
                    settings: {
                        dots: true
                    }
                }
            ]
        });


        // Desktop fixture Carousel
        function _setFixturesView() {
            var _fixtureSlides = $('.slick-carousel-fixtures .fixture-carousel__fixture').length,
                _activeSlides = $('.slick-carousel-fixtures-slide.slick-active').length,
                _index = null,
                _offset = 4 - _activeSlides;

            if (_fixtureSlides <= 4) {
                _index = _offset;
            } else if (_fixtureSlides > 6) {
                _index = _offset + 3;
            } else {
                _index = _fixtureSlides - 4 + _offset;
            }
            return _index;
        }
        $('.slick-carousel-fixtures').slick({
            infinite: false,
            slidesToShow: 4,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 1160,
                    settings: {
                        slidesToShow: 3,
                        focusOffset: 1
                    }
                },
                {
                    breakpoint: 840,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        }).slick('slickGoTo', _setFixturesView());

        // Homepage Hero Carousel
        $('.slick-carousel-hero').slick({
            autoplaySpeed: 7750,
            fade: true,
            dots: false,
            arrows: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            swipe: false,
            adaptiveHeight: true,
            autoplay:true
        });

        $('.slick-navigation-hero').slick({
            slidesToShow: 4,
            slidesToScroll: 4,
            infinite: false,
            dots: false,
            arrows: false,
            focusOnSelect: true,
            asNavFor: '.slick-carousel-hero',
            swipe: false
        });

        $('.slick-carousel-hero').on('afterChange', function(event,slick,i){
            $('.slick-navigation-hero .slick-slide').removeClass('slick-current');
            $('.slick-navigation-hero .slick-slide').eq(i).addClass('slick-current');
        });

        $('.slick-navigation-hero .slick-slide').on('click touchStart', function () {
            $('.slick-carousel-hero').slick('slickPause');
            $('.slick-carousel-hero').addClass('paused');
        });

        if ($('.slick-navigation-hero').length) {
            $(window).scroll(function() {
                var scroll = $(window).scrollTop();
                var $heroCarousel = $('.slick-carousel-hero');
                var $heroTabs = $('.slick-navigation-hero');
                var offsetTop = $heroTabs.offset().top;
                var height = $heroTabs.height() - 15;

                if(scroll > offsetTop + height){
                    $heroCarousel.slick('slickPause');
                    $heroCarousel.addClass('paused');
                } else {
                    $heroCarousel.slick('slickPlay');
                    $heroCarousel.removeClass('paused');
                }
            });
        }

        // remember document ready on this
        $('.slick-navigation-hero .slick-slide').eq(0).addClass('slick-current');

        // Desktop Widget Carousel
        $('.slick-carousel-widget').slick({
            dots: true,
            infinite: false,
            slidesToShow: 1,
            slidesToScroll: 1
        });
    }

    this.init = function () {
        slickCarousel();
    };

}

var carousel = new Carousel();
carousel.init();