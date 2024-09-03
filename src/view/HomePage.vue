<template>
  <v-app>
    <v-main class="welcome-section">
      <img src="../assets/Star Animate.png" alt="" class="rotating-image" />
      <v-container fluid class="fill-height d-flex align-center justify-center">
        <v-row>
          <v-col class="text-center ">

            <h3 class="
              hello-text 
              white--text 
              font-weight-medium
              text-lg-h4 
              text-md-h5 
              ">Hello World! We are</h3>
            <h1 class="

                      ">
              <span class="
                            white--text 
              text-lg-h1
              font-weight-medium 
              text-md-h2
              text-sm-h3" :class="{
                'typing-animation': isTypingFirstLine,
                'typing-done': !isTypingFirstLine,
              }">
                {{ firstLineText }}
              </span>
            </h1>
            <span color="primary" class="
            typing-animation 
            highlight
            font-weight-medium 


            
            ">{{ secondLineText }}</span>

          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>

</template>

<script>
export default {
  name: "TypingText",
  data() {
    return {
      fullFirstLine: "IT Excellence",
      firstLineText: "",
      fullSecondLine: "Key of Success",
      secondLineText: "",
      typingSpeed: 90,
      isTypingFirstLine: true,
    }
  },
  mounted() {
    this.typeText("firstLineText", this.fullFirstLine, 0);
    setTimeout(() => {
      this.isTypingFirstLine = false;
      this.typeText("secondLineText", this.fullSecondLine, 500);
    }, this.fullFirstLine.length * this.typingSpeed + 500);

    this.initIntersectionObserver();
  },
  methods: {
    typeText(dataProperty, fullText, delay) {
      this[dataProperty] = "";
      setTimeout(() => {
        let index = 0;
        const typeInterval = setInterval(() => {
          this[dataProperty] += fullText.charAt(index);
          index++;
          if (index > fullText.length) {
            clearInterval(typeInterval);
          }
        }, this.typingSpeed);
      }, delay);
    },
  }

}
</script>

<style lang="scss" scoped>
@import '~vuetify/src/styles/styles.sass';



.welcome-section {
  background-image: url("../assets/h-bg.png");
  background-size: cover;
  background-position: center;
  width: 100vw;
  position: relative;
  min-height: 100vh;
  z-index: 0;
  overflow: hidden;

}

.rotating-image {
  width: 150%;
  /* Make the image larger to allow rotation without revealing edges */
  height: 150%;
  /* Scale the height proportionally */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.8;
  animation: rotate-back-and-forth 120s linear infinite;
  z-index: -1;
}

/* Keyframes for rotating clockwise and then counterclockwise */
@keyframes rotate-back-and-forth {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }

  50% {
    transform: translate(-50%, -50%) rotate(360deg);
    /* Complete one full clockwise rotation */
  }

  100% {
    transform: translate(-50%, -50%) rotate(0deg);
    /* Rotate back to the original position (counterclockwise) */
  }
}



.hello-text {
  animation: fadeDown 0.5s ease-out;
  transition-delay: 1s;
  padding-bottom: 3%
}

@keyframes fadeDown {
  0% {
    opacity: 0;
    transform: translateY(-60px);
    /* Starts 20px below its original position */
  }

  100% {
    opacity: 1;
    transform: translateY(0);
    /* Moves to its original position */
  }

}

.main-title {
  /* align-items: center; */

}

.highlight {
  padding: 5px;
  color: #f5821f;

}

/* Typing Animation */

.typing-animation {
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  position: relative;
  /* Ensure the pseudo-element is positioned relative to this element */
  padding-right: 10px;
}

.typing-animation::after {
  content: "";
  position: absolute;
  right: 0;
  /* Align the cursor to the right end of the text */
  top: 15px;
  /* Adjust cursor height */
  height: 1.2em;
  /* Adjust this value to control the height of the cursor */
  width: 5px;
  /* Width of the cursor */
  background: rgb(255, 255, 255);
  /* Color of the cursor */
  animation: blink-caret 1s step-end infinite;
}

.typing-done {
  border-right: none;
  /* Hide cursor when typing is done */
  
}

/* Animation for the blinking cursor */
@keyframes blink-caret {

  from,
  to {
    background: transparent;
  }

  50% {
    background: rgb(255, 255, 255);
  }
}
</style>