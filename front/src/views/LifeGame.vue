<template>
  <div>
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
export default {
  data() {
    return {
      canvas: null,
      ctx: null,
      cardWidth: 480
    };
  },
  methods: {
    clear: function() {
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      this.ctx.fillStyle = "rgb(0, 255, 255)";
      this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }
  },

  mounted: function() {
    var containerRect = this.$refs.container.getBoundingClientRect();
    // Initialisation Canvas
    this.canvas = this.$refs.lifeGame;
    this.canvas.width = containerRect.width;
    this.canvas.height = 480;
    this.ctx = this.canvas.getContext("2d");

    this.clear();
    this.clear();
  }
};
</script>