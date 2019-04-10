
export function testCurrentPositions(positions) {
    console.log(positions.length);
    
    if(positions.length > 0){
    
        if(hasBigPositionJumps(positions)) {
            return _failMessage(`Current position - Failed (big jumps detected)`);
        }
        
        const noJitterCount = getNoJittersCount(positions);
        const halfSamplesCount = Math.ceil(positions.length/2);
        const allSamplesCount = positions.length;
        
        if(noJitterCount === allSamplesCount) {
            return _failMessage(`Current position - Failed (no jitter in ${allSamplesCount} samples)`);
        }
        // else if(noJitterCount >= halfSamplesCount) {
        //     return _failMessage(`Current position - Failed (no jitter in ${noJitterCount}/${allSamplesCount} samples)`);
        // }
    
        return _successMessage(`Current position - Passed (${allSamplesCount} samples)`);
        
    }
    
    return _failMessage(`Current position test - Failed (no geo data)`);
}

function _successMessage(message) {
    return _testResultMessage({
        message: message,
        passed: true,
        testFinished: true
    });
}
function _failMessage(message) {
    return _testResultMessage({
        message: message,
        passed: false,
        testFinished: true
    });
}
function _testResultMessage({message, passed, testFinished}) {
    return {
        message: message,
        passed: passed,
        testFinished: testFinished
    };
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
    
    if(positions.length > 0){
    
        if(hasBigPositionJumps(positions)) {
            return _failMessage(`Watch position - Failed (big jumps detected)`);
        }
    
        const noJitterCount = getNoJittersCount(positions);
        if(noJitterCount === positions.length) {
            return _failMessage(`Watch position test - Failed (no jitter in ${positions.length} samples)`);
        }
    
        if(hasBadAccuracy(positions)) {
            return _failMessage(`Watch position - Failed (accuracy)`);
        }
        
        if(hasNoLatLongAccVariations(positions)) {
            return _failMessage(`Watch position - Failed (not enough variations lat, long, acc)`);
        }
    
        return _successMessage(`Watch position test - Passed (${positions.length} samples)`);
    }
    
    return _failMessage(`Watch position test - Failed (no geo data)`);
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
    }
    
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

// assumes valid periods of time
function _getInvalidDistances(distances, validDistance) {
    return distances.filter((distance) => distance > validDistance);
}


function hasBadAccuracy(positions) {
    try {
        if(positions.length >= 10){
            const bad1mAccuracies = positions.filter((position) => {
                return position.coords.accuracy === 1
            });
            
            console.log("bad1mAccuracies", bad1mAccuracies);
            return bad1mAccuracies.length === positions.length;
        }
        
    } catch (e) {
        return false;
    }
    return false;
}

function hasNoLatLongAccVariations(positions) {
    try {
        if(positions.length >= 10){
            const varLat = [...new Set(positions.map((position) => position.coords.latitude))];
            const varLong = [...new Set(positions.map((position) => position.coords.longitude))];
            const varAcc = [...new Set(positions.map((position) => position.coords.accuracy))];

            console.log("varLat", varLat);
            console.log("varLong", varLong);
            console.log("varAcc", varAcc);

            return varLat.length === 1 && varAcc.length === 1 && varLong.length === 1;
        }
    } catch (e) {
        return false;
    }
    
    return false;
}

function calculateDistances(coordinates) {
    let i;
    let distances = [];
    for (i=1; i < coordinates.length-1; i++) {
        distances.push(_calcDistance(coordinates[i-1], coordinates[i], 'K'));
    }
    return distances;
}



