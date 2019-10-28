<template>
  <div>
    <div class="text-xs-center">
      <v-row>
        <v-col cols="12">
          <v-row justify="center">
            <h1>Guess my hiragana</h1>
          </v-row>
          <v-row justify="center" ref="canvasRow">
            <Canvas v-model="image" ref="canvas" width="480" />
          </v-row>
          <v-row justify="center">
            <v-btn
              color="red darken-2"
              outlined
              @click="guess"
              :loading="guessingLoading"
              large
              class="title"
            >Guess my hiragana</v-btn>
          </v-row>
          <v-row class="headline my-2" justify="center" v-if="answer">
            I guessed:
            <span class="font-weight-bold">{{answer}}</span>
          </v-row>
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script>
import Canvas from "@/components/Canvas";
import Axios from "axios";
import Config from "@/config.js";

export default {
  components: {
    Canvas
  },
  data() {
    return {
      image: "",
      answer: null,
      guessingLoading: false,
      canvasRect: {}
    };
  },
  methods: {
    guess: function() {
      this.guessingLoading = true;
      Axios.post(`${Config.apiUrl}/guessmyhiragana`, {
        image: this.image
      })
        .then(res => {
          this.guessingLoading = false;
          this.answer = res.data.romanji;
          this.$refs.canvas.clear();
        })
        .catch(e => {
          this.guessingLoading = false;
          console.log(e);
          this.$refs.canvas.clear();
        });
    }
  }
};
</script>
