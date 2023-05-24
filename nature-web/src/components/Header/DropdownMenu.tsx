import { useEffect, useRef, useState } from 'react';
import menu from '../../assets/images/menu_30.png';
import { useAppDispatch } from '../../app/hooks'

import userAction from "../../actions/user/actions";
import { Link } from 'react-router-dom';

const DropdownMenu: React.FC = () => {
  const dropMenuRef = useRef<HTMLImageElement>(null);
  const dispatch = useAppDispatch();
  const handleLogout = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    dispatch(userAction.logout());
  }
  const [menuOpen, setMenuOpen] = useState(false)
  const handleOpen = () => {
    setMenuOpen(!menuOpen);
  }
  useEffect(() => {

    const handleOutsideClose = (e: any) => {
      e.preventDefault();
      // useRef current에 담긴 엘리먼트 바깥을 클릭 시 드롭메뉴 닫힘
      if (menuOpen && (!dropMenuRef.current?.contains(e.target))) setMenuOpen(false);
    }

    document.addEventListener('click', handleOutsideClose);
    return () => document.removeEventListener('click', handleOutsideClose);
  }, [menuOpen])
  return (
    <>
      <img src={menu} alt='menu' ref={dropMenuRef} onClick={handleOpen} />
      <div className='drop-menu' style={{ display: menuOpen ? 'block' : 'none' }}>
        <ul>
          <li><Link to="/movies">인기영화</Link></li>
          <li><Link to="/fortune">운세마법사</Link></li>
          <li onClick={handleLogout}>로그아웃</li>
        </ul>
      </div>
    </>
  )
}
export default DropdownMenu;