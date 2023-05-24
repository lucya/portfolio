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
import fortuneAction from "../../actions/chatgpt/fortune.actions";
import { useEffect, useRef, useState } from "react";
import fortuneBall from '../../assets/images/crystal-ball.png';

interface DataProps {
  answer?: string,
  question?: string,
}
const FortuneConversation: React.FC = () => {
  const [waiting, setWaiting] = useState<boolean>(false)
  const msgContentRef = useRef<HTMLDivElement>(null);
  const questionRef = useRef<HTMLTextAreaElement>(null);

  const [userMessages, setUserMessages] = useState<string[]>([]);
  const [assistantMessages, setAssistantMessages] = useState<string[]>([]);

  // TODO: component를 ref에 append할 수있음 코드가 간결해질텐데
  const appendAssistChat = (data: DataProps) => {
    let div = document.createElement('div')
    div.setAttribute('class', 'message loading')

    let figure = document.createElement('figure')
    figure.setAttribute('class', 'avatar')

    let img = document.createElement('img')
    img.setAttribute('alt', 'avatar')
    img.setAttribute('src', fortuneBall)
    figure.appendChild(img)

    let span: any = document.createElement('span') as HTMLSpanElement
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
  const appendUserChat = (data: DataProps) => {
    let div = document.createElement('div') as HTMLDivElement
    div.setAttribute('class', 'message message-user')

    let span: any = document.createElement('span') as HTMLSpanElement
    span.innerText = data.question
    div.appendChild(span);
    return div
  }
  const handleScroll = () => {
    setTimeout(() => {
      if (msgContentRef.current) {
        let scrollHeight = msgContentRef.current.scrollHeight;
        msgContentRef.current.scroll({
          top: scrollHeight,
          behavior: 'smooth'
        })
      }
    }, 500)
  }
  const getFortune = () => {
    if (!msgContentRef.current || !questionRef.current) { return null }
    let question: string = questionRef.current.value
    if (!question) return;

    const refCrnt = msgContentRef.current;
    setWaiting(true)
    setUserMessages([...userMessages, question]);

    let data: DataProps = { question: question }
    refCrnt.append(appendUserChat(data))
    refCrnt.append(appendAssistChat({})) // loading.
    handleScroll();

    fortuneAction.doConversation({ userMessages, assistantMessages })
      .then((res) => {
        let answer = res.assistant;
        console.log('chat', answer)

        setWaiting(false)
        setAssistantMessages([...assistantMessages, answer]);

        let crnt = msgContentRef.current;
        if (crnt && crnt.lastChild) {
          (crnt.lastChild.lastChild as HTMLElement).innerText = answer;
          (crnt.lastChild as HTMLElement).className = 'message'
        }
        handleScroll();
      }).catch((error) => {

        alert(error);
        let crnt = msgContentRef.current;
        if (crnt && crnt.lastChild) {
          (crnt.lastChild.lastChild as HTMLElement).innerText = '운세 마법사가 오늘 컨디션이 안좋안가봐요.\n질문을 다시 해줄래요?';
          (crnt.lastChild as HTMLElement).className = 'message'
        }
        setWaiting(false)
      })
  }

  useEffect(() => {
    let qRef = questionRef.current as HTMLTextAreaElement;
    if (waiting) {
      qRef.disabled = true
      qRef.value = '';
    } else {
      qRef.disabled = false
      qRef.focus();
    }
  }, [waiting])

  useEffect(() => {
    let qRef = questionRef.current as HTMLTextAreaElement;
    let msgRef = msgContentRef.current as HTMLDivElement

    let data: DataProps = { answer: '네이처는 훌륭한 운세 마법사예요.\n당신의 운세를 알려줄게요.\n생년월일과 별자리를 입력해 주세요.\n당신에게는 무료니 걱정말아요.' }
    msgRef.append(appendAssistChat(data))

    setTimeout(() => {
      (msgRef.lastChild as HTMLElement).className = 'message'
    }, 1000)

    qRef.focus();
  }, [])
  return (
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
        <textarea className="message-input" name="question" inputMode="text"
          ref={questionRef} placeholder="궁금한걸 얘기해봐요..."></textarea>
        <button type="submit" className="message-submit" onClick={getFortune}>Send</button>
      </div>
    </div>
  )
}
export default FortuneConversation;