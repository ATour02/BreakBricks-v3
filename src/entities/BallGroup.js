import { Ball } from "./Ball";

export class BallGroup extends Phaser.GameObjects.Group {
  constructor(scene) {
    super(scene);

    // Crear una pelota inicial
    this.createBall(400, 300);
  }

  createBall(x, y) {
    const ball = new Ball(this.scene, x, y, 10, 0xffffff, 1);
    this.add(ball);
    return ball;
  }
}