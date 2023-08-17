import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Createlogin = () => {
    const location = useLocation(); // Get the location object
    const [id, setId] = useState("0");
    const [name, setName] = useState("");
    const [emailid, setEmailid] = useState("");
    const [number, setNumber] = useState("");
    const [address, setAddress] = useState("");
    const [role, setRole] = useState("");
    const [managerid, setManagerid] = useState("");
    const [password, setPassword] = useState("");
    var formdata = {
        empId: id,
        empName: name,
        empEmail: emailid,
        empContact: number,
        empAddress: address,
        empRole: role,
        managerId: managerid,
        empPassword: password
    }
    const importemp = location.state?.emp || formdata;
        
    useEffect(() => {
        console.log("in the create login useeffect"+importemp.name+importemp.password);
        setId(importemp.empId);
        setName(importemp.empName);
        setEmailid(importemp.empEmail);
        setNumber(importemp.empContact);
        setAddress(importemp.empAddress);
        setRole(importemp.empRole);
        setManagerid(importemp.managerId);
        setPassword(importemp.empPassword);
    }, [importemp]);
    const createlogindetails = async (event) => {
        event.preventDefault();
        formdata = {
            empId: id,
            empName: name,
            empEmail: emailid,
            empContact: number,
            empAddress: address,
            empRole: role,
            managerId: managerid,
            empPassword: password
        }

        await axios.post("http://localhost:8080/employee", formdata).then(
            (response) => {
                if (response.request.status === 200) {
                    alert("Login created successfully");
                } 
            }).catch((error) => {
                alert(error.response.data);
                console.log(error);
            });
    }

    return (
        <div className="container mt-3">
            
            <form onSubmit={createlogindetails}>
                <div className="row mb-3">
                    <label htmlFor="name" className="col-sm-2 col-form-label" >Emp Id :</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" value={id || null} id="name" disabled />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="name" className="col-sm-2 col-form-label">Enter Name :</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="name" value={name} required onChange={(e) => { setName(e.target.value) }} />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="email" className="col-sm-2 col-form-label">Email Id :</label>
                    <div className="col-sm-10">
                        <input type="email" className="form-control" id="email" value={emailid} onChange={(e) => { setEmailid(e.target.value) }} required />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="number" className="col-sm-2 col-form-label">Contact Number :</label>
                    <div className="col-sm-10">
                        <input type="number" className="form-control" id="number" value={number} onChange={(e) => { setNumber(e.target.value) }} />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="address" className="col-sm-2 col-form-label">Address</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="address"value={address} onChange={(e) => { setAddress(e.target.value) }} />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="role" className="col-sm-2 col-form-label">Select Role:</label>
                    <div className="col-sm-10">
                        <select id="role" className="form-control"  value={role} onChange={(e) => {
                            setRole(e.target.value);
                           
                            (role === "MANAGER") ? setManagerid(0) : setManagerid(null)
                        }} required >
                            <option value="">Select a role</option>
                            <option value="MANAGER">MANAGER</option>
                            <option value="EMPLOYEE">EMPLOYEE</option>
                            <option value="ADMIN">ADMIN</option>
                        </select>
                    </div>
                </div>

                {
                    (role === "MANAGER") ? <input type="text" className="form-control" id="managerid" value={managerid} hidden />
                        : <div className="row mb-3">
                            <div className="col-sm-10"><label htmlFor="managerid" className="col-sm-2 col-form-label">Manager Id</label>
                                <input type="text" className="form-control" id="managerid" value={managerid} onChange={(e) => { setManagerid(e.target.value) }} />
                            </div>
                        </div>
                }

                <div className="row mb-3">
                    <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
                    <div className="col-sm-10">
                        <input type="password" className="form-control" id="password" value={password} onChange={(e) => { setPassword(e.target.value) }} required />
                    </div>
                </div>
                <div className="row mb-3">
                    <label className="col-sm-2 col-form-label"></label>
                    <div className="col-sm-10">
                        <input type="submit" className="form-control" value="Create Login" />
                    </div>
                </div>
            </form>
        </div>
    )
}
export default Createlogin;