import React from "react";
import TestingGround from "./TestingGround";
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";
import Home from "./Home";


const vNo = process.env.REACT_APP_VERSION;


export default function App() {
    return (
        <Router basename="/">
            <header><h2>Geo Testing {`v` + vNo}</h2></header>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="test" component={TestingGround} />
            </Switch>
        </Router>
    );
}