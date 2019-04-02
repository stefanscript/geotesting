import React, {Component} from 'react';
import './App.css';
import {isGeoAvailable, watchPosition} from "./services/geo";
import {
    devToolsOpen,
    getBrowserData,
    getLanguage,
    getTimezone,
    getTimezoneOffset,
    getVideoCardInfo,
    isMobile
} from "./services/hardware";
import {Check} from "./Check";
import {Observation} from "./Observation";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            position: "",
            error: ""
        };
        
        this.handleChanges = this.handleChanges.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleChanges({position, error}) {
        this.setState({position: position, error: error});
    }
    
    handleClick() {
        watchPosition(this.handleChanges);
    }
    
    componentDidMount() {
        window.addEventListener('orientationchange', this.doOnOrientationChange);
        this.doOnOrientationChange();
    }
    
    doOnOrientationChange() {
        // switch(window.orientation) {
        //     case -90 || 90:
        //         alert('landscape');
        //         break;
        //     default:
        //         alert('portrait');
        //         break;
        // }
        if (window.innerHeight > window.innerWidth) {
            console.log("portrait");
        } else {
            console.log("landscape")
        }
    }
    
    render() {
        return (
            <div className="App">
                <header>Geolocation</header>
                <section className="side-container">
                    <Observation title={"Is Mobile"} value={JSON.stringify(isMobile())}/>
                    
                    <Observation title={"Dev Tools"} value={devToolsOpen()}/>
                    <Observation title={"Browser data"} value={getBrowserData()}/>
                    <Observation title={"GPU"} value={JSON.stringify(getVideoCardInfo())}/>
                    
                    <Observation title={"Language"} value={JSON.stringify(getLanguage())}/>
                    <Observation title={"Timezone IANA"} value={JSON.stringify(getTimezone())}/>
                    
                    <Observation title={"Timezone Offset"} value={JSON.stringify(getTimezoneOffset())}/>
                    
                    
                    <Check title={"Geolocation API Availability"} passed={isGeoAvailable()}/>
                    <button onClick={this.handleClick}>Start Watching Geolocation</button>
                    
                    <code>{this.state.error}</code>
                    <code>latitude: {this.state.position && this.state.position.coords.latitude}</code>
                    <code>longitude: {this.state.position && this.state.position.coords.longitude}</code>
                    <code>accuracy: within {this.state.position && this.state.position.coords.accuracy}m</code>
                    <code>altitude: {this.state.position && this.state.position.coords.altitude}</code>
                    <code>altitudeAccuracy: {this.state.position && this.state.position.coords.altitudeAccuracy}</code>
                    <code>heading: {this.state.position && this.state.position.coords.heading}</code>
                    <code>speed: {this.state.position && this.state.position.coords.speed}</code>
                    <code>timestamp: {this.state.position && this.state.position.timestamp}</code>
                    <code>Date: {this.state.position && (new Date(this.state.position.timestamp).toISOString("DD-MM-YYYY HH:mm:ss"))}</code>
                
                </section>
            </div>
        );
    }
}

export default App;
