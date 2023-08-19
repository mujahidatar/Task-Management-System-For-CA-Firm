import React from 'react'
import { Link } from 'react-router-dom';

const Clientdashboard = () => {
    return (
        <div>
            <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li>
                                <Link className="nav-link" to="/home">Dasbhboard</Link>
                            </li>
                            <li>
                                <Link className="nav-link " to="/createtask">Create Task</Link>
                            </li>                           
                            <li>
                                <Link className="nav-link " to="/logout">Logout</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}
export default Clientdashboard;