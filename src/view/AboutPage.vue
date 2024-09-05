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
            <v-container> 
                <v-row class="align-center justify-center">
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
                </v-row>
            </v-container>

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
                'cherry': [2, 5, 10],
                'orange': [0, 15, 30],
                'prune': [0, 40, 50],
                'bell': [0, 50, 80],
                'bar1': [0, 0, 100],
                'bar2': [0, 0, 150],
                'bar3': [0, 0, 250],
                'seven': [0, 0, 500],
                'anybar': [0, 0, 80]
            },
            slots: [
                ['orange', 'bell', 'orange', 'bar2', 'prune', 'orange',
                    'bar3', 'prune', 'orange', 'bar1', 'bell', 'cherry', 'orange',
                    'prune', 'bell', 'bar1', 'cherry', 'seven', 'orange', 'prune',
                    'orange', 'bell', 'orange'],
                ['cherry', 'prune', 'orange', 'bell', 'bar1', 'cherry', 'prune',
                    'bar3', 'cherry', 'bell', 'orange', 'bar1', 'seven', 'cherry',
                    'bar2', 'cherry', 'bell', 'prune', 'cherry', 'orange', 'cherry',
                    'prune', 'orange'],
                ['cherry', 'orange', 'bell', 'prune', 'bar2', 'cherry', 'prune',
                    'orange', 'bar3', 'cherry', 'bell', 'orange', 'cherry', 'orange',
                    'cherry', 'prune', 'bar1', 'seven', 'bell', 'cherry', 'cherry',
                    'orange', 'bell']
            ]
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
                Math.floor(Math.random() * 23)
            ];

            this.$nextTick(() => {
                this.startSpinAnimation();

                const spinDuration = 2000 + Math.floor(1000 * Math.random());
                setTimeout(() => this.stopSpin(1), spinDuration);
                setTimeout(() => this.stopSpin(2), spinDuration + 500);
                setTimeout(() => this.stopSpin(3), spinDuration + 1000);
            });
        },
        startSpinAnimation() {
            const wheels = [this.$refs.wheel1, this.$refs.wheel2, this.$refs.wheel3];

            wheels.forEach((wheel, index) => {
                if (wheel && wheel[0]) {
                    const spinAnimation = wheel[0].querySelector('img.slotSpinAnimation');
                    const mainImage = wheel[0].querySelector('img.wheel-image');

                    if (spinAnimation) {
                        spinAnimation.style.display = 'block';
                    } else {
                        console.warn(`Spin animation for wheel ${index + 1} not found`);
                    }

                    if (mainImage) {
                        mainImage.style.top = `-${this.spin[index] * 64 + 16}px`;
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
                return;
            }

            const mainImage = wheel[0].querySelector('img.wheel-image');
            const spinAnimation = wheel[0].querySelector('img.slotSpinAnimation');

            if (mainImage) {
                const spinPos = this.spin[slot - 1] * 64;
                mainImage.style.transition = 'top 0.5s ease-out';
                mainImage.style.top = `-${spinPos}px`;

                mainImage.addEventListener('transitionend', () => {
                    if (spinAnimation) {
                        spinAnimation.style.display = 'none';
                    }
                    if (slot === 3) {
                        this.spinning = false;
                        this.endSpin();
                    }
                }, { once: true });
            } else {
                console.error(`Main image for wheel ${slot} not found`);
                if (slot === 3) {
                    this.spinning = false;
                    this.endSpin();
                }
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

        blink(element) {
            let opacity = 1;
            setInterval(() => {
                opacity = (opacity === 1) ? 0 : 1;
                element.style.opacity = opacity;
            }, 200);
        }
    },
    mounted() {
        this.updateCoinBar();
    }
};
</script>


<style lang="scss" scoped>
.main-background {
    background-color: rgb(183, 8, 8);
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

.slot-machine-warper {
    width: auto;
    height: 320px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.slot-machine {
    background-image: url('/src/assets/neon-bg.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 10px;
    // box-shadow: 0 1px 100px rgba(0, 0, 0, 0.6);
    height: 200px;
    margin: 50px auto;
    position: relative;
    width: 250px;
}

.slot-body {

    
    // background: red;
    -moz-border-radius: 10px;
    -webkit-border-radius: 10px;
    border-radius: 10px;
    // border: 2px solid #ffffff;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    // box-shadow: inset 0 0 25px rgba(255, 255, 255, 0.6);
    height: 200px;
    position: relative;
    width: 250px;
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
    height: 140px;
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

.slot-wheels {
    margin: 0;
    height: 136px;
    // left: 6px;
    overflow: hidden;
    position: absolute;
    // top: 12px;
    width: 217px;
    z-index: 2;
}

.slot-wheels .wheel {
    margin: 0;
    padding: 0; 
    background: #fff;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.8);
    height: 150px;
    overflow: hidden;
    position: absolute;
    top: 0;
    width: 64px;
}

.slot-wheels .wheel img.wheel-image {
    
    position: absolute;
    left: 0;
    width: 64px;
    transition: top 0.5s ease-out;
}

.slot-wheels .wheel img.slotSpinAnimation {
    position: absolute;
    left: 0;
    top: 0;
    width: 64px;
    height: 100%;
    display: none;
}

.slot-wheels .wheel img {

    left: 0;
    position: absolute;
    top: -64px;
    width: 64px;
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
.btn-1{
    background-color:#72b6ff;
	padding:10px;
	position:relative;
	font-family: 'Open Sans', sans-serif;
	font-size:20px;
    width: 150px;
	text-decoration:none;
	color:#090909;
	background-image: linear-gradient(bottom, rgb(0, 0, 0) 0%, rgb(70, 136, 183)00%);
	box-shadow: inset 0px 1px 0px #3967ff, 0px 6px 0px #1a22ff;
	border-radius: 5px;
}
.btn-1:active {
	top:7px;
	background-image: linear-gradient(bottom, rgb(83, 175, 255) 100%, rgb(6, 101, 156) 0%);
	box-shadow: inset 0px 1px 0px #7fcdf1, inset 0px -1px 0px #003284;
	color: #156785;
	text-shadow: 0px 1px 1px rgba(255,255,255,0.3);
	background: rgb(44,160,202);
}
</style>
