import { Link } from "react-router-dom";
import './Header.css'

function Header() {
  return (
    <div className='header-container'>
      <div className='header-wrap'>
        <div className='header-left-wrap'>
          <Link to='/' style={{
            display: 'flex', alignItems: 'center'
          }}>
            <img
              style={{ width: "154px", height: "20px" }}
              src='https://firebasestorage.googleapis.com/v0/b/nature-portfolio-7b1db.appspot.com/o/text_logo.png?alt=media&token=8159f504-72fa-40e0-b279-4981c06de99a'
              alt='로고'></img>
          </Link>
          <ul>
            <li>
              <Link className='header-nav-item' to='movie'>
                영화
              </Link>
            </li>
            <li>
              <Link className='header-nav-item' to='tv'>
                TV
              </Link>
            </li>
            <li>
              <Link className='header-nav-item' to='person'>
                인물
              </Link>
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
}
export default Header;