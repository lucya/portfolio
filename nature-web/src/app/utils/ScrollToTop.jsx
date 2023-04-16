import { useEffect } from "react";
import { useLocation } from "react-router-dom"
import * as config from '../config'

function ScrollToTop({ stay }) {

  const { pathname } = useLocation();
  let top = 0;


  useEffect(() => {
    if (stay) {
      top = localStorage.getItem(config.SET_SCROLLY)
      localStorage.removeItem(config.SET_SCROLLY);
    }
    console.log('xxxxx', top)
    setTimeout(() => {
      document.querySelector('.App').children[0].scrollTo(0, top)
    }, 300);
  }, [pathname, top])
  return null;
}
export default ScrollToTop