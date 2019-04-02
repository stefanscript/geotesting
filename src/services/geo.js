const options = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0
};

let geoHandler;
let data = {
    position: "",
    error: ""
};

export function isGeoAvailable() {
    return "geolocation" in navigator;
}

export function geCurrentPosition() {
    if (isGeoAvailable()) {
        navigator.geolocation.getCurrentPosition(successHandler, errorHandler, options);
    }
}

function successHandler(pos) {
    console.log("g1");
    var crd = pos.coords;
    
    data.position = pos;
    geoHandler && geoHandler({position: data.position});
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
