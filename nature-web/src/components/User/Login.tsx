import React, { useState } from 'react';
import { useAppDispatch } from '../../app/hooks'
import { Link } from 'react-router-dom';
import userAction from '../../actions/user/actions';
import { User } from '../../actions/user/types';
import logo from '../../logo.png';


function Login() {
  const [userState, setUserState] = useState(User)
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserState({
      ...userState,
      [e.target.name]: e.target.value
    });
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(userAction.login(userState));
  }

  return (
    <div className='user-wrap'>
      <img src={logo} className="app-logo" alt="logo" />
      <h3>로그인</h3>
      <form className="form-container" autoComplete="off" onSubmit={handleSubmit}>
        <div className="form-wrap">
          <label htmlFor='email'>Email</label>
          <input type="email" name="email" inputMode='email' onChange={handleChange} />
        </div>
        <div className="form-wrap">
          <label htmlFor='password'>Password</label>
          <input type="password" name="password" onChange={handleChange} />
        </div>
        <div className="btn-wrap">
          <button type="submit">로그인</button>
          <Link to='/signup'>
            회원 가입
          </Link>
        </div>
      </form>
    </div>
  )
}
export default Login;