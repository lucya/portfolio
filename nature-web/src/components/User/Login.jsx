import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import userAction from '../../actions/user/actions';
import { User } from '../../actions/user/types';
import logo from '../../logo.png';


function Login() {
  const [userState, setUserState] = useState(User)
  const dispatch = useDispatch();

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
    dispatch(userAction.login(userState));
  }

  return (
    <div className='user-wrap'>
      <img src={logo} className="app-logo" alt="logo" />
      <h3>로그인</h3>
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="form-wrap">
          <label>Email</label>
          <input type="email" name="email" onChange={handleChange} />
        </div>
        <div className="form-wrap">
          <label>Password</label>
          <input type="password" name="password" onChange={handleChange} />
        </div>
        <div className="btn-wrap">
          <button className="green" type="submit">로그인</button>
          <Link to='/signup'>
            회원 가입
          </Link>
        </div>
      </form>
    </div>
  )
}
export default Login;