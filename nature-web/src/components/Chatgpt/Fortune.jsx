/**
 * @description
 * ChatGPT를 api를 사용한 운세보기
 * 
 * function appendAssistChat : return html
 * 
 * <div class="message">
 *  <figure class="avatar">
 *    <img alt="avatar" src="/static/media/crystal-ball.0780f2923ab901161a4e.png">
 *  </figure>
 *  <span>
 *    네이처는 훌륭한 운세 마법사예요.<br>당신의 운세를 알려줄게요.<br>태어난 년월일과 별자리를 입력하면 더 자세하게 알려줄께요.<br>당신에게는 무료니 걱정말아요.
 *  </span>
 * </div>
 * 
 * function appendUserChat : return html
 * <div class="message message-user">
 *  <span>오늘의 운세를 알려줘</span>
 * </div>
 * 
 * 
 */
import Header from "../Header/Header";
import fortuneAction from "../../actions/chatgpt/fortune.actions";
import { useEffect, useRef, useState } from "react";
import fortuneBall from '../../assets/images/crystal-ball.png';
import './Fortune.css'

function Fortune() {
  const [waiting, setWaiting] = useState(false)
  const msgContentRef = useRef(null);
  const questionRef = useRef(null);

  const [userMessages, setUserMessages] = useState([]);
  const [assistantMessages, setAssistantMessages] = useState([]);

  // TODO: component를 ref에 append할 수있음 코드가 간결해질텐데
  const appendAssistChat = (data) => {
    let div = document.createElement('div')
    div.setAttribute('class', 'message loading')

    let figure = document.createElement('figure')
    figure.setAttribute('class', 'avatar')

    let img = document.createElement('img')
    img.setAttribute('alt', 'avatar')
    img.setAttribute('src', fortuneBall)
    figure.appendChild(img)

    let span = document.createElement('span')
    span.innerText = data.answer
    div.appendChild(figure)
    div.appendChild(span)
    return div
  }
  /**
   * 사용자 입력 챗 
   * @param {*} data 
   * @returns 
   */
  const appendUserChat = (data) => {
    let div = document.createElement('div')
    div.setAttribute('class', 'message message-user')

    let span = document.createElement('span')
    span.innerText = data.question
    div.appendChild(span);
    return div
  }
  const handleScroll = () => {
    setTimeout(() => {
      let scrollHeight = msgContentRef.current.scrollHeight;
      msgContentRef.current.scroll({
        top: scrollHeight,
        behavior: 'smooth'
      })
    }, 500)
  }
  const getFortune = () => {
    let question = questionRef.current.value
    if (!question) return;

    const ref = msgContentRef.current;
    setWaiting(true)
    setUserMessages([...userMessages, question]);

    let data = { question: question }
    ref.append(appendUserChat(data))
    ref.append(appendAssistChat({})) // loading.
    handleScroll();

    fortuneAction.doConversation({ userMessages, assistantMessages })
      .then((res) => {
        let answer = res.assistant;
        console.log('chat', answer)

        setWaiting(false)
        setAssistantMessages([...assistantMessages, answer])

        msgContentRef.current.lastChild.lastChild.innerText = answer;
        msgContentRef.current.lastChild.className = 'message'
        handleScroll();
      }).catch((error) => {
        alert(error.message);
        msgContentRef.current.lastChild.remove()
        setWaiting(false)
      })
  }

  useEffect(() => {
    const qRef = questionRef.current;
    if (waiting) {
      qRef.disabled = true
      qRef.value = '';
    } else {
      qRef.disabled = false
      qRef.focus();
    }
  }, [waiting])

  useEffect(() => {
    let data = { answer: '네이처는 훌륭한 운세 마법사예요.\n당신의 운세를 알려줄게요.\n태어난 년월일과 별자리를 입력하면 더 자세하게 알려줄께요.\n당신에게는 무료니 걱정말아요.' }
    msgContentRef.current.append(appendAssistChat(data))
    setTimeout(() => {
      msgContentRef.current.lastChild.className = 'message'
    }, 1000)

    questionRef.current.focus();
  }, [])
  return (
    <div>
      <Header />
      <div className="fortune-container">
        <div className="chat">
          <div className="chat-title">
            <h1>환영해요! 운세 마법사 네이처예요!</h1>
            <h2>당신의 운세가 궁금한가요? </h2>
            <figure className="avatar">
              <img src={fortuneBall} alt="fortuneBall" /></figure>
          </div>
          <div className="messages">
            <div className="messages-content" ref={msgContentRef}>
            </div>
          </div>
          <div className="message-box">
            <textarea type="text" className="message-input" name="question" ref={questionRef} placeholder="궁금한걸 얘기해봐요..."></textarea>
            <button type="submit" className="message-submit" onClick={getFortune}>Send</button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Fortune;