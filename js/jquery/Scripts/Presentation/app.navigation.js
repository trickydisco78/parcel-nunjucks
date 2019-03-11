/* Hamburger menu trigger
 * Functionality to fixed main nav when user scrolls
 */
const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".mainnav__primarytray");
hamburger.addEventListener("click", toggleIcon);

function toggleIcon() {
    hamburger.classList.toggle("is-active");
    mobileMenu.classList.toggle("is-open");
}

/* Mobile navigation flyin submenus
 * Functionality to toggle submenu visibillity
 */

// grab all Main Anchor links

const mobileMenuanchors = document.querySelectorAll(".nav-links__link");
// Grab all node elements

mobileMenuanchors.forEach(item => {
    const nextNode = item.nextSibling;
});

// // Get all Submenu triggers
// const submenuTrigger = document.querySelectorAll(".sub-nav-trigger");

// // Loop through them all and attach nexSubling

// submenuTrigger.forEach(item => {
//     const nextNode = item.parentNode.nextSibling;
//     item.addEventListener("click", e => {
//         nextNode.classList.add("is-open");
//         e.preventDefault();
//     });
// });

const arrowTrigger = document.querySelectorAll(
    "nav-links__link .has-content::after"
);
arrowTrigger.forEach(link =>
    link.addEventListener("click", e => {
        console.log(this);
        console.log(this.nextSibling);
        e.preventDefault();
    })
);
const mobileMenuLinks = document.querySelectorAll(".sub-nav-trigger");

// Attach event listener
//console.log(mobileMenuLinks);
mobileMenuLinks.forEach(link => {
    const nextNode = link.parentNode.nextElementSibling;
    console.log(nextNode);
    link.addEventListener("click", e => {
        console.log("sub nav clicked");
        e.preventDefault();
        nextNode.classList.toggle("is-open");
    });
});

// Look for next element sibling

// Toggle is-open class

/* Main Navigation
 * Functionality to fix main nav when user scrolls
 */

const nav = document.querySelector(".site-header__top");
const topOfNav = nav.offsetTop;

var positionStickySupport = (function() {
    var el = document.createElement("a"),
        mStyle = el.style;
    mStyle.cssText =
        "position:sticky;position:-webkit-sticky;position:-ms-sticky;";
    return mStyle.position.indexOf("sticky") !== -1;
})();

function runSticky() {
    if (positionStickySupport) {
        // Add
        console.log("browser supports sticky");
        document.documentElement.classList.add("sticky");
    } else {
        console.log("sticky not supported");
    }
}

function fixNav() {
    //console.log(nav.offsetTop);
    console.log(nav.offsetHeight);
    //console.log(topOfNav, window.scrollY >= topOfNav);
    if (window.scrollY >= topOfNav) {
        document.body.style.paddingTop = nav.offsetHeight + "px";
        document.body.classList.add("fixed-nav");
    } else {
        document.body.classList.remove("fixed-nav");
        document.body.style.paddingTop = 0;
    }
}

window.addEventListener("scroll", fixNav);
$(function() {
    // run articles navigation
    runSticky();
});
/**
 * Main Navigation
 * Functionality to move links into the more list on smaller screens.
 * Enables draggable mobile menus.
 */

// function MainNav() {
//     "use strict";

//     var $elements = {
//             moreBtn: $(".js-more-link"),
//             moreList: $(".js-more-list"),
//             navList: $(".js-nav-list"),
//             navItem: $(".js-nav-item"),
//             exclude: $(".js-nav-exclude"),
//             scroller: $(".scroll-hint"),
//             currentItem: $('[class*="current"]')
//         },
//         $variables = {
//             totalWidth: 0,
//             navWidth: 0,
//             freeSpace: 0,
//             moreItem: null,
//             reqSpace: null,
//             currentOffset: 0,
//             scrollby: 0,
//             bodyWidth: 0
//         };

//     /**
//      * Show/hide more list
//      */
//     function toggleMore() {
//         // Accessibility functionality
//         $elements.moreList.find("a").on("focus", function(e) {
//             $elements.moreBtn.addClass("is-active");
//             $elements.moreList.find("a").on("blur", function(e) {
//                 if ($elements.moreList.find("a:focus").length) {
//                     $elements.moreBtn.addClass("is-active");
//                 } else {
//                     $elements.moreBtn.removeClass("is-active");
//                 }
//             });
//         });
//     }

//     /**
//      * Check available space in nav bar and move/replce items in the more list
//      */
//     function checkSize() {
//         $variables.totalWidth = $elements.exclude.outerWidth(true) + 20; // Add more link width to total plus 20 (not sure why + 20 is needed??)
//         $variables.navWidth = $elements.navList.outerWidth(); // Get the width of the nav list

