import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../../components/User/Login";
import SignUp from "../../components/User/SignUp";
import './User.css';

function User() {
  return (
    <div className="app-container">

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>

    </div>
  );
}

export default User;