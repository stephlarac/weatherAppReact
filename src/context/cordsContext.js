import {createContext} from "react";

export const cordsDefault = {
    lat: "",
    lon: "",
    clicked: false
};

export const cordsContext = createContext(cordsDefault);

