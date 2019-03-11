function Equalheight() {

    var $elements = {
        equal: $('.equal')
    };

    function EqualMe(){
        var currentTallest = 0,
            currentRowStart = 0,
            rowDivs = [],
            topPosition = 0;

       $elements.equal.each(function(){
            $el = $(this);
            $($el).height('auto');
           topPosition = $el.position().top;

            if (currentRowStart != topPosition){
                for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++){
                    rowDivs[currentDiv].height(currentTallest);
                }

                rowDivs.length = 0;
                currentRowStart = topPosition;
                currentTallest = $el.height();
                rowDivs.push($el);
            }
            else{
                rowDivs.push($el);
                currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
            }

            for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++){
                rowDivs[currentDiv].height(currentTallest);
            }
        });
    }

    this.initialise = function () {
        window.onload = function() { EqualMe(); };
        window.onresize = function() { EqualMe(); };
    };

}

var equalMe = new Equalheight();
    equalMe.initialise();
