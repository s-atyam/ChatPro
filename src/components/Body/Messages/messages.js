import React from 'react'

const Messages = (props) => {
  return (
    <div className={`border w-fit max-w-[80%] h-fit min-h-fit font-medium my-1 p-2 border-slate-700 rounded-t-xl text-sm ${props.direction==="left"?'rounded-ee-xl':'ml-auto rounded-es-xl bg-slate-700 text-slate-300'}`}>
      <p className=''>{props.txt}</p>
      <p className={`w-fit h-fit ml-auto text-[11px] ${props.direction==='left'?'text-slate-600':'text-slate-500'}`}>{props.time}</p>
    </div>
  )
}

export default Messages