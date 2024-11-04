<template>
  <v-app>
    <v-main class="main-bg">
      <v-container class="container">
        <div class="warper-1">
          <img class="bg-slut" src="../assets/bg2.png" alt="" />
          <div class="slut-machine">
            <v-row class="row-1">
              <v-col class="player-detail">
                <div class="warper-player">
                  <div>
                    <img
                      class="pic"
                      src="https://pbs.twimg.com/profile_images/1635523228230885376/w9V6e7x2_200x200.png"
                      alt=""
                    />
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
                  <img
                    :src="require(`@/assets/wheel${n}.png`)"
                    alt=""
                    class="wheel-image"
                  />
                  <img
                    src="@/assets/spinning.gif"
                    alt=""
                    class="slotSpinAnimation"
                  />
                </div>
              </v-col>
            </v-row>
            <div id="coin-container" class="coin-container">
              <div
                v-for="(coin, index) in coins"
                :key="index"
                class="coin"
                :style="{
                  '--x': coin.x,
                  '--y': coin.y,
                  '--delay': coin.delay,
                  '--rotation': coin.rotation,
                  'background-image': coin.backgroundImage,
                }"
                :class="{ explode: coin.exploded, drop: coin.dropped }"
              ></div>
            </div>

            <v-row class="spinner-warper">
              <v-col class="spinner justify-center">
                <v-btn
                  @click="triggerSpin"
                  :disabled="spinning"
                  class="custom-btn"
                  text
                  >{{ spinning ? "Spin" : "Spin" }}</v-btn
                >
              </v-col>
            </v-row>
            <v-dialog
              class="custom-dialog no-shadow-no-border"
              overlay-opacity="0.7"
              v-model="showWinningPopup"
              max-width="500"
            >
              <div class="dialog-content-2">
                <img
                  src="../assets/Jackpotwin.png"
                  class="popup-score-img"
                  alt=""
                />
                <div class="content-wrapper-2">
                  <div class="text-center">
                    <div class="display-4 font-weight-bold">
                      {{ winningScore }}
                    </div>
                  </div>
                </div>
              </div>
            </v-dialog>
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
        [
          "orange",
          "bell",
          "orange",
          "bar2",
          "prune",
          "orange",
          "bar3",
          "prune",
          "orange",
          "bar1",
          "bell",
          "cherry",
          "orange",
          "prune",
          "bell",
          "bar1",
          "cherry",
          "seven",
          "orange",
          "prune",
          "orange",
          "bell",
          "orange",
        ],
        [
          "cherry",
          "prune",
          "orange",
          "bell",
          "bar1",
          "cherry",
          "prune",
          "bar3",
          "cherry",
          "bell",
          "orange",
          "bar1",
          "seven",
          "cherry",
          "bar2",
          "cherry",
          "bell",
          "prune",
          "cherry",
          "orange",
          "cherry",
          "prune",
          "orange",
        ],
        [
          "cherry",
          "orange",
          "bell",
          "prune",
          "bar2",
          "cherry",
          "prune",
          "orange",
          "bar3",
          "cherry",
          "bell",
          "orange",
          "cherry",
          "orange",
          "cherry",
          "prune",
          "bar1",
          "seven",
          "bell",
          "cherry",
          "cherry",
          "orange",
          "bell",
        ],
      ],
      wheelsSpinning: [false, false, false],
      spinTimeouts: [],
      postSpinAdjustment: 65,
      isBlinking: false,

      showWinningPopup: false,
      winningScore: 0,
    };
  },
  methods: {
    explodeCoins() {
      this.coins = []; // Clear previous coins

      const coinCount = 70;
      for (let i = 0; i < coinCount; i++) {
        // Calculate the angle to spread coins evenly around the circle
        let angle = (i / coinCount) * Math.PI * 2; // Evenly spread angles

        // Introduce a small random variation to the angle
        angle += (Math.random() - 0.5) * 0.2; // Small random variation in angle

        // Randomize the distance, but within a reasonable range
        const distance = Math.random() * 300 + 125; // Random distance between 150px and 450px

        const x = Math.cos(angle) * distance + "px";
        const y = Math.sin(angle) * distance + "px";

        // Calculate a delay based on the coin index
        const delay = i * 0.0 + "s"; // Keep as is or adjust for slower explosions
        const rotation = Math.random() * 360 + "deg"; // Random rotation for each coin

        // Randomly select between two background images

        const backgroundImage =
          Math.random() < 0.5
            ? `url(${require("@/assets/coin_still.png")})`
            : `url(${require("@/assets/coin_spin_slow.gif")})`;

        // Push coin data with random position and rotation
        this.coins.push({
          x: x,
          y: y,
          exploded: false,
          dropped: false,
          delay: delay,
          backgroundImage: backgroundImage, // Assign random background image
          rotation: rotation,
        });
      }

      // Trigger explosion
      setTimeout(() => {
        this.coins.forEach((coin) => {
          coin.exploded = true;
        });
      }, 50);

      // Trigger coin drop and fade-out after explosion
      setTimeout(() => {
        this.coins.forEach((coin) => {
          coin.dropped = true;
        });
      }, 600); //duration of coin
    },

    triggerSpin() {
      if (this.spinning || this.credits <= 0) return;

      const WheelSpin = new Audio(require("@/assets/spinning_sfx_2.wav"));
      WheelSpin.play();
      setTimeout(() => {
        WheelSpin.pause();
        WheelSpin.currentTime = 0; // Reset the audio playback position
      }, 3500);

      const WheelStop = new Audio(require("@/assets/wheel_stop_2.wav"));
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
        // 17, 12, 17,
        Math.floor(Math.random() * 23),
        Math.floor(Math.random() * 23),
        Math.floor(Math.random() * 23),
      ];

      this.wheelsSpinning = [true, true, true];
      this.clearSpinTimeouts();

      this.$nextTick(() => {
        this.startSpinAnimation();

        const baseDuration = 2000;
        this.spinTimeouts.push(
          setTimeout(() => this.stopSpin(0), baseDuration)
        );
        this.spinTimeouts.push(
          setTimeout(() => this.stopSpin(1), baseDuration + 500)
        );
        this.spinTimeouts.push(
          setTimeout(() => this.stopSpin(2), baseDuration + 1000)
        );

        this.spinTimeouts.push(
          setTimeout(() => this.forceStopAllWheels(), baseDuration + 2000)
        );
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
          mainImage.style.transition = "top 0.2s ease-out";
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
      if (!this.wheelsSpinning.some((spinning) => spinning)) {
        this.spinning = false;
        this.clearSpinTimeouts();
        this.endSpin();
      }
    },
    clearSpinTimeouts() {
      this.spinTimeouts.forEach((timeout) => clearTimeout(timeout));
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

      if (winnedScore > 0) {
        const CoinSound = new Audio(require("@/assets/coin2s.wav"));
        CoinSound.play();
        this.explodeCoins();
        this.isBlinking = true;
        setTimeout(() => {
          this.isBlinking = false;
        }, 1500);

        // Delay the popup by 1.5 seconds
        setTimeout(() => {
          // Show winning popup
          this.winningScore = winnedScore;
          this.showWinningPopup = true;

          // Hide popup after 3 seconds
          setTimeout(() => {
            this.showWinningPopup = false;
          }, 2000);
        }, 500); // second delay
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
  background-color: rgb(116, 217, 248);
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
  min-width: 360px;
  max-width: 430px;
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
  background-size: cover;
  opacity: 0;
  transform: scale(0);
  z-index: 6;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.6s ease var(--delay),
    opacity 0.1s ease-in var(--delay);
}

.coin.explode {
  opacity: 1;
  transform: scale(1) translate(var(--x), var(--y)) rotate(var(--rotation));
}

.coin.drop {
  // animation: recenter 0.5s ease-out forwards, fade-out 0.5s ease-out forwards;
  animation: recenter 0.3s ease-out forwards, fade-out 0.15s ease-out forwards;
}

.custom-win-text {
  background: #bbbbbb;
  background: repeating-linear-gradient(to bottom, #bbbbbb 0%, #ffffff 50%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Keyframes for the coin drop effect */
@keyframes recenter {
  0% {
    transform: translate(var(--x), var(--y)) rotate(var(--rotation))
      translateY(0);
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

.v-dialog {
  background-color: rgba(0, 0, 0, 0.5);
}

.headline {
  font-size: 24px !important;
  font-weight: bold;
}

.display-3 {
  margin-top: 35px;
  font-size: 48px !important;
  background: #949494;
  background: repeating-linear-gradient(to bottom, #c7c7c7 0%, #ffffff 50%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle-1 {
  font-size: 18px !important;
}

.dialog-content {
  position: relative;
  height: 100%;
  width: 100%;
  padding: 100px 50px;
  overflow: hidden;
}

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("/src/assets/Jackpotwin.png");
  background-size: 100%;
  background-position: center;
}

.content-wrapper {
  position: relative;
  z-index: 10;
  // background-color: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.headline {
  margin-bottom: 20px;
}

.content-wrapper-2 {
  padding: 0;
  position: absolute;
  // display: flex;
  justify-content: center;
  align-items: center;
}

.dialog-content-2 {
  height: 100%;
  width: 100%;
  padding: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.popup-score-img {
  // margin-top: -50px;
  position: absolute;
  z-index: -2;
  width: 500px;

  animation: fadeIn 0.5s ease forwards;
}
.display-4 {
  padding: 0;
  margin-top: 35px;
  font-size: 48px !important;
  background: #949494;
  background: repeating-linear-gradient(to bottom, #c7c7c7 0%, #ffffff 50%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  z-index: 11;
  position: relative;
  text-align: center;
}

.custom-dialog {
  .v-dialog__content {
    transition: all 0.3s ease-out;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
