<template>
  <v-app>
    <v-main class="main-bg">
      <v-container class="container">
        <div class="warper-1">
          <img class="bg-slut" src="../assets/bg2.png" alt="">
          <div class="slut-machine">
            <v-row class="row-1">
              <v-col class="player-detail">
                <div class="warper-player">
                  <div>
                    <img class="pic" src="https://pbs.twimg.com/profile_images/1635523228230885376/w9V6e7x2_200x200.png"
                      alt="">

                  </div>
                  <div>

                    <v-row class="warper-name-point">
                      <v-col class="name-point">
                        <h4>player</h4>
                        <h4 :class="{ blink: isBlinking }">{{ score }}</h4>
                      </v-col>
                    </v-row>
                  </div>
                </div>
              </v-col>
            </v-row>
            <v-row class="slut-machine-warper">
              <v-col class="wheel-cols pa-1" v-for="n in 3" :key="n">
                <div class="wheel" :ref="`wheel${n}`">
                  <div class="overlay"></div>
                  <img :src="require(`@/assets/wheel${n}.png`)" alt="" class="wheel-image" />
                  <img src="@/assets/spinning.gif" alt="" class="slotSpinAnimation" />
                </div>
              </v-col>
            </v-row>
            <div id="coin-container" class="coin-container">
              <div v-for="(coin, index) in coins" :key="index" class="coin" 
       :style="{ '--x': coin.x, '--y': coin.y, '--delay': coin.delay }"
       :class="{ explode: coin.exploded, drop: coin.dropped }">
  </div>
