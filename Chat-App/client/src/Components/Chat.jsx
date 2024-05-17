/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import ScrollToBottom from 'react-scroll-to-bottom'

function Chat({ socket, username, roomId }) {

    const [currentMessage, setCurrentMessage] = useState('');
    const [messageList, setMessageList] = useState([]);

    useEffect(() => {
        console.log("useEffect_receive");
        socket.on("receive_message", (data) => {
            setMessageList(prev => { console.log("Prev list is : ", prev); return [...prev, data] });
            console.log("I received message : ", data);
        })
        return () => {
            socket.off("receive_message");
        };
    }, [socket])

    useEffect(() => { console.log("The List : ", messageList); }, [messageList])

    const sendMessage = async () => {
        console.log("twice");
        if (currentMessage !== '') {
            const messageData = {
                room: roomId,
                author: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + " : " + new Date(Date.now()).getMinutes()
            }
            await socket.emit("send_message", messageData);
            setMessageList(prev => [...prev, messageData]);
            setCurrentMessage("");
        }
    }

    return <div className="chat-window">
        <div className="chat-header">
            <p>Live Chat</p>
        </div>
        <div className="chat-body">
            <ScrollToBottom className='message-container'>
                {
                    messageList && messageList.map((obj, index) => {
                        return (
                            <div className="message" key={index} id={username === obj.author ? "you" : "other"}>
                                <div>
                                    <div className="message-content"><p>{obj.message}</p></div>
                                    <div className="message-meta">
                                        <p id="time">{obj.time}</p>
                                        <p id="author">{obj.author}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </ScrollToBottom>
        </div>
        <div className="chat-footer">
            <input
                type="text"
                placeholder="Hey.."
                value={currentMessage}
                onChange={e => { setCurrentMessage(e.target.value) }}
                onKeyDown={event => {
                    event.key === 'Enter' && sendMessage();
                }}
            />

            {/* <button onClick={() => { sendMessage() }}>&#9658;</button> */}
        </div>
    </div>
}

export default Chat;