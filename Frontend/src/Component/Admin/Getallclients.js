import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../Services/Actions/Authenticationaction';
export const Getallclients = () => {
    var authuser = useSelector((state) => state.auth.user);
    const [client, setClient] = useState([]);
    const navigate = useNavigate();
    const cliRef = useRef([]);
    const dispatch = useDispatch();
    var temp = 0;

    useEffect(() => {
        if (temp < 1) {
            checkToken();
            axios.get("http://localhost:8080/client", {
                headers: {
                    'Authorization': `Bearer ${authuser.token}`
                }
            }).then((response) => {
                setClient(response.data);
            }, (error) => {
                console.log(error)
            });
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

    const handleClick = (cliobj) => {
        console.log(cliobj.clientName);
        navigate(`/createclient`, { state: { cliobj } });
    }

    const handledeleteClick = async (cliobj) => {

        await axios.delete(`http://localhost:8080/client/${cliobj.clientId}`, {
            headers: {
                'Authorization': `Bearer ${authuser.token}`
            }
        }).then(
            (response) => {
                if (response.data === "Document Deleted") {
                    toast.success("Client Deleted Successfully");
                    cliRef.current.push(client.filter((cli) => cli.clientId !== cliobj.clientId));
                    setClient(...cliRef.current);
                    cliRef.current.pop();

                } else {
                    toast.error(response.data);
                }
            });
    }
    return (
        <div className="container mt-3">
            <h2 className='text-center'>Clients</h2>
            <table className="table table-striped table-bordered table-hover" style={{ "border": "2px solid skyblue", "backgroundColor": "#C9E5FF" }}>
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Contact</th>
                        <th scope="col">Email</th>
                        <th scope="col">Address</th>
                        <th scope="col" className='text-center'>Update</th>
                        <th scope="col" className='text-center'>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        client.map((cliobj, index) => (
                            <tr key={index}>
                                <th scope="row">{cliobj.clientId}</th>
                                <td>{cliobj.clientName}</td>
                                <td>{cliobj.clientContact}</td>
                                <td>{cliobj.clientEmail}</td>
                                <td>{cliobj.clientAddress}</td>
                                <td className='text-center'><a className="btn btn-info" onClick={() => handleClick(cliobj)}>Update</a></td>
                                <td className='text-center'><a className="btn btn-danger" onClick={() => handledeleteClick(cliobj)} >Delete</a></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
export default Getallclients;