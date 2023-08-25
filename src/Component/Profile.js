import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { logout } from '../Services/Actions/Authenticationaction';

const Profile = () => {
    var authuser = useSelector((state) => state.auth.user);
    var authRole = authuser?.role;
    var temp = 0;
    const navigate = useNavigate();
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

    if (authRole) {
        if (authRole === "CLIENT") {
            authRole = "client";
        }
        else {
            authRole = "employee";
        }
    }
    
    const handleUpdate = async (e) => {
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

        e.preventDefault();
        const update = async () => {
            await axios.post(`http://localhost:8080/${authRole}`, mydata, {
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

        await toast.info('Do you want to update?', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: false,
            closeOnClick: true,
            draggable: false,
            closeButton: (
                <div className="" >
                    <button onClick={update} className="btn btn-info">
                        Yes
                    </button>
                    <button className=" btn btn-info">
                        No
                    </button>
                </div>
            ),
        });

    }

    useEffect(() => {
        if (temp < 1) {
            checkToken();
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
                )
            }
            temp++;
        }
    }, []);

    const checkToken = async () => {
        await axios.get("http://localhost:8080/login/checkToken",{
            headers: {
                'Authorization': `Bearer ${authuser?.token}`
            }
        }).then((response) => {
            console.log(response)
            // navigate(-1);
            return;
        } ).catch((error) => {
            console.log("in catch "+error.response?.data);
            const err = error.response?.data;
            dispatch(logout());
            navigate("/",{state:{err}});
            
        });
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
                                <div className="row justify-content-center" hidden={authRole === "client"}>
                                    <div className="col-sm-1">
                                        <p className="mb-0">Role</p>
                                    </div>
                                    <div className="col-sm-2">
                                        <input className="text-muted mb-0" value={myuser?.empRole}></input>
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
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default Profile;