 function deviceDetection() {

     function mobileDetect() {
         var iPadDevice = /ipad/i.test(navigator.userAgent.toLowerCase());
         var iPhoneDevice = /iphone/i.test(navigator.userAgent.toLowerCase());
         var iPodDevice = /ipod/i.test(navigator.userAgent.toLowerCase());
         var androidDevices = /android/i.test(navigator.userAgent.toLowerCase());
         var removeContainer = $('.kaltura-video-container.kaltura-video');
         var $liveStreamContainer = $('.live-streaming-container.live-video');

         var mobileMessage =
             "<div class='mobile-alert'><div>" +
                "<p>Due to EFL broadcasting regulations we cannot show video streams on mobile or tablet browsers. These devices are only supported via the Official Aston Villa Club App.</p> " +
                "<p>To download the Official Aston Villa Club App please click on one of the options below - then link your App to your avfc.co.uk account to view live video & audio streams (regional restrictions may apply).</p> " +
                "<a class=\'btn btn--primary btn--ios-download\' href=\'https://itunes.apple.com/gb/app/aston-villa-fc/id1139256337?mt=8\'>Aston Villa FC iOS App</a>" +
                "<a class=\'btn btn--primary btn--android-download\' href=\'https://play.google.com/store/apps/details?id=com.incrowdsports.football.villa&hl=en_GB'>Aston Villa FC Android App</a>" +
             "</div></div>";

         if (iPhoneDevice || iPadDevice || iPodDevice) {
             removeContainer.remove();

             $liveStreamContainer.html(mobileMessage);
         }

         else if (androidDevices) {
             removeContainer.remove();

             $liveStreamContainer.html(mobileMessage);
         }
     }

     this.init = function () {
         mobileDetect();
     };
 }

 var iosDetect = new deviceDetection();
 iosDetect.init();
