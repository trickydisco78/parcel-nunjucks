function videoDetect() {

    this.initialise = function () {
        var $lastVideo = $('.offset-video');
        var videoAddClass = function(){
            $lastVideo.addClass('js-standard-video');
        };

        if($lastVideo.last()){
            videoAddClass();
        }
    };

}

var videodetect = new videoDetect();
videodetect.initialise();
