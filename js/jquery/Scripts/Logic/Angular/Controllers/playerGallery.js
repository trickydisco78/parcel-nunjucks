angular.module('AVFC').controller('PlayerGallery', ['$scope', '$http', 'restApi', function ($scope, $http, restApi) {

    'use strict';

    /**
     * Gallery end point URL
     * @type string
     */
    var _galleryUrl = '/api/gallery/getgallery';


    /** 
     * Holds the image objects
     * @type array
     */
    $scope.images = [];


    /**
     * Gallery Init
     * @param {int} galleryId 
     * @return {void}
     */
    $scope.init = function (galleryId) {
        var currentImageId = _checkQueryString('galleryimage');

        if (galleryId) {
            _requestData(galleryId);
        }

        $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
            if (currentImageId !== null) {
                _openCurrent(currentImageId);
            }
        });
    };
    

    /**
     * Opens the lightbox from the gallery link
     * @type fnc
     * @param galleryId      
     */
    $scope.openLightBox = function ($event, galleryId) {
        if ($event !== undefined) {
            $event.preventDefault();
        }

        var $targetGallery = $('[data-gallery-id="' + galleryId + '"]').find('.popup-gallery a:first-child');
        $targetGallery.click();
        _removeUnsetLinks();

        $('.mfp-arrow').on('click', null, function(){
            _removeUnsetLinks();
        });

        
        $(document).keydown(function(e) {
          if(e.keyCode == 37 || e.keyCode== 39) {
            if($('.gallery-popup-wrapper').length > 0) {
                _removeUnsetLinks();
            }
          }
        });
    };


    /** 
     * Checks the current url for a query string
     * @param string field
     * @return void
     */
    function _checkQueryString(field) {
        var href = window.location.href;
        var reg = new RegExp('[?&]' + field + '=([^?#]*)', 'i');
        var string = reg.exec(href);
        return string ? string[1] : null;
    }


    /**  
     * Remove unset links from gallery link buttons
     * @return void
     */
    function _removeUnsetLinks() {
        $('.gallery-link-btn').each(function () {
            var $this = $(this);
            var href = $this.attr('href');
            if (!href || href === '') {
                $this.remove();
            }
        });

        $('.gallery-sponsor-image').each(function(){
            var $this = $(this);
            var src = $this.attr('src');
            if (!src || src === '') {
                $this.remove();
            }
        });
    }


    /**
     * Opens the current image if set in query string
     * @param (int) imageId
     * @return void
     */
    function _openCurrent(currentImageId) {
        $('a[data-image-id="' + currentImageId + '"]').trigger('click');
    }


    /**
     * Requests data from the server using the galleryId
     * @param (str) galleryId
     * @return boolean 
     */
    function _requestData(galleryId) {
        var params = {
            galleryguid: galleryId
        };

        restApi.getData(_galleryUrl, params).then(function (response) {
            var sortResponse = [];
            for (var i = 0, x = response.Images.length; i < x; i++) {
                var image = response.Images[i];
                image.SponsorUrl = response.SponsorUrl;
                image.SponsorTitle = response.SponsorTitle;
                $scope.images.push(image);
            }
            _addShareUrls();
        });

        if ($scope.images !== false) {
            return true;
        }
    }


    /**
     * Appends social urls to the image objects set in $scope.images
     * @return void
     */
    function _addShareUrls() {
        for (var i = 0, x = $scope.images.length; i < x; i++) {
            $scope.images[i].ShareUrl = window.location.href.split('?')[0] + '?galleryimage=' + $scope.images[i].Id;
        }
    }


    /** 
     * Gets gallery ID from gallery container
     * @return int|boolean
     */
    function _getGalleryId() {
        var $galleryContainer = $('.js-gallery-container');
        if ($galleryContainer) {
            var galleryId = $galleryContainer.attr('data-gallery-id');
            if (typeof galleryId !== typeof undefined && galleryId !== false) {
                return galleryId;
            }
        }
        return false;
    }


}]);
