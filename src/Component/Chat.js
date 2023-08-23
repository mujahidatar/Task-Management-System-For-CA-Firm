import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';

function Chat(props) {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const authuser = useSelector((state) => state.auth.user);
    const scrollContainerRef = useRef(null);

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
                setMessages(modifiedmsg);
                scrollToBottom();
            }, (error) => {
                console.log(error);
            }
        )
    }


    const handleSendMessage = async () => {
        setNewMessage(newMessage.trim());
        if (newMessage.trim() === '')
            return;
        const mychat = {
            taskId: props.taskId,
            senderId: authuser.id,
            msg: newMessage
        }

        await axios.post(`http://localhost:8080/chat`, mychat, {
            headers: {
                'Authorization': `Bearer ${authuser.token}`
            }
        }).then(
            (response) => {
                console.log(response.data);
                updatedMessages = [...messages, { text: newMessage }];
                setMessages(updatedMessages);
                setNewMessage('');
            }
        ).catch((error) => {
            console.log(error);
        }).finally(() => {
            getMsg();
        })


        console.log("updated messages" + updatedMessages);

    };

    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const scrollToBottom = () => {
        if (scrollContainerRef.current) {
            const scrollContainer = scrollContainerRef.current;
            scrollContainer.scrollTop = scrollContainer.scrollHeight;
        }
    }

    return (
                <div className="card p-0" >
                    <div className="card-header p-3 bg-info mx-0" style={{"backgroundColor":"#B3FFFA"}}>
                        <h5 className="mb-0">Chat</h5>
                    </div>
                    <div className="card-body" style={{ "height": "auto", "overflow": "auto" }} ref={scrollContainerRef}>
                        {messages.map((message, index) => (
                            (authuser.id === message.senderId) ?
                                <>
                                    <p key={index} className="mb-0 d-flex flex-row justify-content-end" style={{ "background-color": " #f5f6f7;","fontSize": 20 }}>{message.msg}</p>
                                    <p className="mb-3 text-muted d-flex flex-row justify-content-end" style={{ "fontSize": 12 }}>{message.timeStamp?.getDate() + " " + month[message.timeStamp?.getMonth()]}</p>
                                </>
                                :
                                <>
                                    <p key={index} className="mb-0 d-flex flex-row justify-content-start" style={{ "background-color": " #f5f6f7;","fontSize": 20  }} >{message.msg}</p>
                                    <p className="mb-3 text-muted d-flex flex-row justify-content-start" style={{ "fontSize": 12 }}>{message.timeStamp?.getDate() + " " + month[message.timeStamp?.getMonth()]}</p>
                                </>
                        ))}
                    </div>
                    <div className="card-footer d-flex flex-row justify-content-center bg-info">
                        <input type="text" className="form-control col-sm-5 mx-2" placeholder="Type here" value={newMessage}
                            onChange={(e) => { setNewMessage(e.target.value) }} style={{ "width": "80%" }} />
                        <button className="btn btn-danger mx-2" onClick={handleSendMessage} type="button" style={{ "width": "auto" }}>Send</button>
                    </div>
                </div>
    );
}

export default Chat;
