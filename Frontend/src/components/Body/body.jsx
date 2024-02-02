import { BsThreeDots, BsFillCameraVideoFill, BsFillTelephoneFill, BsSearch,BsXSquare,BsEmojiSmile, BsInfoCircle, BsFillMicFill, BsSend, BsPaperclip, BsGearWideConnected, BsChatSquareDotsFill } from "react-icons/bs";
import { FaUserAlt, FaUserSecret, FaUserFriends, FaArrowLeft, FaCamera, FaPowerOff } from "react-icons/fa";
import React, { useState, useEffect, useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import logo_dp from '../../assets/images/logo_short.png'
import default_chat from '../../assets/images/default.png'
import Chat from './Chat/chat';
import Messages from './Messages/messages';
import { io } from "socket.io-client";
import userContext from "../../context/userContext";
import { motion } from 'framer-motion'

const connectWithSocket = (data) =>{
  const s = io(process.env.REACT_APP_SERVER_LINK,{
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
  
  const navigate = useNavigate();
  const context = useContext(userContext);
  const { userData, searchUser, searchFriends } = context;
  
  let arrayInitial = [];
  const [typing1,setTyping1] = useState(false);
  const [typing2,setTyping2] = useState(false);

  const [toggle,setToggle] = useState({'search':false, 'searchedData':false, 'menu':false, 'chatArea':false})
  const [input,setInput] = useState({'search':'','message':''})
  const [users,setUsers] = useState({'favourites':[],'recents':[],'groups':[],'searched':[]})
  const [msgArray,setMsgArray] = useState(arrayInitial);
  const [currUser, setCurrUser] = useState({"_id":"","name":"Default User","status":null,"lastActive":Date.now(),"isFriend":false});
  
  // various functions for handling the onChange and onClick effect
  const handleOnChange = (e)=>{
    setInput({...input,'message':e.target.value})
    if(!typing1){
      socketRef.current.emit('sTyping',currUser._id);
      setTyping1(true);
    }
    isTyping();
  }

  // this function if for delaying after an event end (used in typing status)
  const debounce = (callback,delay=1000)=>{
    let timeout;
    return (...args)=>{
      clearTimeout(timeout)
      timeout = setTimeout(()=>{callback(...args)},delay);
    }
  }
  // used in typing status
  const isTyping = debounce(()=>{
    socketRef.current.emit('eTyping',currUser._id);
    setTyping1(false);
  },1500)

  // to send the message
  const handleSend = (e)=>{
    e.preventDefault();
    if(input.message){
      socketRef.current.emit('send_message',input.message,currUser._id,currUser.isFriend);
      setMsgArray([...msgArray,{'text':input.message,'time':Date.now(),'dir':'right'}]);
      setInput({...input,'message':''})
    }
  }

  const handleOnSearch = (e)=>{
    setInput({...input,search:e.target.value});
  }
  
  // for searching the user
  const handleSearchClick = async (e) => {
    e.preventDefault();
    if(input.search.length!==0){
      const searchedUser = await searchUser(input.search,userData._id);
      console.log(searchedUser)
      setToggle({...toggle,searchedData:true})
      setInput({...input,search:''});
      setUsers({...users,searched:searchedUser.data})
      console.log(users.searched)
    }
  }

  // for selecting the desire user for chatting
  const handleNewClick = (data) =>{
    let temp = userData.friends.findIndex((e)=>{return e===data._id});
    if(temp===-1){
      setCurrUser({"_id":data._id,"name":data.fName+" "+data.lName,"status":data.status,"lastActive":data.lastModified,"isFriend":false});
    }else{
      setCurrUser({"_id":data._id,"name":data.fName+" "+data.lName,"status":data.status,"lastActive":data.lastModified,"isFriend":true});
    }
    setToggle({...toggle,searchedData:false})
    setToggle({...toggle,search:false})
    setUsers({...users,searched:[]})
    setToggle({...toggle,chatArea:true})
    setMsgArray([]);
  } 
  
  // logout functionality
  const handleLogout = ()=>{
    socketRef.current.emit('dis_status');
    socketRef.current.disconnect();
    localStorage.removeItem('chatpro_auth_token');
    navigate('/');
  }
  // to serach for friends
  const getFriends = async () =>{
    // console.log(userData)
    const searchedFriends = await searchFriends(userData._id);
    console.log("searched friends ",searchedFriends);
    setUsers({...users,recents:searchedFriends})
  }

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight - chatContainerRef.current.clientHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [msgArray]);

  useEffect(() => {
    const authToken = localStorage.getItem('ChatPRO_AT')
    if(!authToken){
      navigate('/login')
    }else{
      if (!hasEffectRun.current) {
        
        hasEffectRun.current = true;
        socketRef.current = connectWithSocket(userData._id);

        getFriends(); 

        // socket events
        
        // event on connection
        socketRef.current.on("connect", () => {
          console.log(socketRef.current.id);
        });
        
        // event on disconnection
        socketRef.current.on("disconnect", () => {
          console.log("Logout! client side disconnected");
        });
        
        // typing status turn to true 
        socketRef.current.on('typingS',()=>{
          setTyping2(true);
        })
        
        // typing status turn to false 
        socketRef.current.on('typingE',()=>{
          setTyping2(false);
        })

        // event on reciving messages
        socketRef.current.on('recv-message',(received_msg)=>{
          console.log(received_msg);
          setMsgArray((prevMsgArray) => [
            ...prevMsgArray,
            { 'text': received_msg, 'time': Date.now(), 'dir': 'left' },
          ]);
          console.log(msgArray);
        })

        // when a friends get online , then changing status
        socketRef.current.on("status_on_conn", (userid) => {
          console.log("status update of user ", userid)
          setCurrUser(prevCurrUser => {        
            if (prevCurrUser._id === userid) {
              return {
                ...prevCurrUser,
                'status': true,
              };
            }
            return prevCurrUser;
          });
          let arr = users.recents
          arr?.map((ele)=>{
            if(ele._id===userid){
              return {...ele,'status':false};
            }else{
              return ele;
            }
          })
          setUsers({...users,recents:arr})
        });
        
        // when a friends get offline , then changing status
        socketRef.current.on("status_on_dis", (userid) => {
          console.log("status update of user ", userid)
          setCurrUser(prevCurrUser => {        
            if (prevCurrUser._id === userid) {
              return {
                ...prevCurrUser,
                'status': false,
              };
            }
            return prevCurrUser;
          });
          let arr = users.recents
          arr?.map((ele)=>{
            if(ele._id===userid){
              return {...ele,'status':false};
            }else{
              return ele;
            }
          })
          setUsers({...users,recents:arr})
        });
      }
    }
    // eslint-disable-next-line
  }, [])
  

  return (
    <div className='main_container_1 flex_center flex-col lg:flex-row' style={{color:'var(--dark-gray-color)'}}>
      {/* left bar */}
      <div className='w-20 h-full border-r border-slate-300 flex-col flex_between mHide'>
        <div className='w-10 mt-12'>
          <img src={logo_dp} alt="" />
        </div>
        <div className='w-full flex_between flex-col text-gray-500'>
           <FaUserFriends onClick={getFriends} className="text-2xl my-6"/>
           <FaUserSecret className="text-2xl my-6"/>
           <FaPowerOff onClick={handleLogout} className="text-2xl my-6 text-red-500 cursor-pointer"/>
        </div>
        <div className='flex_between flex-col mb-12'>
           <FaUserAlt className="mr-1 text-xl text-yellow-500"/>
        </div>
      </div>


      {/* left bar becomes top bar */}
      { !toggle.chatArea &&
        <div className="h-16 w-full flex_between border border-slate-500 mShow">
          <div className='w-8 ml-3'>
            <img src={logo_dp} alt="" />
          </div>
          <div className="h-full w-fit flex_center">
            <BsSearch onClick={()=>{setToggle({...toggle,search:true})}} className="text-xl mx-3"/>
            {
              toggle.search && (<div onClick={()=>{setToggle({...toggle,search:false})}} className="fixed w-full h-full top-0 right-0 z-10">
                <motion.div
                  whileInView={{ x: [400,0]}}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  onClick={(e)=>{e.stopPropagation()}}
                  className='menu z-10 top-16 relative right-0 h-1/2 font-medium py-2 w-full flex items-center border flex-col backdrop-blur-sm '
                >
                <div className="w-5/6 border rounded-full border-gray-400 mt-6 h-9 flex_between px-2">
                  <FaArrowLeft onClick={()=>{setToggle({...toggle,search:false})}} className="text-sm"/>
                  <input onChange={handleOnSearch} value={input.search} className='h-full w-full bg-transparent outline-none text-sm pl-3' placeholder='Search . . .'/>
                  <BsSearch onClick={handleSearchClick} className="text-sm"/>
                </div>
                <div className="w-5/6 h-2/3 my-5">
                  {
                    users.searched?.map((data)=>{
                      return <Chat key={data?._id}  clickFunction={handleNewClick} data={data} />
                    })
                  }
                </div>
              </motion.div>
              </div>)
            }
            <BsThreeDots onClick={()=>{setToggle({...toggle,menu:true})}} className="3dots text-2xl mx-3"/>
            {
              toggle.menu && (<div onClick={()=>{setToggle({...toggle,menu:false})}} className=" fixed w-full h-full top-0 right-0 z-10">
                <motion.div
                  whileInView={{ y: [-20,0], x:[20,0], opacity:[0,1], scale:[0,1] }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className='menu fixed z-10 top-12 right-0 h-fit font-medium py-2 w-40 border flex-col backdrop-blur-lg '
                >
                {/* <h1 className=" border-black p-2 hover:bg-blue-200 cursor-pointer">Chats</h1>
                <h1 className=" border-black p-2 hover:bg-blue-200 cursor-pointer">Friends</h1> */}
                <h1 onClick={()=>{setToggle({...toggle,menu:false});handleLogout()}} className=" p-2 hover:bg-blue-200 cursor-pointer">Logout</h1>
              </motion.div>
              </div>)
            }
          </div>
        </div>
      }
      <div className="h-full w-full flex_between">
        { (!toggle.chatArea || window.innerWidth>768) &&
        <div className="h-full w-full lg:w-80 relative flex_center flex-col">

          {/* people's panel */}
          <div className="w-11/12 border rounded-full  border-gray-400 my-6 h-9 flex_between px-2 mHide">
            <BsSearch onClick={handleSearchClick} className="text-sm cursor-pointer"/>
            <input onChange={handleOnSearch} value={input.search} className='h-full w-full bg-transparent outline-none text-sm pl-3' placeholder='Search . . .'/>
            
          </div>
          {
            toggle.searchedData && (<div onClick={()=>{setToggle({...toggle,searchedData:false})}} className="w-full absolute h-full z-10 flex flex-col items-center">
              <motion.div 
              whileInView={{ y: [-10,0]}}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onClick={(e)=>{e.stopPropagation()}}
              className=" backdrop-blur mt-16 border border-black w-11/12 p-2 h-fit max-h-72"
            >
              {
                users.searched?.map((data)=>{
                  return <Chat key={data?._id}  clickFunction={()=>{handleNewClick(data)}} data={data} />
                })
              }
            </motion.div>
            </div>)
          }

          <div className="w-full flex_between h-full flex-col">
            <div className="w-full h-1/3 p-2 ">
              <h2 className="heading_3  h-5">FAVOURITES</h2>
              <div className={`w-full h-[85%] text-xs ${users.favourites?.length===0?'flex_center':'flex-col'}`}>
                {
                  users.favourites?.length===0 && <span>You have no Favourites</span>
                }
                {
                  users.favourites?.map((data)=>{
                    return <Chat key={data?._id}  clickFunction={()=>{handleNewClick(data)}} data={data} />
                  })
                }
              </div>
            </div>
            <div className="w-full h-1/3 p-2 ">
              <h2 className="heading_3 h-5">RECENTS</h2>
              <div className={`w-full h-[85%] text-xs ${users.recents?.length===0?'flex_center':'flex-col'}`}>
                {
                  users.groups?.length===0 && <span>You have no Recents</span>
                }
                {
                  users.recents?.map((data)=>{
                    return <Chat key={data?._id}  clickFunction={()=>{handleNewClick(data)}} data={data} />
                  })
                }
              </div>
            </div>
            <div className="w-full h-1/3 p-2 ">
              <h2 className="heading_3 h-5">GROUPS</h2>
              <div className={`w-full h-[85%] text-xs ${users.groups?.length===0?'flex_center':'flex-col'}`}>
                {
                  users.groups?.length===0 && <span>You have no Groups</span>
                }
                {
                  users.groups?.length>0 && users.groups?.map((data)=>{
                    return <Chat key={data?._id}  clickFunction={()=>{handleNewClick(data)}} data={data} />
                  })
                }
              </div>
            </div>
          </div>
        </div>
        }

        { (window.innerWidth>768 || toggle.chatArea) &&
          <motion.div
            whileInView={{ opacity:[0,1], scale:[.6,1]}}
            transition={{ duration: .3, ease: 'easeOut' }}
            onClick={(e)=>{e.stopPropagation()}}
            className="flex_center h-full border flex-grow ">
            
            {currUser._id.length===0 &&
              <div className="w-fit h-fit flex_center flex-col">
                <img className="w-96" src={default_chat} alt=""/>
                <h1 className="heading_4 w-4/5 text-center sm:w-full">To begin a conversation, simply search for friends and start chatting.</h1>
              </div>
            }
            { currUser._id.length!==0 &&
      
            <div className="w-full h-full flex_center flex-col chatBackground">

              <div className="w-full h-16 border-b border-black flex_between backdrop-blur px-2 md:px-5">

                <div className='w-fit flex_center'>
                  <div onClick={()=>{setToggle({...toggle,chatArea:false})}} className="mShow w-10 aspect-square  border border-gray-500 flex_center rounded-full"><FaArrowLeft className="cursor-pointer"/></div>
                  <div className='w-12 ml-2 md:ml-4 aspect-square flex_center relative border border-gray-400 rounded-full font-medium'>
                    J
                  </div>
                  <div className='flex items-center w-full'>
                      <h1 className='font-medium mx-1 md:mx-3 text-gray-600'>{currUser.name}</h1>
                      {currUser.status && <p className="text-green-600 text-xs font-semibold">Online</p>}
                      {!currUser.status && <p className="text-gray-400 text-xs font-semibold">Offline</p>}
                  </div>
                </div>

                <div className='w-fit p-1 flex_center'>
                    <FaCamera className="text-xl cursor-pointer mx-2 md:mx-4"/>
                    <BsInfoCircle className="text-xl cursor-pointer mx-2 md:mx-4"/>
                    <BsThreeDots className="text-xl cursor-pointer mx-2 md:mx-4"/>
                </div>


              </div>

              <div className="w-full h-3/4 flex-grow flex-col p-2 transition-all" ref={chatContainerRef}>
                {
                  msgArray?.map((msgs)=>{
                    return <Messages key={msgs.time} direction={msgs.dir} txt={msgs.text} time={msgs.time} />
                  })
                }
              </div>

              <div className="w-full h-32 border-t border-black flex_center flex-col backdrop-blur">
                <h3 className="heading_2 w-[80%] mb-2 font-medium">{typing2 && <span>is typing . . .</span>}</h3>

                <div className="w-full flex_between h-10  mb-10">
                  <div className="h-full aspect-square border-2 border-cyan-500 rounded-full mx-1 md:mx-5 flex_center cursor-pointer"><BsFillMicFill className="text-xl text-cyan-500"/></div>

                  <div className="h-full flex-grow  flex_center border border-gray-400 rounded">
                    <input onChange={handleOnChange} value={input.message} className="h-full flex-grow bg-transparent font-medium outline-none text-sm px-2 md:px-4" placeholder="Type a message . . ."/>
                    <BsEmojiSmile className="text-xl mx-2 md:mx-3"/>
                    <BsPaperclip className="text-xl  mx-1 md:mx-3"/>
                  </div>

                  <div onClick={handleSend} className="h-full aspect-square border-2 border-cyan-500 rounded-full mx-1 md:mx-5 flex_center cursor-pointer"><BsSend className="text-xl text-cyan-500"/></div>
                </div>
              </div>

            </div>
            }
          </motion.div>
        }
        
        {/* <div className="flex_center h-full border-l border-slate-300 w-[350px] mHide flex-col">
          <div className="w-11/12 h-80 flex-col flex_center">
            <div className="w-11/12 flex justify-end items-center"><BsXSquare className="cursor-pointer text-lg"/></div>
            
            <div className='w-24 border border-black p-2 rounded-full'>
              <img src={logo_dp} alt="" />
            </div>
            
            <h2 className="heading_4 font-bold">John Wick</h2>
            
            <h2 className="heading_3 font-bold" style={{color: "blue"}}>About himself</h2>
            
            <div className="h-12 w-fit flex_center  mt-4">
              <button className="w-8 aspect-square rounded-full flex_center border p-1 border-gray-400 outline-none mx-3"><BsFillTelephoneFill className="text-xs text-gray-500"/></button>
              <button className="w-8 aspect-square rounded-full flex_center border p-1 border-gray-400 outline-none mx-3"><BsChatSquareDotsFill className="text-xs text-gray-500"/></button>
              <button className="w-8 aspect-square rounded-full flex_center border p-1 border-gray-400 outline-none mx-3"><BsFillCameraVideoFill className="text-xs text-gray-500"/></button>
            </div>
          </div>
          <div className="w-11/12 h-fit flex flex-grow flex-col">
            <h2 className="heading_2 w-full h-8">Shared Files</h2>
              <div className="w-full h-[250px] text-xs scroll-smooth p-2">
                <Files name="song.mp3" time="12 Jan, 2014" size="956.6 KB"/>
                <Files name="song.mp3" time="12 Jan, 2014" size="956.6 KB"/>
                <Files name="song.mp3" time="12 Jan, 2014" size="956.6 KB"/>
              </div>
          </div>
          <div className="w-11/12 h-[300px] py-2 mt-4 ">

            <div className="flex_between h-12 w-full border-t border-gray-400">
              <h1 className="heading_2 font-semibold mx-3">Add to Favourites</h1>
              <button className="px-3 py-1 text-xs rounded mx-3 border border-green-600 font-semibold text-green-600">Add</button>
              <button className="px-3 py-1 text-xs rounded mx-3 border border-red-500 font-semibold text-red-500">Remove</button>
            </div>

            <div className="flex_between h-12 w-full border-t border-gray-400 cursor-pointer hover:bg-blue-200">
              <h1 className="heading_2 font-semibold mx-3">Remove this Contact</h1>
            </div>

            <div className="flex_between h-12 w-full border-t border-gray-400 cursor-pointer hover:bg-blue-200">
              <h1 onClick={handleLogout} className="heading_2 font-semibold mx-3" style={{color:'red'}}>LOGOUT</h1> 
            </div>
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default Body;