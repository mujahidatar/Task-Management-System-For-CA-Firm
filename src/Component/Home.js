import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const Home = () => {
    const authuser = useSelector((state) => state.auth.user);
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    var temp = 0;

    useEffect(() => {
        console.log("useefeect called");
        if (authuser === null && temp < 1) {
            console.log("In the if condition  of home");
            toast.error("Login Please");
            navigate("/");
            temp++;
        } else if (authuser !== null) {
            console.log("in ")
            myrender();
        }
    }, []);



    const myrender = () => {
        var temprole = authuser?.role;
        temprole = temprole.toLowerCase();
        axios.post(`http://localhost:8080/task/${temprole}/${authuser.id}`).then(
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