var trackOutboundLink = function(url, label, openInNew) {
    ga('send', 'event', 'URL_CLICK', 'click', label, {
        'transport': 'beacon',
        'hitCallback': createFunctionWithTimeout(function () {
            if (openInNew === true) {
                window.open(url);
            } else {
                document.location = url;
            }
        })
    });
};

function createFunctionWithTimeout(callback, opt_timeout) {
    var called = false;
    function fn() {
        if (!called) {
            called = true;
            callback();
        }
    }
    setTimeout(fn, opt_timeout || 1000);
    return fn;
}
