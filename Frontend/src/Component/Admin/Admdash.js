import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../Services/Actions/Authenticationaction';

export const Admdash = () => {
    const [tasks, setTask] = useState([]);
    const navigate = useNavigate();
    var authuser = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    var temp = 0;
    

    useEffect(() => {
        if (temp < 1) {
            checkToken();
            if (authuser !== null) {
                axios.get("http://localhost:8080/task", {
                    headers: {
                        'Authorization': `Bearer ${authuser.token}`
                    }
                }).then((response) => {
                    setTask(response.data);
                    // console.log(response)
                }, (error) => {
                    console.log(error)
                });
            }
            temp++;
        }
    }, []);

    const checkToken = async () => {
        await axios.get("http://localhost:8080/login/checkToken",{
            headers: {
                'Authorization': `Bearer ${authuser?.token}`
            }
        }).then((response) => {
            // console.log(response)
            // navigate(-1);
            return;
        } ).catch((error) => {
            console.log("in catch "+error.response?.data);
            const err = error.response?.data;
            dispatch(logout());
            // navigate("/",{state:{err}});
            
        });
    }
    
    const getTaskDetails = (task) => {
        navigate(`/taskdetails`, { state: { task } });
    }

    return (
        <div className="container mt-3" style={{ marginTop: 10 }}>
            <h2 className='text-center'>Tasks</h2>
            <table className="table table-striped table-bordered table-hover" style={{ "border": "2px solid skyblue", "backgroundColor": "#C9E5FF" }}>
                <thead>
                    <tr>
                        <th scope="col">Task Id</th>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col">Status</th>
                        <th scope="col" className='text-center'>View Details</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tasks.map((tk, index) => (
                            <tr key={index}>
                                <td>{tk.taskId}</td>
                                <td>{tk.title}</td>
                                <td>{tk.desc}</td>
                                <td>{tk.status}</td>
                                <td className='text-center'><button type="button" className="btn btn-info" onClick={() => getTaskDetails(tk)} >Task Details</button></td>
                            </tr>
                        ))
                    }

                </tbody>
            </table>
        </div>
    )
}
export default Admdash;