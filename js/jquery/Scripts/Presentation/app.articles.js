var articles = {

    /**
     * Contains settings for acticles controller
     * @type Object
     */
    settings: {

        isSafari: (navigator.userAgent.indexOf('Safari') !== -1 && navigator.userAgent.indexOf('Chrome') === -1),

        navigation: {
            selectors: {
                next: 'article-nav__link--next',
                previous: 'article-nav__link--previous'
            }

        }
    },

    /**
     * Next/Previous article
     * @return void
     */
    navigation: function () {
        var $next = $('.' + this.settings.navigation.selectors.next);
        var $previous = $('.' + this.settings.navigation.selectors.previous);

        $next.addClass('safari-fix');
        $previous.addClass('safari-fix');
    },

    /**
     * detect navigation height to match
     */
    detectNavigationHeight: function () {
        $('.article-nav').each(function () {
            var navigationHighestLink = 0;
            var $thisNavigationLink = $('.article-nav__link', this);

            $thisNavigationLink.each(function () {
                var $this = $(this);

                if ($this.outerHeight() > navigationHighestLink) {
                    navigationHighestLink = $this.outerHeight();
                }

            });

            $thisNavigationLink.css('height', navigationHighestLink);

        });
    }

};

/**
 * Usage
 */
$(function () {
    // run articles navigation
    articles.navigation();
    articles.detectNavigationHeight();
});