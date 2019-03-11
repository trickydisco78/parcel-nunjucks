/**
 * Opta.FixturesPlus
 * @author John Hopley <jhopley@rippleffect.com>
 */
var matchCentreScores = function() {

	/**
	 * Name of target team 
	 * @type string
	 */
	var teamName = 'Aston Villa';


	/**
	 * Opta widget container
	 * @type void
	 */
	var $container = $('#OptaFixturesPlus');


    /**
     * Run Scores
     * @type fnc
     * @return void
     */
    this.init = function() {
        $container.on('DOMSubtreeModified', function(){
            if($container.find('.scoreline').length > 0) {
                $container.off('DOMSubtreeModified');
                _teamLookUp();                
                _scrapeTimeline();
                _removeTableStyles();
				_removeScoreAttrs();
                _findAndSetActiveGames();
            }
        });
    };


    /**
     * Scape timeline
     * @return void
     */
    function _scrapeTimeline() {
        $container.find('.scoreline').each(function(k,v){
            var $button = $(this).find('td:last-of-type .relative-holder > .expansion');
            var $timeline = $(this).next('tr');
            var _id = 'timeline-'+k;
            var allEvents = {
            	home: [],
            	away: []
            };

            $button.remove();
            $button.addClass('icon-right-arrow');
            $button.text('');
            $(this).prepend($button);
            $timeline.find('td').css({
                display: 'block'
            });

            $timeline.attr('id', _id);
            $timeline.addClass('timeline-container');


            $timeline.on('DOMSubtreeModified', function(){
	            if($timeline.find('.home-events').length > 0) {
	                $timeline.off('DOMSubtreeModified');

	                // home
	          		$timeline.find('.home-events ul li').each(function(){
	                	var $this = $(this).find('img');
	          			var evts = {
	          				title: $this.attr('title').split(':')[1],
	          				img: $this.attr('src'),
	          				id: _id

	          			};
	          			allEvents.home.push(evts);
	          		});

	          		// away
	          		$timeline.find('.away-events ul li').each(function(){
	                	var $this = $(this).find('img');
	          			var evts = {
	          				title: $this.attr('title').split(':')[1],
	          				img: $this.attr('src'),
	          				id: _id
	          			};
	          			allEvents.away.push(evts);
	          		});

	        		_updateTimelineContent(allEvents);
	          		
	            }
	        });

        });

    }


    /**
     * Updates all score tables with new markup
     * @param array events 
     * @return void        
     */
    function _updateTimelineContent(events) {
    	var $div = $('<div>', {
    		class : 'timeline-info',
    		html: '<ul class="home-events"></ul><ul class="away-events"></ul>'
    	});

    	for(var i = 0, x = events.home.length; i < x; i++) {
            $div.find('ul.home-events').append('<li><span>'+events.home[i].title+'</span><span class="timeline-icon"><img src="'+events.home[i].img+'"></span></li>');
    	}

    	for(var k = 0, l = events.away.length; k < l; k++) {
    		$div.find('ul.away-events').append('<li><span class="timeline-icon"><img src="'+events.away[k].img+'"></span><span>'+events.away[k].title+'</span></li>');
    	}
    	$('#'+events.home[0].id).find('td .expander').append($div);
    }


    /**
     * Remove Score Attrs
     * @return void
     */
	function _removeScoreAttrs() {
		var $scores = $('.score');
		$scores.each(function(){
			var $this = $(this);
			$this.text($this.text().replace(/\s*\(.*?\)\s*/g, ''));
		});
	}


    /**
     * Removes table styles
     * @return void 
     */
    function _removeTableStyles() {
        $container.find('tr.standout, td.standout').each(function(){
            $(this).removeAttr('style');
        });

        $container.find('.timeline-container').not('.scoreline.timeline-container').each(function(){
            $(this).attr('style','background: transparent !important; padding: 0 !important;');
        });
    }

    /**
     * Set background to active villa games
     * @return void
     */
    function _findAndSetActiveGames() {
        $container.find('.is-active').each(function(){
            $(this).attr('style','background: #603 !important');
        });
    }


	/**
	 * Looks through the opta table of scores to find teamName
	 * @return void 
	 */
	var _teamLookUp = function() {
		$container.find('.team-name').each(function(){
			var $this = $(this);
			if($this.text() == teamName) {
				$this.closest('.scoreline').addClass('is-active');
			}
		});
	};

};

var matchCentreScores = new matchCentreScores();
matchCentreScores.init(); 