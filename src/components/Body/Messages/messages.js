import React from 'react'

const Messages = (props) => {
  return (
    <div className={`border w-fit max-w-[80%] h-fit min-h-fit font-normal my-1 p-2 border-slate-700 rounded-t-xl text-sm ${props.direction==="left"?'rounded-ee-xl':'ml-auto rounded-es-xl bg-slate-700 text-slate-300'}`}>
      <p className=''>This random sample message</p>
      <p className={`w-fit h-fit ml-auto text-[11px] ${props.direction==='left'?'text-slate-600':'text-slate-500'}`}>25 Mar 2023 - 9:00 PM</p>
    </div>

  )
}

export default Messages