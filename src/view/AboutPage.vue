<template>
    <v-app>
        <v-main class="main-background">
            <v-container>
                <v-row class="align-center justify-center">
                    <v-col cols="12" md="6" class="text-center color-white ma-1">
                        <h3 class="white--text">Slot Game</h3>
                    </v-col>
                </v-row>
                <v-row class="justify-end">
                    <div class="point-warper mr-4 pa-0">
                        <div class="point-container">
                            <h5 class="point-text">ຄະແນນ</h5>
                            <h5 class="point-num">{{ score }}</h5>
                        </div>
                    </div>
                </v-row>
            </v-container>
            <v-container class="">
                <!-- <v-row class="row-1 align-center justify-center">
                    <v-col cols="12">
                        <div class="slot-machine-warper">
                            <div class="slot-machine">
                                <div class="slot-body">
                                    <div class="slut-block" ref="slotBlock"></div>
                                    <div class="slot-frame">
                                        <v-row class="slot-wheels align-center justify-center">
                                            <v-col class="pa-1" v-for="n in 3" :key="n">
                                                <div class="wheel" :ref="`wheel${n}`">
                                                    <div class="overlay"></div>
                                                    <img :src="require(`@/assets/wheel${n}.png`)" alt=""
                                                        class="wheel-image" />
                                                    <img src="@/assets/spinning.gif" alt="" class="slotSpinAnimation" />
                                                </div>
                                            </v-col>
                                        </v-row>
                                    </div>
                                    <div class="slot-display">
                                        <div class="slot-overlay"></div>
                                        <div class="credits">{{ credits }}</div>
                                        <div class="slot-credits" ref="slotCredits"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </v-col>
                    <div class="spinner">
                        <v-btn @click="triggerSpin" :disabled="spinning" class="btn-1" text>
                            {{ spinning ? 'Spinning...' : 'Spin' }}
                        </v-btn>
                    </div>
                </v-row> -->
                <div class="warper">

                    <v-row class="slot-wheels align-center justify-center">
                        <v-col  class="pa-1" v-for="n in 3" :key="n">
                        <div class="wheel" :ref="`wheel${n}`">
                            <div class="overlay"></div>
                            <img :src="require(`@/assets/wheel${n}.png`)" alt="" class="wheel-image" />
                            <img src="@/assets/spinning.gif" alt="" class="slotSpinAnimation" />
                        </div>
                    </v-col>
                </v-row>
            </div>
            </v-container>
            <div class="spinner">
                        <v-btn @click="triggerSpin" :disabled="spinning" class="btn-1" text>
                            {{ spinning ? 'Spin' : 'Spin' }}
                        </v-btn>
                    </div>

            <!-- <v-container>
                    <v-row >
                        <v-col cols="12">
                            <h1 class="prize">ລາງວັນ</h1>
                            <div class="score-machine-warper">
                                    <div class="score-body">
                                        <div class="score">
                                            <v-row class="wins">
                                                <v-col class="pa-0">
                                                    <div class="jackpot">
                                                        <div class="seven">
                                                            <img  class="seven-1" src="../assets/seven.png" alt="">
                                                            <img  class="seven-1" src="../assets/seven.png" alt="">
                                                            <img  class="seven-1" src="../assets/seven.png" alt="">
                                                        </div>
                                                        <div class="number">
                                                            <p>10,000,000</p>
                                                        </div>
                                                    </div>
                                                    
                                                </v-col>
                                                <v-col class="pa-0">
                                                    <div class="jackpot">
                                                        <div class="seven">
                                                            <img  class="seven-1" src="../assets/cherry.png" alt="">
                                                            <img  class="seven-1" src="../assets/cherry.png" alt="">
                                                            <img  class="seven-1" src="../assets/cherry.png" alt="">
                                                        </div>
                                                        <div class="number">
                                                            <p>10,000,000</p>
                                                        </div>
                                                    </div>
                                                </v-col>
                                            </v-row>
                                            <v-row class="wins">
                                                <v-col class="pa-0">
                                                    <div class="jackpot">
                                                        <div class="">
                                                            <img class="seven-1" src="../assets/orange.png" alt="">
                                                            <img class="seven-1" src="../assets/orange.png" alt="">
                                                            <img class="seven-1" src="../assets/orange.png" alt="">
                                                        </div>
                                                        <div class="number">
                                                            <p>1,000,000</p>
                                                        </div>
                                                    </div>
                                                </v-col>
                                                <v-col class="pa-0">
                                                    <div class="jackpot">
                                                        <div class="">
                                                            <img class="seven-1" src="../assets/bell.png" alt="">
                                                            <img class="seven-1" src="../assets/bell.png" alt="">
                                                            <img class="seven-1" src="../assets/bell.png" alt="">
                                                        </div>
                                                        <div class="number">
                                                            <p>1,000,000</p>
                                                        </div>
                                                    </div>
                                                </v-col>
                                            </v-row>
                                            <v-row class="wins">
                                                <v-col class="pa-0">
                                                    <div class="jackpot">
                                                        <div class="">
                                                            <img class="seven-1" src="../assets/cherry.png" alt="">
                                                            <img class="seven-1" src="../assets/orange.png" alt="">
                                                            <img class="seven-1" src="../assets/bell.png" alt="">
                                                        </div>
                                                        <div class="number">
                                                            <p>1,000,000</p>
                                                        </div>
                                                    </div>
                                                </v-col>
                                                <v-col class="pa-0">
                                                    <div class="jackpot">
                                                        <div class="">
                                                            <img class="seven-1" src="../assets/diamond.png" alt="">
                                                            <img class="seven-1" src="../assets/diamond.png" alt="">
                                                            <img class="seven-1" src="../assets/diamond.png" alt="">
                                                        </div>
                                                        <div class="number">
                                                            <p>1,000,000</p>
                                                        </div>
                                                    </div>
                                                </v-col>
                                            </v-row>
                                            <v-row class="wins">
                                                <v-col class="pa-0">
                                                    <div class="jackpot">
                                                        <div class="">
                                                            <img class="seven-1" src="../assets/diamond.png" alt="">
                                                            <img class="seven-1" src="../assets/diamond.png" alt="">
                                                            <v-icon class="icon none"></v-icon>
                                                        </div>
                                                        <div class="number">
                                                            <p>100,000</p>
                                                        </div>
                                                    </div>
                                                </v-col>
                                                <v-col class="pa-0">
                                                    <div class="jackpot">
                                                        <div class="">
                                                            <img class="seven-1" src="../assets/lemon.png" alt="">
                                                            <img class="seven-1" src="../assets/lemon.png" alt="">
                                                            <img class="seven-1" src="../assets/lemon.png" alt="">
                                                        </div>
                                                        <div class="number">
                                                            <p>100,000</p>
                                                        </div>
                                                    </div>
                                                </v-col>
                                            </v-row>
                                            <v-row class="wins">
                                                <v-col class="pa-0">
                                                    <div class="jackpot">
                                                        <div class="">
                                                            <img class="seven-1" src="../assets/lemon.png" alt="">
                                                            <img class="seven-1" src="../assets/lemon.png" alt="">
                                                            <v-icon class="icon none"></v-icon>
                                                        </div>
                                                        <div class="number">
                                                            <p>100,000</p>
                                                        </div>
                                                    </div>
                                                </v-col>
                                                <v-col class="pa-0">
                                                    <div class="jackpot">
                                                        <div class="">
                                                            <img class="seven-1" src="../assets/watermelon.png" alt="">
                                                            <img class="seven-1" src="../assets/watermelon.png" alt="">
                                                            <img class="seven-1" src="../assets/watermelon.png" alt="">
                                                        </div>
                                                        <div class="number">
                                                            <p>100,000</p>
                                                        </div>
                                                    </div>
                                                </v-col>
                                            </v-row>
                                            <v-row class="wins">
                                                <v-col class="pa-0">
                                                    <div class="jackpot">
                                                        <div class="">
                                                            <img class="seven-1" src="../assets/watermelon.png" alt="">
                                                            <img class="seven-1" src="../assets/watermelon.png" alt="">
                                                            <v-icon class="icon none"></v-icon>
                                                        </div>
                                                        <div class="number">
                                                            <p>100,000</p>
                                                        </div>
                                                    </div>
                                                </v-col>
                                                <v-col class="pa-0">
                                                    <div class="jackpot">
                                                        <div class="">
                                                            <img class="seven-1" src="../assets/cherry-gold.png" alt="">
                                                            <img class="seven-1" src="../assets/cherry-gold.png" alt="">
                                                            <img class="seven-1" src="../assets/cherry-gold.png" alt="">
                                                        </div>
                                                        <div class="number">
                                                            <p>10,000</p>
                                                        </div>
                                                    </div>
                                                </v-col>
                                            </v-row>
                                            <v-row class="wins">
                                                <v-col class="pa-0">
                                                    <div class="jackpot">
                                                        <div class="">
                                                            <img class="seven-1" src="../assets/cherry-gold.png" alt="">
                                                            <img class="seven-1" src="../assets/cherry-gold.png" alt="">
                                                            <v-icon class="icon none"></v-icon>
                                                        </div>
                                                        <div class="number">
                                                            <p>10,000</p>
                                                        </div>
                                                    </div>
                                                </v-col>
                                                <v-col class="pa-0">
                                                    <div class="jackpot">
                                                        <div class="">
                                                            <img class="seven-1" src="../assets/cherry-gold.png" alt="">
                                                            <v-icon class="icon none"></v-icon>
                                                            <v-icon class="icon none"></v-icon>
                                                        </div>
                                                        <div class="number">
                                                            <p>10,000</p>
                                                        </div>
                                                    </div>
                                                </v-col>
                                            </v-row>
                                    
                                    
                                            
                                            
                                        </div>
                                    </div>
                                
                            </div>
                        </v-col>
                    </v-row>
        </v-container> -->
        </v-main>

    </v-app>
