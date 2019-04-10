import React from "react";
import TestingGround from "./TestingGround";
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";
import Home from "./Home";

export default function App() {
    return (
        <Router>
            <header><h2>Geo Testing</h2></header>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="test" component={TestingGround} />
                <Route path="/geotesting/test" component={TestingGround} />
            </Switch>
        </Router>
    );
}