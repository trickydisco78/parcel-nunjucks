function Search() {

    this.initialise = function () {

        var $searchToggle = $('#js-search-toggle');
        var $mainNav = $('#js-main-nav');
        var $siteNav = $('.site-nav');
        var $searchForm = $('#js-search-contain');
        var $siteSearch = $('#js-site-search');

        function _openSearch() {
            $searchForm.fadeIn(500);
            $searchToggle.removeClass('icon-search').addClass('icon-cancel');
            $siteNav.removeClass('scroll-hint');
            $mainNav.addClass('js-hide-nav');
            $siteSearch.addClass('js-reveal-search');
            setTimeout(function () {
                $siteSearch.focus();
            }, 1000);
        }

        function _closeSearch() {
            $searchForm.hide();
            $siteNav.addClass('scroll-hint');
            $searchToggle.addClass('icon-search').removeClass('icon-cancel');
            $mainNav.removeClass('js-hide-nav');
            $siteSearch.removeClass('js-reveal-search');
        }

        //Open search panel
        $searchToggle.on('click touchstart', function (e) {

            if ($mainNav.hasClass('js-hide-nav')) {
                _closeSearch();
            } else {
                _openSearch();
            }

            e.preventDefault();
            e.stopPropagation();
        });

        $siteSearch.keypress(function (e) {
            if (e.which === 13) {
                window.location = "/search?q=" + e.target.value;
                e.preventDefault();
                e.stopPropagation();
                return false;
            }

            return true;
        });

        //If anywhere else on the site is clicked close the search panel
        var $window = $(window); // or $searchForm parent container

        $window.on('click touchstart', function (e) {
            //checks if outside of $searchForm was clicked and checks if the $searchForm itself was clicked
            if ($searchForm.has(e.target).length === 0 && !$searchForm.is(e.target)) {
                _closeSearch();
            }
        });
    };

}

var search = new Search();
search.initialise();
