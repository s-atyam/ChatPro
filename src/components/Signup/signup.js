import React from 'react'
import logo_dp from '../images/logo.png'

const Signup = () => {
  return (
    <div className='h-screen w-screen bg-slate-900 flex justify-center items-center text-slate-400 flex-col'>
        <div className="w-2/3 md:w-1/6 flex mb-10">
            <img src={logo_dp} alt="" />
        </div>
        <form className='w-11/12 md:w-1/3 md:h-7/12 py-10 border-2 border-slate-700 rounded-md flex justify-center items-center flex-wrap'>
            <div className='w-11/12 h-fit flex flex-wrap'>
                <div className='w-full mb-4 md:mb-2 md:w-[47%] h-20 flex justify-center flex-col mr-auto'>
                    <label className='text-lg mb-1'>FIRST NAME *</label>
                    <input className='flex flex-grow outline-none bg-transparent border border-slate-700 pl-3 text-lg font-medium rounded-md focus:bg-slate-800' type='text' />
                </div>
                <div className='w-full mb-4 md:mb-2 md:w-[47%] h-20 flex flex-col md:ml-auto'>
                    <label className='text-lg mb-1'>LAST NAME</label>
                    <input className='flex flex-grow outline-none bg-transparent border border-slate-700 pl-3 text-lg font-medium rounded-md focus:bg-slate-800 ' type='text' />
                </div>
                <div className='w-full h-7'>
                    {/* <p className='text-red-600 font-medium'>*First name is required</p> */}
                </div>
            </div>
            <div className='w-11/12 h-fit flex  flex-wrap '>
                <div className='w-full mb-4 md:mb-2 h-20 flex justify-center flex-col mr-auto'>
                    <label className='text-lg mb-1'>EMAIL *</label>
                    <input className='flex flex-grow outline-none bg-transparent border border-slate-700 pl-3 text-lg font-medium rounded-md focus:bg-slate-800' type='email'  />
                </div>
                <div className='w-full h-7'>
                    {/* <p className='text-red-600 font-medium'>*Email is required</p> */}
                </div>
            </div>
            <div className='w-11/12 h-fit flex flex-wrap '>
                <div className='w-full mb-4 md:mb-2 md:w-[47%] h-fit flex justify-center flex-col mr-auto'>
                    <label className='text-lg mb-1'>PASSWORD *</label>
                    <input className='h-12 flex flex-grow outline-none bg-transparent border border-slate-700 pl-3 text-lg font-medium rounded-md focus:bg-slate-800' type='password'  />
                    <div className='w-full'>
                        {/* <p className='text-red-600 font-medium'>*Upper case and special character required</p> */}
                    </div>
                </div>
                <div className='w-full mb-4 md:mb-2 md:w-[47%] h-fit flex flex-col md:ml-auto'>
                    <label className='text-lg mb-1'>CONFIRM PASSWORD *</label>
                    <input className='h-12 flex flex-grow outline-none bg-transparent border border-slate-700 pl-3 text-lg font-medium rounded-md focus:bg-slate-800 ' type='password' />
                    <div className='w-full'>
                        {/* <p className='text-red-600 font-medium'>*Not matched with password</p> */}
                    </div>
                </div>
            </div>
            <div className='w-11/12 h-fit flex justify-center  flex-wrap mt-10'>
                <button className=' border text-lg font-semibold px-16 md:px-20 py-2 rounded-sm mx-auto border-slate-300 text-slate-300'>Back</button>
                <button className=' border text-lg font-semibold px-16 md:px-20 py-2 rounded-sm mx-auto border-blue-600 text-blue-600'>Submit</button>
                
            </div>
        </form>
        <p className='font-semibold text-lg mt-10'>Already a user? <span className='text-green-600 cursor-pointer'>Login</span></p>
    </div>
  )
}

export default Signup
