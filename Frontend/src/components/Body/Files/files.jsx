import React from 'react'
import { BsDownload } from 'react-icons/bs'
import icons from '../../../assets/icons'

const files = ({ name, time, size }) => {
  return (
    <div className="w-full flex_between h-11 my-2">
      <div className="w-10 p-1 border border-gray-400 rounded-sm"><img src={icons.figma} /></div>
      <div className="flex justify-between pl-3 flex-col flex-grow">
        <h2 className="heading_2 my-1 font-medium ">{name}</h2>
        <h2 className="heading_3">{time} - {size}</h2>
      </div>
      <div className=' p-1 cursor-pointer'><BsDownload className="text-xl"/></div>
    </div>
  )
}

export default files