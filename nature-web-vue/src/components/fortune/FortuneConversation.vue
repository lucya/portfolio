<template>
  <div class="chat">
    <div class="chat-title">
      <h1>환영해요! 운세 마법사 네이처예요!</h1>
      <h2>당신의 운세가 궁금한가요?</h2>
      <figure class="avatar">
        <img :src="fortuneBall" alt="fortuneBall" />
      </figure>
    </div>
    <div class="messages">
      <div class="messages-content" ref="msgContentRef"></div>
    </div>
    <div class="message-box">
      <textarea class="message-input" name="question" inputMode="text" ref="questionRef"
        placeholder="궁금한걸 얘기해봐요..."></textarea>
      <button type="submit" class="message-submit" @click.prevent="getFortune">
        Send
      </button>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, watch } from 'vue'
import fortuneBall from '@/assets/images/crystal-ball.png';
import { getFortuneApi } from '@/api/fortune'

export default {
  setup() {
    const msgContentRef = ref(null);
    const questionRef = ref(null);

    const waiting = ref(false)
    const userMessages = ref([])
    const assistantMessages = ref([])

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
        if (msgContentRef.value.scrollHeight) {
          let scrollHeight = msgContentRef.value.scrollHeight;
          msgContentRef.value.scroll({
            top: scrollHeight,
            behavior: 'smooth'
          })
        }
      }, 500)
    }
    const getFortune = () => {
      if (!msgContentRef.value || !questionRef.value) { return null }
      let question = questionRef.value
      if (!question) return;

      const refCrnt = msgContentRef.value;
      waiting.value = true


      userMessages.value = [...userMessages.value, question.value]

      let data = { question: question.value }
      refCrnt.append(appendUserChat(data))
      refCrnt.append(appendAssistChat({})) // loading.
      handleScroll();

      let userMsg = userMessages.value
      let assisMsg = assistantMessages.value
      doConversation({ userMsg, assisMsg })
        .then(({ data }) => {
          let answer = data.assistant;
          console.log('chat', answer)

          waiting.value = false
          assistantMessages.value = [...assistantMessages.value, answer];

          let crnt = msgContentRef.value;
          if (crnt && crnt.lastChild) {
            crnt.lastChild.lastChild.innerText = answer;
            crnt.lastChild.className = 'message'
          }
          handleScroll();
        }).catch((error) => {

          alert(error);
          let crnt = msgContentRef.value;
          if (crnt && crnt.lastChild) {
            crnt.lastChild.lastChild.innerText = '운세 마법사가 오늘 컨디션이 안좋안가봐요.\n질문을 다시 해줄래요?';
            crnt.lastChild.className = 'message'
          }
          waiting.value = false
        })
    }

    const doConversation = async ({ userMsg, assisMsg }) => {
      let userMessages = userMsg
      let assistantMessages = assisMsg

      return getFortuneApi({ userMessages, assistantMessages })

    }

    watch(waiting, () => {
      let qRef = questionRef.value
      if (waiting.value) {
        qRef.disabled = true
        qRef.value = '';
      } else {
        qRef.disabled = false
        qRef.focus();
      }
    })
    onMounted(() => {
      let qRef = questionRef.value
      let msgRef = msgContentRef.value
      let data = { answer: '네이처는 훌륭한 운세 마법사예요.\n당신의 운세를 알려줄게요.\n생년월일과 별자리를 입력해 주세요.\n당신에게는 무료니 걱정말아요.' }
      msgRef.append(appendAssistChat(data))

      setTimeout(() => {
        msgRef.lastChild.className = 'message'
      }, 1000)

      qRef.focus();
    })

    return {
      fortuneBall,
      getFortune,
      msgContentRef,
      questionRef,
    }
  }

};
</script>

<style></style>