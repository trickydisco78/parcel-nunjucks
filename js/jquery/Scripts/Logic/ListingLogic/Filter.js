function ListingFilter() {

    this.SelectFilter = function (selected, type) {
        var newurl = UpdateQueryString(window.location.href, type, selected);
        window.location.href = newurl;
    };
}