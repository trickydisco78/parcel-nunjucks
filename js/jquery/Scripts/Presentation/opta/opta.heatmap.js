var matchCentrePlayerHeatMap = function() {

	/**
	 * Opta widget container
	 * @type void
	 */
	var $container = $('.opta-heatmap-container');


    /**
     * Run Scores
     * @type fnc
     * @return void
     */
    this.init = function() {
        $container.on('DOMSubtreeModified', function(){
            if($container.find('.starter').length > 0) {
                $container.off('DOMSubtreeModified');
                _uncheckAll();
            }
        });
    };


    /**
     * Unchecks all players
     * @return void
     */
    function _uncheckAll() {
    	setTimeout(function(){
    		$('.starter, .sub').click();
    	}, 3000);
    }


};

var matchCentrePlayerHeatMap = new matchCentrePlayerHeatMap();
matchCentrePlayerHeatMap.init(); 