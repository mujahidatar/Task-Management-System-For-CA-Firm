import React from 'react'
import axios from "axios"
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
export const Assignedtasks = (props) => {
    const [assignedtasks, setAssignedtasks] = ([]);
    const authuser = useSelector((state) => state.auth.user);
    getassignedtasks = () => {
        axios.get(`http//localhost:8080/tasks`, null, {
            headers: {
                'Authorization': `Bearer ${authuser.token}`
            }
        }).then(
            (Response) => {
                setAssignedtasks(Response.data);
            }
        )
    }

    useEffect(() => {
        getassignedtasks();
    })
    return (
        <div>
            <table className="table table-striped table-bordered table-hover" style={{ "border": "2px solid skyblue", "backgroundColor": "#C9E5FF" }}>
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Handle</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        assignedtasks.map((task, index) => (
                            <tr key={index}>
                                <th scope="row">1</th>
                                <td>{task.id}</td>
                                <td>{task.title}</td>
                                <td><a href={<Task />} className="btn btn-primary">See Details</a></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
