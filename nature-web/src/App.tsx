import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import User from './containers/User/User';
import PageNotFound from './app/pages/PageNotFound';
import Main from './containers/Main';

const App: React.FC = () => {
  const preventClose = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = ""; //Chrome에서 동작하도록; deprecated
  };

  useEffect(() => {
    (() => {
      window.addEventListener("beforeunload", preventClose);
    })();

    return () => {
      window.removeEventListener("beforeunload", preventClose);
    };
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path='/*' element={<Main />} />
        <Route path='/' element={<User />} >
          <Route path='/signup' />
        </Route>
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
