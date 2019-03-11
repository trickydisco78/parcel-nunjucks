(function FaqAccordion() {

    var $question = $('.faq__question');

    $question.click(function () {
        var $this = $(this);
        var $answer = $('.faq__answer');

        $this.children('h4').toggleClass('js-question-active');
        $this.next().closest($answer).toggleClass('js-answer-reveal');
    });

    /**
     * Check if path matches anchor
     */

    $(document).ready(function() {
        var locationHash = window.location.hash.replace('#/', '');
        var $faqAnchor = $('a[name*='+locationHash+']');
        var faqAnchorValue =  $faqAnchor.attr('name');

        if(locationHash === faqAnchorValue){
            $('html, body').animate({
                scrollTop: $faqAnchor.offset().top
            }, 3000);
        }
    });

}());
