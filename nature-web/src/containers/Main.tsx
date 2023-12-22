import React, { useEffect, useState } from "react"
import { Route, Routes, Navigate, PathRouteProps } from "react-router-dom"
import Footer from "../components/Footer/Footer"
import Header from "../components/Header/Header"
import Movie from "./Movie/Movie"
import Fortune from "./Fortune/Fortune"
import PageNotFound from "../app/pages/PageNotFound"
import GoToTop from "../app/utils/GoToTop"
import About from "../components/Home/About"
import './Main.css'

import http from "../app/http-common"

const isAuthenticated = async () => {
  await http.get('/api/user/check')
}
interface AuthRouteProps extends PathRouteProps {
  children: React.ReactElement;
}
const AuthRoute: React.FC<AuthRouteProps> = ({ children }) => {
  isAuthenticated();
  return children;
}

const Main: React.FC = () => {
  return (
    <div className="main-container">
      <Header />
      <Routes>
        <Route path='/home' element={<AuthRoute><About /></AuthRoute>} errorElement={<PageNotFound />} />
        <Route path='/movies' element={<AuthRoute><Movie /></AuthRoute>} errorElement={<PageNotFound />} />
        <Route path='/movie/*' element={<AuthRoute><Movie /></AuthRoute>} errorElement={<PageNotFound />} />
        <Route path='/fortune' element={<AuthRoute><Fortune /></AuthRoute>} errorElement={<PageNotFound />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
      <GoToTop />
      <Footer />
    </div>
  )
}
export default Main