import React from 'react'
import axios from "axios"
import { useState, useEffect } from 'react';
const Newtasks = (props) => {
    const [newtasks, setNewtasks] = useState([]);
    const getnewtasks = () => {
        axios.get(`localhost:8080/api/employees/`).then(
            (Response) => {
                setNewtasks(Response.data)
            },
            (error) => {
                console.error(error);
            }
        );
    }

    useEffect(() => {
        getnewtasks();
    }, []);

    return (
        <div>
            <div class="accordion accordion-flush" id="accordionFlushExample">
                {   newtasks.map((task) => (
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                {task.head}
                            </button>
                        </h2>
                        <div id="flush-collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div class="accordion-body">{task.information}</div>
                        </div>
                    </div>

                ) )
                }

            </div>
        </div>
    )
}
export default Newtasks;