
<template>
  <div>
    <div class="container" ref="container">
      <div id="paint" ref="paint">
        <canvas id="myCanvas" ref="myCanvas"></canvas>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["image", "width", "height"],
  model: {
    prop: "image",
    event: "change"
  },
  methods: {
    data() {
      return {
        canvas: null,
        ctx: null
      };
    },
    emit: function(image) {
      this.$emit("change", image);
    },
    clear: function() {
      //   var canvas = this.$refs.myCanvas;
      //   var ctx = canvas.getContext("2d");
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      //   this.ctx.clearRect(0, 0, 400, 400);
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

    // var painting = this.$refs.paint;
    // var paint_style = getComputedStyle(painting);
    // canvas.width = parseInt(paint_style.getPropertyValue("width"));
    // canvas.height = parseInt(paint_style.getPropertyValue("height"));
    canvas.height = this.width ? this.width : 400;
    canvas.width = this.height ? this.height : 400;

    // clearArea();
    this.clear();

    var mouse = {
      x: 0,
      y: 0
    };

    // Mouvement
    var rect = this.$refs.container.getBoundingClientRect();
    var move = function(e) {
      mouse.x = e.pageX - rect.left;
      mouse.y = e.pageY - rect.top;
      //   mouse.x = e.pageX;
      //   mouse.y = e.pageY;
      //   mouse.x = e.pageX - this.offsetLeft;
      //   mouse.y = e.pageY - this.offsetTop;
    };
    canvas.addEventListener("mousemove", move, false);
    canvas.addEventListener("touchmove", move, false);

    ctx.lineWidth = 20;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.strokeStyle = "#000000";

    var debutTrait = function() {
      ctx.beginPath();
      ctx.moveTo(mouse.x, mouse.y);

      canvas.addEventListener("mousemove", onPaint, false);
    };
    var emit = this.emit;
    var finTrait = function() {
      canvas.removeEventListener("mousemove", onPaint, false);
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
    // Réinitialiser
    // function clearArea() {
    //   // Use the identity matrix while clearing the canvas
    //   ctx.setTransform(1, 0, 0, 1, 0, 0);
    //   ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    //   ctx.fillStyle = "rgb(255, 255, 255)";
    //   ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    // }
  }
};

// export default {};
</script>