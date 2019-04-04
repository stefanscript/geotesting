import React, {Component} from 'react';
import './App.css';
import {geCurrentPosition, getResult, isGeoAvailable, watchPosition} from "./services/geo";
import {
    devToolsOpen,
    getBrowserData,
    getLanguage,
    getTimezone,
    getTimezoneOffsetVsUTC,
    getVideoCardInfo,
    isMobile
} from "./services/hardware";
import {Check} from "./Check";
import {Observation} from "./Observation";


const csvRow = function(dataObject, heading) {
    let dataArray = heading.map(hr => {
        return dataObject.coords[hr] === null ? '' : dataObject.coords[hr].toString();
    });
    dataArray.push(dataObject.timestamp);
    return dataArray.join(',') + '\r\n';
};

const exportToCSV = function(id, name, arrData) {

    if (!arrData.length) {
        return;
    }

    let csvContent = "data:text/csv;charset=utf-8,";

    let heading = "latitude,longitude,accuracy,altitude,altitudeAccuracy,heading,speed".split(",");
    // headers
    csvContent += heading.join(",") +',timestamp'+ '\r\n';

    arrData.forEach(function(item){
        csvContent += csvRow(item, heading);
    });

    let encodedUri = encodeURI(csvContent);
    let link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "customers.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    link.click();
    console.log("clicked");
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            position: "",
            error: "",
            errorOne: "",
            prevWatchPositions: [],
            prevOnePositions: []
        };
        
        this.handleWatchChanges = this.handleWatchChanges.bind(this);
        this.handleWatchClick = this.handleWatchClick.bind(this);
        this.handleOneClick = this.handleOneClick.bind(this);
        this.handleOneChanges = this.handleOneChanges.bind(this);
        this.downloadWatchCSV = this.downloadWatchCSV.bind(this);
        this.downloadOneCSV = this.downloadOneCSV.bind(this);
    }
    
    handleWatchChanges({position, error}) {
        // this.setState({position: position, error: error});
        if(!error){
            let newEntry = {coords: {}, timestamp: position.timestamp};
            for(let key in position.coords){
                // if(position.coords.hasOwnProperty(key)){
                    console.log("key: ", key, position.coords[key]);
                    newEntry.coords[key] = position.coords[key];
                // }
            }
            // {coords: position.coords, timestamp: position.timestamp}
            this.setState({prevWatchPositions: [].concat([...this.state.prevWatchPositions], newEntry)});
        } else {
            this.setState({ error: error});
        }
    }
    handleOneChanges({position, error}) {
        // this.setState({position: position, error: error});
        if(!error){
            let newEntry = {coords: {}, timestamp: position.timestamp};
            for(let key in position.coords){
                // if(position.coords.hasOwnProperty(key)){
                    console.log("key: ", key, position.coords[key]);
                    newEntry.coords[key] = position.coords[key];
                // }
            }
            // {coords: position.coords, timestamp: position.timestamp}
            this.setState({prevOnePositions: [].concat([...this.state.prevOnePositions], newEntry)});
        } else {
            this.setState({ errorOne: error});
        }
    }

    
    handleWatchClick(e) {
        watchPosition(this.handleWatchChanges);
    }
    handleOneClick() {
        geCurrentPosition(this.handleOneChanges);
    }
    
    componentDidMount() {
        window.addEventListener('orientationchange', this.doOnOrientationChange);
        this.doOnOrientationChange();
    }
    
    doOnOrientationChange() {
        if (window.innerHeight > window.innerWidth) {
            console.log("portrait");
        } else {
            console.log("landscape")
        }
    }
    downloadOneCSV(event) {
        event.stopPropagation();
        exportToCSV("downloadoneCSV", "getCurrentPosition", this.state.prevOnePositions);
        return false;
    }
    downloadWatchCSV(event) {
        event.stopPropagation();
        exportToCSV("downloadwatchCSV", "watchPosition", this.state.prevWatchPositions);
        return false;
    }
    
    render() {
        return (
            <div className="App">
                <header>Geolocation</header>
                <section className="side-container">
                    <div className={`head` + (getResult() < 50 ? " sad" : "")}>
                        <div className="face">
                            <div className="mouth" />
                            <div className="eye-group">
                                <div className="eye eye-left" />
                                <div className="eye eye-right" />
                            </div>
                        </div>
                    </div>
                    <div>Confidence: {getResult()}</div>
                    {/*<Observation title={"Is Mobile"} value={JSON.stringify(isMobile())}/>*/}
                    
                    {/*<Observation title={"Dev Tools"} value={devToolsOpen()}/>*/}
                    {/*<Observation title={"Browser data"} value={getBrowserData()}/>*/}
                    {/*<Observation title={"GPU"} value={JSON.stringify(getVideoCardInfo())}/>*/}

                    <div className={"details"}>

                        <Observation title={"Language"} value={JSON.stringify(getLanguage())}/>
                        <Observation title={"Timezone IANA"} value={JSON.stringify(getTimezone())}/>

                        <Observation title={"Timezone Offset"}
                                     value={JSON.stringify(getTimezoneOffsetVsUTC()) + "hr(s)"}/>


                        <Check title={"Geolocation API Availability"} passed={isGeoAvailable()}/>

                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <h1> Watch Position</h1>
                        <button onClick={this.handleWatchClick}>Start Watching Geolocation</button>
                        <code>{this.state.error}</code>

                        <ul className={"entries"}>
                            <li key={"w0"}>
                                <code className={"index-column"}>#</code>
                                <code>latitude</code>
                                <code>longitude</code>
                                <code>accuracy</code>
                                <code>altitude</code>
                                <code>altitudeAccuracy</code>
                                <code>heading</code>
                                <code>speed</code>
                                <code>timestamp</code>
                                {/*<code>Date: {this.state.position && (new Date(this.state.position.timestamp).toISOString("DD-MM-YYYY HH:mm:ss"))}</code>*/}
                            </li>
                                {this.state.prevWatchPositions.map((pos, index) => (
                                    <li key={"w" + index}>
                                        <code className={"index-column"}>{index}.</code>
                                        <code>{pos.coords.latitude}</code>
                                        <code>{pos.coords.longitude}</code>
                                        <code>{pos.coords.accuracy}m</code>
                                        <code>{pos.coords.altitude}</code>
                                        <code>{pos.coords.altitudeAccuracy}</code>
                                        <code>{pos.coords.heading}</code>
                                        <code>{pos.coords.speed}</code>
                                        <code>+{pos.timestamp - this.state.prevWatchPositions[0].timestamp } {(pos.timestamp + "").length === 10 ? "sec" : "ms"}</code>
                                        {/*<code>Date: {this.state.position && (new Date(this.state.position.timestamp).toISOString("DD-MM-YYYY HH:mm:ss"))}</code>*/}
                                    </li>))
                                }
                        </ul>
                        <a id="downloadwatchCSV" onClick={this.downloadWatchCSV}>Download CSV</a>

                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <h1> One time Position</h1>
                        <button onClick={this.handleOneClick}>Get Quick Geolocation</button>
                        <code>{this.state.error}</code>
                        <ul className={"entries"}>
                            <li key="0">
                                <code className={"index-column"}>#</code>
                                <code>latitude</code>
                                <code>longitude</code>
                                <code>accuracy</code>
                                <code>altitude</code>
                                <code>altitudeAccuracy</code>
                                <code>heading</code>
                                <code>speed</code>
                                <code>timestamp</code>
                                {/*<code>Date: {this.state.position && (new Date(this.state.position.timestamp).toISOString("DD-MM-YYYY HH:mm:ss"))}</code>*/}
                            </li>
                            {this.state.prevOnePositions && this.state.prevOnePositions.map((pos, index) => (
                                <li key={index}>
                                    <code className={"index-column"}>{index}.</code>
                                    <code>{pos.coords.latitude}</code>
                                    <code>{pos.coords.longitude}</code>
                                    <code>{pos.coords.accuracy}m</code>
                                    <code>{pos.coords.altitude}</code>
                                    <code>{pos.coords.altitudeAccuracy}</code>
                                    <code>{pos.coords.heading}</code>
                                    <code>{pos.coords.speed}</code>
                                    <code>+{pos.timestamp - this.state.prevOnePositions[0].timestamp } {(pos.timestamp + "").length === 10 ? "sec" : "ms"}</code>
                                    {/*<code>Date: {this.state.position && (new Date(this.state.position.timestamp).toISOString("DD-MM-YYYY HH:mm:ss"))}</code>*/}
                                </li>))
                            }
                        </ul>
                        <a href="" id="downloadoneCSV" onClick={this.downloadOneCSV}>Download CSV</a>
                    </div>
                </section>
                <footer />
            </div>
        );
    }
}

export default App;
