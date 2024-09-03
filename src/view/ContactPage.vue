<template>
    <v-app>
        <v-main>
            <v-container fluid class="d-flex align-center justify">
                <div class="sec-1">
                    <h1>Calcu</h1>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field v-model="result" readonly></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="3">
                            <v-btn @click="clear">C</v-btn>
                        </v-col>
                        <v-col cols="3">
                            <v-btn @click="append('/')">/</v-btn>
                        </v-col>
                        <v-col cols="3">
                            <v-btn @click="append('*')">*</v-btn>
                        </v-col>
                        <v-col cols="3">
                            <v-btn @click="append('-')">-</v-btn>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="3">
                            <v-btn @click="append('7')">7</v-btn>
                        </v-col>
                        <v-col cols="3">
                            <v-btn @click="append('8')">8</v-btn>
                        </v-col>
                        <v-col cols="3">
                            <v-btn @click="append('9')">9</v-btn>
                        </v-col>
                        <v-col cols="3">
                            <v-btn @click="append('+')">+</v-btn>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="3">
                            <v-btn @click="append('4')">4</v-btn>
                        </v-col>
                        <v-col cols="3">
                            <v-btn @click="append('5')">5</v-btn>
                        </v-col>
                        <v-col cols="3">
                            <v-btn @click="append('6')">6</v-btn>
                        </v-col>
                        <v-col cols="3">
                            <v-btn @click="calculate">=</v-btn>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="3">
                            <v-btn @click="append('1')">1</v-btn>
                        </v-col>
                        <v-col cols="3">
                            <v-btn @click="append('2')">2</v-btn>
                        </v-col>
                        <v-col cols="3">
                            <v-btn @click="append('3')">3</v-btn>
                        </v-col>
                        <v-col cols="3">
                            <v-btn @click="append('0')">0</v-btn>
                        </v-col>
                    </v-row>
                </div>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
export default {
    data() {
        return {
            result: "", // Holds the current input or result
        };
    },
    methods: {
        append(char) {
            this.result += char; // Add character to the result
        },
        clear() {
            this.result = ""; // Clear the result
        },
        calculate() {
            try {
                this.result = eval(this.result).toString(); // Evaluate the expression
            } catch (e) {
                this.result = "Error"; // Display error on invalid expression
            }
        },
        handleKeydown(event) {
            const key = event.key;

            if ("0123456789".includes(key)) {
                this.append(key);
            } else if ("+-/*".includes(key)) {
                this.append(key);
            } else if (key === "Enter") {
                this.calculate();
            } else if (key === "Escape") {
                this.clear();
            } else if (key === "Backspace") {
                this.result = this.result.slice(0, -1); // Remove the last character
            }
        },
    },
    mounted() {
        window.addEventListener("keydown", this.handleKeydown);
    },
    beforeDestroy() {
        window.removeEventListener("keydown", this.handleKeydown);
    },
};
</script>

<style lang="scss" scoped>
.sec-1 {
    width: 100vw;
    height: 700px;
    margin: 10%;
}
</style>
