import React from 'react';
import { Route, Routes } from 'react-router-dom';

import User from './containers/User/User';
import PageNotFound from './app/pages/PageNotFound';
import Main from './containers/Main';


const App: React.FC = () => {
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
