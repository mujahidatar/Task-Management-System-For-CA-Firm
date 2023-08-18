import React from 'react';
import { Link } from 'react-router-dom';
const Admindashboard = () => {
    return (
        <div>
            <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-info text-white">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav d-flex align-items-center fs-5">
                            <li>
                                <Link className="nav-link text-white fs-3" to="/admdashbord">Dasbhboard</Link>
                            </li>
                            <li>
                                <Link className="nav-link text-white" to="/logincreation">Create Login</Link>
                            </li>
                            <li>
                                <Link className="nav-link text-white" to="/getallemployees">Employees</Link>
                            </li>
                            <li>
                                <Link className="nav-link text-white" to="/getallclients">Clients</Link>
                            </li>
                            <li>
                                <Link className="nav-link text-white" to="/logout">Logout</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}
export default Admindashboard;