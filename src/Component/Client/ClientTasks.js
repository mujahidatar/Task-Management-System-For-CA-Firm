import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Taskdetails from '../Taskdetails';

const ClientTasks = () => {
    const authuser = useSelector((state) => state.auth.user);
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        console.log("useefeect called");
        setTasks([]);
        myrender();

    }, [authuser]);

    const myrender = () => {
        axios.post(`http://localhost:8080/task/client/${authuser.id}`).then(
            (response) => {
                setTasks(response.data);
                console.log(response);
            }, (error) => {
                console.log(error);
            }
        )
    }
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    const openModal = (task) => {
        setSelectedTask(task);
        setModalOpen(true);
        
            <Taskdetails
                isOpen={openModal}
                toggle={closeModal}
                task={selectedTask}

            />
       
    }

    const closeModal = () => {
        setSelectedTask(null);
        setModalOpen(false);
    }
    return (
        <div className='container mt-3'>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Sr No</th>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col">Status</th>
                        <th scope="col">View Details</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tasks.map((task, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{task.title}</td>
                                <td>{task.desc}</td>
                                <td>{task.status}</td>

                                <td><button href="#" type='Submit' className="btn btn-secondary" onClick={() => {  }} >View Details</button>
                                </td>

                            </tr>
                        ))
                    }
                </tbody>
            </table>           
        </div>
    )
}
export default ClientTasks;