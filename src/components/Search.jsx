import React, { useState, useEffect, useContext, useCallback} from "react";
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AirIcon from '@mui/icons-material/Air';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import useAxios from "../hooks/useAxios";
import { cordsContext } from "../context/cordsContext";
import { goSearchContext } from "../context/goSearchContext";

function Search(){

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
    const {cords, setCords} = useContext(cordsContext);
    const {goSearch, setGoSearch} = useContext(goSearchContext);
    const units = {
        units: "metric",
        degrees: "°C",
        speed: "km/h",
    }

    function handleChange(event){
        setInput(event.target.value);
    }

    function handleClick(){
        setCity(input);
        setIsClicked(true);
    }

    const getCords = useCallback(async () => {
        const response = await useAxios.get(`/geo/1.0/direct?`, {
            params: {q : city, appid: API_KEY}
        });

        setCords({
                lat: JSON.stringify(response.data[0].lat), 
                lon: JSON.stringify(response.data[0].lon), 
                clicked: true
        });

        setGoSearch({
            search: true
        })
        
    },[city, API_KEY, setCords, setGoSearch]);

    const getWeather = useCallback(async () => {
        const response = await useAxios.get(`data/2.5/weather`, {
            params: {q: city, lat: cords.lat, lon: cords.lon, units: units.units, appid: API_KEY}
        });
        setWeatherInfo({
            temp: Math.round(response.data.main.temp) + units.degrees,
            feels_like: Math.round(response.data.main.feels_like) + units.degrees,
            temp_min: Math.round(response.data.main.temp_min) + units.degrees,
            temp_max: Math.round(response.data.main.temp_max) + units.degrees,
            wind: Math.round(response.data.wind.speed) + units.speed,
            hum: response.data.main.humidity + "%",
            img: "https://openweathermap.org/img/wn/"+response.data.weather[0].icon+"@2x.png"
        });
    },[cords,setWeatherInfo, city, API_KEY, units.degrees, units.speed, units.units])


    useEffect(() => {
        if(city !== "" && isClicked){
            getCords();
        } 
    }, [city, isClicked, getCords, cords, setCords, setGoSearch, goSearch.search]);

    useEffect(() => {
        if(isClicked && cords.clicked){
            getWeather();
            setIsClicked(false);
        };
    },[cords, getWeather, isClicked, setCords]);

    return(
        <div className="search-section">
            <div className="wrapper">
                <input onChange={handleChange} value={input} className="search-bar" 
                placeholder="Enter your city" onKeyDown={e => e.key === "Enter" ? handleClick(): null}></input>
                <button onClick={handleClick} ><SearchIcon /></button>
            </div>
            {cords.clicked ? 
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