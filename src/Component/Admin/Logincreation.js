import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Createlogin from './Createlogin'
import Createclient  from './Createclient';


export const Logincreation = () => {
    const navigate = useNavigate();
    const [tab, setTab] = useState(0);

    return (
        <div className='center'>
            <Link to="" type="button" class="btn btn-light" onClick={() => setTab(0)}>Create Employee</Link>
            <Link to="" type="submit" class="btn btn-light" onClick={() => setTab(1)}>Create Client</Link>
            {
                tab === 0 ? <Createlogin /> : <Createclient />
            }
        </div>
    )
}
