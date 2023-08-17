import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Createclient = () => {
    const location = useLocation(); // Get the location object
    const [id, setId] = useState("0");
    const [name, setName] = useState("");
    const [emailid, setEmailid] = useState("");
    const [number, setNumber] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    var formdata = {
        clientId: id,
        clientName: name,
        clientEmail: emailid,
        clientContact: number,
        clientAddress: address,
        clientPassword: password
    }
    const importclient = location.state?.cliobj || formdata;
    useEffect(() => {
        console.log("in the create client useeffect" + importclient.clientName + importclient.clientPassword);
        setId(importclient.clientId);
        setName(importclient.clientName);
        setEmailid(importclient.clientEmail);
        setNumber(importclient.clientContact);
        setAddress(importclient.clientAddress);
        setPassword(importclient.clientPassword);
    }, []);

    const createlogindetails = async (event) => {
        event.preventDefault();
        formdata = {
            clientId: id,
            clientName: name,
            clientEmail: emailid,
            clientContact: number,
            clientAddress: address,
            clientPassword: password
        }

        await axios.post("http://localhost:8080/client", formdata).then(
            (response) => {
                if (response.request.status === 200) {
                    alert("Client created successfully");
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
                    <label htmlFor="name" className="col-sm-2 col-form-label" >Client Id :</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" value={id || null} id="name" disabled />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="name" className="col-sm-2 col-form-label">Name </label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="name" value={name} required onChange={(e) => { setName(e.target.value) }} />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="email" className="col-sm-2 col-form-label">Email Id </label>
                    <div className="col-sm-10">
                        <input type="email" className="form-control" id="email" value={emailid} onChange={(e) => { setEmailid(e.target.value) }} required />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="number" className="col-sm-2 col-form-label">Contact Number </label>
                    <div className="col-sm-10">
                        <input type="number" className="form-control" id="number" value={number} onChange={(e) => { setNumber(e.target.value) }} />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="address" className="col-sm-2 col-form-label">Address</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="address" value={address} onChange={(e) => { setAddress(e.target.value) }} />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
                    <div className="col-sm-10">
                        <input type="password" className="form-control" id="password" value={password} onChange={(e) => { setPassword(e.target.value) }} required />
                    </div>
                </div>
                <div className="row mb-3">
                    <label className="col-sm-2 col-form-label"></label>
                    <div className="col-sm-10">
                        <input type="submit" className="form-control" value="Create Client" />
                    </div>
                </div>
            </form>
        </div>
    )
}
export default Createclient;