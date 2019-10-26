<template>
  <div>
    <div class="text-xs-center">
      <v-row>
        <v-col cols="12">
          <v-row justify="center">
            <h1>Guess my number</h1>
          </v-row>
          <v-row justify="center" ref="canvasRow">
            <Canvas v-model="image" ref="canvas" width="480" />
          </v-row>
          <v-row justify="center">
            <v-btn
              color="success"
              @click="guess"
              :loading="guessingLoading"
              large
              class="title"
            >Guess My Number</v-btn>
          </v-row>
          <v-row class="headline my-2" justify="center" v-if="answer">I guessed {{answer}}</v-row>
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script>
import Canvas from "@/components/Canvas";
import Axios from "axios";
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
      Axios.post("http://guessmynumber.ml/guess", {
        image: this.image
      })
        .then(res => {
          this.guessingLoading = false;
          this.answer = res.data.number;
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