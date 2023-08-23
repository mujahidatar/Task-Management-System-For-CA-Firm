import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../Services/Actions/Authenticationaction';
import { useNavigate } from 'react-router-dom';
import logo from '../Component/multimedia/CA-Logo.png';
import { ToastContainer, toast } from 'react-toastify';
import jwtDecode from 'jwt-decode';

export default function Mylogin({ isError }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();
    var temp = 0;
    var token;
    useEffect(() => {
        if (isError && temp < 1) {
            toast.error("Login Please");
            temp++;
        }
    }, [])

    const checkuser = async (event) => {
        event.preventDefault();
        const myuser = {
            username: username,
            password: password
        }
        var myrole = "";
        var temp = "";
        await axios.post("http://localhost:8080/login/authenticate", myuser).then(
            async (response) => {
                token = response.data.token;
                const decodedToken = jwtDecode(token);
                console.log("decoded token" + decodedToken);
                if (response.data !== '') {
                    myrole = decodedToken.role;
                    if (myrole === "EMPLOYEE" || myrole === "MANAGER" || myrole === "ADMIN") {
                        temp = "employee";
                    } else {
                        temp = "client";
                    }
                    console.log("first request end");
                } else {
                    toast.error("Incorrect Username or Password!");
                }
            }
        ).then(async () => {
            if (temp === "employee" || temp === "client") {
                await axios.post(`http://localhost:8080/${temp}/mail/${username}`, null, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }).then(
                    (response) => {
                        console.log("request with header done" + response);
                        var tempid;
                        if (temp === "employee") {
                            tempid = response.data.empId;
                        } else if (temp === "client") {
                            tempid = response.data.clientId
                        }
                        console.log("adminid is" + tempid)
                        var user = {
                            username: username,
                            role: myrole,
                            id: tempid,
                            flag: 0,
                            token: token
                        }
                        dispatch(login(user));
                        if (user.role === "ADMIN") {
                            navigate("/admdash");
                        }
                        else {
                            navigate("/home");
                        }
                    }
                )
            }
        }).catch((errr) => {
            console.log(errr);
        })

    }

    return (
        <div className='container vh-100 d-flex align-items-center justify-content-center text-center'>
            <div style={{ "width": 600 }}>
                <img src={logo} alt="Firm Logo" style={{ width: '200px', height: '175px' }} />
                <h1 className='text-center text-info' style={{ "fontWeight": 'bold' }}>Welcome to<br /> <span style={{ "color": "red", "textShadow": "2px 2px 2px black" }}>`ClarityPoint Accountants`</span></h1>
                <form onSubmit={checkuser} >
                    <div className="row mb-3 mt-5 justify-content-center">
                        <label htmlFor="title" className="col-sm-2 col-form-label " style={{ "width": 150, "fontWeight": 'bold' }}>Enter Username</label>
                        <div className="col-sm-10" style={{ "width": 400 }}>
                            <input type="text" className="form-control form-control-sm" id="title" placeholder="Enter Username" onChange={(e) => { setUsername(e.target.value) }} />
                        </div>
                    </div>
                    <div className="row mb-3 justify-content-center">
                        <label htmlFor="password" className="col-sm-2 col-form-label " style={{ "width": 150, "fontWeight": 'bold' }}>Enter Password</label>
                        <div className="col-sm-10" style={{ "width": 400 }}>
                            <input type="text" className="form-control form-control-sm" id="password" placeholder="Enter Password" onChange={(e) => { setPassword(e.target.value) }} />
                        </div>
                    </div>
                    <div className="row mb-3 justify-content-center">
                        <div className="col-sm-10">
                            <input type="submit" className="btn btn-info" />
                        </div>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}
