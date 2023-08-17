import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
export default function Navbar(props) {
    const [user, setUser] = useState({ username: "", role: "" });
    const authuser = useSelector((state) => state.auth.user);
    useEffect(() => {
        setUser(authuser);
    }, [authuser]);


    return (

        <div>
            <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li>
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            <li>
                                <Link className="nav-link" to="/abour">About</Link>
                            </li>
                            {
                                user && user.role == null ?
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/logout">Logout</Link>
                                    </li>
                                    : <li className="nav-item">
                                        <Link className="nav-link" to="/mylogin">Login</Link>
                                    </li>
                            }
                            {
                                user && user.role === "manager" &&
                                <Link className="nav-link" to="/newtasks">New Tasks</Link>

                            }
                            {
                                user && user.role === "employee" &&
                                <Link className="nav-link" to="/newtasks" >New Tasks</Link>
                            }
                            <li>
                                <Link className="nav-link" to="/createtask">Create Task</Link>
                            </li>
                            <li>
                                <Link className="nav-link" to="/createlogin">Create Login</Link>
                            </li>
                            <li>
                                <Link className="nav-link" to="/mytasks">See My Tasks</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}
