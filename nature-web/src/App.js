import { Route, Routes, Router } from 'react-router-dom';
import User from './containers/User/User';
import Movie from './containers/Movie/Movie';
import PageNotFound from './app/pages/PageNotFound';
import { useEffect, useState } from 'react';
import Loading from './app/pages/Loading';
import Fortune from './components/Chatgpt/Fortune';
// import ScrollToTop from './app/utils/ScrollToTop';

function App() {
  // const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   const start = () => {
  //     // NProgress.start();
  //     setLoading(true);
  //   };
  //   const end = () => {
  //     // NProgress.done();
  //     setLoading(false);
  //   };

  //   Router.events.on("routeChangeStart", start);
  //   Router.events.on("routeChangeComplete", end);
  //   Router.events.on("routeChangeError", end);

  //   return () => {
  //     Router.events.off("routeChangeStart", start);
  //     Router.events.off("routeChangeComplete", end);
  //     Router.events.off("routeChangeError", end);
  //   };
  // }, []);
  // if (loading) {
  //   return (<Loading />)
  // }
  return (
    <div div className="App" >
      <Routes>
        <Route path='/movies' element={<Movie />} />
        <Route path='/movie/*' element={<Movie />} />
        <Route path='/fortune' element={<Fortune />} />
        <Route path='/' element={<User />} >
          <Route path='/signup' />
        </Route>
        {/* <Route path='/signup' element={<User />} /> */}
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
