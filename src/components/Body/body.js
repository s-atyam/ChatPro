import { BsThreeDots, BsFillCameraVideoFill, BsFillTelephoneFill, BsSearch, BsFillMicFill, BsSend, BsPaperclip, BsGearWideConnected, BsBoxArrowInRight } from "react-icons/bs";
import { FaUserAlt, FaUserSecret, FaUserFriends } from "react-icons/fa";
import { AiOutlineProfile } from "react-icons/ai";
import React, { useState, useEffect, useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import logo_dp from '../images/logo.png'
import Chat from './Chat/chat';
import Messages from './Messages/messages';
import { io } from "socket.io-client";
import userContext from "../../context/userContext";
import Peer from 'simple-peer';


const connectWithSocket = (data) =>{
  const s = io('http://192.168.119.231:5000',{
    autoConnect: false,
    query: { userid:data }
  });
  s.connect();
  return s;
}

const Body = () => {

  const socketRef = useRef(null);
  const hasEffectRun = useRef(false);
  const chatContainerRef = useRef(null);
  const fileInputRef = useRef(null);
  
  const navigate = useNavigate();
  const context = useContext(userContext);
  const { userData, searchUser, searchFriends } = context;
  
  let arrayInitial = [];
  const [text, setText] = useState('');
  const [search, setSearch] = useState('');
  const [currUser, setCurrUser] = useState({"_id":"","name":"Default User","status":null,"lastActive":Date.now(),"isFriend":false});
  const [usersArray,setUsersArray] = useState(arrayInitial);
  const [msgArray,setMsgArray] = useState(arrayInitial);
  const [imgURL,setImgURL] = useState('');

  const [stream,setStream] = useState()
  const [ receivingCall, setReceivingCall ] = useState(false)
	const [ callerSignal, setCallerSignal ] = useState()
	const [ callAccepted, setCallAccepted ] = useState(false)
	const [ callEnded, setCallEnded] = useState(false)
	const [ name, setName ] = useState("")
	const myVideo = useRef()
	const userVideo = useRef()
	const connectionRef= useRef()


  // various functions for handling the onChange and onClick effect
  const handleOnChange = (e)=>{
    setText(e.target.value);
  }

  const handleFileInputChange = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };

  const handleFileSelected = (event) => {
    event.preventDefault();
    const selectedFile = event.target.files[0];
    console.log(selectedFile);
    socketRef.current.emit('send_message',selectedFile,currUser._id,currUser.isFriend,true);
  };

  const handleSend = (e)=>{
    e.preventDefault();
    if(text){
      setMsgArray([...msgArray,{'text':text,'time':Date.now(),'dir':'right'}]);
    socketRef.current.emit('send_message',text,currUser._id,currUser.isFriend,false);
    setText('');
    }
  }
  
  const handleMicClick = (e)=>{
    e.preventDefault();
  }

  const handleOnSearch = (e)=>{
    setSearch(e.target.value);
  }

  const handleSearchClick = async (e) => {
    e.preventDefault();
    if(search.length!==0){
      const searchedUser = await searchUser(search,userData._id);
      setSearch('');
      setUsersArray(searchedUser.data)
    }
  }

  const handleNewClick = (data) =>{
    let temp = userData.friends.findIndex((e)=>{return e===data._id});
    if(temp===-1){
      setCurrUser({"_id":data._id,"name":data.fName+" "+data.lName,"status":true,"lastActive":data.lastModified,"isFriend":false});
    }else{
      setCurrUser({"_id":data._id,"name":data.fName+" "+data.lName,"status":true,"lastActive":data.lastModified,"isFriend":true});
    }
  } 
  
  const handleLogout = ()=>{
    socketRef.current.emit('dis_status');
    socketRef.current.disconnect();
    navigate('/');
  }

  const getFriends = async () =>{
    // console.log(userData)
    const searchedFriends = await searchFriends(userData._id);
    console.log("searched friends ",searchedFriends);
    setUsersArray(searchedFriends);
  }

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight - chatContainerRef.current.clientHeight;
    }
  };

  const handleVideoCall = () => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      setStream(stream)
      myVideo.current.srcObject = stream
    })
    const peer = new Peer({
			initiator: true,
			trickle: false,
			stream: stream
		})

    peer.on("signal", (data) => {
			socketRef.current.emit("callUser", {
				userid: currUser._id,
				signalData: data,
				name: userData.fName+" "+userData.lName
			})
		})
		peer.on("stream", (stream) => {
			userVideo.current.srcObject = stream
		})
    socketRef.current.on("callAccepted", (signal) => {
			setCallAccepted(true)
			peer.signal(signal)
		})
		connectionRef.current = peer
  }
  const answerCall =() =>  {
		setCallAccepted(true)
		const peer = new Peer({
			initiator: false,
			trickle: false,
			stream: stream
		})
		peer.on("signal", (data) => {
			socketRef.current.emit("answerCall", { signal: data, userid: currUser._id })
		})
		peer.on("stream", (stream) => {
			userVideo.current.srcObject = stream
		})

		peer.signal(callerSignal)
		connectionRef.current = peer
	}

	const leaveCall = () => {
		setCallEnded(true)
		connectionRef.current.destroy()
	}

  useEffect(() => {
    scrollToBottom();
  }, [msgArray]);

  useEffect(() => {
    if(Object.keys(userData).length===0){
      navigate('/login');
    }else{
      if (!hasEffectRun.current) {
        

        hasEffectRun.current = true;
        socketRef.current = connectWithSocket(userData._id);

        getFriends();
          // socket events
        socketRef.current.on("connect", () => {
          console.log(socketRef.current.id);
        });
        socketRef.current.on("disconnect", () => {
          console.log("Logout! client side disconnected");
        });
        socketRef.current.on('recv-message',(received_msg,isFile)=>{
          console.log(received_msg);
          if(isFile){
            const blob = new Blob([received_msg], { type: 'image/jpeg' });
            const fileUrl = URL.createObjectURL(blob);
            setImgURL(fileUrl);
            console.log(fileUrl);
            setMsgArray((prevMsgArray) => [
              ...prevMsgArray,
              { 'text': "image", 'time': Date.now(), 'dir': 'left' },
            ]);
          }else{
            setMsgArray((prevMsgArray) => [
              ...prevMsgArray,
              { 'text': received_msg, 'time': Date.now(), 'dir': 'left' },
            ]);
          }
          
          console.log(msgArray);
        })
        socketRef.current.on("status_on_conn", (userid) => {
          console.log("status update of user ", userid)
          setUsersArray((usersArray)=>{
            return usersArray.map((item)=>{
              if(item._id===userid){
                return {...item,'status':true};
              }else{
                return item;
              }
            })
          })
        });
        socketRef.current.on("status_on_dis", (userid) => {
          console.log("status update of user ", userid)
          setUsersArray((usersArray)=>{
            return usersArray.map((item)=>{
              if(item._id===userid){
                return {...item,'status':false};
              }else{
                return item;
              }
            })
          })
        });
        socketRef.current.on("callUser", (data) => {
          setReceivingCall(true)
          setName(data.name)
          setCallerSignal(data.signal)
        })
      }
    }
    // eslint-disable-next-line
  }, [])
  

  return (
    <div className='bg-slate-900 text-slate-400 w-screen h-screen flex justify-center items-center'>

      <div className='min-w-[15rem] w-52 h-full border-r border-slate-700 flex flex-col justify-around items-center'>
        <div className='w-full h-fit flex justify-center flex-wrap'>
          <img src={logo_dp} alt="" />
        </div>
        <div className='w-5/6 h-fit flex justify-center flex-wrap'>
          <button disabled={true} className='w-2/3 h-10 border border-slate-700 my-2 rounded-sm flex items-center justify-center'> <AiOutlineProfile className="mr-1 text-xl text-yellow-500"/> Profile</button>
          <button disabled={true} className='w-2/3 h-10 border border-slate-700 my-2 rounded-sm flex items-center justify-center'> <FaUserSecret className="mr-1 text-xl text-blue-500"/> Private</button>
          <button onClick={getFriends} className='w-2/3 h-10 border border-slate-700 my-2 rounded-sm flex items-center justify-center'> <FaUserFriends className="mr-1 text-xl text-green-500"/>Friends</button>
        </div>
        <div className='w-5/6 h-fit flex justify-center flex-wrap'>
          <button disabled={true} className='w-2/3 h-10 border border-slate-700 my-2 rounded-sm flex items-center justify-center'> <BsGearWideConnected className="mr-1 text-xl text-gray-500"/> Settings</button>
          <button onClick={handleLogout} className='w-2/3 h-10 border border-slate-700 my-2 rounded-sm flex items-center justify-center'> <BsBoxArrowInRight className="mr-1 text-xl text-red-500"/> Logout</button>
        </div>
      </div>

      <div className='h-full flex flex-grow flex-col '>

        <div className='w-full min-h-min h-14 border-b border-slate-700 flex justify-between items-center'>
          <div className='w-96 h-full flex justify-center items-center'>
            <button onClick={handleSearchClick} className='h-2/3 aspect-square mx-1 flex justify-center items-center cursor-pointer'><BsSearch/></button>
            <input onChange={handleOnSearch} value={search} className='h-2/3 w-full bg-transparent outline-none text-sm pl-3' placeholder='Search . . .'></input>
          </div>
          <div className='w-fit h-full flex justify-center items-center mr-5'>
            {/* <div className='h-4/5 aspect-square mx-1 border border-slate-700'></div> */}
            <p>{userData.fName+" "+userData.lName}</p>
            <div className='h-4/5 aspect-square mx-1 border border-slate-700 rounded-full flex items-center justify-center'><FaUserAlt/></div>
          </div>
        </div>

        <div className='flex flex-grow h-full'>
          <div className='w-96 h-full border-r border-slate-700'>
            {
              usersArray.map((data)=>{
                return <Chat clickFunction={()=>{handleNewClick(data)}} key={data._id} name={`${data.fName} ${data.lName}`} status={data.status} lastOnline={data.lastModified}  />
              })
            }
          </div>
        
          
          <div className='w-[70%] flex-grow h-full flex flex-col justify-between items-center'>
            <div className='flex items-center w-full border-b border-slate-700 h-14'>
              <div className=' h-2/3 aspect-square ml-2 flex justify-center items-center'><FaUserAlt/></div>
              <div className=' h-5/6 w-fit ml-2'>
                <p className=''>{currUser.name}</p>
                {currUser.status===null && <p className='text-xs font-semibold text-slate-600'></p>}
                {currUser.status===false && <p className='text-xs font-semibold text-slate-600'><span className="text-red-500">Offline</span> . {currUser.lastActive}</p>}
                {currUser.status===true && <p className='text-xs font-semibold text-green-500'>Online</p>}
              </div>
              <div className='ml-auto flex h-5/6 mr-4'>
                <div className='h-full mx-1 flex justify-center items-center aspect-square cursor-pointer'><BsFillTelephoneFill/></div>
                <div className='h-full mx-1 flex justify-center items-center aspect-square cursor-pointer'><BsFillCameraVideoFill/></div>
                <div className='h-full mx-1 flex justify-center items-center aspect-square cursor-pointer'><BsThreeDots/></div>
              </div>
            </div>
            
            {/* {stream && <video playsInline muted autoPlay ref={myVideo}  className="border w-1/2 h-1/3"></video>}
            {receivingCall && <div className='h-3/4 max-h-[40rem] flex-grow w-[96%] max-w-6xl my-5 border border-slate-700 p-2 flex justify-center flex-col items-center'>
              {!callAccepted &&
                <><span className="mb-10">Video Call from {name}</span>
                <div className="w-1/2 h-fit flex items-center justify-center">
                  <button onClick={answerCall} className="h-12 w-1/3 mx-3 border border-slate-600 bg-transparent text-green-500">Accept</button>
                  <button className="h-12 w-1/3 mx-3 border border-slate-600 bg-transparent text-red-500">Reject</button>
                  </div></>
              }
              {
                callAccepted && !callEnded &&
                <>
                  <video playsInline autoPlay ref={userVideo}  className="border w-2/3 h-2/3"></video>
                  <button onClick={leaveCall} className="text-red-500 h-10 w-1/6 border mt-5">End Call</button>
                </>
              }
              
            </div>} */}
            
            {!receivingCall && msgArray.length===0 && <div className='h-3/4 max-h-[40rem] flex-grow w-[96%] max-w-6xl my-5 border border-slate-700 p-2 flex justify-center items-center'>No new messages</div>}
            
            {!receivingCall && msgArray.length!==0 && <div ref={chatContainerRef} className='h-3/4 max-h-[40rem] flex-grow w-[96%] max-w-6xl my-5 scroll-smooth border border-slate-700 p-2'>
              {msgArray.map((msgs)=>{
                if(msgs.text==="image"){
                  return <Messages key={msgs.time} direction={msgs.dir} txt={msgs.text} time={msgs.time} type="i" src={imgURL} />
                }else{
                  return <Messages key={msgs.time} direction={msgs.dir} txt={msgs.text} time={msgs.time} type="t" />
                }
              })}
            </div>}
            <form className='w-[96%] h-14 mb-5 flex justify-between items-center'>
              <div onClick={handleMicClick} className='h-2/3 aspect-square ml-2  outline-none flex justify-center items-center text-xl '><BsFillMicFill/></div>
              <label className='h-2/3 aspect-square ml-2  outline-none flex justify-center items-center text-xl '><input type="file" ref={fileInputRef} className="hidden" onChange={handleFileSelected}/> <span><BsPaperclip/></span> </label>
              <input onChange={handleOnChange} value={text}  className='flex flex-grow h-3/4 bg-transparent outline-0 mx-2 border border-slate-700 px-3' placeholder='Type a message here ...'></input>
              <button disabled={currUser._id.length===0?true:false} type='submit' onClick={handleSend} className='h-3/4 w-fit mr-2 px-4  text-xl outline-none flex justify-center items-center cursor-pointer'><BsSend/></button>
            </form>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Body;