import React from 'react';
import {isGeoAvailable, geCurrentPosition, watchPosition} from "./services/geolocation";

class Home extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            currentPositions: [],
            watchPositions: [],
            position: {
                coords: {},
                timestamp: 0
            },
            error: "",
            info: {
                message:"",
                testFinished: false,
                passed: false
            },
            infoWatch: {
                message:"",
                testFinished: false,
                passed: false
            }
        };
        
        this.handleCurrentPosition = this.handleCurrentPosition.bind(this);
        this.handleWatchPosition = this.handleWatchPosition.bind(this);
    }
    
    handleCurrentPosition({position, error}) {
        const self = this;
        if (position) {
            const positionData = {
                    coords: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        accuracy: position.coords.accuracy,
                        altitude: position.coords.altitude,
                        altitudeAccuracy: position.coords.altitudeAccuracy,
                        heading: position.coords.heading,
                        speed: position.coords.speed,
                    },
                    timestamp: position.timestamp
                };
            self.setState({position: positionData});
            self.setState({currentPositions: [...self.state.currentPositions, positionData]});
        }
        
        if (error) {
            self.setState({error: error});
        }
    }
    
    handleWatchPosition({position, error}) {
        const self = this;
        if (position) {
            const positionData = {
                    coords: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        accuracy: position.coords.accuracy,
                        altitude: position.coords.altitude,
                        altitudeAccuracy: position.coords.altitudeAccuracy,
                        heading: position.coords.heading,
                        speed: position.coords.speed,
                    },
                    timestamp: position.timestamp
                };
            self.setState({position: positionData});
            self.setState({watchPositions: [...self.state.watchPositions, positionData]});
        }
        
        if (error) {
            self.setState({error: error});
        }
    }
    
    runCurrentPositionTest() {
        if(this.state.currentPositions.count > 0){
            const jitters = this.state.currentPositions.map((position, index, positions) => {
                if(index !== 0){
                    return positions[index].timestamp - positions[index - 1].timestamp;
                }
                return 0;
            });
    
            console.log("jitters", jitters);
            const count = jitters.filter((j) => j === 0);
            if(count.length > 1) {
                this.setState({info: { message: "Current position test - Failed", passed: false, testFinished: true}});
            } else {
                this.setState({info: {message: "Current position test - Passed", passed: true, testFinished: true}});
            }
        } else {
            this.setState({info: { message: "Current position test - Failed (no geo data)", passed: false, testFinished: true}});
        }
    
        this.startWatchTest();
    }
    
    componentDidMount() {
        let interval;
        const self = this;
        this.setState({
            info: {
                message:"Running current position test....please wait"
            }
        });
        
        interval = setInterval(() => {
            geCurrentPosition(this.handleCurrentPosition);
        }, 1000);
        
        setTimeout(() => {
            clearInterval(interval);
            self.runCurrentPositionTest();
        }, 1000 * 8);
    }
    
    startWatchTest() {
        if(isGeoAvailable()){
            let watchId;
            const self = this;
            this.setState({
                infoWatch: {
                    message: "Running watch position test....please wait"
                }
            });
    
            watchId = watchPosition(this.handleWatchPosition);
    
            setTimeout(() => {
                window.navigator.geolocation.clearWatch(watchId);
                self.runWatchPositionTest();
            }, 1000 * 50);
        }
    }
    
    runWatchPositionTest() {
        if(this.state.watchPositions.count > 0){
            const jitters = this.state.watchPositions.map((position, index, positions) => {
                if(index !== 0){
                    return positions[index].timestamp - positions[index - 1].timestamp;
                }
                return 0;
            });
            
            console.log("jitters", jitters);
            const count = jitters.filter((j) => j === 0);
            if(count.length === this.state.watchPositions.count) {
                this.setState({infoWatch: {message:"Watch position test - Failed", passed: false, testFinished: true}});
            } else {
                this.setState({infoWatch: {message: "Watch position test - Passed", passed: true, testFinished: true}});
            }
        } else {
            this.setState({infoWatch: {message:"Watch position test - Failed (no geo data)", passed: false, testFinished: true}});
        }
    }
    
    render() {
        const position = this.state.position;
        const error = this.state.error;
        return (
            <div className="container">
                <div className="wrapper">
                <div className="sections">
                    <section className={"section"}>
                        <p className={this.state.info.testFinished ? this.state.info.passed ? "ok": "not-ok" : ""}>{this.state.info.message}</p>
                        <p className={this.state.infoWatch.testFinished ? this.state.infoWatch.passed ? "ok": "not-ok" : ""}>{this.state.infoWatch.message}</p>
                    </section>
                    <section className={"section"}>
                        <div className="position-details">
                            <h2>Position</h2>
                            <ul>
                                <li>
                                    <div>Latitude</div>
                                    <div>{position.coords.latitude}</div>
                                </li>
                                <li>
                                    <div>Longitude</div>
                                    <div>{position.coords.longitude}</div>
                                </li>
                                <li>
                                    <div>Accuracy</div>
                                    <div>{position.coords.accuracy} m</div>
                                </li>
                                <li>
                                    <div>Altitude</div>
                                    <div>{position.coords.altitude}</div>
                                </li>
                                <li>
                                    <div>Altitude Accuracy</div>
                                    <div>{position.coords.altitudeAccuracy}</div>
                                </li>
                                <li>
                                    <div>Latitude</div>
                                    <div>{position.coords.heading}</div>
                                </li>
                                <li>
                                    <div>Speed</div>
                                    <div>{position.coords.speed}</div>
                                </li>
                            </ul>
                            <div>{error ? "Error: " + error : ""}</div>
                        </div>
                    </section>
                
                
                </div>
                </div>
            </div>
        )
    }
    
}

export default Home;