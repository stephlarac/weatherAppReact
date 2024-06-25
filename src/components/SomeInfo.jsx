import React from "react";
import AirIcon from '@mui/icons-material/Air';
import WaterDropIcon from '@mui/icons-material/WaterDrop';

function SomeInfo(props){

    return(
        <div className="info-square">
            <p className="week-day">{props.weekDay}</p>
            <img src={props.img}  alt="Weather icon" className="sec-icon"/>
            <p className="sec-temp">{props.temp}</p>
            <div className="extra-wrapper">
                <div className="text-wrapper"> 
                    <AirIcon/>
                    <p className="extra-info">{props.wind}</p>
                </div>
                <div className="text-wrapper"> 
                    <WaterDropIcon/>
                    <p className="extra-info"> {props.hum}</p>
                </div>
            </div>
        </div>
    )
}

export default SomeInfo;