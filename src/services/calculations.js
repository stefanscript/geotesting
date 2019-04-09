
export function testCurrentPositions(positions) {
    let test = {
        message: "Current position test - Failed",
        passed: false,
        testFinished: true
    };
    
    console.log(positions.length);
    
    if(positions.length > 0){
    
        const bigJumps = hasBigPositionJumps(positions);
        
        if(bigJumps > 0) {
            return {
                message: `Current position - Failed (${bigJumps} big jumps detected)`,
                passed: false,
                testFinished: true
            }
        }
        
        const noJitterCount = getNoJittersCount(positions);
        const halfSamplesCount = Math.ceil(positions.length/2);
        const allSamplesCount = positions.length;
        
        if(noJitterCount === allSamplesCount) {
            test.message = `Current position - Failed (no jitter in ${allSamplesCount} samples)`;
            test.passed = false;
        } else if(noJitterCount >= halfSamplesCount) {
            test.message = `Current position - Failed (no jitter in ${noJitterCount}/${allSamplesCount} samples)`;
            test.passed = false;
        } else {
            test.message = `Current position - Passed (${allSamplesCount} samples)`;
            test.passed = true;
        }
        
    } else {
        test.message = `Current position test - Failed (no geo data)`;
        test.passed = false;
    }
    
    return test;
}

function getNoJittersCount(positions) {
    const jitters = getJitters(positions);
    console.log("jitters", jitters);
    return jitters.filter((j) => j === 0).length;
}

function getJitters(positions) {
    return positions.map((position, index) => {
        if (index !== 0) {
            return positions[index].timestamp - positions[index - 1].timestamp;
        }
        return 0;
    });
}


export function testWatchPositions(positions) {
    
    let test = {
        message: "Watch position test - Failed",
        passed: false,
        testFinished: true
    };
    
    if(positions.length > 0){
    
        if(hasBigPositionJumps(positions)) {
            return {
                message: `Watch position - Failed (big jumps detected)`,
                passed: false,
                testFinished: true
            }
        }
    
        const noJitterCount = getNoJittersCount(positions);
        if(noJitterCount === positions.length) {
            return {
                message: `Watch position test - Failed (no jitter in ${positions.length} samples)`,
                passed: false,
                testFinished: true
            }
        }
    
        if(hasBadAccuracy(positions)) {
            return {
                message: `Watch position - Failed (accuracy)`,
                passed: false,
                testFinished: true
            }
        }
        
        
        if(hasNoLatLongAccVariations(positions)) {
            return {
                message: `Watch position - Failed (not enough variations lat, long, acc)`,
                passed: false,
                testFinished: true
            }
        }
    
        return {
            message: `Watch position test - Passed (${positions.length} samples)`,
            passed: true,
            testFinished: true
        }
        
        
    } else {
        test.message = "Watch position test - Failed (no geo data)";
    }
    
    return test;
}


export function hasBigPositionJumps(positions) {
    try {
        if(positions.length > 0){
            const distances = positions.map((position, index, positions) => {
                if(index !== 0){
                    return _calcDistance(positions[index - 1], position, "K");
                }
                return 0;
            });
        
            console.log("distances", distances);
            const bigJumps = _getInvalidDistances(distances, 10);
            
            console.log("bigJumps", bigJumps);
            
            return bigJumps.length > 0;
        }
    } catch (e) {
        return false;
    }
    
    return false;
}

function _calcDistance(n, m, unit) {
    const lat1 = m.coords.latitude;
    const lat2 = n.coords.latitude;
    const lon1 = m.coords.longitude;
    const lon2 = n.coords.longitude;
    
    if ((lat1 === lat2) && (lon1 === lon2)) {
        return 0;
    } else {
        const radlat1 = Math.PI * lat1/180;
        const radlat2 = Math.PI * lat2/180;
        const theta = lon1-lon2;
        const radtheta = Math.PI * theta/180;
        let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180/Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit==="K") { dist = dist * 1.609344 }
        if (unit==="N") { dist = dist * 0.8684 }
        return dist;
    }
}

// assumes valid periods of time
function _getInvalidDistances(distances, validDistance) {
    return distances.filter((distance) => distance > validDistance);
}


function hasBadAccuracy(positions) {
    try {
        if(positions.length > 0){
            const bad1mAccuracies = positions.filter((position) => {
                return position.coords.accuracy === 1
            });
            
            console.log("bad1mAccuracies", bad1mAccuracies);
            return positions.length > 10 && bad1mAccuracies.length === positions.length;
        }
        return false;
    } catch (e) {
        return false;
    }
}

function hasNoLatLongAccVariations(positions) {
    try {
        if(positions.length > 0){
            const varLat = [...new Set(positions.map((position) => position.coords.latitude))];
            const varLong = [...new Set(positions.map((position) => position.coords.longitude))];
            const varAcc = [...new Set(positions.map((position) => position.coords.accuracy))];
            
            console.log("varLat", varLat);
            console.log("varLong", varLong);
            console.log("varAcc", varAcc);
            
            return positions > 10 && varLat.length > 1 && varAcc.length > 1 && varLong.length > 1;
        }
    } catch (e) {
        return false;
    }
    
    return false;
}

function _getUniqueValues(coordinates, property) {
    return [...new Set( coordinates.map(n => n[property]))];
}

function testLatLongAccVariations2(positions) {
    try {
        if(positions.length > 0){
            const variations = positions.filter((position, index, positions) => {
                if(index !== 0){
                    return _hasVariations(positions[index - 1], position);
                }
                return false;
            });
            
            console.log("variations", variations);
            
            return variations.length;
        }
    } catch (e) {
        return 0;
    }
    
    return 0;
}

function _hasVariations(pos1, pos2) {
    const v1 = _precise(pos1.coords.latitude - pos2.coords.latitude);
    const v2 = _precise(pos1.coords.longitude - pos2.coords.longitude);
    let v3 = 0;
    if(pos1.coords.accuracy && pos2.coords.accuracy) {
        v3 = _precise(pos1.coords.accuracy - pos2.coords.accuracy);
    }
    
    return v1 > 0 || v2 > 0 || v3 > 0;
}

function _precise(x) {
    return Number.parseFloat(Number.parseFloat(x).toPrecision(4));
}

// function distance(lon1, lat1, lon2, lat2) {
//
//     function toRad(val) {
//         return val * Math.PI / 180;
//     }
//     console.log(lon1, lat1, lon2, lat2);
//
//     const R = 6371; // Radius of the earth in km
//     const dLat = toRad(lat2-lat1);  // Javascript functions in radians
//     const dLon = toRad(lon2-lon1);
//     const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
//         Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
//         Math.sin(dLon/2) * Math.sin(dLon/2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
//     return R * c; // Distance in km
// }

function getUniqueValues(coordinates, property) {
    return [...new Set( coordinates.map(n => n[property]))];
}

function checkLocationTimePeriod(coordinates) {
    return 0;
}

function calculateDistances(coordinates) {
    let i;
    let distances = [];
    for (i=1; i < coordinates.length-1; i++) {
        distances.push(_calcDistance(coordinates[i-1], coordinates[i], 'K'));
    }
    return distances;
}



