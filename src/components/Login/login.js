import React from 'react'
import logo_dp from '../images/logo.png'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className='h-screen w-screen bg-slate-900 flex justify-center items-center text-slate-400 flex-col'>
        <div className="w-2/3 md:w-1/6 flex mb-10">
            <img src={logo_dp} alt="" />
        </div>
        <form className='w-11/12 md:w-[22%] py-10 border-2 border-slate-700 rounded-md flex justify-center items-center flex-wrap'>
            <div className='w-5/6 h-fit flex flex-wrap'>
                <div className='w-full h-20 flex justify-center flex-col mr-auto'>
                    <label className='text-sm mb-1'>EMAIL *</label>
                    <input className='flex h-10 outline-none bg-transparent border border-slate-700 pl-3 text-md font-medium rounded-md focus:bg-slate-800' type='email'  />
                </div>
                <div className='w-full h-6'>
                    <p className='text-red-600 text-sm font-medium'>*Email is required</p>
                </div>
            </div>
            <div className='w-5/6 h-fit flex flex-wrap'>
                <div className='w-full h-20 flex justify-center flex-col mr-auto'>
                    <label className='text-sm mb-1'>PASSWORD *</label>
                    <input className='flex h-10 outline-none bg-transparent border border-slate-700 pl-3 text-md font-medium rounded-md focus:bg-slate-800' type='password'  />
                </div>
                <div className='w-full h-6'>
                    <p className='text-red-600 text-sm font-medium'>*Password is required</p>
                </div>
                <div className='w-full'>
                    <p className='text-blue-400 text-sm cursor-pointer'>Forgot Password?</p>
                </div>
            </div>
            <div className='w-11/12 h-fit flex justify-center  flex-wrap mt-10 '>
                <Link to='/' className=' border outline-none text-sm font-semibold px-16 md:px-12 py-2 rounded-sm mx-auto hover:bg-slate-800 border-slate-300 text-slate-300'>Back</Link>
                <button className=' border outline-none text-sm font-semibold px-16 md:px-12 py-2 rounded-sm mx-auto hover:bg-slate-800 border-blue-600 text-blue-600'>Submit</button>
            </div>
        </form>
        <p className='font-semibold text-sm mt-10'>New to ChatPro? <Link to='/signup' className='text-blue-600 cursor-pointer'>Signup</Link></p>
    </div>
  )
}

export default Login
