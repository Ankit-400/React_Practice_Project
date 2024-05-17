import { useState } from 'react';
import './App.css'
import io from 'socket.io-client'
import Chat from './Components/Chat';

const socket = io.connect("http://localhost:3001");
console.log(socket);

function App() {

  const [userName, setUserName] = useState('');
  const [roomId, setRoomId] = useState('');
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (userName !== "" && roomId !== "") {
      setShowChat(true);
      socket.emit("join_room", roomId);
    }
  }

  return <div className='App'>
    {
      !showChat ?
        <div className='joinChatContainer'>
          <h3>Join A Chhat</h3>
          <input type="text"
            placeholder='John..'
            onChange={e => {
              setUserName(e.target.value)
            }}
          />
          <input type="text"
            placeholder='Room ID..'
            onChange={e => {
              setRoomId(e.target.value)
            }}
          />

          <button onClick={() => joinRoom()}>join A Room</button>
        </div>
        :
        <Chat socket={socket} username={userName} roomId={roomId} />
    }
  </div>
}

export default App
