import React from 'react'
import logo_dp from '../images/logo.png'
import { Link } from 'react-router-dom'

const Signup = () => {
  return (
    <div className='h-screen w-screen bg-slate-900 flex justify-center items-center text-slate-400 flex-col'>
        <div className="w-2/3 md:w-1/6 flex mb-10">
            <img src={logo_dp} alt="" />
        </div>
        <form className='w-11/12 md:w-1/3 md:h-7/12 py-10 border-2 border-slate-700 rounded-md flex justify-center items-center flex-wrap'>
            <div className='w-11/12 h-fit flex flex-wrap mb-4 md:mb-0 '>
                <div className='w-full md:w-[48%] h-fit flex flex-col mr-auto'>
                    <label className='text-sm mb-1'>FIRST NAME *</label>
                    <input className='flex h-9 outline-none bg-transparent border border-slate-700 pl-3 text-lg font-medium rounded-md focus:bg-slate-800' type='text' />
                    <div className='w-full h-6 mt-1'>
                        {/* <p className='text-red-600 font-medium text-xs'>*First name is required</p> */}
                    </div>
                </div>
                <div className='w-full md:w-[48%] flex h-fit flex-col'>
                    <label className='text-sm mb-1'>LAST NAME</label>
                    <input className='flex h-9 outline-none bg-transparent border border-slate-700 pl-3 text-lg font-medium rounded-md focus:bg-slate-800 ' type='text' />
                </div>
            </div>
            <div className='w-11/12 h-fit flex flex-wrap '>
                <div className='w-full flex h-fit flex-col'>
                    <label className='text-sm mb-1'>EMAIL *</label>
                    <input className='flex h-9 outline-none bg-transparent border border-slate-700 pl-3 text-lg font-medium rounded-md focus:bg-slate-800 ' type='email' />
                </div>
                <div className='w-full h-6 mt-1'>
                    {/* <p className='text-red-600 font-medium text-xs'>*Email is required</p> */}
                </div>
            </div>
            <div className='w-11/12 h-fit flex flex-wrap mb-4 md:mb-0 '>
                <div className='w-full md:w-[48%] h-fit flex flex-col mr-auto'>
                    <label className='text-sm mb-1'>PASSWORD *</label>
                    <input className='flex h-9 outline-none bg-transparent border border-slate-700 pl-3 text-lg font-medium rounded-md focus:bg-slate-800' type='password' />
                    <div className='w-full h-6 mt-1'>
                        {/* <p className='text-red-600 font-medium text-xs'>*Uppercase and special character required</p> */}
                    </div>
                </div>
                <div className='w-full md:w-[48%] flex h-fit flex-col'>
                    <label className='text-sm mb-1'>CONFIRM PASSWORD *</label>
                    <input className='flex h-9 outline-none bg-transparent border border-slate-700 pl-3 text-lg font-medium rounded-md focus:bg-slate-800 ' type='password' />
                    <div className='w-full h-6 mt-1'>
                        {/* <p className='text-red-600 font-medium text-xs'>*Password does not match</p> */}
                    </div>
                </div>
            </div>
            <div className='w-11/12 h-fit flex justify-center  flex-wrap md:mt-5'>
                <Link to='/' className=' border text-sm font-semibold px-12 md:px-16 py-2 md:py-1  rounded-sm mx-auto border-slate-300 text-slate-300'>Back</Link>
                <button className=' border text-sm font-semibold px-12 md:px-16 py-2 md:py-1  rounded-sm mx-auto border-blue-600 text-blue-600'>Submit</button>
                
            </div>
        </form>
        <p className='font-semibold text-md mt-10'>Already a user? <Link to='/login' className='text-green-600 cursor-pointer'>Login</Link></p>
    </div>
  )
}

export default Signup