</div>

            <v-row class="spinner-warper">
              <v-col class="spinner justify-center">
                <v-btn @click="triggerSpin" :disabled="spinning" class="custom-btn" text>{{ spinning ? 'Spin' : 'Spin'
                  }}</v-btn>
              </v-col>
            </v-row>
          </div>
        </div>




      </v-container>



    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      coins: [],
      credits: 100,
      score: 0,
      spinning: false,
      spin: [0, 0, 0],
      slotsTypes: {
        cherry: [2, 5, 10],
        orange: [0, 15, 30],
        prune: [0, 40, 50],
        bell: [0, 50, 80],
        bar1: [0, 0, 100],
        bar2: [0, 0, 150],
        bar3: [0, 0, 250],
        seven: [0, 0, 500],
        anybar: [0, 0, 80],
      },
      slots: [
        ["orange", "bell", "orange", "bar2", "prune", "orange", "bar3", "prune", "orange", "bar1", "bell", "cherry", "orange", "prune", "bell", "bar1", "cherry", "seven", "orange", "prune", "orange", "bell", "orange"],
        ["cherry", "prune", "orange", "bell", "bar1", "cherry", "prune", "bar3", "cherry", "bell", "orange", "bar1", "seven", "cherry", "bar2", "cherry", "bell", "prune", "cherry", "orange", "cherry", "prune", "orange"],
        ["cherry", "orange", "bell", "prune", "bar2", "cherry", "prune", "orange", "bar3", "cherry", "bell", "orange", "cherry", "orange", "cherry", "prune", "bar1", "seven", "bell", "cherry", "cherry", "orange", "bell"],
      ],
      wheelsSpinning: [false, false, false],
      spinTimeouts: [],
      postSpinAdjustment: 65,
      isBlinking: false,
    };
  },
  methods: {
    explodeCoins() {
  this.coins = []; // Clear previous coins

  const coinCount = 20;
  const explosionDuration = 300; // Shortened explosion window (in ms)
  
  for (let i = 0; i < coinCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 150 + 100;
    
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    // Convert angle to degrees for CSS rotation


    // Random delay within the explosion duration
    const delay = Math.random() * explosionDuration + 'ms';

    this.coins.push({
      x: x + 'px',
      y: y + 'px',

      delay: delay,
      exploded: false,
      dropped: false
    });
  }

  // Trigger all explosions within the explosion duration
  setTimeout(() => {
    this.coins.forEach((coin) => {
      coin.exploded = true;
    });
  }, 0);

  // Trigger coin drop and fade-out after explosion
  setTimeout(() => {
    this.coins.forEach((coin) => {
      coin.dropped = true;
    });
  }, explosionDuration + 100); // Wait for explosion duration plus a little extra
},
    triggerSpin() {
      if (this.spinning || this.credits <= 0) return;

      const WheelSpin = new Audio(require('@/assets/spinning_sfx_2.wav'));
      WheelSpin.play();
      setTimeout(() => {
        WheelSpin.pause();
        WheelSpin.currentTime = 0; // Reset the audio playback position
      }, 3500);

      const WheelStop = new Audio(require('@/assets/wheel_stop_2.wav'));
      setTimeout(() => {
        WheelStop.play();
        setTimeout(() => {
          WheelStop.pause();
          WheelStop.currentTime = 0;
          WheelStop.play();
          setTimeout(() => {
            WheelStop.pause();
            WheelStop.currentTime = 0;
            WheelStop.play();
          }, 700); // 0.7s
        }, 500); // 0.5s
      }, 2000); // Delay 2s

      this.spinning = true;
      this.credits--;
      this.updateCoinBar();

      this.spin = [
        17,
        12,
        17,
        Math.floor(Math.random() * 23),
        Math.floor(Math.random() * 23),
        Math.floor(Math.random() * 23),
      ];

      this.wheelsSpinning = [true, true, true];
      this.clearSpinTimeouts();

      this.$nextTick(() => {
        this.startSpinAnimation();

        const baseDuration = 2000;
        this.spinTimeouts.push(setTimeout(() => this.stopSpin(0), baseDuration));
        this.spinTimeouts.push(setTimeout(() => this.stopSpin(1), baseDuration + 500));
        this.spinTimeouts.push(setTimeout(() => this.stopSpin(2), baseDuration + 1000));

        this.spinTimeouts.push(setTimeout(() => this.forceStopAllWheels(), baseDuration + 2000));
      });
    },
    startSpinAnimation() {
      const wheels = [this.$refs.wheel1, this.$refs.wheel2, this.$refs.wheel3];

      wheels.forEach((wheel, index) => {
        if (wheel && wheel[0]) {
          const spinAnimation = wheel[0].querySelector("img.slotSpinAnimation");
          const mainImage = wheel[0].querySelector("img.wheel-image");

          if (spinAnimation) {
            spinAnimation.style.display = "block";
            mainImage.style.display = "none";
          }
          if (mainImage) {
            mainImage.style.top = `-${this.spin[index] * 85}px`;
          }
        }
      });
    },
    stopSpin(slotIndex) {
      const wheel = this.$refs[`wheel${slotIndex + 1}`];
      if (!wheel || !wheel[0]) {
        this.wheelsSpinning[slotIndex] = false;
        this.checkSpinCompletion();
        return;
      }

      const mainImage = wheel[0].querySelector(".wheel-image");
      const spinAnimation = wheel[0].querySelector(".slotSpinAnimation");

      if (mainImage && spinAnimation) {
        const basePosition = this.spin[slotIndex] * 85;
        const spinPos = `${basePosition - 0}px`;

        mainImage.style.top = `-${spinPos}`;
        mainImage.style.display = "block"; // Show the main image
        spinAnimation.style.display = "none"; // Hide the spin animation

        setTimeout(() => {
          const finalPosition = basePosition - 85 + this.postSpinAdjustment;
          mainImage.style.top = `-${finalPosition}px`;
          mainImage.style.transition = 'top 0.2s ease-out';
        }, 50);

        this.wheelsSpinning[slotIndex] = false;
        this.checkSpinCompletion();
      } else {
        this.wheelsSpinning[slotIndex] = false;
        this.checkSpinCompletion();
      }
    },
    forceStopAllWheels() {
      this.wheelsSpinning.forEach((spinning, index) => {
        if (spinning) {
          this.stopSpin(index);
        }
      });
    },
    checkSpinCompletion() {
      if (!this.wheelsSpinning.some(spinning => spinning)) {
        this.spinning = false;
        this.clearSpinTimeouts();
        this.endSpin();
      }
    },
    clearSpinTimeouts() {
      this.spinTimeouts.forEach(timeout => clearTimeout(timeout));
      this.spinTimeouts = [];
    },
    updateCoinBar() {
      const coinBar = this.$refs.slotCredits;
      if (coinBar) {
        const widthPercentage = (this.credits / 100) * 100;
        coinBar.style.width = `${Math.min(widthPercentage, 100)}%`;
      }
    },
    endSpin() {
      let slotType = this.slots[0][this.spin[0]];
      let matches = 1;
      let barMatch = /bar/.test(slotType) ? 1 : 0;
      let winnedScore = 0;

      if (slotType === this.slots[1][this.spin[1]]) {
        matches++;
        if (slotType === this.slots[2][this.spin[2]]) {
          matches++;
        } else if (barMatch && /bar/.test(this.slots[2][this.spin[2]])) {
          barMatch++;
        }
      } else if (barMatch && /bar/.test(this.slots[1][this.spin[1]])) {
        barMatch++;
      }

      winnedScore = this.slotsTypes[slotType][matches - 1] || 0;
      this.score += winnedScore;


      // Play coin sound if the score is positive
      if (winnedScore > 0) {
        const CoinSound = new Audio(require('@/assets/coin_sfx.wav'));
        CoinSound.play();
        this.explodeCoins();
        this.isBlinking = true;
        setTimeout(() => {
          this.isBlinking = false;
        }, 1500);
      }

      this.updateCoinBar();

      if (this.credits <= 0) {
        alert("You've run out of credits. Game over!");
        this.resetGame();
      }
    },
    resetGame() {
      this.credits = 100;
      this.score = 0;
      this.spinning = false;
      this.spin = [0, 0, 0];
      this.wheelsSpinning = [false, false, false];
      this.clearSpinTimeouts();
      this.updateCoinBar();
    },
  },
  mounted() {
    this.updateCoinBar();
  },
  beforeDestroy() {
    this.clearSpinTimeouts();
  },
};
</script>

