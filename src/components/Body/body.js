import { BsThreeDots, BsFillCameraVideoFill, BsFillTelephoneFill, BsSearch, BsFillMicFill, BsSend, BsPaperclip, BsGearWideConnected, BsBoxArrowInRight } from "react-icons/bs";
import { FaUserAlt, FaUserSecret, FaUserFriends } from "react-icons/fa";
import { AiOutlineProfile } from "react-icons/ai";
import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import logo_dp from '../images/logo.png'
import Chat from './Chat/chat';
import Messages from './Messages/messages';
import { io } from "socket.io-client";
import userContext from "../../context/userContext";

// const socket = io("https://server-domain.com");

const socket = io('http://192.168.100.3:5000',{
  autoConnect: false
});
const Body = () => {
  socket.connect()
  // if user get connected to server this event will be triggered
  socket.on("connect", () => {
    console.log(socket.id);
  });
  socket.on("disconnect", () => {
    console.log("Logout! client side disconnected");
  });
  socket.on('rec-message',(recivied_msg)=>{
    setMsgArray([...msgArray,{'text':recivied_msg,'time':Date.now(),'dir':'left'}]);
  })

  const navigate = useNavigate();
  const context = useContext(userContext);
  const { userData } = context;
  // console.log("body : ",userData);

  const [text, setText] = useState('');
  let arrayInitial = [];
  const [msgArray,setMsgArray] = useState(arrayInitial);

  const handleOnChange = (e)=>{
    setText(e.target.value);
  }

  const handleSend = (e)=>{
    e.preventDefault();
    setMsgArray([...msgArray,{'text':text,'time':Date.now(),'dir':'right'}]);
    socket.emit('send-message',text);
    setText('');
  }
  
  const handleMicClick = (e)=>{
    e.preventDefault();
  }

  const handleLogout = ()=>{
    socket.disconnect();
    navigate('/');
  }

  return (
    <div className='bg-slate-900 text-slate-400 w-screen h-screen flex justify-center items-center'>

      <div className='min-w-[15rem] w-52 h-full border-r border-slate-700 flex flex-col justify-around items-center'>
        <div className='w-full h-fit flex justify-center flex-wrap'>
          <img src={logo_dp} alt="" />
        </div>
        <div className='w-5/6 h-fit flex justify-center flex-wrap'>
          <button className='w-2/3 h-10 border border-slate-700 my-2 rounded-sm flex items-center justify-center'> <AiOutlineProfile className="mr-1 text-xl text-yellow-500"/> Profile</button>
          <button className='w-2/3 h-10 border border-slate-700 my-2 rounded-sm flex items-center justify-center'> <FaUserSecret className="mr-1 text-xl text-blue-500"/> Private</button>
          <button className='w-2/3 h-10 border border-slate-700 my-2 rounded-sm flex items-center justify-center'> <FaUserFriends className="mr-1 text-xl text-green-500"/>Friends</button>
        </div>
        <div className='w-5/6 h-fit flex justify-center flex-wrap'>
          <button className='w-2/3 h-10 border border-slate-700 my-2 rounded-sm flex items-center justify-center'> <BsGearWideConnected className="mr-1 text-xl text-gray-500"/> Settings</button>
          <button onClick={handleLogout} className='w-2/3 h-10 border border-slate-700 my-2 rounded-sm flex items-center justify-center'> <BsBoxArrowInRight className="mr-1 text-xl text-red-500"/> Logout</button>
        </div>
      </div>

      <div className='h-full flex flex-grow flex-col '>

        <div className='w-full min-h-min h-14 border-b border-slate-700 flex justify-between items-center'>
          <div className='w-96 h-full flex justify-center items-center'>
            <button className='h-2/3 aspect-square mx-1 flex justify-center items-center cursor-pointer'><BsSearch/></button>
            <input className='h-2/3 w-full bg-transparent outline-none text-sm pl-3' placeholder='Search . . .'></input>
          </div>
          <div className='w-fit h-full flex justify-center items-center mr-5'>
            {/* <div className='h-4/5 aspect-square mx-1 border border-slate-700'></div> */}
            {/* <div className='h-4/5 aspect-square mx-1 border border-slate-700'></div> */}
            <p>{userData.fName+" "+userData.lName}</p>
            <div className='h-4/5 aspect-square mx-1 border border-slate-700 rounded-full flex items-center justify-center'><FaUserAlt/></div>
          </div>
        </div>

        <div className='flex flex-grow h-full'>
          <div className='w-96 h-full border-r border-slate-700'>
            <Chat/>
            <Chat/>
            <Chat/>
            <Chat/>
            <Chat/>
            <Chat/>
            <Chat/>
          </div>
        
          
          <div className='w-[70%] flex-grow h-full flex flex-col justify-between items-center'>
            <div className='flex items-center w-full border-b border-slate-700 h-14'>
              <div className=' h-2/3 aspect-square ml-2 flex justify-center items-center'><FaUserAlt/></div>
              <div className=' h-5/6 w-fit ml-2'>
                <p className=''>Full Name</p>
                {/* <p className='text-xs font-semibold text-slate-600'>Offline . Last seen 5 hours ago</p> */}
                <p className='text-xs font-semibold text-green-500'>Online</p>
              </div>
              <div className='ml-auto flex h-5/6 mr-4'>
                <div className='h-full mx-1 flex justify-center items-center aspect-square cursor-pointer'><BsFillTelephoneFill/></div>
                <div className='h-full mx-1 flex justify-center items-center aspect-square cursor-pointer'><BsFillCameraVideoFill/></div>
                <div className='h-full mx-1 flex justify-center items-center aspect-square cursor-pointer'><BsThreeDots/></div>
              </div>
            </div>
            {/* <div className='h-3/4 max-h-[40rem] flex-grow w-[96%] max-w-6xl my-5 border border-slate-700 p-2 flex justify-center items-center'>No new messages</div> */}
            <div className='h-3/4 max-h-[40rem] flex-grow w-[96%] max-w-6xl my-5 border border-slate-700 p-2'>
              {msgArray.map((msgs)=>{
                return <Messages key={msgs.time} direction={msgs.dir} txt={msgs.text} time={msgs.time} />
              })}
            </div>
            <form className='w-[96%] h-14 mb-5 flex justify-between items-center'>
              <div onClick={handleMicClick} className='h-2/3 aspect-square ml-2  outline-none flex justify-center items-center text-xl '><BsFillMicFill/></div>
              <div onClick={handleMicClick} className='h-2/3 aspect-square ml-2  outline-none flex justify-center items-center text-xl '><BsPaperclip/></div>
              <input onChange={handleOnChange} value={text}  className='flex flex-grow h-3/4 bg-transparent outline-0 mx-2 border border-slate-700 px-3' placeholder='Type a message here ...'></input>
              <button type='submit' onClick={handleSend} className='h-3/4 w-fit mr-2 px-4  text-xl outline-none flex justify-center items-center cursor-pointer'><BsSend/></button>
            </form>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Body;