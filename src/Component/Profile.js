import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Profile = () => {
    var authuser = useSelector((state) => state.auth.user);
    const [toggle, setToggle] = useState(true);
    var temp = authuser?.role;
    const [myuser, setMyuser] = useState();
    const [id, setId] = useState("0");
    const [name, setName] = useState("");
    const [emailid, setEmailid] = useState("");
    const [number, setNumber] = useState("");
    const [address, setAddress] = useState("");
    const [role, setRole] = useState("");
    const [managerid, setManagerid] = useState("");
    const [password, setPassword] = useState("");
    var newPassword;
    if (temp) {
        if (temp === "CLIENT") {
            temp = "client";
        }
        else {
            temp = "employee";
        }
    }
    var username = authuser?.username;
    const handleUpdate = async (e) => {       
            await axios.post(`http://localhost:8080/${temp}`, mydata, {
                headers: {
                    'Authorization': `Bearer ${authuser.token}`
                }
            }).then(
                (response) => {
                    toast.success("Updated Successfully");
                }, (error) => {
                    toast.error(error.response.data);
                }
            )
        } 
        if (temp === "employee") {
            var mydata = {
                empId: id,
                empName: name,
                empEmail: emailid,
                empContact: number,
                empAddress: address,
                empRole: role,
                managerId: managerid,
                empPassword: password
            }
        } else {
            mydata = {
                clientId: id,
                clientName: name,
                clientEmail: emailid,
                clientContact: number,
                clientAddress: address,
                clientPassword: password
            }
        }
    

    useEffect(() => {
        console.log("the toggle is " + toggle);
        if (temp === "employee" || temp === "client") {
            axios.post(`http://localhost:8080/${temp}/mail/${username}`, null, {
                headers: {
                    'Authorization': `Bearer ${authuser.token}`
                }
            }).then(
                (response) => {
                    setMyuser(response.data);
                    if (temp === "employee") {
                        setNumber(response.data.empContact);
                        setAddress(response.data.empAddress);
                        setId(response.data.empId);
                        setName(response.data.empName);
                        setEmailid(response.data.empEmail);
                        setRole(response.data.empRole);
                        setManagerid(response.data.managerId);
                        setPassword(response.data.empPassword);
                    } else {
                        setId(response.data.clientId);
                        setName(response.data.clientName);
                        setEmailid(response.data.clientEmail);
                        setNumber(response.data.clientContact);
                        setAddress(response.data.clientAddress);
                        setPassword(response.data.clientPassword);
                    }
                    console.log(response)
                }
            )
        }
    }, [])
    const handleCompare = () => {
        console.log("onchange called")
        newPassword = document.getElementById("newpassword");
        newPassword = newPassword.value.trim();
        var confirmPassword = document.getElementById("confirmpassword");
        confirmPassword = confirmPassword.value.trim();
        if (newPassword === confirmPassword) {
            document.getElementById("validFeedback").style.display = "none";
        } else {
            document.getElementById("validFeedback").style.display = 'block';
            document.getElementById("validFeedback").innerHTML = "password doosent match";
        }
    }

    const updatePassword = () => {
                


        setPassword(newPassword);
        handleUpdate();
    }

    const toggleVar = () => {
        if (toggle === true) {
            setToggle(false);
        } else {
            setToggle(true);
        }
    }


    return (
        <div >
            <div className="container py-1  align-items-center justify-content-center">
                <div className="col-lg-12  align-items-center justify-content-center text-center" >
                    <div className="card mb-2">
                        <div className="card-body text-center">
                            <h5 className="my-0">{myuser?.empName || myuser?.clientName}</h5>
                            <p className="text-muted mb-0">({authuser.role})</p>

                        </div>
                    </div>
                </div>
                {
                    toggle ?
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <form onSubmit={handleUpdate}>
                                        <div className="row justify-content-center" hidden={myuser?.empRole === "ADMIN"} >
                                            <div className="col-sm-1">
                                                <p className="mb-0">Id</p>
                                            </div>
                                            <div className="col-sm-2">
                                                <input className="text-muted mb-0" value={myuser?.empId || myuser?.clientId}></input>
                                            </div>
                                        </div>
                                        <hr hidden={myuser?.empRole === "ADMIN"} />
                                        <div className="row justify-content-center">
                                            <div className="col-sm-1">
                                                <p className="mb-0"  >Name</p>
                                            </div>
                                            <div className="col-sm-2">
                                                <input className="text-muted mb-0" value={myuser?.empName || myuser?.clientName}></input>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row justify-content-center">
                                            <div className="col-sm-1">
                                                <p className="mb-0">Email</p>
                                            </div>
                                            <div className="col-sm-2">
                                                <input className="text-muted mb-0" value={myuser?.empEmail || myuser?.clientEmail}></input>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row justify-content-center" hidden={temp === "client"}>
                                            <div className="col-sm-1">
                                                <p className="mb-0">Role</p>
                                            </div>
                                            <div className="col-sm-2">
                                                <input className="text-muted mb-0" value={myuser?.empRole}></input>
                                            </div>
                                        </div>
                                        <hr hidden={temp === "client"} />
                                        {
                                            (temp !== "client" && myuser?.empRole === "EMPLOYEE") &&
                                            <>
                                                <div className="row justify-content-center">
                                                    <div className="col-sm-1">
                                                        <p className="mb-0">Manager ID</p>
                                                    </div>
                                                    <div className="col-sm-2">
                                                        <input className="text-muted mb-0" value={myuser?.managerId}></input>
                                                    </div>
                                                </div>
                                                <hr />
                                            </>
                                        }

                                        <div className="row justify-content-center">
                                            <div className="col-sm-1">
                                                <p className="mb-0">Phone</p>
                                            </div>
                                            <div className="col-sm-2">
                                                <input name="name" value={number} onChange={(e) => setNumber(e.target.value)} />
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row justify-content-center">
                                            <div className="col-sm-1">
                                                <p className="mb-0" >Address</p>
                                            </div>
                                            <div className="col-sm-2">
                                                <input name="name" value={address} onChange={(e) => setAddress(e.target.value)} />
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row justify-content-center">
                                            <div className="col-sm-6" style={{ "margin": "auto", "width": 200 }}>
                                                <input type="submit" className="form-control btn btn-info" value="Update" style={{ "fontWeight": "bold" }} />
                                            </div>
                                            <div className="col-sm-6" style={{ "margin": "auto", "width": 200 }}>
                                                <input type="button" className="form-control btn btn-info" value="Change Password" onClick={() =>{ toggleVar()}} style={{ "fontWeight": "bold" }} />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        :
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <form>
                                        <div className="row justify-content-center"  >
                                            <div className="col-sm-1">
                                                <p className="mb-0">Current Password</p>
                                            </div>
                                            <div className="col-sm-2">
                                                <input type='password' className="text-muted mb-0" ></input>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row justify-content-center"  >
                                            <div className="col-sm-1">
                                                <p className="mb-0">New Password</p>
                                            </div>
                                            <div className="col-sm-2">
                                                <input type='password' id="newpassword" className="text-muted mb-0" ></input>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row justify-content-center"  >
                                            <div className="col-sm-1">
                                                <p className="mb-0">Confirm Password</p>
                                            </div>
                                            <div className="col-sm-2">
                                                <input type='password' id="confirmpassword" className="text-muted mb-0" onChange={(e) => { handleCompare() }} ></input>
                                                <div className='text-danger' id="validFeedback"></div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row justify-content-between">
                                            <div className="col-sm-6" style={{ "margin": "auto", "width": 200 }}>
                                                <input type="submit" className="form-control btn btn-info" value="Update" style={{ "fontWeight": "bold" }}
                                                    onClick={() => { toggleVar(); updatePassword() }} />
                                            </div>
                                            <div className="col-sm-6  justify-content-end" style={{ "margin": "auto", "width": 200 }}>
                                                <input type="submit" className="form-control btn btn-info " value="Back" style={{ "fontWeight": "bold" }}
                                                    onClick={() => { toggleVar();}} />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                }
            </div>
        </div>
    )
}
export default Profile;