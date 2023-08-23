import React, { useEffect } from 'react';
import "./TaskDetails.css"
import { useLocation, useNavigate } from 'react-router-dom';
import Chat from '../Chat';
import { useSelector } from 'react-redux';

const TaskDetails = () => {
    const location = useLocation();
    const importTask = location.state?.task;
    console.log("in the taskdetails" + location.state?.task.timeStamp);
    var dt;
    useEffect(() => {
        dt = new Date(importTask.timeStamp);

        var dateOfCreation = `${dt?.getDate()}/${dt?.getMonth() + 1}/${dt?.getFullYear()}`;
        console.log("timestamp is changed to" + importTask.timeStamp + "  " + dateOfCreation)
    })

    // var dateOfCreation = `${dt.getDate()}/${dt.getMonth() + 1}/${dt.getFullYear()}`;
    console.log("timestamp is changed to" + importTask.timeStamp + "  ")
    const user = useSelector((state) => state.auth.user)
    const navigate = useNavigate();
    const backTrack = () => {
        if (user.role === "ADMIN") {
            navigate("/admdash");
        } else {
            navigate("/home");
        }
    }

    return (
        <div className='container mt-5'>
            <div className="myrow">
                <div className="mycolumn col-sm-12 col-md-6 col-lg-4 d-flex flex-column" style={{ backgroundColor: '#f2f2f2' }}>
                    <h2 style={{ fontWeight: 800 }}> {importTask.title}</h2>
                    <p>Status : {importTask.status}</p>
                    <p>Description : {importTask.desc}</p>
                    <p hidden={user.role !== "ADMIN"}>Manager Id : {importTask.managerId}</p>
                    <p hidden={user.role === "CLIENT" || user.role === "EMPLOYEE"}>Employee Id : {importTask.empId}</p>

                    {
                        dt = new Date(importTask.timeStamp) && <p>Date of creation : {dt?.getDate() / dt?.getMonth() / dt?.getFullYear()}</p>
                    }

                    <div className="row mb-3 mt-auto" >
                        <div className="col-sm-10">
                            <input type="submit" className="btn btn-info" onClick={backTrack} value="Back" />
                        </div>
                    </div>
                </div >
                <div hidden={user.role === "ADMIN"} className="mycolumn row col-xl-2 col-sm-12 col-md-6 col-lg-4" style={{ backgroundColor: "#e0e0e0" }}>
                    <Chat taskId={importTask.taskId} />
                </div>
            </div>


        </div>
    )
}
export default TaskDetails;