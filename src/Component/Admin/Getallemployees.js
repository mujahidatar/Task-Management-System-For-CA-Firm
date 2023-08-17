import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export const Getallemployees = () => {
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get("http://localhost:8080/employee").then((response) => {
            setEmployees(response.data);
        }, (error) => {
            console.log(error)
        });

    }, []);

    const handleClick = (emp) => {
        navigate(`/createlogin`, { state: { emp } });
    }
    const handledeleteClick = async (emp) => {
        const confirmDelete = window.confirm(`Are you sure to delete this employee with Id : ${emp.empId}`);
        if (confirmDelete) {
            await axios.delete(`http://localhost:8080/employee/${emp.empId}`).then(
                (response) => {
                    if (response.data === "Document Deleted") {
                        alert("Employee Deleted ");
                    } else {
                        alert(response.data);
                    }
                })
        }
    }

    return (
        <div className="container mt-3">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Contact</th>
                        <th scope="col">Email</th>
                        <th scope="col">Address</th>
                        <th scope="col">Role</th>
                        <th scope="col">Managerid</th>
                        <th scope="col">Update</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employees.map((emp) => (
                            <tr>
                                <th scope="row">{emp.empId}</th>
                                <td>{emp.empName}</td>
                                <td>{emp.empContact}</td>
                                <td>{emp.empEmail}</td>
                                <td>{emp.empAddress}</td>
                                <td>{emp.empRole}</td>
                                <td>{emp.managerId}</td>
                                <td><a className="btn btn-primary" onClick={() => handleClick(emp)}>Update</a></td>
                                <td><a href="" className="btn btn-primary" onClick={() => handledeleteClick(emp)}>Delete</a></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
export default Getallemployees;