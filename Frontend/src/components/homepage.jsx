import React from "react";
import img_dp from '../assets/images/chat.gif'
import logo_dp from '../assets/images/logo.png'
import { Link } from "react-router-dom";

const Homepage = () => {
  
  return (
    <div className="main_container_1 flex_between flex-col" style={{color:'var(--dark-gray-color)'}}>
      
      {/* navbar */}
      <div className="main_container_3 mt-3 flex_around border-b-2 py-2">
        <div className="w-1/3 md:w-[24%] lg:w-[14%]">
          <img src={logo_dp} alt="" />
        </div>

        <div className="w-fit flex">
          <Link to='/signup' className="button_1 mx-2"> SIGNIN </Link>
          <Link to='/login' className="button_1 mx-2"> LOGIN </Link>
        </div>

      </div>

      {/* info */}
      <div className="w-full h-5/6 flex_center flex-wrap">
        <div className="h-2/5 flex md:h-1/2  lg:mr-12">
          <img src={img_dp} alt="" />
        </div>

        <div className="main_container_2 lg:w-2/5 flex flex-col py-2">
          <h1 className="font-light text-6xl py-2">
            Chat<span className="text-blue-600">Pro</span>
          </h1>

          <h2 className="font-normal text-xl mb-4">
            Elevating Your Digital Discourse
          </h2>

          <p className="font-medium text-md mb-10">
            Welcome to Chat<span className="text-blue-600">Pro</span>, the
            ultimate platform designed to amplify your daily digital
            interactions. Chat<span className="text-blue-600">Pro </span>
            empowers you with a suite of cutting-edge features to optimize your
            online communication and redefine your digital landscape
          </p>

          <Link to='/signup' className="button_1 w-fit">
            Get Started
          </Link>
        </div>
      </div>

      {/* footer */}
      <div className="font-semibold w-full flex_center flex-wrap mb-4 pt-4 border-t-2 ">
        <span className="mx-5 text-sm">Contact</span>
        <span className="mx-5 text-sm">Feedback</span>
        <span className="mx-5 text-sm">About us</span>
        <span className="mx-5 text-sm text-blue-700">
          Terms of Service <span className="text-slate-400">and</span> Privacy
          Policy
        </span>
      </div>
    </div>
  );
};

export default Homepage;
