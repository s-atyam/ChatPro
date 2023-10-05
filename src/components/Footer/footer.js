import React from 'react'

const Footer = () => {
  return (
    <div className='text-slate-400 md:text-lg font-semibold w-full flex items-center justify-center flex-grow '>
        <span className='mr-3'>Contact</span>
        <span className='mr-3'>.</span>
        <span className='mr-3'>Feedback</span>
        <span className='mr-3'>.</span>
        <span className='mr-3 text-blue-700'>Terms of Service <span className='text-slate-400'>and</span> Privacy Policy</span>
        <span className='mr-3'>.</span>
        <span className='mr-3'>About us</span>
    </div>
  )
}

export default Footer;