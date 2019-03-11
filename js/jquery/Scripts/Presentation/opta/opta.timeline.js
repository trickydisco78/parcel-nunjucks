var matchCentreTimeline = function() {

    /** 
     * Container
     * @type object
     */
    var $timeline = $('#OptaTimeline');


    /** 
     * Class of home/away icons
     * @type str
     */
    var _iconClass = 'jqtip';


    /** 
     * Root of replacment icons
     * @type str
     */
    var _iconRoot = '/Assets/Images/Opta/timeline_replacements/';


    /** 
     * Replacement icons map
     * @type object
     */
    var _customIcons = {
        yellowCard: 'yellow-card.svg',
        doubleYellow: '2nd-yellow-card.svg',
        goal: 'goal-icon.svg',
        penaltyInGameScored: 'penalty.svg',
        iconSubstitution: 'substitution.svg'
    };


    /**
     * Run timeline
     * @type fnc
     * @return void
     */
    this.init = function() {
        $timeline.on('DOMSubtreeModified', function(){
            if($timeline.find('.timeline-container').length > 0) {
                $timeline.off('DOMSubtreeModified');
                _swapIcons();
            }
        });
    };


    /**
     * Swaps opta icons with custom icons
     * @type fnc
     * @return void 
     */
    function _swapIcons() {
        var $icons = $('.'+_iconClass);

        $icons.each(function(){
            var src = $(this).attr('src');

            src = src.substr(src.lastIndexOf('/') + 1).split('.')[0].replace(/-([a-z])/g, function (m, w) {
                return w.toUpperCase();
            }); 

            if(_customIcons[src] !== undefined) {
                $(this).attr('src', _iconRoot+_customIcons[src]);
            }

        });
    }

};


var timeline = new matchCentreTimeline();
timeline.init(); 



