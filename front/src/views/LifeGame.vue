<template>
  <div>
    <br />
    <v-row justify="center">
      <!-- <v-col cols="11" sm="6" class="my-3">
        <v-slider v-model="nBalls" min="10" max="200" thumb-label="always" label="Nombre de balles"></v-slider>
      </v-col>-->
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
import Cell from "@/objects/cellular_automaton/lifeGameCell";
import { random } from "@/objects/Utils";

export default {
  data() {
    return {
      pid: 0
    };
  },
  methods: {
    lifeGame() {
      var containerRect = this.$refs.container.getBoundingClientRect();
      var canvas = this.$refs.lifeGame;
      var ctx = canvas.getContext("2d");

      var radius = 16;
      var width = Math.floor((canvas.width = containerRect.width) / radius - 1);
      var height = Math.floor((canvas.height = 600) / radius - 1);

      var cells = [];
      for (var i = 0; i < height; i++) {
        cells[i] = new Array(width);
      }
      var init = false;
      var frame = 10;
      var hz = 60 / frame;
      var frame_cpt = 0;
      // var pid = this.pid;
      var e = this;

      function loop() {
        if (frame_cpt == 0) {
          ctx.fillStyle = "rgb(255, 255, 255)";
          ctx.fillRect(0, 0, width, height);
          if (!init) {
            for (var y = 0; y < height; y++) {
              for (var x = 0; x < width; x++) {
                var cell = new Cell(x, y, random(0, 1), radius);
                cells[y][x] = cell;
              }
            }
            init = true;
          }

          for (y = 0; y < height; y++) {
            for (x = 0; x < width; x++) {
              // Rafraichir
              cells[y][x].refresh();
              // Dessiner
              cells[y][x].draw(ctx);
            }
          }

          // Trouver les voisins
          var vx, vy;
          for (y = 0; y < height; y++) {
            for (x = 0; x < width; x++) {
              for (var voisin_y = y - 1; voisin_y <= y + 1; voisin_y++) {
                vy = voisin_y;
                if (voisin_y == -1) vy = height - 1;
                if (voisin_y == height) vy = 0;
                for (var voisin_x = x - 1; voisin_x <= x + 1; voisin_x++) {
                  vx = voisin_x;
                  if (voisin_x == -1) vx = width - 1;
                  if (voisin_x == width) vx = 0;

                  if (x == vx && y == vy) continue;

                  cells[y][x].addNeighbor(cells[vy][vx]);
                }
              }
            }
          }

          // Updater;
          for (y = 0; y < height; y++) {
            for (x = 0; x < width; x++) {
              cells[y][x].changeState();
            }
          }
        }
        frame_cpt++;
        if (frame_cpt >= hz) frame_cpt = 0;

        e.pid = requestAnimationFrame(loop);
      }

      loop();
    },
    generate() {
      // this.nBalls = 50;
      // var canvas = this.$refs.lifeGame;
      // var ctx = canvas.getContext("2d");
      // ctx.clearRect(0, 0, canvas.width, canvas.height);
      // requestAnimationFrame(() => {});
      cancelAnimationFrame(this.pid);
      // setTimeout(() => {
      //   }, 200);
      this.lifeGame();
    }
  },

  mounted: function() {
    this.lifeGame();
  }
};
</script>