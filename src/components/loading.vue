<template>
  <div class="loading">
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
  </div>
</template>

<style scoped lang="scss">
.loading {
  width: 1rem;
  height: 1rem;
  position: relative;
  -webkit-animation: loading-data-v-24a16d5c 2.5s infinite linear both;
  animation: loading-data-v-24a16d5c 2.5s infinite linear both;
  margin: 0 auto;
}

.dot {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  animation: dot 2s infinite ease-in-out both;
}

.dot:before {
  content: '';
  display: block;
  width: 25%;
  height: 25%;
  background-color: $dark;
  border-radius: 100%;
  animation: dot-before 2s infinite ease-in-out both;
}

.dot:nth-child(1) {
  animation-delay: -1.1s;
}
.dot:nth-child(2) {
  animation-delay: -1s;
}
.dot:nth-child(3) {
  animation-delay: -0.9s;
}
.dot:nth-child(4) {
  animation-delay: -0.8s;
}
.dot:nth-child(5) {
  animation-delay: -0.7s;
}
.dot:nth-child(6) {
  animation-delay: -0.6s;
}
.dot:nth-child(1):before {
  animation-delay: -1.1s;
}
.dot:nth-child(2):before {
  animation-delay: -1s;
}
.dot:nth-child(3):before {
  animation-delay: -0.9s;
}
.dot:nth-child(4):before {
  animation-delay: -0.8s;
}
.dot:nth-child(5):before {
  animation-delay: -0.7s;
}
.dot:nth-child(6):before {
  animation-delay: -0.6s;
}

@keyframes loading {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dot {
  80%,
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dot-before {
  50% {
    transform: scale(0.4);
  }
  100%,
  0% {
    transform: scale(1);
  }
}
</style>
