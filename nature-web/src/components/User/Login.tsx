import React, { useEffect, useState, useRef } from 'react';
import { useAppDispatch } from '../../app/hooks'
import { Link } from 'react-router-dom';
import userAction from '../../actions/user/actions';
import { useLocation } from 'react-router-dom' 	// 1번 라인

import { User } from '../../actions/user/types';
import logo from '../../logo.png';

const Login: React.FC = () => {
  const { state } = useLocation(); // 회원 가입 화면에서 넘어온 값
  let email = ''
  if (state) {
    email = state.email;
  }
  const loginPwdRef = useRef<HTMLInputElement>(null)
  const loginEmailRef = useRef<HTMLInputElement>(null)

  const [userState, setUserState] = useState(User)
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (email) {
      setUserState({
        ...userState,
        email: email
      })
      loginPwdRef.current?.focus()
    }
    loginEmailRef.current?.focus()
  }, [])

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
          <input type="email" name="email" value={email} inputMode='email' autoComplete='off'
            onChange={handleChange} ref={loginEmailRef} />
        </div>
        <div className="form-wrap">
          <label htmlFor='password'>Password</label>
          <input type="password" name="password" autoComplete='off'
            onChange={handleChange} ref={loginPwdRef} />
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