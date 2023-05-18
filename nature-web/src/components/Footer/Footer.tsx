import './Footer.css'
import github from '../../assets/images/github50.png'

function Footer() {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.open('https://github.com/lucya/portfolio', '_blank')
  }
  return (
    <div className="footer-container">
      <div className='footer-wrap'>
        <div>
          neddang@gmail.com
          <button onClick={handleClick}>
            ・ <img src={github} alt='github' />
          </button>
        </div>
        <div>Copyright © 네이처 포트폴리오. All rights reserved</div>
      </div>
    </div>
  )
}
export default Footer;