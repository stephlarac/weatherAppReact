import React, {useContext, useEffect, useCallback, useState } from "react";
import SomeInfo from "./SomeInfo";
import { cordsContext } from "../context/cordsContext";
import { goSearchContext } from "../context/goSearchContext";
import useAxios from "../hooks/useAxios"

function Dashboard(){

    const API_KEY = process.env.REACT_APP_API_KEY;

    const {cords} = useContext(cordsContext);
    const {goSearch, setGoSearch} = useContext(goSearchContext);
    const [time, setTime] = useState(new Date());
    const hours = time.getHours();
    //const hours = 5;
    const position = hours < 3 ? 0 : hours < 6 ? 1 : hours < 9 ? 2 : hours < 12 ? 3 : hours < 15 ? 4 : hours < 18 ? 5 : hours < 21 ? 6 : 7;
    const [forecast, setForecast] = useState([
        {
            id: 1,
            date: "",
            position: position,
            temp: "",
            wind: "",
            hum: "",
            img: ""
        },
        {
            id: 2,
            date: "",
            position: position+(8*1),
            temp: "",
            wind: "",
            hum: "",
            img: ""
        },
        {
            id: 3,
            date: "",
            position: position+(8*2),
            temp: "",
            wind: "",
            hum: "",
            img: ""
        },
        {
            id: 4,
            date: "",
            position: position+(8*3),
            temp: "",
            wind: "",
            hum: "",
            img: ""
        },
        {
            id: 5,
            date: "",
            position: position+(8*4),
            temp: "",
            wind: "",
            hum: "",
            img: ""
        }]);

    const units = {
        units: "metric",
        degrees: "°C",
        speed: "km/h",
    };

    const getForecastInfo = useCallback(async () => {       
        const response = await useAxios.get(`/data/2.5/forecast?`, {
            params: {lat: cords.lat, lon: cords.lon, units: units.units, appid: API_KEY}
        });
        setForecast(forecast.map((day) => {
            return {
                ...day,
                date: new Date(Date.now() + [day.id] * 1000 * 3600 * 24).toLocaleString('en-US', { weekday: "long" }),
                temp: Math.round(response.data.list[day.position].main.temp) + units.degrees, 
                wind: Math.round(response.data.list[day.position].wind.speed) + units.speed,
                hum: response.data.list[day.position].main.humidity + "%",
                img: "https://openweathermap.org/img/wn/"+response.data.list[day.position].weather[0].icon+"@2x.png"
            }
        }))
    },[cords, forecast, API_KEY, setForecast, units.degrees, units.speed, units.units]);

    useEffect(()=>{
        if(cords.clicked && goSearch.search){
            getForecastInfo();
            setGoSearch(false);
        }  
    },[cords, forecast, getForecastInfo, goSearch.search, setGoSearch, hours, position]);

    useEffect(() => {
        const interval = setInterval(() => {
          setTime(new Date());
        }, 1000);
    
        return () => clearInterval(interval);
      }, []);
    return(
        <div className="dashboard">
            {cords.clicked ? 
            <div className="after-click" >
                {forecast.map((day) => {
                    return <SomeInfo key={day.id} weekDay={day.date} position={day.position} temp={day.temp} wind={day.wind} hum={day.hum} img={day.img} />
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