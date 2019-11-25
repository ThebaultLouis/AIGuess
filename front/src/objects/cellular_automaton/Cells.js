import LifeGameCell from "./lifeGameCell";
import { random } from "../Utils";

export default class Cells {
  constructor(width, height, game) {
    this.width = width;
    this.height = height;
    this.radius = 16;

    this.frame = 10;
    this.hz = 60 / this.frame;
    this.frame_cpt = 0;

    var cells = [];
    for (var i = 0; i < height; i++) {
      cells[i] = new Array(width);
    }
    switch (game) {
      case 0:
        for (var y = 0; y < height; y++) {
          for (var x = 0; x < width; x++) {
            var cell = new LifeGameCell(x, y, random(0, 1), 16);
            cells[y][x] = cell;
          }
        }

        break;
      default:
    }
    this.cells = cells;
  }

  // var frame_cpt = 0;
  // var e = this;

  loop(ctx) {
    if (this.frame_cpt == 0) {
      ctx.fillStyle = "rgb(255, 255, 255)";
      ctx.fillRect(0, 0, this.width, this.height);

      for (var y = 0; y < this.height; y++) {
        for (var x = 0; x < this.width; x++) {
          // Rafraichir
          this.cells[y][x].refresh();
          // Dessiner
          this.cells[y][x].draw(ctx);
        }
      }

      // Trouver les voisins
      var vx, vy;
      for (y = 0; y < this.height; y++) {
        for (x = 0; x < this.width; x++) {
          for (var voisin_y = y - 1; voisin_y <= y + 1; voisin_y++) {
            vy = voisin_y;
            if (voisin_y == -1) vy = this.height - 1;
            if (voisin_y == this.height) vy = 0;
            for (var voisin_x = x - 1; voisin_x <= x + 1; voisin_x++) {
              vx = voisin_x;
              if (voisin_x == -1) vx = this.width - 1;
              if (voisin_x == this.width) vx = 0;

              if (x == vx && y == vy) continue;

              this.cells[y][x].addNeighbor(this.cells[vy][vx]);
            }
          }
        }
      }

      // Updater;
      for (y = 0; y < this.height; y++) {
        for (x = 0; x < this.width; x++) {
          this.cells[y][x].changeState();
        }
      }
    }
    this.frame_cpt++;
    if (this.frame_cpt >= this.hz) this.frame_cpt = 0;

    this.pid = requestAnimationFrame(this.loop);
  }
}
