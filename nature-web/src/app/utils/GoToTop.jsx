import { useEffect, useMemo, useState } from "react";
import styled from 'styled-components'

const GoUp = styled.div`
& {
  position: fixed;
  right: 16px;
  bottom: 30px;
  border-radius: 50%;
  padding: 7px;
  background-color: #2fcece;
  cursor: pointer;
  /* font-weight: 900; */
  font-size: 20px;
  display: ${(props) => (props.upActive === true ? 'block' : 'none')};  
  z-index: 99;
  outline: none;
}
&:hover {
  background-color: var(--color-active);
}
`
function GoToTop() {
  const [upActive, setUpActive] = useState(false);
  const [elm, setElm] = useState(null)

  const handleGoup = (e) => {
    e.preventDefault();
    elm.scroll({
      top: 0,
      behavior: 'smooth'
    })
  }
  const handleScroll = (e) => {
    const hasScroll = elm.scrollHeight > elm.offsetHeight
    hasScroll ? setUpActive(true) : setUpActive(false);
  };

  useEffect(() => {
    setElm(document.querySelector('.main-container'))
    elm?.addEventListener('scroll', handleScroll)
  }, [elm])


  return (
    <GoUp upActive={upActive} onClick={handleGoup}>🔝</GoUp>
  )
}
export default GoToTop