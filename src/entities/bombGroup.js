import { Bomb } from "./Bomb";

export class bombGroup extends Phaser.GameObjects.Group {
  constructor(scene) {
    super(scene);
  }

  createBomb(x, y) {
    const bomb = new Bomb(this.scene, x, y, 10, 0x00ffff, 1);
    this.add(bomb);
    return bomb;
  }
}