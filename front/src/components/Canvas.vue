
<template>
  <div class="container" ref="container">
    <v-row justify="center">
      <v-card ref="card" :width="cardWidth" :height="cardWidth" elevation="4">
        <div id="paint" ref="paint">
          <canvas id="myCanvas" ref="myCanvas"></canvas>
        </div>
      </v-card>
    </v-row>
  </div>
</template>
<script>
export default {
  props: ["image", "width", "height"],
  model: {
    prop: "image",
    event: "change"
  },
  data() {
    return {
      canvas: null,
      ctx: null,
      cardWidth: 480
    };
  },
  methods: {
    emit: function(image) {
      this.$emit("change", image);
    },
    clear: function() {
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      this.ctx.fillStyle = "rgb(255, 255, 255)";
      this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }
  },

  mounted: function() {
    localStorage.setItem("image", JSON.stringify([]));
    // Initialisation Canvas
    this.canvas = this.$refs.myCanvas;
    this.ctx = this.canvas.getContext("2d");
    var canvas = this.canvas;
    var ctx = this.ctx;

    var containerRect = this.$refs.container.getBoundingClientRect();

    canvas.width =
      containerRect.width < this.width ? containerRect.width - 50 : this.width;
    canvas.height = canvas.width;
    this.cardWidth = canvas.width;

    this.clear();

    var mouse = {
      x: 0,
      y: 0
    };

    // Mouvement
    var rect = this.$refs.paint.getBoundingClientRect();
    var move = function(e) {
      e.preventDefault();
      mouse.x = e.pageX - rect.left;
      mouse.y = e.pageY - rect.top;
    };
    var touchmove = function(e) {
      var touch = e.touches[0];

      mouse.x = touch.clientX + rect.left;
      mouse.y = touch.clientY - rect.top;
    };
    canvas.addEventListener("mousemove", move, false);
    canvas.addEventListener("touchmove", touchmove, false);

    ctx.lineWidth = 20;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.strokeStyle = "#000000";

    var debutTrait = function(e) {
      e.preventDefault();
      ctx.moveTo(mouse.x, mouse.y);
      ctx.beginPath();

      canvas.addEventListener("mousemove", onPaint, false);
      canvas.addEventListener("touchmove", onPaint, false);
    };
    var emit = this.emit;
    var finTrait = function(e) {
      e.preventDefault();
      canvas.removeEventListener("mousemove", onPaint, false);
      canvas.removeEventListener("touchmove", onPaint, false);
      emit(canvas.toDataURL("image/png"));
    };

    canvas.addEventListener("mousedown", debutTrait, false);
    canvas.addEventListener("touchstart", debutTrait, false);

    canvas.addEventListener("mouseup", finTrait, false);
    canvas.addEventListener("touchend", finTrait, false);

    var onPaint = function() {
      ctx.lineTo(mouse.x, mouse.y);
      ctx.stroke();
    };
  }
};

// export default {};
</script>