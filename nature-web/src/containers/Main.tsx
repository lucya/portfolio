import { Route, Routes } from "react-router-dom"
import Footer from "../components/Footer/Footer"
import Header from "../components/Header/Header"
import Movie from "./Movie/Movie"
import Fortune from "./Fortune/Fortune"
import PageNotFound from "../app/pages/PageNotFound"
import './Main.css'
import GoToTop from "../app/utils/GoToTop"
import Home from "../components/Home/Home"

const Main: React.FC = () => {
  return (
    <div className="main-container">
      <Header />
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/movies' element={<Movie />} />
        <Route path='/movie/*' element={<Movie />} />
        <Route path='/fortune' element={<Fortune />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
      <GoToTop />
      <Footer />
    </div>
  )
}
export default Main