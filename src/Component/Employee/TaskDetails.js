import React from 'react';
import "./TaskDetails.css"
import { useLocation, useNavigate } from 'react-router-dom';
import Chat from '../Chat';
import { useSelector } from 'react-redux';

const TaskDetails = () => {
    const location = useLocation();
    const importTask = location.state?.task;
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
                <div className="mycolumn" style={{ backgroundColor: '#f2f2f2' }}>
                    <h2 style={{ fontWeight: 800 }}> {importTask.title}</h2>
                    <p>Status : {importTask.status}</p>
                    <p>Description : {importTask.desc}</p>
                    <p hidden={user.role !== "ADMIN"}>Manager Id : {importTask.managerId}</p>
                    <p hidden={user.role === "CLIENT" || user.role === "EMPLOYEE"}>Employee Id : {importTask.empId}</p>

                </div >
                <div hidden={user.role === "ADMIN"} className="mycolumn" style={{ backgroundColor: "#e0e0e0" }}>
                    <Chat taskId={importTask.taskId} />
                </div>
            </div>
            <div className="row mb-3 justify-content-center" style={{ alignItems: "center" }}>
                <div className="col-sm-10">
                    <input type="submit" className="btn btn-info" onClick={backTrack} value="Back" />
                </div>
            </div>

        </div>
    )
}
export default TaskDetails;