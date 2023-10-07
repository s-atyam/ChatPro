import React from 'react'
import Chat from './Chat/chat';
import Messages from './Messages/messages';
const Body = () => {
  return (
    <div className='bg-slate-900 text-slate-400 w-screen h-screen flex justify-center items-center'>

      <div className='min-w-[15rem] h-full border-r border-slate-700 flex flex-col justify-around items-center'>
        <div className='w-5/6 h-fit flex justify-center flex-wrap'>
          <button className='w-5/6 h-10 border border-slate-700 rounded-sm'>Logo</button>
        </div>
        <div className='w-5/6 h-fit flex justify-center flex-wrap'>
          <button className='w-2/3 h-10 border border-slate-700 my-2 rounded-sm'>Profile</button>
          <button className='w-2/3 h-10 border border-slate-700 my-2 rounded-sm'>Private</button>
          <button className='w-2/3 h-10 border border-slate-700 my-2 rounded-sm'>Friends</button>
        </div>
        <div className='w-5/6 h-fit flex justify-center flex-wrap'>
          <button className='w-2/3 h-10 border border-slate-700 my-2 rounded-sm'>Settings</button>
          <button className='w-2/3 h-10 border border-slate-700 my-2 rounded-sm'>Logout</button>
        </div>
      </div>

      <div className='h-full flex flex-grow flex-col '>

        <div className='w-full h-14 border-b border-slate-700 flex justify-between items-center'>
          <div className='w-96 h-full flex justify-center items-center'>
            <button className='h-2/3 aspect-square mx-1 border border-slate-700'></button>
            <input className='h-2/3 w-full bg-transparent outline-none border border-slate-700 text-sm pl-3' placeholder='Search . . .'></input>
          </div>
          <div className='w-40 h-full flex justify-center items-center mr-5'>
            <div className='h-4/5 aspect-square mx-1 border border-slate-700'></div>
            <div className='h-4/5 aspect-square mx-1 border border-slate-700'></div>
            <div className='h-4/5 aspect-square mx-1 border border-slate-700 rounded-full'></div>
          </div>
        </div>

        <div className='flex flex-grow'>
          <div className='w-96 h-full border-r border-slate-700'>
            <Chat/>
            <Chat/>
            <Chat/>
          </div>
        
          {/* <div className='w-[70%] h-full flex justify-center items-center'>No new messages</div> */}
          <div className='w-[70%] flex-grow h-full flex flex-col justify-between items-center'>
            <div className='flex items-center w-full border-b border-slate-700 h-14'>
              <div className=' h-2/3 aspect-square border border-slate-700 ml-2'></div>
              <div className=' h-5/6 w-fit ml-2'>
                <p className=''>Full Name</p>
                <p className='text-xs font-semibold text-slate-600'>Offline . Last seen 5 hours ago</p>
              </div>
              <div className='ml-auto flex h-5/6 mr-4'>
                <div className='h-full mx-1 flex justify-center items-center aspect-square border border-slate-700'>P</div>
                <div className='h-full mx-1 flex justify-center items-center aspect-square border border-slate-700'>V</div>
                <div className='h-full mx-1 flex justify-center items-center aspect-square border border-slate-700'>3</div>
              </div>
            </div>
            <div className='h-3/4 max-h-[40rem] flex-grow w-[96%] max-w-6xl my-5 border border-slate-700 p-2'>
              <Messages direction="left"/>
              <Messages direction="right"/>
              <Messages direction="left"/>
              <Messages direction="left"/>
              <Messages direction="right"/>
              <Messages direction="left"/>
            </div>
            <div className='w-[96%] h-14 mb-5 flex justify-between items-center'>
              <button className='h-2/3 aspect-square ml-2 border border-slate-700 text-slate-500 text-xl rounded-full'>0</button>
              <input className='flex flex-grow h-3/4 bg-transparent outline-0 mx-2 border border-slate-700 px-3' placeholder='Type a message here ...'></input>
              <button className='h-3/4 w-fit mr-2 px-4 border border-slate-700 text-md'>Send</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Body;