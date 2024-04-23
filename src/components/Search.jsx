import React, { useState, useEffect } from "react";
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AirIcon from '@mui/icons-material/Air';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import axios from "axios";

function Search({sendCordsToApp}){

    const API_KEY = process.env.REACT_APP_API_KEY;

    const [isClicked, setIsClicked] = useState(false);
    const [input,setInput] = useState("");
    const [city,setCity] = useState("");
    const [weatherInfo, setWeatherInfo] = useState({
        temp: "",
        feels_like: "",
        temp_min: "",
        temp_max: "",
        wind: "",
        hum: "",
        img: ""
    });
    const [cordsToSend, setCordsToSend] = useState({
        lat: "",
        lon: "",
        clicked: false
    });
    const controller = new AbortController();
    const signal = controller.signal;

    function handleChange(event){
        setInput(event.target.value);
    }

    function handleClick(){
        setCity(input);
        setIsClicked(true);
    }

    useEffect(() => {
        async function getWeatherInfo(){
            const geoCoding_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${API_KEY}`;
                try {
                    const result = await axios.get(geoCoding_URL, {signal});
                    const lat = JSON.stringify(result.data[0].lat);
                    const lon = JSON.stringify(result.data[0].lon);
                    const units = "metric";
                    const degrees = "°C"
                    const speed = "km/h"
                    const weather_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`
                    setCordsToSend({lat: lat, lon: lon, clicked: isClicked});
                    try{
                        const result = await axios.get(weather_URL);
                        setWeatherInfo({
                            temp: Math.round(result.data.main.temp) + degrees,
                            feels_like: Math.round(result.data.main.feels_like) + degrees,
                            temp_min: Math.round(result.data.main.temp_min) + degrees,
                            temp_max: Math.round(result.data.main.temp_max) + degrees,
                            wind: Math.round(result.data.wind.speed) + speed,
                            hum: result.data.main.humidity + "%",
                            img: "https://openweathermap.org/img/wn/"+result.data.weather[0].icon+"@2x.png"
                        })
                    } catch (error) {
                        console.error(error);
                      }
                } catch (error) {
                  console.error(error);
                }
        }
        const sendCords = () => {
            sendCordsToApp(cordsToSend);
        }
        getWeatherInfo();
        sendCords();

        return() => {
            controller.abort();
        }
    }, [city, API_KEY, isClicked, sendCordsToApp, cordsToSend]);

   

    return(
        <div className="search-section">
            <div className="wrapper">
                <input onChange={handleChange} value={input} className="search-bar" placeholder="Enter your city"></input>
                <button onClick={handleClick}><SearchIcon /></button>
            </div>
            {isClicked ? 
            <div className="main-weather">
                <div className="city-wrapper">
                    <LocationOnIcon/>
                    <p className="city">{city}</p>
                </div>
                <img className="weather-icon" src={weatherInfo.img} alt="Weather icon"/>
                <p className="main-temp">{weatherInfo.temp}</p>
                <div className="text-wrapper"> 
                    <AirIcon/>
                    <p className="extra-info">Wind   |  {weatherInfo.wind}</p>
                </div>
                <div className="text-wrapper"> 
                    <WaterDropIcon/>
                    <p className="extra-info">Hum   |   {weatherInfo.hum}</p>
                </div>
            </div>
            : null }
        </div>
    )
}

export default Search;