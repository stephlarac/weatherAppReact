import React, { useState } from "react";
import Header from "./Header";
import Search from "./Search";
import Dashboard from "./Dashboard";
import { cordsDefault, cordsContext } from "../context/cordsContext";
import { goSearchDefault, goSearchContext } from "../context/goSearchContext";

function App(){

    const [cords, setCords] = useState(cordsDefault);
    const value = {cords, setCords};
    
    const [goSearch, setGoSearch] = useState(goSearchDefault);
    const search = {goSearch, setGoSearch};

    return (
        <div className="content">
            <Header />
            <cordsContext.Provider value={value}>
                <goSearchContext.Provider value={search}>
                    <Dashboard />
                    <Search />
                </goSearchContext.Provider>
            </cordsContext.Provider>
            
        </div>
    )
}

export default App;