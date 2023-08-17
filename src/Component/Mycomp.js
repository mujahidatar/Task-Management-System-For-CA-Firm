import React, { useState, useEffect } from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Home from './Home'
import Mylogin from './Mylogin'
import Mylogout from './Mylogout'
import Createtask from './Client/Createtask'
import Previoustasks from './Client/Previoustasks'
import Createlogin from './Admin/Createlogin'
import Mytasks from './Employee/Mytasks'
import Managerdashboard from './Manager/Managerdashboard';
import Admindashboard from './Admin/Admindashboard';
import Employeedashboard from './Employee/Employeedashboard';
import Clientdashboard from './Client/Clientdashboard';
import { useSelector } from "react-redux";
import Getallemployees from './Admin/Getallemployees'
import { Logincreation } from './Admin/Logincreation'
import Getallclients from './Admin/Getallclients'
import Createclient from './Admin/Createclient'



export const Mycomp = () => {
    const [user, setUser] = useState({ username: "null", role: "null" });
    const authuser = useSelector((state) => state.auth.user);
    useEffect(() => {
        console.log("useefeect called");
        setUser(authuser);
       // console.log("in home " + user.role);
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

               <Routes>
               <Route path="/" element={<Mylogin />}></Route>
               <Route path="/home" element={<Home />}></Route>               
               <Route path="logout" element={<Mylogout />}></Route>
               <Route path="logincreation" element={<Logincreation />}></Route>
               <Route path="getallclients" element={<Getallclients />}></Route>
               <Route path="createclient" element={<Createclient />}></Route>
               <Route path="createlogin/:cliobj" element={<Createclient />}></Route>
               <Route path="createtask" element={<Createtask />}></Route> 
               <Route path="previoustasks" element={<Previoustasks />}></Route>
               <Route path="mytasks" element={<Mytasks />}></Route>
               <Route path="getallemployees" element={<Getallemployees  />}></Route>
               <Route path="about" element={<Home />}></Route>
               
              
               <Route path="createlogin" element={<Createlogin />}></Route>
               <Route path="createlogin/:emp" element={<Createlogin />}></Route>                
               <Route path="mytasks" element={<Mytasks />}></Route>
               </Routes>          
            </BrowserRouter>
        </div>
    )
}
