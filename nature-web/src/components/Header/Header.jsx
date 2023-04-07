import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import userAction from "../../actions/user/actions";
import AuthService from "../../services/AuthService";

import logo from "../../assets/images/text_logo.png";
import profile_base from "../../assets/images/profile_base.png";
import './Header.css';

function Header() {
  const [active, setActive] = useState(false);
  const authService = AuthService();
  const dispatch = useDispatch();
  const user = useSelector(state => state.userReducer);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(userAction.logout());
  }
  useEffect(() => {
    authService.authCheck();
  }, []);

  return (
    <>
      {(!user || !user.loggedIn) ?
        <Navigate to="/" replace={true} />
        :
        <div className='header-container'>
          <div className='header-wrap'>
            <div className='header-left-wrap'>
              <Link to='/' style={{
                display: 'flex'
              }}>
                <img
                  src={logo}
                  alt='로고'></img>
              </Link>
            </div>
            <div className='header-right-wrap'>
              <ul className="right-menu">
                <li>
                  <Link className='header-nav-item' to='/movies'>
                    인기영화
                  </Link>
                </li>,
                <li>
                  <Link className='header-nav-item' to='/products'>
                    홍당무
                  </Link>
                </li>
                {/* <li>
              <Link className='header-nav-item' to='person'>
                chatGPT 놀이
              </Link>
            </li> */}
                <li className="header-nav-user"
                  onMouseEnter={() => setActive(true)}
                  onMouseLeave={() => setActive(false)} >
                  <img src={user?.user?.photoURL || profile_base} alt="user" />
                  <span className="username">{user?.user?.username}</span>
                  <div className={active ? 'logout active' : 'logout'}>
                    <ul>
                      <li
                        onClick={handleLogout}>로그아웃</li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      }
    </>
  );
}
export default Header;