<template>
  <div>
    <br class="my-1" />
    <v-row justify="center">
      <!-- <v-col cols="11" sm="6" class="my-3">
        <v-slider v-model="nBalls" min="10" max="200" thumb-label="always" label="Nombre de balles"></v-slider>
      </v-col>-->
      <v-col cols="auto">
        <v-btn @click="generate()" color="primary">Generate</v-btn>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" sm="10">
        <div class="lifeGameContainer" ref="container">
          <canvas ref="lifeGame"></canvas>
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import Cell from "@/objects/cellular_automaton/lifeGameCell";
import { random } from "@/objects/Utils";

export default {
  data() {
    return {};
  },
  methods: {
    lifeGame() {
      var containerRect = this.$refs.container.getBoundingClientRect();
      var canvas = this.$refs.lifeGame;
      var ctx = canvas.getContext("2d");

      var radius = 25;

      // var width = 20;
      // var height = 20;

      canvas.width = width * radius;
      canvas.height = height * radius;

      var width = Math.floor((canvas.width = containerRect.width) / radius - 1);
      var height = Math.floor((canvas.height = 600) / radius - 1);

      var cells = [];
      for (var i = 0; i < height; i++) {
        cells[i] = new Array(width);
      }
      var init = false;
      // var init2 = false;

      function loop() {
        ctx.fillStyle = "rgb(255, 255, 255)";
        ctx.fillRect(0, 0, width, height);
        if (!init) {
          for (var y = 0; y < height; y++) {
            for (var x = 0; x < width; x++) {
              var cell = new Cell(x, y, random(0, 1), radius);
              cells[y][x] = cell;
              // cells.push(cell);
            }
          }
          init = true;
        }
        // if (!init2) {
        for (y = 0; y < height; y++) {
          for (x = 0; x < width; x++) {
            // Rafraichir
            cells[y][x].refresh();
            // Dessiner
            cells[y][x].draw(ctx);
          }
        }

        // Trouver les voisins
        for (y = 0; y < height - 1; y++) {
          for (x = 0; x < width - 1; x++) {
            cells[y][x].addNeighbor(cells[y + 1][x]);
            cells[y][x].addNeighbor(cells[y][x + 1]);
            cells[y][x].addNeighbor(cells[y + 1][x + 1]);
          }
        }

        // Updater;
        for (y = 0; y < height; y++) {
          for (x = 0; x < width; x++) {
            cells[y][x].changeState();
          }
        }

        requestAnimationFrame(loop);
      }

      loop();
    },
    generate() {
      // this.nBalls = 50;
      this.lifeGame();
    }
  },

  mounted: function() {
    this.lifeGame();
  }
};
</script>