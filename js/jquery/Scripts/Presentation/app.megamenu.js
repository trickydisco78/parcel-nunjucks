if (window.matchMedia("(screen and (max-width: 996px))").matches) {
    /* The viewport is at least 400 pixels wide */
} else {
    /* The viewport is less than 400 pixels wide */
}

function MegaMenu() {
    this.initialise = function() {
        if (window.matchMedia("(screen and (max-width: 996px))").matches) {
            console.log("Match media query");
        } else {
            //Hover on nav item
            $(".site-nav__item-link").on({
                mouseenter: function() {
                    var $this = $(this);
                    var $targetContent = $("#" + $this.attr("data-nav-item"));
                    var $dropDown = $(".drop-down");

                    //If the nav item has a data attribute match ID of dropdown to the attribute value
                    if (
                        $this.attr("data-nav-item") &&
                        !$this.hasClass("drop-list__item-link")
                    ) {
                        $this.addClass("js-active");
                        $dropDown.addClass("js-active");
                        //The matching ID of the data attribute will have an active class
                        $targetContent.addClass("js-active"); // Matching ID and Data Attribute

                        var contentHeight = $targetContent.outerHeight(true);

                        $(
                            ".drop-down.js-active, .drop-down.js-active .drop-down__inner"
                        ).css({
                            height: contentHeight
                        });
                    }
                },

                //Leave hover area of nav item
                mouseleave: function() {
                    setTimeout(function() {
                        var navLinkHover = $(
                            ".site-nav__item-link.active:hover"
                        ).length;
                        var dropdownHover = $(".drop-down:hover").length;

                        //Remove active classes to hide mega menu
                        if (dropdownHover || navLinkHover) {
                        } else {
                            $(".drop-down").removeClass("js-active");
                            $(".drop-down__content").removeClass("js-active");
                            $(".site-nav__item-link").removeClass("js-active");
                        }
                    }, 1);
                }
            });

            //Leave hover area of mega menu
            $(".drop-down").on({
                mouseleave: function() {
                    //When mouse had left area of mega menu remove all active classes to hide menu
                    $(".drop-down").removeClass("js-active");
                    $(".drop-down__content").removeClass("js-active");
                    $(".site-nav__item-link").removeClass("js-active");
                }
            });
        }
    };
}

var megamenu = new MegaMenu();
megamenu.initialise();