//         $elements.navItem.each(function() {
//             var width = $(this).outerWidth(true); // Get width of this nav item

//             $variables.totalWidth = $variables.totalWidth + width; // Add width of this item to total

//             if ($variables.navWidth < $variables.totalWidth) {
//                 $elements.navItem
//                     .last()
//                     .prependTo($elements.moreList)
//                     .addClass("js-more-item drop-list__item")
//                     .removeClass("site-nav__item js-nav-item")
//                     .find(".site-nav__item-link")
//                     .addClass("drop-list__item-link"); // Move item into more list
//             }

//             $elements.navItem = $(".js-nav-item"); // Reset element variable
//         });

//         // Replace items
//         $variables.moreItem = $(".js-more-item");
//         $variables.freeSpace = $variables.navWidth - $variables.totalWidth; // get available space in nav list
//         $variables.reqSpace = $variables.moreItem.first().width() + 40; // Get width of first morelink, + 40 to allow for main nav margin

//         if ($variables.freeSpace > $variables.reqSpace) {
//             $variables.moreItem
//                 .first()
//                 .insertBefore($elements.exclude)
//                 .removeClass("js-more-item drop-list__item")
//                 .addClass("site-nav__item js-nav-item")
//                 .find(".drop-list__item-link")
//                 .removeClass("drop-list__item-link"); // Move first more link back into nav
//             $elements.navItem = $(".js-nav-item"); // Reset element variable
//         }

//         $(".site-nav").removeClass("is-hidden");
//     }

//     /**
//      * Append more list items to main nav on touch devices
//      */

//     function touchNav() {
//         $elements.moreList
//             .find("li")
//             .appendTo($elements.navList)
//             .removeClass("js-more-item drop-list__item")
//             .addClass("site-nav__item js-nav-item")
//             .find(".drop-list__item-link")
//             .removeClass("drop-list__item-link")
//             .addClass("site-nav__item-link");
//         $(".site-nav").removeClass("is-hidden");
//     }

//     /**
//      * Center active items
//      */

//     function centerNav() {
//         $(".site-header__scroll-container").css("opacity", 1);
//         $elements.scroller.each(function() {
//             var $this = $(this),
//                 item = $this.find($elements.currentItem),
//                 scrollContainer = $this.find(".site-header__scroll-container"),
//                 leftOffset;

//             if (item.length) {
//                 $variables.bodyWidth = $("body").width();
//                 $variables.currentOffset = item.offset();
//                 leftOffset = $variables.currentOffset.left;

//                 $variables.scrollBy =
//                     leftOffset -
//                     $variables.bodyWidth / 2 +
//                     item.outerWidth() / 2;

//                 scrollContainer.animate(
//                     {
//                         scrollLeft: $variables.scrollBy
//                     },
//                     800
//                 );
//             }
//         });
//     }

//     /**
//      * Detect touch and add enable scroll hinting
//      */
//     function scrollHint() {
//         $elements.scroller.each(function() {
//             var $this = $(this),
//                 scrollCookie = Cookies.get("disableScrollHinting");

//             function _checkSize() {
//                 $variables.bodyWidth = $("body").width();
//                 if (
//                     $variables.bodyWidth <
//                     $this.find(".js-scroll-overflow").outerWidth()
//                 ) {
//                     $this.addClass("is-scrollable");
//                 }
//             }

//             function _checkScrollCookie() {
//                 if (!scrollCookie) {
//                     _checkSize();
//                     setTimeout(function() {
//                         $this.on("touchmove", function() {
//                             $this.removeClass("is-scrollable");
//                             Cookies.set("disableScrollHinting", true);
//                         });
//                     }, 1200);
//                 } else {
//                     $(".is-scrollable").removeClass("is-scrollable");
//                 }
//             }

//             _checkScrollCookie();

//             $(window).resize(function() {
//                 _checkScrollCookie();
//             });
//         });
//     }

//     /**
//      * Initialize
//      */
//     this.initDefault = function() {
//         $(window).on("load resize orientationchange", null, function() {
//             checkSize();
//             toggleMore();
//         });
//     };

//     /**
//      * Initialize on touch
//      * @return {void}
//      */
//     this.initTouch = function() {
//         touchNav();
//         centerNav();
//         scrollHint();
//     };
// }

// var mainNav = new MainNav();

// if (Modernizr.touch && Modernizr.mq("screen and (max-width: 540px)")) {
//     mainNav.initTouch();
// } else {
//     mainNav.initDefault();
// }
