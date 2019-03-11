var matchCentreGoalReplay = function() {

	/**
	 * Opta widget container
	 * @type void
	 */
	var $container = $('#OptaGoalReplay');

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
        $svg.children('rect, circle, path').css({
            stroke: '#ffffff',
            strokeWidth: '3px'
        });
    }


};

var matchCentreGoalReplay = new matchCentreGoalReplay();
matchCentreGoalReplay.init(); 