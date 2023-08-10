<template>
  <div class="footer-container">
    <div class='footer-wrap'>
      <div>
        neddang@gmail.com
        <button @click.prevent="handleClick">
          <img src="@/assets/images/github50.png" alt='github' />
        </button>
      </div>
      <div>Copyright © 네이처 포트폴리오. All rights reserved</div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    const handleClick = () => {
      window.open('https://github.com/lucya/portfolio', '_blank')
    }

    return {
      handleClick
    }
  }
}
</script>

<style scoped>
.footer-container {
  position: relative;
  padding: 10px 20px 35px 20px;
  max-width: calc(100vw - 10%);
  border-top: 0.1rem solid #dde0ea;
  width: 100%;
}

.footer-container .footer-wrap {
  color: white;
  text-align: center;
  font-size: 12px;
  font-weight: 500;
  height: 20px;
  padding: 2px 2px;
}

/* user */
.user-container .footer-container {
  display: block;
  position: absolute;
  bottom: 1px;
  border-top: 0px;
}

.user-container .footer-container .footer-wrap div {
  padding-bottom: 5px;
}

.user-container .footer-container .footer-wrap button {
  display: none;
}

/* main */
.main-container .footer-container {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  margin: 0 auto;
  margin-top: 13px;
}

.main-container .footer-container .footer-wrap {
  color: #020024;
  line-height: 1.2;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.main-container .footer-container .footer-wrap div {
  display: inline-flex;
  align-items: center;
}

.main-container .footer-container .footer-wrap button {
  display: block;
  padding-left: 4px;
  border: none;
  background: transparent;
}

.main-container .footer-container .footer-wrap button img {
  width: 16px;
}
</style>