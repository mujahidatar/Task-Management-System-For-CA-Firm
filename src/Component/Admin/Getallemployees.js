import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';

export const Getallemployees = () => {
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();
    const empRef = useRef([]);
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
            await axios.delete(`http://localhost:8080/employee/${emp.empId}`).then(
                (response) => {
                    if (response.data === "Document Deleted") {
                        toast.success("Employee Deleted ");
                        empRef.current.push(employees.filter(em=>em.empId!==emp.empId));
                        setEmployees(...empRef.current)
                        empRef.current.pop();
                    } else {
                        toast.error(response.data);
                    }
                })
    }

    return (
        <div className="container mt-3">
            <h2 className='text-center'>Employees</h2>
            <table className="table table-striped table-bordered table-hover" style={{"border":"2px solid skyblue","backgroundColor":"#C9E5FF"}}>
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Contact</th>
                        <th scope="col">Email</th>
                        <th scope="col">Address</th>
                        <th scope="col">Role</th>
                        <th scope="col">Managerid</th>
                        <th scope="col" className='text-center'>Update</th>
                        <th scope="col"className='text-center'>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employees.map((emp,index) => (
                            emp.empRole !== "ADMIN" &&
                            <tr key={index}>
                                <th scope="row">{emp.empId}</th>
                                <td>{emp.empName}</td>
                                <td>{emp.empContact}</td>
                                <td>{emp.empEmail}</td>
                                <td>{emp.empAddress}</td>
                                <td>{emp.empRole}</td>
                                <td>{emp.managerId}</td>
                                <td className='text-center'><a className="btn btn-info" onClick={() => handleClick(emp)}>Update</a></td>
                                <td className='text-center'><a className="btn btn-info" onClick={() => handledeleteClick(emp)}>Delete</a></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
export default Getallemployees;