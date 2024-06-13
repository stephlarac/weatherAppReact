import {createContext} from "react";

export const forecastDefault = [
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
    }];

export const forecastContext = createContext(forecastDefault);