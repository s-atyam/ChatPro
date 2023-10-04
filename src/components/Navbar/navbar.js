import React from 'react'

const Navbar = () => {
  return (
    <div className='h-16w-full  flex justify-around items-center'>
        <div className='text-slate-200 text-xl font-medium'>hello</div>
        <div className='w-fit h-fit m-2 p-2'>
            <button className='border-2 font-medium text-lg border-blue-500 text-blue-500 m-2 p-2 rounded-sm hover:text-blue-900 hover:border-blue-900'>Signup</button>
            <button className='border-2 font-medium text-lg border-green-500 text-green-500 m-2 p-2 rounded-sm hover:text-green-900 hover:border-green-900'>Login</button>
        </div>
    </div>
  )
}

export default Navbar