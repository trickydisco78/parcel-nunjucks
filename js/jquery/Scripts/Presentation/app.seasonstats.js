function animatedStats() {

    var $window = $(window);
    var $total = $('.stats-tabs__option-total');
    var $playerHeader = $('.player-header');

    $window.scroll(startCounter);

    function startCounter() {
        //Check to see if element exists on page
        if ($playerHeader.is(':visible')) {
            if ($window.scrollTop() > 200) { //Scroll distance from the top
                setTimeout(function () {
                    //Remove '0' element to reveal counter
                    $('.stats-tabs__option-total--hidden').hide();
                }, 100);
                $window.off('scroll', startCounter); //Remove scroll event
                $total.each(function () {

                    var $this = $(this);

                    if(!$this.hasClass('stats')) {
                        $this.prop('Counter', 0).animate({
                            Counter: $this.text()
                        }, {
                            duration: 3000,
                            easing: 'swing',
                            step: function (now) {
                                $this.text(Math.ceil(now));
                            }
                        });
                    }
                });
            }

        } else if($playerHeader.length === 0) {
            //Disable scroll trigger event - This is to stop the counter from repeating after finished
            $window.off('scroll', startCounter); //Remove scroll event

            //Add count increase delay
            setTimeout(function () {
                //If 'player Header' element exists we wont use scroll functionality, only rely on page load
                $('.stats-tabs__option-total--hidden').hide(); //Remove '0' element to reveal counter
                $total.each(function () {

                    var $this = $(this);
                    if(!$this.hasClass('stats')) {
                        $this.prop('Counter', 0).animate({
                            Counter: $this.text()
                        }, {
                            duration: 3000,
                            easing: 'swing',
                            step: function (now) {
                                $this.text(Math.ceil(now));
                            }
                        });
                    }


                });
            }, 100);
        }
    }
    
    function statsValue() {
    //If season stats is higher or equal to '99' then add this class
       $total.each(function () {
            if (parseInt($(this).text()) >= 99) {
                $('.stats-tabs__option-total').addClass('js-reduce-font');
            }
        });
    }

    this.init = function () {
        startCounter();
        statsValue();
    };
}

var stats = new animatedStats();
stats.init();
