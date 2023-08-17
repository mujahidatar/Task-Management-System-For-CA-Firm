import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Mytasks = () => {
    const [tasks, setTasks] = useState([]);

    function getTasks() {

        axios.get("http://localhost:8080/task").then((response) => {
            setTasks(response.data);
        }, (error) => {
            console.log(error)
        });
    }
    useEffect(() => {
        getTasks();
    }, []);

    return (
        <div>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Sr No</th>
                        <th scope="col">Task Id</th>
                        <th scope="col">Title</th>
                        <th scope="col">Status</th>
                        <th scope="col">See Details</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tasks.map((task, index) => {
                            <tr>
                                <th scope="row">{index}</th>
                                <td>{task.tsakId}</td>
                                <td>{task.title}</td>
                                <td>{task.status}</td>
                                <td><button type="button" class="btn btn-light" onClick={<></>}>Task Details</button></td>
                            </tr>
                        })
                    }

                </tbody>
            </table>
        </div>
    )
}
export default Mytasks;