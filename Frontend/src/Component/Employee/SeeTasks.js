import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../Services/Actions/Authenticationaction';
const SeeTasks = () => {
    const [temp, setTemp] = useState(0);
    const [emp, SetEmp] = useState([]);
    const [tasks, setTasks] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    var importState = location.state;
    var authuser = useSelector((state) => state.auth.user);
    var tempVar = 0;
    const dispatch = useDispatch();

    useEffect(() => {
        if (tempVar < 1) {
            checkToken();
            getTasks();
            getEmp();
            console.log(importState);
            tempVar++;
        }
    }, [authuser, importState, temp]);

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

    var getTasks = async () => {
        var temprole = authuser?.role;
        temprole = temprole.toLowerCase();

        if (importState === "NEW")
        {
            await axios.get(`http://localhost:8080/task`, {
                headers: {
                    'Authorization': `Bearer ${authuser?.token}`
                }
            }).then(
                (response) => {
                  var allTasks= response.data.filter(tasks=> tasks.status === "NEW");
                  setTasks(allTasks);
                }, (error) => {
                    console.log(error);
                });
        }else {
            await axios.post(`http://localhost:8080/task/${temprole}/${authuser.id}/${importState}`, null, {
                headers: {
                    'Authorization': `Bearer ${authuser?.token}`
                }
            }).then(
                (response) => {
                    setTasks(response.data);
                    console.log(response.data);
                }, (error) => {
                    console.log(error);
                });
        }
    }

    const changeState = async (tk, st) => {
        tk = {
            ...tk,
            status: st
        }
        await axios.post("http://localhost:8080/task", tk, {
            headers: {
                'Authorization': `Bearer ${authuser?.token}`
            }
        }).then(
            (response) => {
                setTemp(1);
            }, (error) => {
                console.log(error);
            });
    }

    const getEmp = async () => {
        await axios.post(`http://localhost:8080/employee/manager/${authuser.id}`, null, {
            headers: {
                'Authorization': `Bearer ${authuser?.token}`
            }
        }).then(
            (response) => {
                SetEmp(response.data);
            }, (error) => {
                console.log(error);
            });
    }

    const assignTask = async (tk, empId) => {
        tk = {
            ...tk,
            employeeId: empId,
            managerId: authuser.id,
            status: "INPROCESS"
        }
        await axios.post("http://localhost:8080/task", tk, {
            headers: {
                'Authorization': `Bearer ${authuser?.token}`
            }
        }).then(
            (response) => {
                setTemp(2);
            }, (error) => {
                console.log(error);
            });
    }
    const getTaskDetails = (task) => {
        navigate(`/taskdetails`, { state: { task } });
    }
    return (
        <div className='container mt-3'>
            <table className="table table-striped table-bordered table-hover" style={{ "border": "2px solid skyblue", "backgroundColor": "#C9E5FF" }}>
                <thead>
                    <tr>
                        <th scope="col">Task Id</th>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col">Status</th>
                        <th scope="col" className='text-center'>See Details</th>
                        <th className='text-center' hidden={!(authuser.role === "EMPLOYEE" && (importState === "INPROCESS" || importState === "AUI")) && !(authuser.role === "MANAGER" && importState === "REVIEW")}>
                            Update Status</th>
                        <th className='text-center' scope="col" hidden={importState !== "NEW" || authuser.role !== "MANAGER"}>Assign Task</th>
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
                                <td className='text-center' hidden={!(authuser.role === "EMPLOYEE" && (importState === "INPROCESS" || importState === "AUI")) && !(authuser.role === "MANAGER" && importState === "REVIEW")}>
                                    <button type="button" className="btn btn-info" style={{ marginRight: "15px" }} onClick={() => changeState(tk, "REVIEW")} hidden={authuser.role !== "EMPLOYEE" || importState === "REVIEW" || importState === "AUI"} >Mark Review</button>
                                    <button type="button" className="btn btn-info" style={{ marginRight: "15px" }} onClick={() => changeState(tk, "AUI")} hidden={authuser.role !== "EMPLOYEE" || importState === "REVIEW"  || importState === "AUI" } >AUI</button>
                                    <button type="button" className="btn btn-info" style={{ marginRight: "15px" }} onClick={() => changeState(tk, "INPROCESS")}  hidden={!(authuser.role === "EMPLOYEE" && importState === "AUI") && !(authuser.role === "MANAGER" && importState === "REVIEW")} >Inprocess</button>
                                    <button type="button" className="btn btn-info" style={{ marginRight: "15px" }} onClick={() => changeState(tk, "COMPLETED")} hidden={authuser.role !== "MANAGER" || importState === "AUI"} >Completed</button>
                                </td>
                                <td className='text-center' hidden={importState !== "NEW" || authuser.role !== "MANAGER"}>
                                    <div className="btn-group">
                                        <button type="button" className="btn btn-info dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                            Assign
                                        </button>
                                        <ul className="dropdown-menu">
                                            {
                                                emp.map((empobj, index) => (
                                                    <li key={index}>
                                                        <button className="dropdown-item btn btn-primary" href="#" onClick={() => assignTask(tk, empobj.empId)} >{empobj.empName}</button>
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