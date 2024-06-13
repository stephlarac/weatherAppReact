import React, { useState, useEffect } from "react";


function Header(){

    const [time, setTime] = useState(new Date());

    const hour = time.toLocaleString('en-US', { hour: '2-digit', minute: 'numeric', hour12: true });
    const hours = time.getHours();
    const date = time.toLocaleString('en-US', { dateStyle: "full" });
    const dayTime =  hours < 12 ? "morning" : hours > 18 ? "evening" : "afternoon";  

    useEffect(() => {
        const interval = setInterval(() => {
          setTime(new Date());
        }, 1000);
    
        return () => clearInterval(interval);
      }, []);

    return(
        <div>
            <h1>{hour}</h1>
            <h3>{date} </h3>
            <h2>Good {dayTime}!</h2>
        </div>
    )
}

export default Header;