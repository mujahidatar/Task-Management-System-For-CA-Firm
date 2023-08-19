import React from 'react'
import axios from "axios"
import { useState, useEffect } from 'react';
export const Assignedtasks = (props) => {
    const [assignedtasks, setAssignedtasks] = ([]);

    getassignedtasks = (props) => {
        axios.get(`http//localhost:8080/tasks`).then(
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
            <table className="table">
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
                        assignedtasks.map((task,index)=>(
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
