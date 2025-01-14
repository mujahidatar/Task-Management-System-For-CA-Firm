import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { login } from '../../Services/Actions/Authenticationaction';

const Admindashboard = () => {
    var user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    var flag = user?.flag;
    useEffect(() => {
            toastSuccess();
    }, []);

    const toastSuccess = () => {
        if (flag === 0) {
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
            <nav className="navbar navbar-expand-lg navbar-dark bg-info text-white">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav d-flex align-items-center fs-6">
                            <li>
                                <Link className="nav-link text-white fs-5" to="/admdash">Dasbhboard</Link>
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
                                <Link className="nav-link text-white" to="/profile">Profile</Link>
                            </li>
                            <li>
                                <Link className="nav-link text-white" to="/logout">Logout</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div >
    )
}
export default Admindashboard;