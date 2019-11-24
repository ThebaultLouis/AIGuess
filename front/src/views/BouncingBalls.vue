<template>
  <div>
    <br class="my-1" />
    <v-row justify="center">
      <v-col cols="11" sm="6" class="my-3">
        <v-slider v-model="nBalls" min="10" max="200" thumb-label="always" label="Nombre de balles"></v-slider>
      </v-col>
      <v-col cols="auto">
        <v-btn @click="generate()" color="primary">Generate</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-row justify="center">
          <v-col cols="12" sm="10">
            <div class="lifeGameContainer" ref="container">
              <canvas ref="lifeGame"></canvas>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Ball from "@/objects/bouncingBalls/Ball";
import { random } from "@/objects/Utils";

export default {
  data() {
    return {
      nBalls: 25,
      canvas: null,
      ctx: null,
      width: 0,
      height: 0,
      balls: []
    };
  },
  methods: {
    bouncingBalls() {
      var containerRect = this.$refs.container.getBoundingClientRect();
      var canvas = this.$refs.lifeGame;
      var ctx = canvas.getContext("2d");

      var width = (canvas.width = containerRect.width);
      var height = (canvas.height = 600);
      // var height = (canvas.height = containerRect.width);
      var nBalls = this.nBalls;

      var max_radius = 25;
      var min_radius = 10;
      var balls = [];
      function loop() {
        ctx.fillStyle = "rgb(255, 255, 255)";
        ctx.fillRect(0, 0, width, height);

        while (balls.length < nBalls) {
          var ball = new Ball(
            random(max_radius, width - max_radius),
            random(max_radius, height - max_radius),
            random(-7, 7),
            random(-7, 7),
            "rgb(" +
              random(0, 255) +
              "," +
              random(0, 255) +
              "," +
              random(0, 255) +
              ")",
            random(min_radius, max_radius)
          );
          balls.push(ball);
        }

        for (var i = 0; i < balls.length; i++) {
          balls[i].draw(ctx);
          balls[i].update(width, height);
          // balls[i].collisionDetect(balls);
        }

        requestAnimationFrame(loop);
      }

      loop();
    },
    generate() {
      // this.nBalls = 50;
      this.bouncingBalls();
    }
  },

  mounted: function() {
    this.bouncingBalls();
  }
};
</script>