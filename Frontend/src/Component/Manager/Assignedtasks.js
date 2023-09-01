import React from 'react'
import axios from "axios"
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { logout } from '../../Services/Actions/Authenticationaction';
export const Assignedtasks = (props) => {
    const [assignedtasks, setAssignedtasks] = ([]);
    const navigate = useNavigate();
    var authuser = useSelector((state) => state.auth.user);
    var temp = 0;
    const dispatch = useDispatch();


    const getassignedtasks = () => {
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
        if (temp < 1) {
            checkToken();
            getassignedtasks();
            temp++
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
