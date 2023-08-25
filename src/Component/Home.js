import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../Services/Actions/Authenticationaction';

const Home = () => {
    var authuser = useSelector((state) => state.auth.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [tasks, setTasks] = useState([]);
    var temp = 0;
    
    useEffect(() => {
         if (temp<1) {
            checkToken();
            myrender();
            temp++;
        }
    }, []);

    const checkToken = async () => {
        await axios.get("http://localhost:8080/login/checkToken",{
            headers: {
                'Authorization': `Bearer ${authuser?.token}`
            }
        }).then((response) => {
            console.log(response)
            // navigate(-1);
            return;
        } ).catch((error) => {
            console.log("in catch "+error.response?.data);
            const err = error.response?.data;
            dispatch(logout());
            navigate("/",{state:{err}});
            
        });
    }

    const myrender = () => {
        var temprole = authuser?.role;
        temprole = temprole.toLowerCase();
        axios.post(`http://localhost:8080/task/${temprole}/${authuser.id}`, null, {
            headers: {
                'Authorization': `Bearer ${authuser.token}`
            }
        }).then(
            (response) => {
                setTasks(response.data);
                console.log(response);
            }, (error) => {
                console.log(error);
            }
        )
    }
    const getTaskDetails = (task) => {
        navigate(`/taskdetails`, { state: { task } });
    }
    return (
        <div className='container mt-3'>
            <table className="table table-striped table-bordered table-hover" style={{ "border": "2px solid skyblue", "backgroundColor": "#C9E5FF" }}>
                <thead>
                    <tr>
                        <th scope="col">Sr No</th>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col">Status</th>
                        <th className='text-center' scope="col">View Details</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tasks.map((task, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{task.title}</td>
                                <td>{task.desc}</td>
                                <td>{task.status}</td>
                                <td className='text-center'><button href="#" type='Submit' className="btn btn-info" onClick={() => { getTaskDetails(task) }} >View Details</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
export default Home;