</template>

<script>
export default {
    data() {
        return {
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
        };
    },
    methods: {
 triggerSpin() {
      if (this.spinning || this.credits <= 0) return;

      this.spinning = true;
      this.credits--;
      this.updateCoinBar();

      this.spin = [
        Math.floor(Math.random() * 23),
        Math.floor(Math.random() * 23),
        Math.floor(Math.random() * 23),
      ];

      this.$nextTick(() => {
        this.startSpinAnimation();

        const spinDuration = 2000 + Math.floor(1000 * Math.random());
        this.spinTimeouts = [
          setTimeout(() => this.stopSpin(1), spinDuration),
          setTimeout(() => this.stopSpin(2), spinDuration + 500),
          setTimeout(() => this.stopSpin(3), spinDuration + 1000)
        ];
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
                    } else {
                        console.warn(`Spin animation for wheel ${index + 1} not found`);
                    }

                    if (mainImage) {
                        mainImage.style.top = `-${this.spin[index] * 80 + 16}px`;
                    } else {
                        console.warn(`Main image for wheel ${index + 1} not found`);
                    }
                } else {
                    console.warn(`Wheel ${index + 1} not found`);
                }
            });
        },

        stopSpin(slot) {
      const wheel = this.$refs[`wheel${slot}`];
      if (!wheel || !wheel[0]) {
        console.error(`Wheel ${slot} not found`);
        this.handleSpinError(slot);
        return;
      }

      const mainImage = wheel[0].querySelector("img.wheel-image");
      const spinAnimation = wheel[0].querySelector("img.slotSpinAnimation");

      if (mainImage) {
        const spinPos = this.spin[slot - 1] * 80 - 20;
        mainImage.style.transition = "top 0.5s ease-out";
        mainImage.style.top = `-${spinPos}px`;

        mainImage.addEventListener(
          "transitionend",
          () => {
            if (spinAnimation) {
              spinAnimation.style.display = "none";
            }
            if (slot === 3) {
              this.spinning = false;
              this.endSpin();
            }
          },
          { once: true }
        );
      } else {
        console.error(`Main image for wheel ${slot} not found`);
        this.handleSpinError(slot);
      }
    },
    handleSpinError(slot) {
      // Force stop spinning if there's an error
      if (slot === 3 || !this.$refs[`wheel${slot + 1}`]) {
        this.spinning = false;
        this.endSpin();
      }
    },
        updateCoinBar() {
            const coinBar = this.$refs.slotCredits;
            if (coinBar) {
                const widthPercentage = (this.credits / 100) * 100;
                coinBar.style.width = `${Math.min(widthPercentage, 100)}%`;
            }
        },
        endSpin() {
            if (this.spinTimeouts) {
        this.spinTimeouts.forEach(timeout => clearTimeout(timeout));
      }
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

            this.updateCoinBar();

            // Enable spinning again
            this.spinning = false;

            // Check if the player has run out of credits
            if (this.credits <= 0) {
                alert("You've run out of credits.");
                // You might want to reset the game or show a "Play Again" button here
            }
        },
        resetGame() {
      this.spinning = false;
      if (this.spinTimeouts) {
        this.spinTimeouts.forEach(timeout => clearTimeout(timeout));
      }
      this.spinTimeouts = null;
      
      // Reset wheel positions
      [1, 2, 3].forEach(slot => {
        const wheel = this.$refs[`wheel${slot}`];
        if (wheel && wheel[0]) {
          const mainImage = wheel[0].querySelector("img.wheel-image");
          const spinAnimation = wheel[0].querySelector("img.slotSpinAnimation");
          if (mainImage) {
            mainImage.style.transition = "none";
            mainImage.style.top = "0px";
          }
          if (spinAnimation) {
            spinAnimation.style.display = "none";
          }
        }
      });},
        blink(element) {
            let opacity = 1;
            setInterval(() => {
                opacity = opacity === 1 ? 0 : 1;
                element.style.opacity = opacity;
            }, 200);
        },
    },
    mounted() {
        this.updateCoinBar();
    },
    beforeDestroy() {
    // Clear any remaining timeouts when the component is destroyed
    if (this.spinTimeouts) {
      this.spinTimeouts.forEach(timeout => clearTimeout(timeout));
    }
  }
};
</script>

