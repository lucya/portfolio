<template>
  <div class="chat">
    <div class="chat-title">
      <h1>환영해요! 운세 마법사 네이처예요!</h1>
      <h2>당신의 운세가 궁금한가요?</h2>
      <figure class="avatar">
        <img src="{fortuneBall}" alt="fortuneBall" />
      </figure>
    </div>
    <div class="messages">
      <div class="messages-content" ref="{msgContentRef}"></div>
    </div>
    <div class="message-box">
      <textarea
        class="message-input"
        name="question"
        inputMode="text"
        ref="{questionRef}"
        placeholder="궁금한걸 얘기해봐요..."
      ></textarea>
      <button type="submit" class="message-submit" onClick="{getFortune}">
        Send
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "FortuneConversation",
  props: {},
  data() {},
  components() {},
  methods: {},
};
</script>

<style>
</style>