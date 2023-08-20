import React, { useState, useEffect } from 'react'
import { BrowserRouter, Link, Route, Routes, redirect, useNavigate } from 'react-router-dom'
import Home from './Home'
import Mylogin from './Mylogin'
import Mylogout from './Mylogout'
import Createtask from './Client/Createtask'
import Createlogin from './Admin/Createlogin'
import Managerdashboard from './Manager/Managerdashboard';
import Admindashboard from './Admin/Admindashboard';
import Employeedashboard from './Employee/Employeedashboard';
import Clientdashboard from './Client/Clientdashboard';
import { useSelector } from "react-redux";
import Getallemployees from './Admin/Getallemployees'
import { Logincreation } from './Admin/Logincreation'
import Getallclients from './Admin/Getallclients'
import Createclient from './Admin/Createclient'
import SeeTasks from './Employee/SeeTasks'
import Admdash from './Admin/Admdash'
import TaskDetails from './Employee/TaskDetails';

export const Mycomp = () => {
    const [user, setUser] = useState({ username: "null", role: "null" });
    const authuser = useSelector((state) => state.auth.user);
    var temp = 0;
  //  history=useHistory();
  //  const navigate = useNavigate();
    useEffect(() => {
        setUser(authuser);
        console.log("useefeect called");
        if (user === null && temp === 0) {
            console.log("In the if condition ");
           // toast.error("Login Please");
            console.log("in the mycomp if condition true error")
           // navigate("/");
          // return <Redirect to="/" />;
           //history.push("/");
          // window.location.assign("/");
            temp++;
        } else if (user === null) {
            
        } else {
           
        }

    }, [authuser]);

    return (
        <div>
            <BrowserRouter >
                {
                    user && user.role === "ADMIN" && <Admindashboard />
                }
                {
                    user && user.role === "MANAGER" && <Managerdashboard />
                }
                {
                    user && user.role === "EMPLOYEE" && <Employeedashboard />
                }
                {
                    user && user.role === "CLIENT" && <Clientdashboard />
                }
                {

                  user ?        
                <Routes>
                    <Route path="" element={<Mylogin />}></Route>
                    <Route path="home" element={<Home />}></Route>
                    <Route path="logout" element={<Mylogout />}></Route>
                    <Route path="logincreation" element={<Logincreation />}></Route>
                    <Route path="getallclients" element={<Getallclients />}></Route>
                    <Route path="createclient" element={<Createclient />}></Route>
                    <Route path="createlogin/:cliobj" element={<Createclient />}></Route>
                    <Route path="createtask" element={<Createtask />}></Route>                   
                    <Route path="taskdetails" element={<TaskDetails />}></Route>
                    <Route path="admdash" element={<Admdash />}></Route>
                    <Route path="seetasks" element={<SeeTasks />}></Route>
                    <Route path="getallemployees" element={<Getallemployees />}></Route>
                    <Route path="about" element={<Home />}></Route>
                    <Route path="createlogin" element={<Createlogin />}></Route>
                    <Route path="createlogin/:emp" element={<Createlogin />}></Route>
                </Routes> 
                :
                <Mylogin />              
          }  
            </BrowserRouter>
        </div>
    )
}
