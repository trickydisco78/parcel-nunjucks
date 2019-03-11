function UpdateQueryString(url, key, value) {
    if (!url) url = window.location.href;

    var newUrl = decodeURIComponent(url);

    var re = new RegExp("([?&])" + key + "=.*?(&|#|$)(.*)", "gi");

    if (re.test(newUrl)) {
        if (typeof value !== 'undefined' && value !== null)
            return newUrl.replace(re, '$1' + key + "=" + value + '$2$3');
        else {
            var hash = newUrl.split('#');
            newUrl = hash[0].replace(re, '$1$3').replace(/(&|\?)$/, '');
            if (typeof hash[1] !== 'undefined' && hash[1] !== null)
                newUrl += '#' + hash[1];
            return newUrl;
        }
    }
    else {
        if (typeof value !== 'undefined' && value !== null) {
            var separator = newUrl.indexOf('?') !== -1 ? '&' : '?',
                hash = newUrl.split('#');
            newUrl = hash[0] + separator + key + '=' + value;
            if (typeof hash[1] !== 'undefined' && hash[1] !== null)
                newUrl += '#' + hash[1];
            return newUrl;
        }
        else
            return newUrl;
    }
}

function GetQueryStringParameter(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
    }
    return (false);
}