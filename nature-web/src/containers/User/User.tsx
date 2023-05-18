import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../../components/User/Login";
import SignUp from "../../components/User/SignUp";
import './User.css';
import { useSelector } from "react-redux";
import Footer from "../../components/Footer/Footer";
import { RootState } from "../../app/store";

function User() {
  const user = useSelector((state:RootState) => state.userReducer);

  return (
    <div className="user-container">
      {(user && user.loggedIn) && (
        <Navigate to="/home" replace={true} />
      )}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default User;