function Gallery() {
	
	this.initialise = function () {

		$('.popup-gallery').each(function(){
			$(this).magnificPopup({
				delegate: 'a',
				type: 'image',
				removalDelay: 300,
				mainClass: 'mfp-fade',
				tLoading: 'Loading image #%curr%...',
				gallery: {
					enabled: true,
					navigateByImgClick: false,
					preload: [0,1] 
				},
				image: {
					tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
					titleSrc: function(item) {
						if(item.el.hasClass('starting-XI-image')) {
							return '<div class="gallery-details"> <span class="gallery-title">' + item.el.attr('data-title') + '</span> </div><div class="gallery-meta"> <div class="gallery-social"> <a class="btn social-icon--white icon-facebook" href="https://www.facebook.com/sharer/sharer.php?u='+item.el.attr('data-share-url')+'"> </a> <a class="btn social-icon--white icon-twitter" href="https://twitter.com/home?status='+item.el.attr('data-share-url')+'"> </a> <a class="btn social-icon--white icon-linkedin" href="https://www.linkedin.com/shareArticle?&url='+item.el.attr('data-share-url')+'"> </a> </div></div>';
						}
						var sponsorTitle = (item.el.attr('data-sponsor-title') !== undefined) ? item.el.attr('data-sponsor-title') : '';
						return '<div class="gallery-details"> <div class="gallery-sponsor"><span class="gallery-sponsor-text">' + sponsorTitle + '</span><img alt="' + item.el.attr('data-title') + '" class="gallery-sponsor-image" src="' + item.el.attr('data-sponsor') + '"></div><span class="gallery-title">' + item.el.attr('data-title') + '</span><span class="gallery-caption">' + item.el.attr('data-caption') + '</span></div><div class="gallery-meta"> <div class="gallery-social"> <a class="btn social-icon--white icon-facebook" href="https://www.facebook.com/sharer/sharer.php?u=' + item.el.attr('data-share-url') + '"></a> <a class="btn social-icon--white icon-twitter" href="https://twitter.com/home?status=' + item.el.attr('data-share-url') + '"></a> <a class="btn social-icon--white icon-linkedin" href="https://www.linkedin.com/shareArticle?&url=' + item.el.attr('data-share-url') + '"></a></div><div class="gallery-link"> <a class="gallery-link-btn" href="' + item.el.attr('data-buy-url') + '">Buy this picture</a> </div></div>';
					}
				},
				callbacks: {
				    buildControls: function() {
				    	if(this.arrowRight !== undefined && this.arrowRight !== null) {
				        	this.arrowLeft.appendTo(this.contentContainer);
				    	}
				    	if(this.arrowLeft !== undefined && this.arrowLeft !== null) {
				        	this.arrowRight.appendTo(this.contentContainer);
				    	}
				    },
					markupParse: function(template, values, item) {
						template.addClass('gallery-popup-wrapper');
					}
				}
			});
		});

		
	};

}
 
var galleryPopup = new Gallery();
galleryPopup.initialise();



