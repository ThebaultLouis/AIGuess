import Point from "./Position.js";

// var WHITE = "rgb(255,255,255)";
// var BLACK = "rgb(0,0,0)";
var COLORS = [
  "rgb(255,255,255)",
  "rgb(0,0,0)",
  "rgb(255,0,0)",
  "rgb(0,255,0)",
  "rgb(0,0,255)",
  "rgb(255,255,0)",
  "rgb(0,255,255)"
];
var N_ETAT = 4;

export default class LifeGameCell {
  constructor(x, y, state, radius) {
    this.position = new Point(x, y);
    this.state = state;
    this.radius = radius;
    this.nbVoisins = 0;
  }
  draw(ctx) {
    ctx.beginPath();
    // ctx.fillStyle = this.state ? BLACK : WHITE;
    ctx.fillStyle = COLORS[this.state];
    ctx.fillRect(
      this.position.x * this.radius,
      this.position.y * this.radius,
      this.radius,
      this.radius
    );
    ctx.fill();
  }
  refresh() {
    this.nbVoisins = 0;
  }
  addNeighbor(other) {
    if (other.state == Math.floor((this.state + 1) % N_ETAT)) {
      this.nbVoisins++;
    }
  }
  changeState() {
    if (this.nbVoisins >= 3) {
      this.state = Math.floor((this.state + 1) % N_ETAT);
    }
  }
  display() {
    return this.state, this.position;
  }
}
