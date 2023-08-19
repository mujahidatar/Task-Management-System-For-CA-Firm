import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const SeeTasks = () => {
   // const [user, setUser] = useState({ username: "", role: "", id: "" });
    const [temp, setTemp] = useState(0);
    const [emp, SetEmp] = useState([]);
    const authuser = useSelector((state) => state.auth.user);
    const [tasks, setTasks] = useState([]);
    const location = useLocation();
    var importState = location.state;
    useEffect(() => {
       // setUser(authuser);
        getTasks();
        getEmp();
        console.log(importState);
    }, [authuser, importState, temp]);

    var getTasks = async () => {
        console.log("in the new task state" + importState);
        var temprole = authuser.role;
        temprole = temprole.toLowerCase();
        await axios.post(`http://localhost:8080/task/${temprole}/${authuser.id}/${importState}`).then(
            (response) => {
                setTasks(response.data);
                console.log(response);
                console.log("tasks are :" + tasks);
            }, (error) => {
                console.log(error);
            });
    }

    const changeState = async (tk,st) => {
        tk = {
            ...tk,
            status: st
        }
        await axios.post("http://localhost:8080/task", tk).then(
            (response) => {
                console.log(response.data)
                setTemp(1);
            }, (error) => {
                console.log(error);
            });
    }   

    const getEmp = async () => {

        await axios.post(`http://localhost:8080/employee/manager/${authuser.id}`).then(
            (response) => {
                console.log(response.data);
                SetEmp(response.data);
            }, (error) => {
                console.log(error);
            });
    }

    const assignTask = async (tk, empId) => {
        console.log("Assigned task called" + empId);
        tk = {
            ...tk,
            employeeId: empId,
            managerId: authuser.id,
            status: "INPROCESS"
        }
        await axios.post("http://localhost:8080/task", tk).then(
            (response) => {
                console.log("task assigned to employee" + response);
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
                        <th hidden={!(authuser.role === "EMPLOYEE" && importState === "INPROCESS") && !(authuser.role === "MANAGER" && importState === "REVIEW" )}>
                            Update Status</th>
                        <th scope="col" hidden={importState !== "NEW" || authuser.role !== "MANAGER"}>Assign Task</th>
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

                                <td hidden={!(authuser.role === "EMPLOYEE" && importState === "INPROCESS") && !(authuser.role === "MANAGER" && importState === "REVIEW" )}>
                                    <button type="button" class="btn btn-light" onClick={() => changeState(tk,"REVIEW")} hidden={authuser.role !== "EMPLOYEE" || importState === "REVIEW"} >Mark Review</button>
                                    <button type="button" class="btn btn-light" onClick={() => changeState(tk,"AUI")} hidden={authuser.role !== "EMPLOYEE" || importState === "REVIEW"} >AUI</button>
                                    <button type="button" class="btn btn-light" onClick={() => changeState(tk,"INPROCESS")} hidden={authuser.role !== "MANAGER" || !(importState === "REVIEW") } >Inprocess</button>
                                    <button type="button" class="btn btn-light" onClick={() => changeState(tk,"COMPLETED")} hidden={authuser.role !== "MANAGER" || importState === "AUI"} >Completed</button>
                              
                                </td>


                                <td hidden={importState !== "NEW" || authuser.role !== "MANAGER"}>
                                    <div class="btn-group">
                                        <button type="button" class="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                            Assign
                                        </button>
                                        <ul class="dropdown-menu">
                                            {
                                                emp.map((empobj, index) => (
                                                    <li key={index}>
                                                        <button class="dropdown-item btn btn-primary" href="#" onClick={() => assignTask(tk, empobj.empId)} >{empobj.empEmail}</button>
                                                    </li>
                                                ))
                                            }


                                        </ul>
                                    </div>
                                </td>

                            </tr>
                        ))
                    }

                </tbody>
            </table>
        </div>
    )
}
export default SeeTasks;