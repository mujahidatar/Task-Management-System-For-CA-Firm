import React, { useEffect } from 'react'
import {useSelector} from "react-redux";
const Managerdashboard = () => {
    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        if (user) {

        } else {
            alert("Please Login first");
        }
    }, [user]);

    return (
        <div>
            <ul class="nav nav-underline">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">New</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">Assigned</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">Review</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">Completed</a>
                </li>
            </ul>
        </div>
    )
}
export default Managerdashboard;