import React from 'react'
import img_dp from './images/chat.gif'
const Body = () => {
  return (
    <div className='text-slate-400 w-full h-fit md:h-5/6 mb-36 md:mb-0 flex justify-center items-center flex-wrap'>
      <div className='h-2/5 flex md:h-3/5 md:mr-12'>
        <img src={img_dp} alt='' className='mx-auto' />
      </div>
      <div className='w-5/6  md:w-2/5 h-fit flex flex-col '>
        <h1 className='font-light text-8xl mb-1 overflow-hidden'>Chat<span className='text-blue-600'>Pro</span> </h1>
        <h2 className='font-normal text-3xl ml-1 mb-5 overflow-hidden'>Elevating Your Digital Discourse</h2>
        <p className='font-semibold text-lg mb-10'>Welcome to Chat<span className='text-blue-600'>Pro</span>, the ultimate platform designed to amplify your daily digital interactions. Chat<span className='text-blue-600'>Pro</span> empowers you with a suite of cutting-edge features to optimize your online communication and redefine your digital landscape</p>
        <button className='border-2 border-slate-400 font-semibold w-fit px-8 py-2 rounded-md hover:text-blue-500 hover:border-blue-500'>Get Started</button>
      </div>
    </div>
  )
}

export default Body;