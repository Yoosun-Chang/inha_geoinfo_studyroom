import React from "react";
import Top from "../component/top";
import List from "../component/myreservation/list";
import Wave from "../component/Wave"

function Myreservation() {
    return (
        <div>
            <Top/>
            <List />
            <List />
            <List />
            <List />
            <List />
            <Wave/>
        </div>
    );
}

export default Myreservation;
