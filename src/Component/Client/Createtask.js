import React, { useState } from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { ToastContainer,toast } from 'react-toastify';
const Createtask = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState(null);
  
    const authuser = useSelector((state) => state.auth.user);

    const submittask = async (event) => {
        console.log("submit task called")
        event.preventDefault();
        const task = {
            title: title,
            desc: description,
            file: file,
            status: "NEW",
            clientId: authuser.id
        }
        await axios.post("http://localhost:8080/task", task).then((response) => {
            console.log(response);
            if (response.data != null) {
               
                toast.success("Task is Created Successfully ");
            }
            else {
                toast.error("Error Occurred");
            }
        })
    }
    return (
        <div className='container mt-3'>
            <ToastContainer />
            <form onSubmit={submittask} >
                <div className="row mb-3">
                    <label for="title" className="col-sm-2 col-form-label ">Title</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control form-control-sm" id="title" placeholder="Enter Task Title" onChange={(e) => { setTitle(e.target.value) }} />
                    </div>
                </div>
                <div className="row mb-3">
                    <label for="description" className="col-sm-2 col-form-label ">Description </label>
                    <div className="col-sm-10">
                        <textarea type="text" className="form-control form-control-sm" id="description" onChange={(e) => { setDescription(e.target.value) }} />
                    </div>
                </div>
                <div className="row mb-3">
                    <label for="files" className="col-sm-2 col-form-label ">Attach Files here</label>
                    <div className="col-sm-10">
                        <input className="form-control form-control-sm" type="file" id="files" multiple onChange={(e) => { setFile(e.target.value) }} />
                    </div>
                </div>
                <div className="mb-3">
                    <button type="submit" className="btn btn-light" >Submit Task</button>
                </div>
            </form>
        </div>
    )
}
export default Createtask;


