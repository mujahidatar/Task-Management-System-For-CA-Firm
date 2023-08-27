import React, { useEffect, useState } from 'react';
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
    const [docName, setDocName] = useState();
    const [docData, setDocData] = useState();
    const dispatch = useDispatch();

    useEffect(() => {
        if (temp < 1) {
            checkToken();
            getDocument();
            temp++;
        }
    }, []);

    const checkToken = async () => {
        await axios.get("http://localhost:8080/login/checkToken", {
            headers: {
                'Authorization': `Bearer ${authuser?.token}`
            }
        }).then((response) => {
            console.log(response)
            // navigate(-1);
            return;
        }).catch((error) => {
            console.log("in catch " + error.response?.data);
            const err = error.response?.data;
            dispatch(logout());
            navigate("/", { state: { err } });

        });
    }

    const getDocument = async () => {
        await axios.post(`http://localhost:8080/document/download/${importTask.taskId}`, null, {
            headers: {
                'Authorization': `Bearer ${authuser?.token}`
            }
        }).then((response) => {
            setDocName(response.data?.fileName);
            setDocData(response.data);
            console.log(docName + " " + response.data.fileName);
        });
    }

    const handleDownload = () => {
        // console.log(docData.data);
        const base64Data = docData.data;
        const decodedData = atob(base64Data);

        const uint8Array = new Uint8Array(decodedData.length);
        for (let i = 0; i < decodedData.length; i++) {
            uint8Array[i] = decodedData.charCodeAt(i);
        }

        const blob = new Blob([uint8Array], { type: docData.fileType });

        // Create a blob URL for the downloaded file
        const url = URL.createObjectURL(blob);

        // Create a link element and trigger the download
        const link = document.createElement('a');
        link.href = url;
        link.download = docData.fileName; // Use the provided filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const backTrack = () => {
        if (authuser.role === "ADMIN") {
            navigate("/admdash");
        } else {
            navigate("/home");
        }
    }

    const deleteTask = async () => {
        await axios.delete(`http://localhost:8080/task/${importTask.taskId}`, {
            headers: {
                Authorization: `Bearer ${authuser.token}`
            }
        }).then(
            (response) => {
                console.log(response.data);
                navigate("/seetasks",{state:{status:"COMPLETED"}});
            }
        )
    }
    return (
        <div className='container mt-5'>
            <div className="myrow">
                <div className="mycolumn col-sm-12 col-md-6 col-lg-4 d-flex flex-column" style={{ backgroundColor: '#f2f2f2' }}>
                    <h2 style={{ fontWeight: 800 }}> {importTask.title}</h2>
                    <p>Description : {importTask.desc}</p>
                    <p>Status : {importTask.status}</p>
                    <p hidden={authuser.role !== "ADMIN"}>Manager Id : {importTask.managerId}</p>
                    <p hidden={authuser.role === "CLIENT" || authuser.role === "EMPLOYEE"}>Employee Id : {importTask.employeeId}</p>
                    <p>Date of creation : {dateOfCreation}</p>
                    <p>Document: <button className='btn custom-button' onClick={handleDownload} style={{ "color": "blue", "textDecoration": "underline" }}>{docName}</button></p>
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