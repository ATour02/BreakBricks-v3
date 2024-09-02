// grpup of brick
import { Brick } from "./Brick";
export class WallBrick extends Phaser.GameObjects.Group {
  constructor(scene) {
    super(scene);

    this.createWall();
  }

  createWall() {
    for (let i = 0; i < 1; i++) { // 10
      for (let j = 0; j < 1; j++) { //6
        let brick = new Brick(
          this.scene,
          300 + i * 70,
          200 + j * 30,
          600,
          200,
          0xffffff,
          1
        );
        this.add(brick);
      }
    }
  }


}
