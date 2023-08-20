import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';


function Chat(props) {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const user = useSelector((state) => state.auth.user);  

    var updatedMessages;

    useEffect(() => {
        getMsg();
    }, [])

    var id = props.taskId;
    const getMsg = async () => {
        await axios.post(`http://localhost:8080/chat/${id}`).then(
            (response) => {
                const modifiedmsg = response.data.map((task) => (
                    task = {
                        ...task,
                        timeStamp: new Date(task.timeStamp)
                    }

                ));
                console.log("modified time is " + modifiedmsg);
                setMessages(modifiedmsg);

                console.log(response.data);
            }, (error) => {
                console.log(error);
            }
        )
    }


    const handleSendMessage = async () => {
        setNewMessage(newMessage.trim());
        if (newMessage.trim() === '')
            return;
        console.log("user id is " + user.id)
        const mychat = {
            taskId: props.taskId,
            senderId: user.id,
            msg: newMessage
        }


        await axios.post(`http://localhost:8080/chat`, mychat).then(
            (response) => {
                console.log(response.data);
                updatedMessages = [...messages, { text: newMessage }];
                setMessages(updatedMessages);
                setNewMessage('');
            }
        ).catch((error) => {

        }).finally(() => {
            getMsg();
        })


        console.log("updated messages" + updatedMessages);
    };
   
    const month=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

    return (
        <div className="container h-100" style={{ backgroundColor: "#e0e0e0", height: "70vh" }}>
            <h2>Chat</h2>

            {messages.map((message, index) => (
                <div>

                    {(user.id === message.senderId) ? <p key={index} style={{ textAlign: "end", fontWeight: 600 }}>{message.timeStamp.getDay()+" "+month[message.timeStamp.getMonth()]+" "+message.msg}</p>
                        : <p key={index} style={{ fontWeight: 600 }} >{message.msg+"  "+message.timeStamp.getDay()+" "+month[message.timeStamp.getMonth()]}</p>
                    }
                </div>
            ))}



            <div class="input-group mb-3">
                <input type="text" className="form-control" placeholder="Type here" value={newMessage}
                    onChange={(e) => { setNewMessage(e.target.value) }} />
                {/* <button className="btn btn-secondary" onClick={handleSendMessage} type="button" >Button</button> */}
                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16" onClick={handleSendMessage}>
                    <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                </svg>
            </div>
        </div>
    );
}

export default Chat;
