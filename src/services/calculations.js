export function testCurrentPositions(currentPositions) {
    let test = {
        message: "Current position test - Failed",
        passed: false,
        testFinished: true
    };
    
    console.log(currentPositions.length);
    if(currentPositions.length > 0){
        const jitters = currentPositions.map((position, index, positions) => {
            if(index !== 0){
                return positions[index].timestamp - positions[index - 1].timestamp;
            }
            return 0;
        });
        
        console.log("jitters", jitters);
        const noJitterCount = jitters.filter((j) => j === 0).length;
        const halfSamplesCount = Math.ceil(jitters.length/2);
        const allSamplesCount = jitters.length;
        if(noJitterCount === allSamplesCount) {
            test.message = `Current position - Failed (no jitter in ${allSamplesCount} samples)`;
            test.passed = false;
        } else if(noJitterCount > halfSamplesCount) {
            test.message = `Current position - Partially Passed (no jitter in ${noJitterCount}/${allSamplesCount} samples)`;
            test.passed = true;
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
        const jitters = positions.map((position, index, positions) => {
            if(index !== 0){
                return positions[index].timestamp - positions[index - 1].timestamp;
            }
            return 0;
        });
        
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