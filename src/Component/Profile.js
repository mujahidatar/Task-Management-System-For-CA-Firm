import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { logout } from '../Services/Actions/Authenticationaction';

const Profile = () => {
    var authuser = useSelector((state) => state.auth.user);
    const [toggle, setToggle] = useState("Change Password");
    const navigate = useNavigate();
    var authRole = authuser?.role;
    const [myuser, setMyuser] = useState();
    const [id, setId] = useState("0");
    const [name, setName] = useState("");
    const [emailid, setEmailid] = useState("");
    const [number, setNumber] = useState("");
    const [address, setAddress] = useState("");
    const [role, setRole] = useState("");
    const [managerid, setManagerid] = useState("");
    const [password, setPassword] = useState("");
    var username = authuser?.username;
    var temp = 0;
    const dispatch = useDispatch();
    var newPassword;
    if (authRole) {
        if (authRole === "CLIENT") {
            authRole = "client";
        }
        else {
            authRole = "employee";
        }
    }


    if (authRole === "employee") {
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
        if (temp < 1) {
            checkToken();
            temp++;
        }
            if (authRole === "employee" || authRole === "client") {
                axios.post(`http://localhost:8080/${authRole}/mail/${username}`, null, {
                    headers: {
                        'Authorization': `Bearer ${authuser.token}`
                    }
                }).then(
                    (response) => {
                        setMyuser(response.data);
                        if (authRole === "employee") {
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
                ).catch((error) => {
                    toast.error(error.response.data);
                })
            }
    }, [toggle]);

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

    const handleUpdate = async (e) => {

        console.log(authuser.token);
        await axios.post(`http://localhost:8080/${authRole}`, mydata, {
            headers: {
                'Authorization': `Bearer ${authuser.token}`
            }
        }).then(
            (response) => {
                toast.success("Password Updated Successfully");
                toggleVar();
            }, (error) => {
                toast.error(error.response.data);
            }
        )
    }

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
            document.getElementById("validFeedback").innerHTML = "Password Dosen't Match";
        }
    }


    const updatePassword = async (e) => {
        e.preventDefault();
        var user = {
            username: authuser.username,
            password: password,
            role: authuser.role
        }
        console.log(user);
        await axios.post(`http://localhost:8080/login/authenticate`, user,
        ).then(
            (response) => {
                console.log(response);
                if (response.data === true) {
                    // setPassword(newPassword);
                    if (user.role !== "CLIENT") {
                        mydata = {
                            ...mydata,
                            empPassword: newPassword
                        }
                    }else{
                        mydata = {
                            ...mydata,
                            clientPassword: newPassword
                        }
                    }
                    handleUpdate();
                }
            }
        ).catch((error) => {
            console.log(error.response.data);
            toast.error("Invalid Old Password");
        })
    }

    const toggleVar = () => {
        if (toggle === "Back") {
            setToggle("Change Password");
        } else {
            setToggle("Back");
        }
    }

    return (
        <div >
            <div className="container py-1  ">
                <div className="row col-lg-12" >
                    <div className="card mb-1">
                        <div className="card-body text-center">
                            <div style={{ "fontWeight": "bold", "float": "right" }}>
                                <input type="button" className="form-control btn btn-info " value={toggle} onClick={() => { toggleVar() }} style={{ "fontWeight": "bold", "float": "right" }} />
                            </div>
                            <div style={{ "margin": "auto", "width": 200, "float": "center" }}>
                                <h5 className="my-0 col-sm-9 d-inline">{myuser?.empName || myuser?.clientName}</h5>
                                <br />
                                <p className="text-muted mb-0 col-sm-9 d-inline">({authuser?.role})</p>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    toggle === "Change Password" ?
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <form onSubmit={handleUpdate}>
                                        <input hidden='true'></input>
                                        <div className="row justify-content-center" hidden={myuser?.empRole === "ADMIN"} >
                                            <div className="col-sm-1 ">
                                                <p className="mb-0">Id</p>
                                            </div>
                                            <div className="col-sm-2">
                                                <input className="text-muted mb-0" name='id' defaultValue={myuser?.empId || myuser?.clientId} readOnly></input>
                                            </div>
                                        </div>
                                        <hr hidden={myuser?.empRole === "ADMIN"} />
                                        <div className="row justify-content-center">
                                            <div className="col-sm-1">
                                                <p className="mb-0"  >Name</p>
                                            </div>
                                            <div className="col-sm-2">
                                                <input className="text-muted mb-0" name='name' defaultValue={name} readOnly></input>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row justify-content-center">
                                            <div className="col-sm-1">
                                                <p className="mb-0">Email</p>
                                            </div>
                                            <div className="col-sm-2">
                                                <input className="text-muted mb-0" name='email' defaultValue={emailid} readOnly></input>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row justify-content-center" hidden={authRole === "client"} >
                                            <div className="col-sm-1">
                                                <p className="mb-0">Role</p>
                                            </div>
                                            <div className="col-sm-2">
                                                <input className="text-muted mb-0" name='role' defaultValue={myuser?.empRole} readOnly></input>
                                            </div>
                                        </div>
                                        <hr hidden={authRole === "client"} />
                                        {
                                            (authRole !== "client" && myuser?.empRole === "EMPLOYEE") &&
                                            <>
                                                <div className="row justify-content-center">
                                                    <div className="col-sm-1">
                                                        <p className="mb-0">Manager ID</p>
                                                    </div>
                                                    <div className="col-sm-2">
                                                        <input className="text-muted mb-0" name='mgrId' defaultValue={myuser?.managerId} readOnly></input>
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
                                                <input name="phoneNo" defaultValue={number} onChange={(e) => setNumber(e.target.value)} />
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row justify-content-center">
                                            <div className="col-sm-1">
                                                <p className="mb-0" >Address</p>
                                            </div>
                                            <div className="col-sm-2">
                                                <input name="address" defaultValue={address} onChange={(e) => setAddress(e.target.value)} />
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row justify-content-center">
                                            <div className="col-sm-6" style={{ "margin": "auto", "width": 200 }}>
                                                <input type="submit" className="form-control btn btn-info" value="Update" style={{ "fontWeight": "bold" }} />
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
                                    <form onSubmit={(e) => { updatePassword(e) }}>
                                        <div className="row justify-content-center"  >
                                            <div className="col-sm-2">
                                                <p className="mb-0" >Current Password</p>
                                            </div>
                                            <div className="col-sm-2">
                                                <input type='password' name='op' id="oldPassword" className="text-muted mb-0" onChange={(e) => setPassword(e.target.value)}></input>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row justify-content-center"  >
                                            <div className="col-sm-2">
                                                <p className="mb-0">New Password</p>
                                            </div>
                                            <div className="col-sm-2">
                                                <input type='password' name='np' id="newpassword" className="text-muted mb-0" ></input>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row justify-content-center"  >
                                            <div className="col-sm-2">
                                                <p className="mb-0">Confirm Password</p>
                                            </div>
                                            <div className="col-sm-2">
                                                <input type='password' name='cp' id="confirmpassword" className="text-muted mb-0" onChange={(e) => { handleCompare() }} ></input>
                                                <div className='text-danger' id="validFeedback"></div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row justify-content-center">
                                            <div className="col-sm-6" style={{ "margin": "auto", "width": 200 }}>
                                                <input type="submit" className="form-control btn btn-info" value="Change Password" style={{ "fontWeight": "bold" }}
                                                />
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