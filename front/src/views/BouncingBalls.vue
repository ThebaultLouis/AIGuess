<template>
  <div>
    <br class="my-1" />
    <!-- <v-row justify="center">
      <v-col cols="11" sm="6" class="my-3">
        <v-slider v-model="nBalls" min="10" max="100" thumb-label="always" label="Nombre de balles"></v-slider>
      </v-col>
      <v-col cols="auto">
        <v-btn color="primary">Generate</v-btn>
      </v-col>
    </v-row>-->
    <div></div>
    <div class="container" ref="container">
      <canvas ref="lifeGame"></canvas>
    </div>
    <v-row>
      <v-col cols="12">
        <v-row justify="center"></v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// import default_ball from "@/objects/Ball";
// import default_utils from "@/objects/Utils";

// import Utils from "@/objects/Utils";

export default {
  data() {
    return {
      nBalls: 25
    };
  },
  methods: {},

  mounted: function() {
    var containerRect = this.$refs.container.getBoundingClientRect();
    var canvas = this.$refs.lifeGame;
    var ctx = canvas.getContext("2d");

    var width = (canvas.width = containerRect.width);
    var height = (canvas.height = containerRect.width);
    // var width = (canvas.width = window.innerWidth);
    // var height = (canvas.height = window.innerHeight);

    function random(min, max) {
      var num = Math.floor(Math.random() * (max - min + 1)) + min;
      return num;
    }
    function Ball(x, y, velX, velY, color, size) {
      this.x = x;
      this.y = y;
      this.velX = velX;
      this.velY = velY;
      this.color = color;
      this.size = size;
    }
    Ball.prototype.draw = function(ctx) {
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
      ctx.fill();
    };
    Ball.prototype.update = function(width, height) {
      if (this.x + this.size >= width) {
        this.velX = -this.velX;
      }

      if (this.x - this.size <= 0) {
        this.velX = -this.velX;
      }

      if (this.y + this.size >= height) {
        this.velY = -this.velY;
      }

      if (this.y - this.size <= 0) {
        this.velY = -this.velY;
      }

      this.x += this.velX;
      this.y += this.velY;
    };
    Ball.prototype.collisionDetect = function(balls) {
      for (var j = 0; j < balls.length; j++) {
        if (!(this === balls[j])) {
          var dx = this.x - balls[j].x;
          var dy = this.y - balls[j].y;
          var distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < this.size + balls[j].size) {
            balls[j].color = this.color =
              "rgb(" +
              random(0, 255) +
              "," +
              random(0, 255) +
              "," +
              random(0, 255) +
              ")";
          }
        }
      }
    };

    var balls = [];
    function loop() {
      ctx.fillStyle = "rgb(255, 255, 255)";
      ctx.fillRect(0, 0, width, height);

      while (balls.length < 50) {
        var ball = new Ball(
          random(0, width),
          random(0, height),
          random(-7, 7),
          random(-7, 7),
          "rgb(" +
            random(0, 255) +
            "," +
            random(0, 255) +
            "," +
            random(0, 255) +
            ")",
          random(10, 20)
        );
        balls.push(ball);
      }

      for (var i = 0; i < balls.length; i++) {
        balls[i].draw(ctx);
        balls[i].update(width, height);
        balls[i].collisionDetect(balls);
      }

      requestAnimationFrame(loop);
    }

    loop();
  }
};
</script>