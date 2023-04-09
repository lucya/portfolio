import styled, { keyframes } from 'styled-components'

const LoadingWrap = styled.div`
  background: black;
`
const Center = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  min-height:100vh;
`
const RingMove = keyframes`
  0%{
    transform: rotate(0deg);
    box-shadow: 1px 5px 2px #e65c00;
  }
  50%{
    transform: rotate(180deg);
    box-shadow: 1px 5px 2px #18b201;
  }
  100%{
    transform: rotate(360deg);
    box-shadow: 1px 5px 2px #0456c8;
  }
`
const Ring = styled.div`
  & {
    position: absolute;
    width: 200px;
    height: 200px;
    border-radius:50%;
    animation:${RingMove} 2s linear infinite;
  }
  &:before {
    position: absolute;
    content:'';
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    border-radius:50%;
    box-shadow: 0 0 5px rgba(255,255,255,.3);
  }
`
const TextMove = keyframes`
  50%{
    color: black;
  }
`
const Text = styled.span`
  color: white;
  font-size:20px;
  text-transform:uppercase;
  letter-spacing:1px;
  line-height:200px;
  animation:${TextMove} 3s linear infinite;
  animation-timing-function: ease-in-out;
`

function Loading() {
  return (
    <LoadingWrap>
      <Center>
        <Ring />
        <Text>loading...</Text>
      </Center>
    </LoadingWrap>
  )
}
export default Loading