<style lang="scss" scoped>
.main-bg {
  background-color: rgb(132, 226, 255);

}

.bg-slut {
  display: flex;
  position: absolute;
  min-width: 360px;
  max-width: 430px;
  min-height: 914px;
  border-radius: 15px;
  z-index: 2;
}

.container {
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.warper-1 {
  background-color: #ffffff;
  min-width: 360px;
  max-width: 430px;
  min-height: 914px;
  border-radius: 15px;
  margin: 1%;
}

.row-1 {
  padding: 0;
  margin: 0px;
  width: 430px;
}

.slut-machine {
  padding: 0;
  margin: 0;
  z-index: 2;

  // width: 300px;
  // background-color: #ffffff;
}

.warper-name-point {}

.name-point {
  z-index: 3;
  text-align: end;
}


.player-detail {
  width: 430px;
  padding: 0;
  color: #ffffff;
  display: flex;
  justify-content: center;
  // z-index: 2;
}

.warper-player img {
  margin: 1px;
  border-radius: 5px;
  min-width: 46px;
  min-height: 46px;
  max-width: 46px;
  max-height: 46px;
  z-index: 1;

}

.warper-player {
  width: 145px;
  // background-color: #ffffff;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  // gap: 25px;
  margin-top: 52%;
  padding: 0 5px;
}


/////////
.slut-machine-warper {
  padding: 0;
  margin: 0;
  height: 200px;
  width: 300px;
  // z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 17%;
  margin-top: 22%;
}



.slut-machine-warper .wheel {
  // box-shadow: 0 0 15px rgba(0, 0, 0, 0.8);
  // margin: 1%;
  padding: 0;
  background: #fff;
  height: 210px;
  overflow: hidden;
  // position: absolute;
  // top: 2px;
  width: 85px;
}

.slut-machine-warper .wheel img.wheel-image {
  // position: absolute;

  width: 85px;
  transition: top 0.5s ease-out;
}

.slut-machine-warper .wheel img.slotSpinAnimation {

  width: 85px;
  height: 150%;
  display: none;
}

.slut-machine-warper .wheel img {
  left: 0;
  // position: absolute;
  // top: -px;
  width: 85px;
  z-index: 1;

  position: relative;
  // top: 0;
  transition: top 0.5s ease-out;
}

.slut-machine-warper .wheel .overlay {
  // height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  // width: 100%;
  z-index: 2;
}

.slotSpinAnimation {
  height: 125%;
  display: none;
}





.spinner-warper {
  margin: 0;
  padding: 5% 0;
  width: 430px;
  display: flex;
  flex-direction: column;
}



.btn-1 {

  background-color: #ff4500;
  color: white;
  position: relative;
  width: 150px;
  text-decoration: none;
  background-image: linear-gradient(bottom,
      rgb(0, 0, 0) 0%,
      rgb(70, 136, 183) 00%);
  box-shadow: inset 0px 1px 0px #710f0f, 0px 6px 0px #940c0c;
  border-radius: 5px;
  font-family: Arial, sans-serif;
  font-size: 24px;
  font-weight: bold;
  padding: 15px 30px;
  z-index: 6;
}

.btn-1:active {
  top: 7px;
  background-image: linear-gradient(bottom,
      rgb(255, 83, 83) 100%,
      rgb(156, 6, 6) 0%);
  box-shadow: inset 0px 1px 0px #f36b6b, inset 0px -1px 0px #840000;
  color: #ffffff;
  text-shadow: 0px 1px 1px rgba(255, 255, 255, 0.3);
  background: rgb(202, 44, 44);
}

.blink {
  // animation: blink-animation 0.4s;
  animation: blink-animation 0.5s steps(2, start) infinite;
}

.spinner {
  margin: 0;
  padding: 0;
  align-items: center;
  margin-top: 150px;
  display: flex;
  justify-content: center;
}

.custom-btn {
  padding: 20px 44px;
  width: 150px;
  min-height: 70px;
  color: white;
  border: 1px solid #141211;
  border-radius: 15px;
  font-family: "Ubuntu Sans Mono", monospace;

  font-size: 28px;
  text-decoration: none;
  box-shadow: 0 0 0;
  transition: all 200ms;
  transform: translateY(-10px);
  box-shadow: 0px 10px 1px 5px #842e04, inset 0px -1px 0px #840000;
  z-index: 3;
  background-color: #ff4400;
}

.custom-btn:hover {
  background-color: #d43b03;

}

.custom-btn:active {
  transform: translateY(10px);
  background-color: #d43b03;
  box-shadow: 0 0 0;

}


@keyframes blink-animation {
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@media screen and (max-width: 480px) {
  .warper-1 {
    margin: 0;
  }
}

@media screen and (max-width: 375px) {
  .slut-machine-warper {

    margin-left: 20%;
    margin-top: 25%;
  }

}

.spin-btn {
  z-index: 3;
}



.coin-container {
  margin-top: -100px;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 6;
}

.coin {
  width: 60px;
  height: 60px;
  background-image: url('../assets/coin_spin.gif');
  background-size: cover;
  opacity: 0;
  /* Initially invisible */
  transform: scale(0);
  /* Start scaled down */
  // transition: transform 0.5s ease-in, opacity 0.3s ease-in var(--delay);
  // transition: transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1.5) var(--delay),
  // opacity 0.5s ease-out var(--delay);
  /* Smooth transition for all properties */
  z-index: 6;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1.5);
}

.coin.explode {
    opacity: 1;
    transform: scale(1) translate(var(--x), var(--y));
}

.coin.drop {
    animation: drop 0.5s ease-out forwards, fade-out 0.5s ease-out forwards;
}

/* Keyframes for the coin drop effect */
@keyframes drop {
    0% {
        transform: translate(var(--x), var(--y)) translateY(0);
    }

}

/* Keyframes for the fade-out effect */
@keyframes fade-out {
    0% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
}
</style>
