import {createContext} from "react";

export const goSearchDefault = { 
    search: false
};

export const goSearchContext = createContext(goSearchDefault);
