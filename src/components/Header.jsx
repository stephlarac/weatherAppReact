import React from "react";


function Header(){
    const hour = new Date().toLocaleString('en-US', { hour: '2-digit', minute: 'numeric', hour12: true });
    const hours = new Date().getHours();
    const date = new Date().toLocaleString('en-US', { dateStyle: "full" });
    const dayTime =  hours < 12 ? "morning" : hours > 18 ? "evening" : "afternoon";  
    return(
        <div>
            <h1>{hour}</h1>
            <h3>{date} </h3>
            <h2>Good {dayTime}!</h2>
        </div>
    )
}

export default Header;