import styled, { keyframes } from 'styled-components'

const Box = styled.div`
  /* width: 100%; */
  display: inline-block;
  height: 100px;
  /* width: 33.3%; */
  /* float: left; */
  position: relative;
  /*margin:0 -4px -5px -2px;*/
  transition: all .2s ease;
`
const Loading = keyframes`
  0%{width: 0px;}
  70%{width: 100%; opacity: 1;}
  90%{opacity: 0; width: 100%;}
  100%{opacity: 0;width: 0px;}
`
const Loader = styled.div`
  & {
    position: relative;
    width: 200px;
    height: 10px;
    top: 45%;
    top: -webkit-calc(50% - 10px);
    top: calc(50% - 10px);
    left: 25%;
    left: -webkit-calc(50% - 75px);
    /* left: calc(50% - 75px); */
  }
  &:after {
    content: "AI LOADING ...";
    padding: 5px 5px 5px 20px;
    color: #fff;
    font-family:  Lato,"Helvetica Neue" ;
    font-weight: 500;
    font-size: 16px;
    position: absolute;
    width: 100%;
    height: 30px;
    line-height: 20px;
    left: 0;
    top: 0;
    background-color: rgb(60 150 231);
    z-index: 1;
  }
  &::before {
    content: "";
    position: absolute;
    background-color: #fff;
    top: -5px;
    left: 0px;
    height: 40px;
    width: 0px;
    z-index: 0;
    opacity: 1;
    -webkit-transform-origin:  100% 0%;
    transform-origin:  100% 0% ;
    -webkit-animation: loader3 10s ease-in-out infinite;
    animation: ${Loading} 10s ease-in-out infinite;
  }
`
function LoadingBar() {
  return (
    <Box>
      <Loader></Loader>
    </Box>
  )
}
export default LoadingBar