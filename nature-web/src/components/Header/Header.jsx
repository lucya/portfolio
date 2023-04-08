import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import userAction from "../../actions/user/actions";
import AuthService from "../../services/AuthService";
import logo from "../../assets/images/text_logo.png";
import profile_base from "../../assets/images/profile_base.png";
import './Header.css';
import DropdownMenu from "./DropdownMenu";

function Header() {
  const [isShow, setIsShow] = useState(false);
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
              <div className='navigation'>
                <ul className="right-menu">
                  <li>
                    <Link className='header-nav-item' to='/movies'>
                      인기영화
                    </Link>
                  </li>
                  <li>
                    <Link className='header-nav-item' to='/products'>
                      얘놀자
                    </Link>
                  </li>
                  <li className="header-nav-item">|</li>
                  <li>
                    <Link className='header-nav-item' onClick={handleLogout}>
                      로그아웃
                    </Link>
                  </li>
                </ul>
                <div className="dropdown-menu">
                  <DropdownMenu />
                </div>
                <div className="header-nav-user"
                  onMouseEnter={() => setIsShow(true)}
                  onMouseLeave={() => setIsShow(false)}>
                  <img src={user?.user?.photoURL || profile_base} alt="user" />
                  <span className={isShow ? 'username show' : 'username'}>{user?.user?.username}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
}
export default Header;