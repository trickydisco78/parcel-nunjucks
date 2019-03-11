mw.kalturaPluginWrapper(function () {

    mw.PluginManager.add('myComponent', mw.KBaseComponent.extend({

        defaultConfig: {
            parent: "controlsContainer",    
            order: 41,                      
            displayImportance: 'low',       
            align: "right",                 
            href: 'http://www.kaltura.com', 
            title: 'Kaltura',               
            img: null                       
        },

        getComponent: function () {

            var container = $('.controlBarContainer').first();
            var slider = container.find('.scrubber').first();
            var controlsContainer = container.find('.controlsContainer').first();
            var playPauseBtn = controlsContainer.find('.playPauseBtn');
            var volumeControl = controlsContainer.find('.volumeControl').first();
            var time = controlsContainer.find('.currentTimeLabel').first(); 
            var duration = controlsContainer.find('.durationLabel').first(); 
            var status = controlsContainer.find('.liveStatus').first(); 
            var theme = this.getConfig('theme');
            var showTime = this.getConfig('showTime');

            setInterval(function(){
                if($('#loadingSpinner_kaltura_player_liveAudio').length > 0) {
                    //...
                } else {
                    //...
                }
            }, 1000);

            duration.hide();
            status.css("display", "none !important");

            var html = "<table class=\"customPlayer\">" +
                        "<tr>" +
                            "<td class=\"customPlayer-play-container\">" +
                                 "<a style='display: none;'class=\"customplayer-play-button customplayer-play-disabled\"><i class=\"icon-play\"></i></a>" +
                            "</td>" +
                            "<td class=\"customPlayer-scrubber-container\">" +
                                 "<div class=\"customplayer-scrubber-slider\" ></div>" +
                            "</td>" +
                            "<td class=\"customPlayer-volume-slider-container\">" +
                                "<div class=\"customPlayer-volume-slider\"></div>" +
                                "<span class=\"glyphicon glyphicon-volume-up on\"></span>" +
                                "<span class=\"volume hidden\"></span>" +
                            "</td>" +
                        "</tr>" +
                    "</table>";

            if($('.customPlayer').html() === undefined) {
                container.prepend(html);
            }

            $('.customPlayer-play-container').append(playPauseBtn);
            $('.customPlayer-volume-slider-container').append(volumeControl);
            $('.customPlayer-scrubber-container').append(slider);
            time.insertAfter(slider);

            container.attr('style', 'position: absolute; top: 0;');

            if (showTime !== true) {
                time.attr('style', 'display: none !important;');
            }

            $('#error').width(slider.width());

            if (!this.$el) {
                this.$el = $('<div />').addClass(this.getCssClass());
            }

            return this.$el;
        }
    }));

});