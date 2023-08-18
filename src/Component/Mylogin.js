import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../Services/Actions/Authenticationaction';
import { useNavigate } from 'react-router-dom';

export default function Mylogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const checkuser = async (event) => {
        event.preventDefault();
        const myuser = {
            username: username,
            password: password
        }
        var user = {
            id: "",
            username: "",
            role: "",
        };
        var myrole="";
        var temp = "";
        await axios.post("http://localhost:8080/login/authenticate", myuser).then(
            async (response) => {
                console.log(response);
                if (response.data !== '') {
                    myrole = response.data.role;
                    if (myrole === "EMPLOYEE" || myrole === "MANAGER" || myrole === "ADMIN" ) {
                        temp = "employee";
                    } else {
                        temp = "client";
                    }   
                    console.log("first request end");
                } else {
                    alert("Error from login");
                }
            }
        ).then(async () => {
            if (temp === "employee" || temp === "client") {
                await axios.post(`http://localhost:8080/${temp}/mail/${username}`).then(
                    (response) => {
                        console .log("user updating");
                        user = {                           
                            username: username,
                            role: myrole,
                            id: (response.data.empId !== null) ? response.data.empId : response.data.client,
                        }
                        dispatch(login(user));
                        navigate("/home");
                        alert("looged in successfully");
                    }
                )
            }
        }).catch((errr) => {
            console.log(errr);
        })

    }

    return (
        <div className='container mt-3'>
            <h1>Welcome to login page</h1>
            <form onSubmit={checkuser} >
                <div className="row mb-3">
                    <label for="title" className="col-sm-2 col-form-label ">Enter Username :</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control form-control-sm" id="title" placeholder="Enter Username" onChange={(e) => { setUsername(e.target.value) }} />
                    </div>
                </div>
                <div className="row mb-3">
                    <label for="password" className="col-sm-2 col-form-label ">Enter Password : </label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control form-control-sm" id="password" placeholder="Enter Password" onChange={(e) => { setPassword(e.target.value) }} />
                    </div>
                </div>
                <div className="row mb-3">
                    <label className="col-sm-2 col-form-label "></label>
                    <div className="col-sm-10">
                        <input type="submit" className="btn btn-light" />
                    </div>
                </div>
            </form>
        </div>
    )
}
