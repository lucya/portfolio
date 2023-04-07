import { useState } from 'react';
import menu from '../../assets/images/menu_30.png';
import { useDispatch } from 'react-redux';
import userAction from "../../actions/user/actions";
import { Link } from 'react-router-dom';

function Hamburger() {
  const dispatch = useDispatch();
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(userAction.logout());
  }
  const [hamburgerOpen, setHamburgerOpen] = useState(false)
  const handleHamberger = () => {
    setHamburgerOpen(!hamburgerOpen);
  }
  return (
    <>
      <img src={menu} alt='menu' onClick={handleHamberger} />
      <div className='hamburger-menu' style={{ display: hamburgerOpen ? 'block' : 'none' }}>
        <ul>
          <li><Link to="/movies">인기영화</Link></li>
          <li>홍당무</li>
          <li onClick={handleLogout}>로그아웃</li>
        </ul>
      </div>
    </>
  )
}
export default Hamburger;