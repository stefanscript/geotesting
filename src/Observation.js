import React from "react";

export function Observation({title, value}) {

    return <div className="observation">{title}: <span>{value}</span></div>
}

export function ObservationTest({title, passed}) {

    return (<div className={`observation observation-test ${passed ? "" : "failed"}`}>
        {title}: <span className={`result`}>{JSON.stringify(passed)}</span>
    </div>)
}