import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
const Home = () => {
    const [user, setUser] = useState({ username: "null", role: "null" });
    const authuser = useSelector((state) => state.auth.user);
    useEffect(() => {
        console.log("useefeect called");
        setUser(authuser);       
    }, [authuser]);


    return (
        <div>
           home page
        </div>
    )
}
export default Home;