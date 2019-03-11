/**
 * Time Helper
 * @author John Hopley <jhopley@rippleffect.com>
 */
angular.module('AVFC').service('timeHelper', [function(){

    /**
     * Days of the week
     * @type {array}
     */
    var _days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ];

    /**
     * Months
     * @type {array}
     */
    var _months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];


    /**
     * Month Abbreviations  
     * @type {array}
     */
    var _monthAbb = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ];


    
    /**
     * Get time diff
     * @param {Object} endTime 
     * @return {void}         
     */
    this.getTimeDiff = function(endTime) {
        var diff = ((typeof _endTime === undefined) ? 0 : endTime - Date.parse(new Date()));
        return {
            diff: diff,
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((diff / 1000 / 60) % 60),
            seconds: Math.floor((diff / 1000) % 60)
        };
    };


    /**
     * GetTime
     * @param {object} dateTime
     * @param {string} format
     * @return {string}
     */
    this.getTime = function(dateTime, format) {
        var _time;
        var _timeObj = {};
        var _utc = _reFormatUTC(dateTime);
        var _options = ['h','m','s'];
        var _default = 'h:m:s';
        var _validateFormat = function(format) {
            if(sortFormat.length > 2) {
                return;
            }

            for(var i = 0, x = sortFormat.length; i < x; i++ ){
                if($.inArray(sortFomat[i], _options) === -1) {
                    format = _default;
                    break;
                }
            }
        };

        _timeObj.h = ((_utc.getHours() < 10) ? '0' : '') + _utc.getHours();
        _timeObj.m = ((_utc.getMinutes() < 10) ? '0': '') + _utc.getMinutes();
        _timeObj.s = ((_utc.getSeconds() < 10) ? '0' : '') + _utc.getSeconds();


        if(format === undefined) {
            format = _default;
        }

        var sortFormat = format.split(':');

        for(var i = 0, x = sortFormat.length; i < x; i++ ) {
            if(_time === undefined) {
                _time = _timeObj[sortFormat[i]];
                continue;
            }
            _time = _time+':'+_timeObj[sortFormat[i]];
        }
        return _time;
    };



    /**
     * Get Date
     * @param  {object} dateTime
     * @param  {object} short
     * @return {string}
     */
    this.getDate = function (dateTime, short) {
        var _dateTime = _reFormatUTC(dateTime);
        var _day = _days[_dateTime.getDay()];
        var _year = _dateTime.getFullYear();
        var _month = _months[_dateTime.getMonth()];
        var _monthShort = _monthAbb[_dateTime.getMonth()];
        var _date = _dateTime.getDate();
        var _ordinal = (function (date) {
            var d = date % 10;
            return (~~ (date % 100 / 10) === 1) ? 'th' :
                 (d === 1) ? 'st' :
                 (d === 2) ? 'nd' :
                 (d === 3) ? 'rd' : 'th';
        })(_date);

        if(short === undefined) {
            return _day + ' ' + _date + _ordinal + ' ' + _month;
        }
        
        return _monthShort + ' ' + _date + _ordinal;
    };



    /**
     * UTC to Unix Timestamp
     * @param {string} utcDateTime
     * @return {int}
     */
    this.uctToTimestamp = function(utcDateTime) {
        return new Date(utcDateTime).getTime();
    };


    /**
     * Public method
     * @param {void} utc 
     * @return {object}     
     */
    this.reFormatUTC = function(utc) {
        return _reFormatUTC(utc);
    };


    /**
     * Reformats UTC to a broweser string
     * @param {string} utc 
     * @return {object}     
     */
     function _reFormatUTC (utc) {
        if(typeof utc !== 'string') {
            return;
        }

        var _splitUtc = utc.split('-');
        var _splitTime = _splitUtc[2].split(' ')[1].split(':');

        return new Date(
            _splitUtc[0],  
            _monthAbb.indexOf(_splitUtc[1]), 
            _splitUtc[2].split(' ')[0],
            _splitTime[0],
            _splitTime[1],
            _splitTime[2]
        );
    }


}]);
