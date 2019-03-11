var matchCentreActionAreas = function() {

	/**
	 * Opta widget container
	 * @type void
	 */
	var $container = $('#OptaActionAreas');

    /**
     * Containts Svg element
     * @type object
     */
    var $svg;


    /**
     * Run Scores
     * @type fnc
     * @return void
     */
    this.init = function() {
        $container.on('DOMSubtreeModified', function(){
            $container.css('opacity', 0);
            if($container.find('svg').length > 0) {
                $container.off('DOMSubtreeModified');
                _control();

                $(window).resize(function(){
                    _control();
                });

            }
        });
    };


    /**
     * Checks if opta svg is loaded before running any updates
     * @return void
     */
    function _control() {
        var isLoaded = setInterval(function(){
            if($container.find('svg rect').length > 0) {
                loadedSuccess();
            }
        }, 1000);

        var loadedSuccess = function() {
            $svg = $container.find('svg');
            clearInterval(isLoaded); 
            _runUpdates();
        };

    }


    /**
     * Runs a list of updates
     * @return void
     */
    function _runUpdates() {
        _updatePitch();
        _updateStrokeStyle();
        _removeElements();
        _updateDashedLines();
        _updateCrests();
        setTimeout(function(){
            $container.css('opacity', 1);
        }, 200);

    }


    /**
     * Updates to custom pitch color
     * @return void
     */
    function _updatePitch() {
        $svg.children().closest('rect').attr('class', 'opta-pitch');
    }


    /**
     * Updates stroke styles
     * @return void
     */
    function _updateStrokeStyle() {
        $svg.children('rect').css({
            stroke: '#ffffff',
            strokeWidth: '3px'
        });
    }


    /**
     * Removes text elements that are not shown in designs
     * @return void
     */
    function _removeElements() {
        $svg.children().each(function(){
            var attrFontSize = $(this).attr('font-size');
            var attrStrokeWidth = $(this).attr('stroke-width');

            if(typeof attrFontSize !== typeof undefined && attrFontSize !== false) {

                if($(this).text() == 'Possession') {
                    $(this).remove();
                }

                if($(this).attr('font-size') == '24px' || 
                   $(this).attr('font-size') == '23px') {
                    $(this).remove();
                }
            }

            if(typeof attrStrokeWidth !== typeof undefined && attrStrokeWidth !== false) {
                if($(this).attr('stroke-width') == '0' ) {
                    $(this).remove();
                }
            }
        });
    }


    /**
     * Updates dashed marker lines
     * @return void 
     */
    function _updateDashedLines() {
        $svg.children().each(function(){
            var attrDashStoke = $(this).attr('stroke-dasharray');

            if(typeof attrDashStoke !== typeof undefined && attrDashStoke !== false) {
                $(this).css({
                    stroke:'#484747',
                    strokeOpacity: 1,
                    stokeWidth: '2px'
                });
                $(this).attr('stroke-dasharray', '10,5');
            }
        });    
    }


    /**
     * Updates team crerst positioning 
     * @return void
     */
    function _updateCrests() {
        $svg.children().each(function(){
            var attrHref = $(this).attr('href');

            if(typeof attrHref !== typeof undefined && attrHref !== false) {
                $(this).attr('y', 130);
            }

        });
    }






};

var matchCentreActionAreas = new matchCentreActionAreas();
matchCentreActionAreas.init(); 