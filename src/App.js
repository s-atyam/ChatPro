import React from "react";
import Navbar from "./components/Navbar/navbar";
import Body from "./components/Body/body";
import Footer from "./components/Footer/footer";

export default function App() {
  return (
    <div className="w-screen h-screen bg-slate-900 flex flex-col">
    <Navbar/>
    <Body/>
    <Footer/>
    </div>
  )
}