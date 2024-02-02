import React from "react";
import Login from "./components/login";
import Homepage from "./components/homepage";
import { Route, Routes } from "react-router-dom";
import Signup from "./components/signup";
import Body from "./components/Body/body";
import UserState from "./context/userState";

export default function App() {
  return (
    <>
    <UserState>
      <div className='gradient'/>
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/user" element={<Body/>} />
      </Routes>
    </UserState>
    </>
  )
}