import {getLanguage, getTimezone, getTimezoneOffsetVsUTC} from "./hardware";
import * as finger from "./fingerprint2";

const options = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0
};

let geoHandler;
let geoHandlerOne;
let data = {
    position: "",
    error: ""
};

export function isGeoAvailable() {
    return "geolocation" in navigator;
}

export function geCurrentPosition(handler) {
    if (isGeoAvailable()) {
        geoHandlerOne = handler;
        navigator.geolocation.getCurrentPosition(successHandler, errorHandler, options);
    }
}

function successHandler(pos) {
    console.log("g1");
    var crd = pos.coords;

    data.position = pos;
    console.log(pos);
    geoHandlerOne && geoHandlerOne({position: pos});

    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
}

function errorHandler(err) {
    // error.code can be:
    //   0: unknown error
    //   1: permission denied
    //   2: position unavailable (error response from location provider)
    //   3: timed out
    let reason = "unknown error";
    if (err.code === 1) {
        reason = "permission denied";
    } else if (err.code === 2) {
        reason = "position unavailable (error response from location provider)";
    } else if (err.code === 3) {
        reason = "timed out";
    }
    
    data.error = `ERROR(${err.code}): reason: ${reason}, ${err.message}`;
    
    geoHandler && geoHandler({error: data.error});
    geoHandlerOne && geoHandlerOne({error: data.error});
    console.warn(data.error);
}


export function watchPosition(handler) {
    let id;
    if (isGeoAvailable()) {
        
        geoHandler = handler;
        id = navigator.geolocation.watchPosition(successWatchHandler, errorHandler, options);
    }
    return id;
}

function successWatchHandler(pos) {
    var crd = pos.coords;
    
    data.position = pos;
    console.log(pos);
    geoHandler && geoHandler({position: pos});
    
    console.log('Watch: Your current position is:', new Date());
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
}


export function getResultDeviceTrust() {
    let result = 0;
    let tests = 0;

    result += finger.getHasLiedOs() ? 0 : 100;
    tests++;
    result += finger.getHasLiedBrowser() ? 0 : 100;
    tests++;
    result += finger.getHasLiedLanguages() ? 0 : 100;
    tests++;
    result += finger.getHasLiedResolution() ? 0 : 100;
    tests++;
    result += hasLiedIANATimezone(getTimezone()) ? 0 : 100;
    tests++;
    result += hasLiedTimeZoneOffset(getTimezoneOffsetVsUTC()) ? 0 : 100;
    tests++;
    
    // result += testLanguage(getLanguage());
    // tests++;
   

    return parseInt(result/tests, 10);
}

export function hasLiedIANATimezone(timezone) {
    return String(timezone).toLowerCase() !== "america/toronto" ;
}

export function hasLiedTimeZoneOffset(offset) {
    let v = parseInt(offset, 10);

    return !(v <= 6 && v >= 4);
}

export function testLanguage(language) {
    //
    if(language === "en-CA" || language === "fr-CA" || language === "en") {
        return 100;
    }

    return 0;
}