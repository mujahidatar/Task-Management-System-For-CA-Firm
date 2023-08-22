import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

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
    const navigate=useNavigate();
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
    var mybtn = "Create"
    if (location.state) {
        var temp = true;
        mybtn = "Update";
    }
    useEffect(() => {
        console.log("in the create login useeffect" + importemp.name + importemp.password);
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
                    alert(`Login ${mybtn}ed successfully`);
                      navigate("/admdash");
                }
            }).catch((error) => {
                alert(error.response.data);
                console.log(error);
            });
    }

    return (
        <div className="container mt-3 py-2" style={{"width":900,"border":"2px solid skyblue","backgroundColor":"#B3E0F5","padding":"0px 100px"}}>
            
            <form onSubmit={createlogindetails}>
                <div className="row mb-3">
                    <label className="col-sm-3 col-form-label fd-6" style={{"fontWeight":"bold"}} hidden>Employee Id</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" value={id || null} hidden />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="name" className="col-sm-3 col-form-label " style={{"fontWeight":"bold","fontSize":14}}>Employee Name</label>
                    <div className="col-sm-9">
                        <input type="text" className="form-control" id="name" value={name} required onChange={(e) => { setName(e.target.value) }} />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="email" className="col-sm-3 col-form-label" style={{"fontWeight":"bold","fontSize":14}}>Email Id</label>
                    <div className="col-sm-9">
                        <input type="email" className="form-control" id="email" value={emailid} disabled={temp} onChange={(e) => { setEmailid(e.target.value) }} required />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="number" className="col-sm-3 col-form-label" style={{"fontWeight":"bold","fontSize":14}}>Contact Number</label>
                    <div className="col-sm-9">
                        <input type="number" className="form-control" id="number" value={number} onChange={(e) => { setNumber(e.target.value) }} />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="address" className="col-sm-3 col-form-label" style={{"fontWeight":"bold","fontSize":14}}>Address</label>
                    <div className="col-sm-9">
                        <input type="text" className="form-control" id="address" value={address} onChange={(e) => { setAddress(e.target.value) }} />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="role" className="col-sm-3 col-form-label" style={{"fontWeight":"bold","fontSize":14}}>Select Role</label>
                    <div className="col-sm-9">
                        <select id="role" className="form-control" value={role} onChange={(e) => {
                            setRole(e.target.value);

                            (role === "MANAGER") ? setManagerid(0) : setManagerid(null)
                        }} required >
                            <option value="">Select a role</option>
                            <option value="MANAGER">MANAGER</option>
                            <option value="EMPLOYEE">EMPLOYEE</option>
                        </select>
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="managerid" className="col-sm-3 col-form-label" hidden={(role === "MANAGER")} style={{"fontWeight":"bold","fontSize":14}}>Manager Id</label>
                    <div className="col-sm-9">
                        <input type="text" className="form-control" id="managerid" hidden={(role === "MANAGER")} value={managerid} onChange={(e) => { setManagerid(e.target.value) }} />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="password" className="col-sm-3 col-form-label" style={{"fontWeight":"bold","fontSize":14}}>Password</label>
                    <div className="col-sm-9">
                        <input type="password" className="form-control" id="password" value={password} onChange={(e) => { setPassword(e.target.value) }} required />
                    </div>
                </div>
                <div className="row mb-3 pt-1">
                    <div className="col-sm-10" style={{"margin":"auto","width":360}}>
                        <input type="submit" className="form-control btn btn-info" value={mybtn} style={{"fontWeight":"bold"}}/>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default Createlogin;