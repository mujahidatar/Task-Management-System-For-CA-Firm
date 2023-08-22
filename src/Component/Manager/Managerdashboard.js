import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../Services/Actions/Authenticationaction';

const Managerdashboard = () => {

    var user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();   
    var flag = user?.flag;
    useEffect(() => {
        toastSuccess();
    }, []);

    const toastSuccess = () => {
        if (flag !== null && flag === 0) {
            user = {
                ...user,
                flag: 1
            }
            flag = 1;
            dispatch(login(user));
            toast.success("Login Successfull !");
        }
    }
    return (
        <div>
            <ToastContainer />
            <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-info text-white">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav d-flex align-items-center fs-6">
                            <li>
                                <Link className="nav-link  text-white" to="/home">Dasbhboard</Link>
                            </li>
                            <li>
                                <Link className="nav-link  text-white" to="/seetasks" state="NEW"  >New</Link>

                            </li>
                            <li>
                                <Link className="nav-link  text-white" to="/seetasks" state="INPROCESS" >Inprocess</Link>

                            </li>
                            <li>
                                <Link className="nav-link  text-white" to="/seetasks" state="AUI" >AUI </Link>

                            </li>
                            <li>
                                <Link className="nav-link  text-white" to="/seetasks" state="REVIEW" >Review</Link>

                            </li>
                            <li>
                                <Link className="nav-link text-white" to="/profile">Profile</Link>
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
export default Managerdashboard