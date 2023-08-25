import React, { useEffect } from 'react';
import "./TaskDetails.css";
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Chat from '../Chat';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../Services/Actions/Authenticationaction';

const TaskDetails = () => {
    const location = useLocation();
    var authuser = useSelector((state) => state.auth.user)
    const navigate = useNavigate();
    const importTask = location.state?.task;
    var dt = new Date(importTask.timeStamp);
    var dateOfCreation = `${dt?.getDate()}/${dt?.getMonth() + 1}/${dt?.getFullYear()}`;
    var temp = 0;
    const dispatch = useDispatch();

    useEffect(()=>{
        if(temp<1){
            checkToken();
            temp++;
        }
    },[]);

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
    
    const backTrack = () => {
        if (authuser.role === "ADMIN") {
            navigate("/admdash");
        } else {
            navigate("/home");
        }
    }

    const deleteTask = async () => {
      await  axios.delete(`http://localhost:8080/task/${importTask.taskId}`, {
            headers: {
               Authorization: `Bearer ${authuser.token}`
            }
        }).then(
            (response)=>{
                console.log(response.data);
            }
        )
    }
    return (
        <div className='container mt-5'>
            <div className="myrow">
                <div className="mycolumn col-sm-12 col-md-6 col-lg-4 d-flex flex-column" style={{ backgroundColor: '#f2f2f2' }}>
                    <h2 style={{ fontWeight: 800 }}> {importTask.title}</h2>
                    <p>Status : {importTask.status}</p>
                    <p>Description : {importTask.desc}</p>
                    <p hidden={authuser.role !== "ADMIN"}>Manager Id : {importTask.managerId}</p>
                    <p hidden={authuser.role === "CLIENT" || authuser.role === "EMPLOYEE"}>Employee Id : {importTask.employeeId}</p>

                     <p>Date of creation : {dateOfCreation}</p>                    

                    <div className="row mb-3 mt-auto" >
                        <div className="col-sm-6 d-flex justify-content-start " >
                            <input type="submit" className="btn btn-info" onClick={backTrack} value="Back" />
                        </div>
                        <div className="col-sm-6 d-flex justify-content-start " >
                            <input type="submit" className="btn btn-danger" onClick={deleteTask} value="Delete Task" hidden={authuser.role !== "MANAGER" || importTask.status !== "COMPLETED"} />
                        </div>
                    </div>
                </div >
                <div hidden={authuser.role === "ADMIN"} className="mycolumn row col-xl-2 col-sm-12 col-md-6 col-lg-4" style={{ backgroundColor: "#e0e0e0" }}>
                    <Chat taskId={importTask.taskId} />
                </div>
            </div>


        </div>
    )
}
export default TaskDetails;