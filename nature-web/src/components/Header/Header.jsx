import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import userAction from "../../actions/user/actions";
import './Header.css'

function Header() {
  // TODO: 임시
  const loggedIn = true;
  const [active, setActive] = useState(false);

  const user = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  const handleToggle = () => {
    setActive((active) => !active);
  };
  const handleLogout = (e) => {
    e.preventDefault();
    alert('logout');
    // dispatch(userAction.logout());
    window.location.href = '/';
  }

  return (
    <div className='header-container'>
      <div className='header-wrap'>
        <div className='header-left-wrap'>
          <Link to='/' style={{
            display: 'flex'
          }}>
            <img
              src='https://firebasestorage.googleapis.com/v0/b/nature-portfolio-7b1db.appspot.com/o/text_logo.png?alt=media&token=8159f504-72fa-40e0-b279-4981c06de99a'
              alt='로고'></img>
          </Link>
          <Header />
        </div>
        <div className='header-right-wrap'>
          <ul>
            <li>
              <Link className='header-nav-item' to='/movies'>
                영화
              </Link>
            </li>
            <li>
              <Link className='header-nav-item' to='/products'>
                홍당무
              </Link>
            </li>
            {/* <li>
              <Link className='header-nav-item' to='person'>
                인물
              </Link>
            </li> */}
            {loggedIn &&
              <li className="header-nav-user" onClick={handleToggle}>
                <img src="https://firebasestorage.googleapis.com/v0/b/nature-portfolio-7b1db.appspot.com/o/noun_Cat_215103.png?alt=media&token=2d820331-5301-4269-afce-cd8e0089ee97" alt="user photo" />
                <span className="username">Nature</span>
                <div className={active ? 'logout active' : 'logout'}>
                  <Link to='/' onClick={handleLogout}>
                    로그아웃
                  </Link>
                </div>
              </li>
            }
          </ul>
        </div>

      </div>
    </div>
  );
}
export default Header;