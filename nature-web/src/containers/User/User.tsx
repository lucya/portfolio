import React from "react";
import { Route, Routes } from "react-router-dom"
import Login from "../../components/User/Login";
import SignUp from "../../components/User/SignUp";
import Footer from "../../components/Footer/Footer";
import './User.css';

const User: React.FC = () => {

  return (
    <div className="user-container">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default User;