<template>
  <div class="loadingWrap">
    <div class="center">
      <div class="ring">
        <span class="text">loading...</span>
      </div>
    </div>
  </div>
</template>
<style scoped>
div.loadingWrap {
  background: black;
}

div.loadingWrap .center {
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

div.ring {
  position: relative;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  animation-name: ringMove
}

@keyframes ringMove {
  0% {
    transform: rotate(0deg);
    box-shadow: 1px 5px 2px #e65c00;
  }

  50% {
    transform: rotate(180deg);
    box-shadow: 1px 5px 2px #18b201;
  }

  100% {
    transform: rotate(360deg);
    box-shadow: 1px 5px 2px #0456c8;
  }
}

div.ring:before {
  position: absolute;
  content: '';
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  border-radius: 50%;
  box-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
}

.loadingWrap span.text {
  color: white;
  font-size: 20px;
  text-transform: uppercase;
  letter-spacing: 1px;
  line-height: 200px;
  animation-name: textMove;
  animation-duration: 3s;
  animation-iteration-count: infinite;
  /* animation-timing-function: linear; */
  animation-timing-function: ease-in-out;
}

@keyframes textMove {
  50% {
    color: black;
  }
}
</style>