import { FaUserAlt } from "react-icons/fa";
import React from 'react'

const Chat = (props) => {
  return (
    <button onClick={props.clickFunction} className='w-full h-14 border-b px-1 border-slate-700 flex justify-center items-center'>
        <div className='h-4/5 aspect-square my-1 flex justify-center items-center'><FaUserAlt/></div>
        <div className='flex w-full justify-center items-center flex-col h-5/6 mx-2'>
            <div className='w-full h-fit flex justify-between mx-2'>
                <div className='flex w-2/3 justify-between'>
                    <h1 className='text-sm font-medium'>{props.name}</h1>
                    {/* <p className='text-green-500 text-[10px] font-bold'>Online</p> */}
                </div>
                <h1 className='text-[11px] text-slate-500 font-semibold'>25 Mar 2023 - 9:00 PM</h1>
            </div>
            <div className='w-full h-fit flex justify-between mx-2'>
                <p className='w-full text-xs flex text-slate-500 font-medium'>Some random text message... </p>
                {/* <p className='text-[10px] font-bold text-slate-900  w-[18px] rounded-full bg-slate-300'>5</p> */}
            </div>
            
        </div>
    </button>
  )
}

export default Chat