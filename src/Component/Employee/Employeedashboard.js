import React from 'react'
import { Link, } from 'react-router-dom';

const Employeedashboard = () => {
    return (
        <div>
            <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li>
                                <Link className="nav-link" to="/dashbord">Dasbhboard</Link>
                            </li>
                            <li>                               
                                <Link className="nav-link"  to="/seetasks" state="INPROCESS"  >Inprocess </Link>

                            </li>
                            <li>                               
                                <Link className="nav-link"  to="/seetasks" state="AUI" >AUI</Link>                         

                            </li>
                            <li>                               
                                <Link className="nav-link"  to="/seetasks" state="REVIEW" >Review</Link>

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
export default Employeedashboard