angular.module('AVFC').service("activeToggle", [function () {

    // Add/remove active panels to array
    var active = [];
    this.multiTrigger = function (id) {
        if (active.indexOf(id) == -1) {
            active.push(id);
        } else {
            var i = active.indexOf(id);
            active.splice(i, 1);
        }
    };

    // Check if panel is active
    this.multiActive = function (id) {
        if (active.indexOf(id) != -1) {
            return true;
        }
    };

}]);