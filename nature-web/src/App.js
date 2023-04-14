import { Route, Routes, Router } from 'react-router-dom';
import User from './containers/User/User';
import Movie from './containers/Movie/Movie';
import Fortune from './containers/Fortune/Fortune';
import PageNotFound from './app/pages/PageNotFound';
import { useEffect, useState } from 'react';
import Loading from './app/pages/Loading';
import Main from './containers/Main';
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
        <Route path='/*' element={<Main />} />
        {/* <Route path='/movie/*' element={<Movie />} />
        <Route path='/fortune' element={<Fortune />} /> */}
        <Route path='/' element={<User />} >
          <Route path='/signup' />
        </Route>
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
