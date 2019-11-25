import Point from "./Position.js";

var WHITE = "rgb(255,255,255)";
var BLACK = "rgb(0,0,0)";

export default class LifeGameCell {
  constructor(x, y, state, radius) {
    this.position = new Point(x, y);
    this.state = state;
    this.radius = radius;
    this.nbVoisins = 0;
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.state ? BLACK : WHITE;
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
    // this.nbVoisins += other.state;
    // other.nbVoisins += this.state;
    if (other.state == 1) {
      this.nbVoisins++;
    }
    // if (this.state == 1) {
    //   other.nbVoisins++;
    // }
  }
  changeState() {
    if (this.state && (this.nbVoisins < 2 || this.nbVoisins > 3)) {
      this.state = 0;
    }
    if (!this.state && this.nbVoisins == 3) {
      this.state = 1;
    }
  }
  display() {
    return this.state, this.position;
  }
}
