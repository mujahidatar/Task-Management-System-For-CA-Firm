import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Createlogin from './Createlogin'
import Createclient  from './Createclient';


export const Logincreation = () => {
    const navigate = useNavigate();
    const [tab, setTab] = useState(0);
    const [emp,setEmp] = useState(true);
    const [cli,setCli] = useState(false);
    
    const empHandle = (event) =>{
        event.preventDefault();
        setEmp(true);
        setCli(false);
        setTab(0);
    }
    const cliHandle = (event) =>{
        event.preventDefault();
        setEmp(false);
        setCli(true);
        setTab(1);
    }
    return (
        <div className='center container'>
            <Link to="" type="button" className={`btn bg-transparent fs-6 mx-3 ${emp ? 'fw-bold' : 'fw-normal'}`} onClick={empHandle}>Employee</Link>
            <Link to="" type="button" className={`btn bg-transparent fs-6  ${cli ? 'fw-bold' : 'fw-normal'}`} onClick={cliHandle}>Client</Link>
            <hr/>
            {
                tab === 0 ? <Createlogin /> : <Createclient />
            }
        </div>
    )
}
