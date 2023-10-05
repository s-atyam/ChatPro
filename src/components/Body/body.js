import React from 'react'
import Chat from './Chat/chat';
const Body = () => {
  return (
    <div className='bg-slate-900 text-slate-400 w-screen h-screen flex justify-center items-center'>

      <div className='w-60 h-full border-r border-slate-700 flex flex-col justify-around items-center'>
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

        <div className='w-full h-14 border-b border-slate-700 flex justify-center items-center'>hello</div>

        <div className='flex flex-grow'>
          <div className='w-[30%] h-full border-r border-slate-700'>
            <Chat/>
            <Chat/>
            <Chat/>
            <Chat/>
            <Chat/>
          </div>
        
          <div className='w-[70%] h-full flex justify-center items-center'>No new messages</div>
        </div>

      </div>
    </div>
  )
}

export default Body;