import { BrowserRouter, Route, Routes } from 'react-router-dom';
import User from './containers/User/User';
import Movie from './containers/Movie/Movie';
import PageNotFound from './app/pages/PageNotFound';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/movies' element={<Movie />} />
          <Route path='/movie/*' element={<Movie />} />
          <Route path='/' element={<User />} >
            <Route path='/signup' />
          </Route>
          {/* <Route path='/signup' element={<User />} /> */}
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
