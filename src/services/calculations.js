function getJitters(positions) {
    return positions.map((position, index) => {
        if (index !== 0) {
            return positions[index].timestamp - positions[index - 1].timestamp;
        }
        return 0;
    });
}

export function testCurrentPositions(positions) {
    let test = {
        message: "Current position test - Failed",
        passed: false,
        testFinished: true
    };
    
    console.log(positions.length);
    
    if(positions.length > 0){
    
        const bigJumps = testPositionsForJump(positions);
        
        if(bigJumps > 0) {
            return {
                message: `Current position - Failed (${bigJumps} big jumps detected)`,
                passed: false,
                testFinished: true
            }
        }
        
        const jitters = getJitters(positions);
        
        console.log("jitters", jitters);
        const noJitterCount = jitters.filter((j) => j === 0).length;
        const halfSamplesCount = Math.ceil(jitters.length/2);
        const allSamplesCount = jitters.length;
        
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

export function testWatchPositions(positions) {
    
    let test = {
        message: "Watch position test - Failed",
        passed: false,
        testFinished: true
    };
    
    if(positions.length > 0){
    
        const bigJumps = testPositionsForJump(positions);
    
        if(bigJumps > 0) {
            return {
                message: `Watch position - Failed (${bigJumps} big jumps detected)`,
                passed: false,
                testFinished: true
            }
        }
    
        const jitters = getJitters(positions);
        
        console.log("jitters", jitters);
        const jittersCount = jitters.filter((j) => j === 0).length;
        if(jittersCount === positions.length) {
            test.message = `Watch position test - Failed (no jitter in ${positions.length} samples)`;
        } else {
            test.message = `Watch position test - Passed (${positions.length} samples)`;
            test.passed = true;
        }
        
    } else {
        test.message = "Watch position test - Failed (no geo data)";
    }
    
    return test;
}


export function testPositionsForJump(positions) {
    try {
        if(positions.length > 0){
            const distances = positions.map((position, index, positions) => {
                if(index !== 0){
                    return calcDistance(positions[index - 1], position, "K");
                }
                return 0;
            });
        
            console.log("distances", distances);
            const bigJumps = getInvalidDistances(distances, 10);
            console.log("bigJumps", bigJumps);
            return bigJumps.length;
        }
    } catch (e) {
        return 0;
    }
    
    return 0;
}

function calcDistance(n, m, unit) {
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
        distances.push(calcDistance(coordinates[i-1], coordinates[i], 'K'));
    }
    return distances;
}

// assumes valid periods of time
function getInvalidDistances(distances, validDistance) {
    return distances.filter((distance) => distance > validDistance);
}

