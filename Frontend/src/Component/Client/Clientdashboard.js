import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';
import { login } from '../../Services/Actions/Authenticationaction';

const Clientdashboard = () => {
    var authuser = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    var flag = authuser?.flag;
    useEffect(() => {
        toastSuccess();
    }, []);

    const toastSuccess = () => {
        if (flag === 0) {
            authuser = {
                ...authuser,
                flag: 1
            }
            flag = 1;
            dispatch(login(authuser));
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
                                <Link className="nav-link text-white fs-5" to="/home">Dasbhboard</Link>
                            </li>
                            <li>
                                <Link className="nav-link text-white " to="/createtask">Create Task</Link>
                            </li>
                            <li>
                                <Link className="nav-link text-white " to="/profile">Profile</Link>
                            </li>                           
                            <li>
                                <Link className="nav-link text-white " to="/logout">Logout</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}
export default Clientdashboard;