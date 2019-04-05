/**
 * @id $Id$
 */

export var MAX_LOCATION_AGE = 0; //300000; //60000ms = 1min
export var MAX_LOCATION_TIMEOUT = 60000; //60sec
export var HIGH_LOCATION_ACCURACY = false;
export var prev_location_time = 600000; // 10 min
export var min_location_accuracy = 3000; // 3 km
export var last_location_min_time = 60000; //60s
export var location_internal_timeout = 30000; // 30 sec

// {prev_location_time, location_internal_timeout, HIGH_LOCATION_ACCURACY,
//     MAX_LOCATION_AGE, MAX_LOCATION_TIMEOUT, min_location_accuracy, last_location_min_time}

import $ from 'jquery';
import Backbone from 'backbone';
import ClientInfo from 'clientInfo';

/**
 * @class GeolocationModel
 * @event {positionAvailable} passes the geolocation data.
 * @event {geolocationError} passes the geolocation error code.
 */

var GeolocationModel = Backbone.Model.extend({

    //location tracker identifier
    locationID: undefined,
    //getCurrentPosition tracker
    currPosition: undefined,
    //last saved location checker
    lastSaved: undefined,

    //setTimeout reference to kill the watchPosition/getCurrentPosition flow
    timeoutSwitch: undefined,

    //debug flow
    flow: [],

    defaults: {
        isLocationBeingObserved: false,
        attemptN: 0
    },

    /**
     * save async positions, errors and workaround device-specific bugs
     *
     * @method initialize
     */
    initialize: function () {

        this.on('APISuccess', this._savePosition, this);
        this.on('APIError', this._reportError, this);
        this.on('stopWatch', this.stopTrackLocation, this);
        this.on('getOnePosition', this._getOneCurrentLocation, this);
        this.on('watchLocation', this.trackLocation, this);

            if('Blackberry' === ClientInfo.platformName() && '7' === ClientInfo.platformVersion()[0]){
                console.log('Blackberry 7 detected, disabling high location accuracy...');
                Conf.HIGH_LOCATION_ACCURACY = false;
            }
        },

    /**
     * stops to observe location, if being observed.
     *
     * @method public stopWatchPosition
     */
    stopTrackLocation: function () {

        this.flow.push(1);

        console.log('stopTrackLocation called.');

        if (typeof this.locationID !== 'undefined') {
            this.flow.push(2);
            navigator.geolocation.clearWatch(this.locationID);
            this.locationID = undefined;
            this.set('isLocationBeingObserved', false);
        }
        else {
            this.flow.push(3);
            console.log('locationID IS undefined! isLocationBeingObserved: ' + this.get('isLocationBeingObserved'));
        }

    },

    /**
     * error code 1: permission denied.
     * error code 7: accuracy over the limit.
     *      trigger an error in these cases.
     * error code 8: internal timeout expired.
     *
     * error code 2: position unavailable.
     * error code 3: timeout error.
     * error code 6: location cached.
     *      first attempt: use getOneCurrentLocation() to try to determine the position.
     *      every other attempt after the first one: ask the user to reload the page.
     *
     * @method private reportError
     * @param {String} the view calling the error, {Error} the error to report
     */
    _reportError: function (items) {

        this.flow.push(4);

        console.log('Location error code: ' + items.data.code);

        switch (items.data.code) {
            case 1:
                this.flow.push(5);
                break;
            case 8:
                this.flow.push(41);
                this.trigger('stopWatch');
                break;
            case 7:
                this.flow.push(6);
                this.trigger('geolocationError', {view: items.view, code: items.data.code});
                globalLocation.off('geolocationError');
                break;
            case 2:
                this.flow.push(7);
                break;
            case 3:
                this.flow.push(8);
                break;
            case 6:
                this.flow.push(9);
                var attempt = this.get('attemptN');
                if (attempt < 1) {
                    this.flow.push(10);
                    attempt += 1;
                    this.set('attemptN', attempt);
                    console.log('calling getOnePosition');
                    this.trigger('stopWatch');
                    this.trigger('getOnePosition', items.view);
                }
                else {
                    this.flow.push(11);
                    console.log('displaying geolocation error for view: ' + items.view + ', code: ' + items.data.code);
                    this.set('attemptN', 0);
                    this.currPosition = undefined;
                    this.trigger('watchLocation', items.view);
                    this.trigger('geolocationError', {view: items.view, code: items.data.code});
                    globalLocation.off('geolocationError');
                }
                break;
        }

    },

    /**
     * converts the string to the unicode equivalent
     *
     * @method private toUnicode
     * @param {String} the string to convert in unicode
     *
     * @return {String} unicode equivalent
     */

    _toUnicode: function (str) {
        this.flow.push(12);
        //console.log('_toUnicode called.');

        var loc = '';

        _.each(str, function (item) {
            loc += item.charCodeAt();
        });

        return loc;

    },

    /**
     * converts the unicode string to chars
     *
     * @method private toChars
     * @param {String} the unicode string
     *
     * @return {String} chars equivalent
     */

    _toChars: function (items) {
        this.flow.push(13);
        //console.log('_toChars called.');

        var loc = '';

        _.each(items, function (item) {
            loc += String.fromCharCode(item);
        });

        return loc;

    },

    /**
     * converts the location data in the obscured equivalent by doing unicode+lhun
     *
     * @method private obscurePosition
     * @param {String} geolocation data: latitude,longitude,accuracy,timestamp
     *
     * @return {String} the unicode+luhn checked string
     */
    _obscurePosition: function (items) {
        this.flow.push(14);
        //console.log('_obscurePosition called.');

        return this._luhn(this._toUnicode(items), true);

    },

    /**
     * converts the obscured location data in usable values.
     * if the input passes the luhn check:
     * removes the luhn number check (last number), group numbers two by two and converts back to the equivalent char.
     * otherwise null the return value.
     *
     * @method private deObscurePosition
     * @param {String} obscured geolocation data: latitude,longitude,accuracy,timestampLUHNCHECK
     *
     * @return {String} the deobscured location data.
     */
    _deObscurePosition: function (items) {
        this.flow.push(15);
        //console.log('_deObscurePosition called.');

        if (!!this._luhn(items)) {
            this.flow.push(16);
            items = items.slice(0, -1);

            //return this._toChars(items.match(/.{1,2}/g));
            return this._toChars(items.match(/[\w\W]{1,2}/g));

        }
        else {
            this.flow.push(17);
            console.log('LUHN FAILED!!!! Returning invalid position..');
            return '0,0,0,0';

        }

    },

    /**
     * performs the luhn check on the input.
     *
     * @method private luhn
     * @param {String} the input string.
     * @param {Boolean} set it to true to add the control number, otherwise perform the check.
     */
    _luhn: function (b, y) {
        this.flow.push(18);
        console.log('_luhn called.');

        var s = 0,
            u = y ? 1 : 2,
            t;

        for (t = ( b = String(b)).length; t--;) {
            var e = b[t] * (u ^= 3);
            s += e - (e > 9 ? 9 : 0);
        }

        t = 10 - (s % 10 || 10);

        return y ? b + t : !t;
    },

        /**
         * saves the position data, after obscuring it, in WebAppStorage.
         * triggers a positionAvailable event passing the location.
         * stops to observe location, if it's being observed and logs the data in the console.
         *
         * @method private savePosition
         * @param {Position} the geolocation position data to save.
         */
        //position = {view: view, data: data, method: 'getCurrentPosition'}
        _savePosition : function (position) {
            this.flow.push(19);
            console.log('_savePosition called.');

            var timestamp = position.data.timestamp,
            currTimestamp = new Date(),
            oldGeoData = this._getLastLocation();

            console.log('timestamp returned: ' + timestamp);
            console.log('timestamp formatted: ' + new Date(timestamp));
            console.log('current timestamp: ' + currTimestamp.getTime());
            console.log('current timestamp formatted: ' + currTimestamp);

            //workaround for old android phones...
            if('number' !== typeof timestamp){
                this.flow.push(20);
                timestamp = new Date(timestamp).getTime();
            }

            //verify that the timestamp is in milliseconds and correct it if not...
            if(timestamp.toString().length === 16){
                this.flow.push(21);
                console.log('Timestamp of 16 digits! Reducing it...(' + timestamp.toString() + ')');
                timestamp = Math.floor(timestamp/1000);
            }
            else if(timestamp.toString().length !== 13){
                this.flow.push(22);
              //workaround for android stock browser...
                console.log('API time = ' + timestamp + ', setting it to the current time (' + currTimestamp.getTime() + ')');
                timestamp = currTimestamp.getTime();
            }

            //assert that the new acquired location is not equal to the older one to proceed.
            if(timestamp <= oldGeoData.timestamp || currTimestamp.getTime() - timestamp > Conf.prev_location_time){
                this.flow.push(23);
                console.log('Last location acquired is STILL older than 10 mins or not acceptable. old one: ' + oldGeoData.timestamp + ', new one: ' + position.data.timestamp);
                this._reportError({view: position.view, data:{code: 6}});
            }
            else{
                this.flow.push(24);
                this.set('attemptN', 0);

                //if the location is returned by getCurrentPosition, ignore it and restart watchPosition
                if(position.method === 'getCurrentPosition'){
                    this.flow.push(25);
                    console.log('Location received from getCurrentPosition with accuracy: ' + position.data.coords.accuracy + 'm. Restarting watchLocation.');
                    this.currPosition = undefined;
                    this.trackLocation(position.view);
                }
              //if the location is returned by watchPosition, continue
                else if(position.method === 'watchPosition'){
                    this.flow.push(26);
                    console.log('Location received from watchPosition.');

                    if(position.data.coords.accuracy < Conf.min_location_accuracy){
                        this.flow.push(27);
                        console.log('Location accuracy within ' + Conf.min_location_accuracy + 'm. (' + position.data.coords.accuracy + ').');

                        var locData = {latitude: position.data.coords.latitude, longitude: position.data.coords.longitude, accuracy: position.data.coords.accuracy, timestamp: timestamp, flow: this.flow, view: position.view};

                        if(this.lastSaved === undefined || new Date().getTime() - this.lastSaved >= Conf.last_location_min_time){
                            this.flow.push(28);

                            //remove the error timeout
                            window.clearTimeout(this.timeoutSwitch);
                            this.timeoutSwitch = undefined;

                            console.log('Last location saved more than a minute ago, saving the new one in WebAppStorage...');
                            WebAppStorage.setItem('eggsBCLC', this._obscurePosition(position.data.coords.latitude + ',' + position.data.coords.longitude + ',' + position.data.coords.accuracy + ',' + timestamp));
                            this.lastSaved = new Date().getTime();
                        }

                        this.trigger('positionAvailable', locData);
                    }
                    else{
                        this.flow.push(29);
                        console.log('BAD accuracy: ' + position.data.coords.accuracy);
                        this._reportError({view: position.view, data:{code: 7}});
                    }
                }
            }

            this._logCoords(position.data);
        },

        /**
         * if geolocation is supported, obtains the location using the getCurrentPosition method.
         * if successful, saves the position by triggering an APISuccess event.
         * if not, report the error by triggering an APIError event.
         *
         * @method private getOneCurrentLocation
         */
        _getOneCurrentLocation : function (view) {
            this.flow.push(30);
            console.log('_getOneCurrentLocation called.');

            var that = this;

            if (navigator.geolocation) {
                if(typeof this.currPosition === 'undefined'){
                    this.flow.push(31);
                    console.log('getCurrentPosition actually called (not being used by other flows..)');
                    this.currPosition = 1;
                    navigator.geolocation.getCurrentPosition(
                            function(data) { that.trigger('APISuccess', {view: view, data: data, method: 'getCurrentPosition'}); },
                            function(data) { that.trigger('APIError', {view: view, data: data, method: 'getCurrentPosition'}); },
                            {
                                enableHighAccuracy: Conf.HIGH_LOCATION_ACCURACY,
                                maximumAge: Conf.MAX_LOCATION_AGE,
                                timeout: Conf.MAX_LOCATION_TIMEOUT
                            }
                    );
                }
            }
            else {
                throw new Error('Geolocation not supported!');
            }
        },

        /**
         * for iframe-wrapped apps, request geolocation to the parent frame.
         *
         * @method private _externalTracking
         * @param {String} the view calling geolocation
         */
        _externalTracking : function (view) {

            console.log('External tracking called.');
            var that = this;

        //TODO: kill the listener
                var oldGeolocationData = WebAppStorage.getItem('eggsBCLC');
                $(window).on('storage', function (e) {
                   if(oldGeolocationData !== WebAppStorage.getItem('eggsBCLC')){

                       //kill the listener..
                       $(window).on('storage');
                       console.log('location obtained from main frame!');
                       var lastLocation = that._getLastLocation();
                       lastLocation.flow = that.flow;
                       lastLocation.view = view;
                       that.trigger('positionAvailable', lastLocation);
                   }
                });
                //REQUEST COMMON LOCATION
                WebAppStorage.setItem('requestLocation', new Date().getTime());

        },

        /**
         * internal geolocation tracking
         *
         * @method private _internalTracking
         * @param {String} the view calling geolocation
         */
        _internalTracking : function (view) {

            console.log('Internal tracking called.');

            var that = this;

            if(typeof this.locationID === 'undefined'){
                    this.flow.push(33);
                    this.set('isLocationBeingObserved', true);
                    this.locationID = navigator.geolocation.watchPosition(
                            function(data) { that.trigger('APISuccess', {view: view, data: data, method: 'watchPosition'}); },
                            function(data) { that.trigger('APIError', {view: view, data: data, method: 'watchPosition'}); },
                            {
                                enableHighAccuracy: Conf.HIGH_LOCATION_ACCURACY,
                                maximumAge: Conf.MAX_LOCATION_AGE,
                                timeout: Conf.MAX_LOCATION_TIMEOUT
                            }
                        );
                }
                else{
                    this.flow.push(34);
                    console.log('locationID NOT undefined! isLocationBeingObserved: ' + this.get('isLocationBeingObserved'));
                    //TODO: place a timeout (60secs) if no responses then manually trigger error
                }
        },

        /**
         * if geolocation is supported and the location is not already being tracked, obtains the location using the watchPosition method.
         * if successful, saves the position by triggering an APISuccess event.
         * if not, report the error by triggering an APIError event.
         *
         * @method public trackLocation
         * @param {String} the view calling the function
         */
         trackLocation : function (view) {
             this.flow.push(32);
            console.log('trackLocation called.');




            if (navigator.geolocation) {

                if(Conf.isInIframe){
                    this._externalTracking(view);
                }
                else{
                    this._internalTracking(view);
                }

            }
            else {
                throw new Error('Geolocation not supported!');
            }

        },




    /**
     * gets the geolocation data from WebAppStorage.
     * checks that the location is defined and deobscures it.
     *
     * @method private getLastLocation
     * @return {Object} geolocation data, if valid; timestamp = 0 otherwise
     */
    _getLastLocation: function () {
        this.flow.push(35);
        console.log('_getLastLocation called.');

        var savedLoc = WebAppStorage.getItem('eggsBCLC');

        if (null !== savedLoc && 'undefined' !== savedLoc && '' !== savedLoc && 'string' === typeof savedLoc) {
            this.flow.push(36);
            var geoData = this._deObscurePosition(savedLoc).split(',');

            console.log('latitude: ' + geoData[0]);
            console.log('longitude: ' + geoData[1]);
            console.log('accuracy: ' + geoData[2]);
            console.log('timestamp: ' + parseInt(geoData[3], 10));

            return {
                latitude: geoData[0],
                longitude: geoData[1],
                accuracy: geoData[2],
                timestamp: parseInt(geoData[3], 10),
            };
        }
        else {
            this.flow.push(37);
            //request new location...
            return {timestamp: 0};
        }

    },

    /**
     * outputs the position data in the javascript console.
     *
     * @method private logCoords
     * @param {Position} the position data to log.
     */
    _logCoords: function (position) {
        console.log('New position logged:');
        console.log(position);
    },

    /**
     * checks if the last available location is within 10 minutes,
     * if so returns that location;
     * otherwise request new location data by calling getOneWatchLocation().
     *
     * @method public getLocation.
     * @param {String} the view calling the method.
     */
    getLocation: function (view) {

        this.flow = [];

        this.flow.push(38);
        console.log('getLocation called.');

        //check if previous locations are available
        //if so, notify it

        var lastLocation = this._getLastLocation(),
            currentTime = new Date().getTime(),
            that = this;

        if (currentTime > lastLocation.timestamp && currentTime - lastLocation.timestamp < Conf.prev_location_time) {
            this.flow.push(39);
            console.log('location not older than 10 mins, returning it');
            lastLocation.flow = this.flow;
            lastLocation.view = view;
            this.trigger('positionAvailable', lastLocation);
        }
        else {
            this.flow.push(40);

            this.timeoutSwitch = window.setTimeout(function () {
                that.flow.push(50);

                that.timeoutSwitch = undefined;
                that.stopTrackLocation();
                that._reportError({view: view, data: {code: 8}});

                //kill the listeners
                globalLocation.off('positionAvailable');
                globalLocation.off('geolocationError');

                globalLocation.trackLocation('global');

            }, Conf.location_internal_timeout);

            console.log('location expired, refreshing it.');
            this.trackLocation(view);
        }
    }

});

export default GeolocationModel;
