import React from 'react';
import {isGeoAvailable, geCurrentPosition, watchPosition} from "./services/geolocation";
import {testCurrentPositions, testWatchPositions} from "./services/calculations";

const FINAL_FAIL_MESSAGE = "Hmm... not enough";

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
            },
            infoFinal: {
                message:"",
                testFinished: false,
                passed: false
            }
        };
        
        this.handleCurrentPosition = this.handleCurrentPosition.bind(this);
        this.handleWatchPosition = this.handleWatchPosition.bind(this);

        this.currentTimerId = 0;
        this.watchTimerId = 0;
    }

    componentDidMount() {
        const self = this;
        this.setState({
            info: {
                message:"Running current position test....please wait"
            }
        });

        this.currentTimerId = setInterval(() => {
            geCurrentPosition(this.handleCurrentPosition);
        }, 1200);

        setTimeout(() => {
            clearInterval(self.currentTimerId);
            self.runCurrentPositionTest();
        }, 1200 * 10);
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
    
    runCurrentPositionTest() {
        const info = testCurrentPositions(this.state.currentPositions);
        this.setState({info: {...info}});
        if(info.passed){
            this.startWatchTest();
        } else {
            this.setState({infoFinal: {message:FINAL_FAIL_MESSAGE, passed: false, testFinished: true}});
        }
    }
    
    startWatchTest() {
        if(isGeoAvailable()){
            const self = this;
            this.setState({
                infoWatch: {
                    message: "Running watch position test....please wait"
                }
            });

            self.watchTimerId = watchPosition(this.handleWatchPosition);
    
            setTimeout(() => {
                window.navigator.geolocation.clearWatch(self.watchTimerId);
                self.runWatchPositionTest();
            }, 1000 * 45);
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
    
    runWatchPositionTest() {
        const infoWatch = testWatchPositions(this.state.watchPositions);
        this.setState({infoWatch: {...infoWatch}});
        if(infoWatch.passed){
            this.setState({infoFinal: {message:"All good ... you may pass", passed: true, testFinished: true}});
        } else {
            this.setState({infoFinal: {message: FINAL_FAIL_MESSAGE, passed: false, testFinished: true}});
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
                        <p className={`test ${this.state.info.testFinished ? this.state.info.passed ? "ok": "not-ok" : ""}`}>{this.state.info.message}</p>
                        <p className={`test ${this.state.infoWatch.testFinished ? this.state.infoWatch.passed ? "ok": "not-ok" : ""}`}>{this.state.infoWatch.message}</p>
                        <p className={`test ${this.state.infoFinal.testFinished ? this.state.infoFinal.passed ? "ok": "not-ok" : ""}`}>{this.state.infoFinal.message}</p>
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
                            <br />
                            <div className={error ? "text-error" : ""}>{error ? "Error: " + error : ""}</div>
                        </div>
                    </section>
                
                
                </div>
                </div>
            </div>
        )
    }

    componentWillUnmount() {
        if(isGeoAvailable() && this.watchTimerId){
            navigator.geolocation.clearWatch(this.watchTimerId);
        }
        if(this.currentTimerId){
            clearInterval(this.currentTimerId);
        }
    }

}

export default Home;