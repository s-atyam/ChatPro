import React from 'react'

const Chat = ({clickFunction, data}) => {
  return (
    <button onClick={clickFunction} className='w-11/12 p-2 lg:p-1 relative flex_center hover:bg-blue-200 rounded-full '>
        <div className='w-10 lg:w-8 aspect-square flex_center relative border border-gray-400 rounded-full font-medium'>
          K
        </div>
          {/* {!data.status && <p className='bg-gray-400 absolute left-9 bottom-3 lg:left-6 lg:bottom-1 w-[10px] h-[10px] lg:w-[8px] lg:h-[8px] rounded-full'></p>}
          {data.status && <p className='bg-green-500 absolute left-9 bottom-3 lg:left-6 lg:bottom-1 w-[10px] h-[10px] lg:w-[8px] lg:h-[8px] rounded-full'></p>} */}
        <div className='flex items-center w-full'>
            <h1 className='text-sm font-medium mx-3 text-gray-600'>{data.fName} {data.lName}</h1>
        </div>
    </button>
  )
}

export default Chat