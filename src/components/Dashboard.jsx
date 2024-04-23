import React, { useState, useEffect } from "react";
import SomeInfo from "./SomeInfo";
import axios from "axios";

function Dashboard(props){

    const API_KEY = process.env.REACT_APP_API_KEY;

    const {cords} = props;

    const controller = new AbortController();
    const signal = controller.signal;

    //Using function constructor
   

    const [weatherInfo, setWeatherInfo] = useState([
        {
            id: 1,
            date: "",
            position: 6,
            temp: "",
            wind: "",
            hum: "",
            img: ""
        },
        {
            id: 2,
            date: "",
            position: 14,
            temp: "",
            wind: "",
            hum: "",
            img: ""
        },
        {
            id: 3,
            date: "",
            position: 22,
            temp: "",
            wind: "",
            hum: "",
            img: ""
        },
        {
            id: 4,
            date: "",
            position: 30,
            temp: "",
            wind: "",
            hum: "",
            img: ""
        },
        {
            id: 5,
            date: "",
            position: 38,
            temp: "",
            wind: "",
            hum: "",
            img: ""
        }
    ]);

    useEffect(() => {
            async function getForecastInfo(){
            const units = "metric";
            const degrees = "°C"
            const speed = "km/h"
            const forecast_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${cords.lat}&lon=${cords.lon}&units=${units}&appid=${API_KEY}`;
            try{
                const result = await axios.get(forecast_URL, {signal});
                setWeatherInfo(weatherInfo.map((day) => {
                    return {
                        ...day,
                        date: new Date(Date.now() + [day.id] * 1000 * 3600 * 24).toLocaleString('en-US', { weekday: "long" }),
                        temp: Math.round(result.data.list[day.position].main.temp) + degrees, 
                        wind: Math.round(result.data.list[day.position].wind.speed) + speed,
                        hum: result.data.list[day.position].main.humidity + "%",
                        img: "https://openweathermap.org/img/wn/"+result.data.list[day.position].weather[0].icon+"@2x.png"
                    }
                }));
            } catch (error) {
                console.error(error);
            }
        }

        getForecastInfo();

        return () => {
            controller.abort();
        }
    }, [cords, API_KEY, weatherInfo]);


    return(
        <div className="dashboard">
            {cords.clicked ? 
            <div className="after-click">
                {weatherInfo.map((day) => {
                    return <SomeInfo weekDay={day.date} position={day.position} temp={day.temp} wind={day.wind} hum={day.hum} img={day.img} />
                })}
            </div> : 
            <div className="before-click">
                <div className="arrow"></div>
                <div className="type-instruction">Type your city and know the weather!</div>
            </div>}
            
        </div>
    )
}

export default Dashboard;