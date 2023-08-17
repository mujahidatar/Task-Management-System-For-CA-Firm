import React, { useState } from 'react'
import axios from 'axios';
const Createtask = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState(null);
    const [status, setStatus] = useState("NEW");


    const submittask = async (event) => {
        // alert("task caled")
        event.preventDefault();
        const task = {
            title: title,
            desc: description,
            file: file,
            status: status
        }
        await axios.post("http://localhost:8080/task", task).then((response) => {
            if (response.data != null) {
                alert("Task is Created Successfully ");
            }
            else {
                alert("Error Occurred");
            }
        })
    }
    return (
        <div className='container mt-3'>
            <form onSubmit={submittask} >
                <div className="row mb-3">
                    <label for="title" className="col-sm-2 col-form-label ">Enter Task Title</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control form-control-sm" id="title" placeholder="Enter Task Title" onChange={(e) => { setTitle(e.target.value) }} />
                    </div>
                </div>

                <div className="row mb-3">
                    <label for="description" className="col-sm-2 col-form-label ">Description :</label>
                    <div className="col-sm-10">
                        <textarea type="text" className="form-control form-control-sm" id="description" onChange={(e) => { setDescription(e.target.value) }} />
                    </div>
                </div>
                <div className="mb-3">
                    <label for="files" className="col-sm-2 col-form-label ">Attach Files here</label>
                    <input className="form-control form-control-sm" type="file" id="files" multiple onChange={(e) => { setFile(e.target.value) }} />
                </div>
                <div className="mb-3">
                    <button type="submit" className="btn btn-light" >Submit Task</button>
                </div>
            </form>
        </div>
    )
}
export default Createtask;


