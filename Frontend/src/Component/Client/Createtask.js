import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { logout } from '../../Services/Actions/Authenticationaction';
import { useNavigate } from 'react-router';
const Createtask = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState(null);
    var authuser = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    var temp = 0;

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

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const submittask = async (event) => {
        console.log("submit task called");
        event.preventDefault();
        const task = {
            title: title,
            desc: description,
            file: file,
            status: "NEW",
            clientId: authuser.id
        }
        if (title !== "" && description !== "") {
            createTask(task);
        }
        else {
            toast.error("Title and Description is required");
        }
    }


    const createTask = async (task) => {
        await axios.post("http://localhost:8080/task", task, {
            headers: {
                'Authorization': `Bearer ${authuser.token}`
            }
        }).then(async (response) => {
            if (file) {
                const taskId = response.data?.taskId;
                const formData = new FormData();
                formData.append('file', file);
                await axios.post(`http://localhost:8080/document/upload/${taskId}`, formData, {
                    headers: {
                        'Authorization': `Bearer ${authuser.token}`
                    }
                }).then((response) => {
                    console.log("done");
                    toast.success("Task is Created Successfully ");
                    clearAll();
                },
                    async (error) => {
                        clearAll();
                        await axios.delete(`http://localhost:8080/task/${taskId}`, {
                            headers: {
                                'Authorization': `Bearer ${authuser.token}`
                            }
                        })
                        console.log("File uploading fail");
                        toast.error("Max file size is 10Mb! Try Again");
                        console.log(error);

                    })
            }
            else { 
                toast.success("Task is Created Successfully "); 
                clearAll();
            }

        },
            (error) => {
                toast.error("Something Went Wrong! Try Again");
                clearAll();
            })
    }

    const clearAll = () => {
        setTitle("");
        setDescription("");
        setFile(Date.now());
    }

    return (
        <div className="container mt-3 py-2" style={{ "width": 900, "border": "2px solid skyblue", "backgroundColor": "#B3E0F5", "padding": "0px 100px" }}>
            <form onSubmit={submittask} >
                <div className="row mb-3">
                    <label for="title" className="col-sm-2 col-form-label " style={{ "fontWeight": "bold", "fontSize": 14 }}>Title</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control form-control-sm" value={title} id="title" placeholder="Enter Task Title" onChange={(e) => { setTitle(e.target.value) }} />
                    </div>
                </div>
                <div className="row mb-3">
                    <label for="description" className="col-sm-2 col-form-label " style={{ "fontWeight": "bold", "fontSize": 14 }}>Description </label>
                    <div className="col-sm-10">
                        <textarea type="text" className="form-control form-control-sm" value={description} id="description" onChange={(e) => { setDescription(e.target.value) }} />
                    </div>
                </div>
                <div className="row mb-3">
                    <label for="files" className="col-sm-2 col-form-label " style={{ "fontWeight": "bold", "fontSize": 14 }}>Attach Files</label>
                    <div className="col-sm-10">
                        <input className="form-control form-control-sm" type="file" accept="*" key={file} id="files" onChange={handleFileChange} />
                    </div>
                </div>
                <div className="row mb-3 pt-1">
                    <div className="col-sm-10" style={{ "margin": "auto", "width": 360 }}>
                        <input type="submit" className="form-control btn btn-info" value="Submit Task" style={{ "fontWeight": "bold" }} />
                    </div>
                </div>

            </form>
        </div>
    )
}
export default Createtask;


