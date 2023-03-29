import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../../actions/user/actions';
import { UserState } from '../../actions/user/types';
import logo from '../../logo.png';


function Login() {
  const [userState, setUserState] = useState(UserState)
  // const dispatch = useDispatch();

  const handleChange = (e) => {
    setUserState({
      ...userState,
      [e.target.name]: e.target.value
    });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userState)
    // TODO: dispatch call action
    // dispatch(login(userState));
  }
  return (
    <div className='user-wrap'>
      <img src={logo} className="app-logo" alt="logo" />

      <form className="form-container" onSubmit={handleSubmit}>
        <div className="form-wrap">
          <label>Email</label>
          <input type="email" name="email" onChange={handleChange} />
        </div>
        <div className="form-wrap">
          <label>Password</label>
          <input type="password" name="password" onChange={handleChange} />
        </div>
        <button className="green" type="submit">로그인</button>
        <Link to='/signup'>
          <button className="green">가입</button>
        </Link>
      </form>
    </div>
  )
}
export default Login;