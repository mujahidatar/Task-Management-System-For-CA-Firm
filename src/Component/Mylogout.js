import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../Services/Actions/Authenticationaction';
function Mylogout() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(logout());
        navigate("/");
    })

    return null;
}

export default Mylogout;
