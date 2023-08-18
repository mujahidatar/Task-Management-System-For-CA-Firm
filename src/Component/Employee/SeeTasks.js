import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const SeeTasks = () => {
    const [user, setUser] = useState({ username: "", role: "", id: "" });
    const[temp,setTemp]=useState(0);
    const authuser = useSelector((state) => state.auth.user);
    const [tasks, setTasks] = useState([]);
    const location = useLocation();
    var importState = location.state;
    useEffect(() => {
        setUser(authuser);
        getTasks();
        console.log(importState);
    }, [authuser, importState,temp]);

    var getTasks = async () => {
        console.log("in the new task state" + importState)
        await axios.post(`http://localhost:8080/task/employee/${authuser.id}/${importState}`).then(
            (response) => {
                setTasks(response.data);
                console.log(response);
                console.log("tasks are :" + tasks);
            }, (error) => {
                console.log(error);
            });
    }

    const changeStReview = async (tk) => {
        tk = {
            ...tk,
            status: "REVIEW"
        }
        await axios.post("http://localhost:8080/task", tk).then(
            (response) => {
                console.log(response.data)
                setTemp(1);
            }, (error) => {
                console.log(error);
            });
    }
    const changeStAui = async (tk) => {
        tk = {
            ...tk,
            status: "AUI"
        }
        await axios.post("http://localhost:8080/task", tk).then(
            (response) => {
                console.log(response.data);
                setTemp(2);
            }, (error) => {
                console.log(error);
            });
    }
    return (
        <div className='container mt-3'>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Task Id</th>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col">Status</th>
                        <th scope="col">See Details</th>
                        <th scope="col" hidden={importState === "REVIEW"}>Update Status</th>
                        <th scope="col" hidden={importState !== "NEW" || authuser.role !== "EMPLOYEE"}>Assign Task</th>
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
                                <td><button type="button" class="btn btn-light" >Task Details</button></td>
                                <td><button type="button" class="btn btn-light" onClick={()=>changeStReview(tk)} hidden={authuser.role !== "EMPLOYEE" || importState === "REVIEW"} >Mark Review</button>
                                <button type="button" class="btn btn-light" onClick={()=>changeStAui(tk)} hidden={authuser.role !== "EMPLOYEE" || importState === "REVIEW"} >AUI</button></td>
                                <td hidden={importState !== "NEW" || authuser.role !== "EMPLOYEE"}></td>
                            </tr>
                        ))
                    }

                </tbody>
            </table>
        </div>
    )
}
export default SeeTasks;