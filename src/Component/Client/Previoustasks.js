import axios from 'axios';
import React, { useState ,useEffect} from 'react';
import { useSelector } from 'react-redux';


const Previoustasks = () => {
    const [user, setUser] = useState({ username: "null", role: "null" });
    const authuser = useSelector((state) => state.auth.user);
    useEffect(() => {
        console.log("useefeect called");
        setUser(authuser);
       // console.log("in home " + user.role);
    }, [authuser]);

    const [tasks, setTasks] = ([]);
    axios.get(`http://localhost:8080/client/${user.id}`).then(
        (response) => {
            setTasks(response.data);
        }, (error) => {
            console.log(error);
        }
    );
    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Handle</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tasks.map((task) => (
                            <tr>
                                <th scope="row">1</th>
                                <td>{task.id}</td>
                                <td>{task.title}</td>
                                <td><a href="#" className="btn btn-primary">See Details</a></td>
                            </tr>
                        ))
                    }

                </tbody>
            </table>

        </div>
    )
}
export default Previoustasks;