<style lang="scss" scoped>
.main-background {
    background-image: url("/src/assets/bg.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    // background-color: rgb(255, 255, 255);
    
}

.point-warper {
    width: 125px;
    background-color: #2a2f3b;
    border-radius: 13px;
}

.point-container {
    color: #ffffff;
    display: flex;
    justify-content: space-between;
}

.point-text {
    background-color: #45556c;
    padding: 4px 10px;

    border-radius: 13px;
}

.point-num {
    padding: 4px 12px;
}

.row-1 {
    width: 100%;
}

.slot-machine-warper {
    width: auto;
    height: 700px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.slot-machine {
    // background-image: url('/src/assets/neon-bg.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 10px;
    // box-shadow: 0 1px 100px rgba(0, 0, 0, 0.6);
    height: 160px;
    margin: 50px auto;
    position: relative;
    width: 300px;
}

.slot-body {
    // background: red;
    // -moz-border-radius: 10px;
    // -webkit-border-radius: 10px;
    border-radius: 10px;
    // box-shadow: inset 0 0 25px rgba(255, 255, 255, 0.6);
    // border: 2px solid #ffffff;
    // -moz-box-sizing: border-box;
    // -webkit-box-sizing: border-box;
    // box-sizing: border-box;
    height: 200px;
    position: relative;
    width: 300px;
    z-index: 2;
}

.slot-block {
    display: none;
    height: 113%;
    left: 0;
    position: absolute;
    top: -18px;
    width: 225px;
    z-index: 4;
}

.slot-frame {
    background: #1b1b1b;
    background: -moz-linear-gradient(top,
            #1b1b1b 0%,
            #383838 8%,
            #3a3a3a 20%,
            #0a0a0a 47%,
            #010101 50%,
            #0d0d0d 54%,
            #444444 100%);
    background: -webkit-gradient(linear,
            left top,
            left bottom,
            color-stop(0%, #1b1b1b),
            color-stop(8%, #383838),
            color-stop(20%, #3a3a3a),
            color-stop(47%, #0a0a0a),
            color-stop(50%, #010101),
            color-stop(54%, #0d0d0d),
            color-stop(100%, #444444));
    background: -webkit-linear-gradient(top,
            #1b1b1b 0%,
            #383838 8%,
            #3a3a3a 20%,
            #0a0a0a 47%,
            #010101 50%,
            #0d0d0d 54%,
            #444444 100%);
    background: -o-linear-gradient(top,
            #1b1b1b 0%,
            #383838 8%,
            #3a3a3a 20%,
            #0a0a0a 47%,
            #010101 50%,
            #0d0d0d 54%,
            #444444 100%);
    background: -ms-linear-gradient(top,
            #1b1b1b 0%,
            #383838 8%,
            #3a3a3a 20%,
            #0a0a0a 47%,
            #010101 50%,
            #0d0d0d 54%,
            #444444 100%);
    background: linear-gradient(to bottom,
            #1b1b1b 0%,
            #383838 8%,
            #3a3a3a 20%,
            #0a0a0a 47%,
            #010101 50%,
            #0d0d0d 54%,
            #444444 100%);
    -moz-border-radius: 6px;
    -webkit-border-radius: 6px;
    border-radius: 6px;
    -moz-box-shadow: 0 0 16px rgba(255, 255, 255, 0.3);
    -webkit-box-shadow: 0 0 16px rgba(255, 255, 255, 0.3);
    box-shadow: 0 0 16px rgba(255, 255, 255, 0.3),
        0 1px 1px rgba(255, 255, 255, 0.5), 0 -1px 1px rgba(255, 255, 255, 0.2),
        inset 0 -2px 15px #000;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border: 2px solid #efefef;
    height: 136px;
    left: 50%;
    margin-left: -110px;
    position: absolute;
    top: 10px;
    width: 221px;
    z-index: 1;
}

.slot-display {
    width: 100%;
    /* Full width of the bar */
    background-color: grey;
    border: 2px solid #f6f6f6;
    border-radius: 6px;
    bottom: 10px;
    height: 28px;
    left: 50%;
    letter-spacing: 3px;
    line-height: 25px;
    margin-left: -85px;
    font-family: "Courier New", Courier, monospace;
    font-size: 18px;
    text-align: center;
    /* Center the text horizontally */
    position: absolute;
    width: 171px;
    /* Total width of the bar */
    z-index: 2;
    overflow: hidden;
    /* Hide overflow to keep the overlay inside the bar */
}

.slot-display div {
    position: absolute;
    top: 1px;
    width: 100%;
    text-align: center;
    /* Center the text horizontally */
    animation: spin 2s linear infinite;
    /* Apply spinning animation */
}

.slot-credits {
    width: 100%;
    /* Start at full width */
    background-color: rgb(51, 167, 255);
    /* Color of the filled bar */
    height: 100%;
    transition: width 0.5s ease;
    z-index: 2;
}

.credits {
    z-index: 3;
    text-align: center;
    color: #ffffff;
    /* White text color */
    font-weight: bold;
}

.slot-overlay {
    background: -moz-linear-gradient(top,
            rgba(0, 0, 0, 0.1) 0%,
            rgba(0, 0, 0, 0.15) 50%,
            rgba(0, 0, 0, 0) 51%,
            rgba(0, 0, 0, 0) 100%);
    background: -webkit-gradient(linear,
            left top,
            left bottom,
            color-stop(0%, rgba(0, 0, 0, 0.1)),
            color-stop(50%, rgba(0, 0, 0, 0.15)),
            color-stop(51%, rgba(0, 0, 0, 0)),
            color-stop(100%, rgba(0, 0, 0, 0)));
    background: -webkit-linear-gradient(top,
            rgba(0, 0, 0, 0.1) 0%,
            rgba(0, 0, 0, 0.15) 50%,
            rgba(0, 0, 0, 0) 51%,
            rgba(0, 0, 0, 0) 100%);
    background: -o-linear-gradient(top,
            rgba(0, 0, 0, 0.1) 0%,
            rgba(0, 0, 0, 0.15) 50%,
            rgba(0, 0, 0, 0) 51%,
            rgba(0, 0, 0, 0) 100%);
    background: -ms-linear-gradient(top,
            rgba(0, 0, 0, 0.1) 0%,
            rgba(0, 0, 0, 0.15) 50%,
            rgba(0, 0, 0, 0) 51%,
            rgba(0, 0, 0, 0) 100%);
    background: linear-gradient(to bottom,
            rgba(0, 0, 0, 0.1) 0%,
            rgba(0, 0, 0, 0.15) 50%,
            rgba(0, 0, 0, 0) 51%,
            rgba(0, 0, 0, 0) 100%);
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 3;
}
.warper{
    margin-top: 276px;
    width: 97vw;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.slot-wheels {
    margin: 0;
    margin-left: 10px;
    height: 200px;
    // left: 6px;
    overflow: hidden;
    position: absolute;
    // top: 12px;
    width: 300px;
    z-index: 1;
}

.slot-wheels .wheel {
    // box-shadow: 0 0 15px rgba(0, 0, 0, 0.8);
    margin: 0;
    padding: 0;
    background: #fff;
    height: 200px;
    overflow: hidden;
    position: absolute;
    top: 2px;
    width: 80px;
}

.slot-wheels .wheel img.wheel-image {
    position: absolute;
    left: 0;
    width: 80px;
    transition: top 0.5s ease-out;
}

.slot-wheels .wheel img.slotSpinAnimation {
    position: absolute;
    left: 0;
    top: 0;
    width: 80px;
    height: 100%;
    display: none;
}

.slot-wheels .wheel img {
    left: 0;
    position: absolute;
    top: -64px;
    width: 80px;
    z-index: 1;

    // position: relative;
    // top: 0;
    transition: top 0.5s ease-out;
}

.slot-wheels .wheel .overlay {
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 2;
}

.slotSpinAnimation {
    height: 125%;
    display: none;
}

.blink {
    animation: blink-animation 0.4s;
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

.score-machine-warper {
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
}

// .score-machine{
//     border-radius: 10px;
//     height: 216px;
//     margin: 50px auto;
//     position: relative;
//     width: 250px;
// }

.prize {
    margin: 2% 10%;
    height: auto;
    display: flex;
    color: white;
    justify-content: center;
}

.score-body {
    background: red;
    -moz-border-radius: 10px;
    -webkit-border-radius: 10px;
    border-radius: 10px;
    border: 2px solid #ffffff;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    box-shadow: inset 0 0 25px rgba(255, 255, 255, 0.6);
    height: auto;
    // margin: 50px auto;
    position: relative;
    width: 450px;
}

.score {
    background: rgb(30, 26, 26);
    -webkit-border-radius: 12px;
    border-radius: 10px;
    height: auto;
    // margin: 50px auto;
    position: relative;
    width: auto;
    margin: 5%;
    padding: 2%;
}

.wins {
    margin: 2%;
    padding: 0%;
    display: flex;
    gap: 4%;
}

.jackpot {
    background-color: #ffffff;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    border-radius: 2px;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    /* float: left; */
    width: auto;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.seven-1 {
    background-size: cover;
    float: left;
    align-content: center;
    height: 30px;
    width: 25px;
    padding: 4px;
    display: flex;
    gap: 3px;
}

// .cherry img {
//     display: flex;
//     float: left;
//     align-content: center;
//     height: 35px;
//     padding: 4px;
// }

// .slot-win {
//     display: flex;
//     float: left;
//     align-content: center;
//     height: 35px;
//     padding: 5px;
//     width:auto ;

// }
.icon {
    background-image: url("../assets/wheel2.png");
    background-size: cover;
    float: left;
    align-content: center;
    height: 30px;
    width: 25px;
    // margin: 0 4px 0 4px;
}

.none {
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIE1hY2ludG9zaCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpERDYyQTgyN0YzODQxMUUyQTI2ODg5QzYxMzAwREQ2QiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpERDYyQTgyOEYzODQxMUUyQTI2ODg5QzYxMzAwREQ2QiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkRENjJBODI1RjM4NDExRTJBMjY4ODlDNjEzMDBERDZCIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkRENjJBODI2RjM4NDExRTJBMjY4ODlDNjEzMDBERDZCIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+BcnfuAAAASdJREFUeNrsmIENgjAQRalxAVfAEXQEGIEVXAFHwBFwBFegI9gRZAQdAa9JTRriVbkWKOEu+WkkufZR//Wqouu6ZEmxSRYWDMzADMzADDxvbKmJQgg9FKAUdADtrPETL5ACSSNlz0HqsjqJIohGpw9UY16QvPbUlshAd/NNLMbD2jK3OYBV77O01P7ITc1uTwqsC+oCOuoaBOWW9mZUjnyaLTyK7p9IHQVYxlh07QBLRVF0meNFZIzAJfL8TJ5xRA+XiHcrn7XHAs4Q2Np3s8YA1o3hibTlJEbg+gvso3cpigYYO3dPoeon9ClRIEfYdfb7sKNdyxANAr2HU/+qMhd4r6CsvZ6fSEg0yPM8Vktgk4nVWoKBGThU0fEOMzADMzADrxP4LcAAm0+UuYeiN/oAAAAASUVORK5CYII=");
    background-position: center center;
}

.number p {
    justify-content: right;
    margin: 0;
    padding-right: 2px;
}

.spin-button {
            background-color: #ff4500;
            color: white;
            font-family: Arial, sans-serif;
            font-size: 24px;
            font-weight: bold;
            padding: 15px 30px;
            border: none;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }

        .spin-button::after {
            content: "Hold for AutoSpin";
            position: absolute;
            bottom: 2px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 10px;
            white-space: nowrap;
        }

        .spin-button:hover {
            background-color: #ff5722;
        }

        .spin-button:active {
            transform: translateY(2px);
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
</style>
