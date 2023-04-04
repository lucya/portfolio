import React, { useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Login from "../../components/User/Login";
import SignUp from "../../components/User/SignUp";
import './User.css';
import { useSelector } from "react-redux";
import { useCookies } from 'react-cookie';

function User() {
  const user = useSelector(state => state.userReducer);
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['access-token', 'refresh-token']);

  const authCheck = () => {
    const token = cookies;
    console.log('cookies', token);
    // Todo: 서버에서 체크 해야함
    if (token['access_token']) {
      navigate('/movies');
      // window.location.href = '/movies';
    } else {
      navigate('/');
    }
  }
  useEffect(() => {
    authCheck();
    console.log('처음 렌더링 때만 실행');
  }, []);

  return (
    <div className="app-container">
      {(user && user.loggedIn) && (
        <Navigate to="/movies" replace={true} />
      )}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>

    </div>
  );
}

export default User;