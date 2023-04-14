import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../../components/User/Login";
import SignUp from "../../components/User/SignUp";
import './User.css';
import { useSelector } from "react-redux";
import AuthService from "../../services/AuthService";
import Footer from "../../components/Footer/Footer";

function User() {
  const user = useSelector(state => state.userReducer);
  const authService = AuthService();

  // useEffect(() => {
  //   authService.authCheck();
  //   console.log('처음 렌더링 때만 실행');
  // }, []);

  return (
    <div className="user-container">
      {(user && user.loggedIn) && (
        <Navigate to="/movies" replace={true} />
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