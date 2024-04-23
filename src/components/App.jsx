import React, { useState } from "react";
import Header from "./Header";
import Search from "./Search";
import Dashboard from "./Dashboard";

function App(){

    const [cords, setCords] = useState({
        lat: "",
        lon: "", 
        clicked: false
    });

    const handleCords = (cordsFromDB) => {
        setCords(cordsFromDB);
    }

    
    return (
        <div className="content">
            <Header />
            <Dashboard cords={cords}  />
            <Search  sendCordsToApp={handleCords} />
        </div>
    )
}

export default App;