import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import Timeline from "../Pages/Timeline";
import User from "../Pages/User";
const Rotues = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Timeline />} />
      <Route path="/user" element={<User />} />
    </Routes>
  );
};

export default Rotues;
