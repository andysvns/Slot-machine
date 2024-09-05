<template>
    <v-app>
        <v-main class="main-background">
            <v-container>
                <v-row class="align-center justify-center">
                    <v-col cols="12" md="6" class="text-center color-white ma-1">
                        <h3 class="white--text">Slut game</h3>
                    </v-col>
                </v-row>
                <v-row class="align-end justify-end">
                    <v-col cols="3" class="point-warper mr-4 pa-0">
                        <div class="point-container">
                            <h5 class="point-text">ຄະແນນ</h5>
                            <h5 class="point-num">01</h5>
                        </div>
                    </v-col>
                </v-row>
            </v-container>
            <v-container>
                <v-row class="align-center justify-center">
                    <v-col cols="12">
                        <div class="slot-machine-warper">
                            <div class="slot-machine">
                                <div class="slot-body">
                                    <div class="slut-block"></div>
                                    <div class="slot-frame">
                                        <v-row class="slot-wheels align-center justify-center">
                                            <v-col>
                                                <div id="wheel1" class="wheel">
                                                    <div class="overlay"></div>
                                                    <img src="../assets/wheel1.png" alt="" />

                                                    <img src="spinning.gif" alt="" class="slotSpinAnimation" />
                                                </div>
                                            </v-col>
                                            <v-col>
                                                <div id="wheel2" class="wheel">
                                                    <div class="overlay"></div>
                                                    <img src="../assets/wheel2.png" alt="" />

                                                    <img src="spinning.gif" alt="" class="slotSpinAnimation" />
                                                </div>
                                            </v-col>
                                            <v-col>
                                                <div id="wheel3" class="wheel">
                                                    <div class="overlay"></div>
                                                    <img src="../assets/wheel3.png" alt="" />

                                                    <img src="spinning.gif" alt="" class="slotSpinAnimation" />
                                                </div>
                                            </v-col>
                                        </v-row>
                                    </div>

                                    <div class="slot-display">
                                        <div class="slot-overlay"></div>
                                        <div class="credits">100</div>
                                        <div class="slot-credits"></div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </v-col>
                </v-row>

                <div class="spinner">
                    <v-btn id="triggerSlotMachine" class="btn-1">
                        Spin the Slot Machine
                    </v-btn>
                </div>
            </v-container>

        </v-main>
    </v-app>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.main-background {
    background-color: rgb(183, 8, 8);
}

.point-warper {
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
    padding: 4px 8%;
}

.slot-machine-warper {
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.slot-machine {
    border-radius: 10px;
    box-shadow: 0 1px 100px rgba(0, 0, 0, 0.6), 0 1px 2px rgba(0, 0, 0, 0.8);
    height: 150px;
    margin: 50px auto;
    position: relative;
    width: 250px;
}

.slot-body {
    background: red;
    -moz-border-radius: 10px;
    -webkit-border-radius: 10px;
    border-radius: 10px;
    border: 2px solid #ffffff;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    box-shadow: inset 0 0 25px rgba(255, 255, 255, 0.6);
    height: 200px;
    // margin: 50px auto;
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
    height: 136px;
    left: 6px;
    overflow: hidden;
    position: absolute;
    top: 12px;
    width: 217px;
    z-index: 2;
}

.slot-wheels .wheel {
    background: #fff;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.8);
    height: 150px;
    overflow: hidden;
    position: absolute;
    top: 0;
    width: 64px;
}

.slot-wheels .wheel img {
    left: 0;
    position: absolute;
    top: -54px;
    width: 64px;
    z-index: 1;
}

// .wheel1 {
//     left: px;
// }

// .wheel2 {
//     left: 76px;
// }

// .wheel3 {
//     left: 144px;
// }

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


</style>
