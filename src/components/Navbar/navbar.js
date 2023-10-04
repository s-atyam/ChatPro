import React from 'react'
import logo_dp from './images/logo.png'
const Navbar = () => {
  return (
    <div className='h-16 w-full flex justify-around items-center mt-5 overflow-hidden'>
        <div className='w-2/5 flex md:w-[15%] md:mr-12 '>
          <img src={logo_dp} alt=''  />
        </div>
        <div className='w-fit h-fit m-2 p-2'>
            <button className='border-2 font-medium text-lg border-blue-500 text-blue-500 m-2 p-2 rounded-sm hover:text-blue-900 hover:border-blue-900'>Signup</button>
            <button className='border-2 font-medium text-lg border-green-500 text-green-500 m-2 p-2 rounded-sm hover:text-green-900 hover:border-green-900'>Login</button>
        </div>
    </div>
  )
}

export default Navbar