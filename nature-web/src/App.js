import { BrowserRouter, Route, Routes } from 'react-router-dom';
import User from './containers/User/User';
import Movie from './containers/Movie/Movie';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/movies' element={<Movie />} />
          <Route path='/*' element={<User />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
