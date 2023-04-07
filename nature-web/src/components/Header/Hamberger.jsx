import { useEffect, useRef, useState } from 'react';
import menu from '../../assets/images/menu_30.png';
import { useDispatch } from 'react-redux';
import userAction from "../../actions/user/actions";
import { Link } from 'react-router-dom';

function Hamburger() {
  const dropMenuRef = useRef(null);
  const dispatch = useDispatch();
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(userAction.logout());
  }
  const [hamburgerOpen, setHamburgerOpen] = useState(false)
  const handleHamberger = () => {
    setHamburgerOpen(!hamburgerOpen);
  }
  useEffect(() => {

    const handleOutsideClose = (e) => {
      e.preventDefault();
      // useRef current에 담긴 엘리먼트 바깥을 클릭 시 드롭메뉴 닫힘
      if (hamburgerOpen && (!dropMenuRef.current.contains(e.target))) setHamburgerOpen(false);
    }

    document.addEventListener('click', handleOutsideClose);
    return () => document.removeEventListener('click', handleOutsideClose);
  }, [hamburgerOpen])
  return (
    <>
      <img src={menu} alt='menu' ref={dropMenuRef} onClick={handleHamberger} />
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