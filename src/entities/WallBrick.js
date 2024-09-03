// grpup of brick
import { Brick } from "./Brick";
export class WallBrick extends Phaser.GameObjects.Group {
  constructor(scene) {
    super(scene);

    this.createWall();
  }

  createWall() {
    for (let i = 0; i < 4; i++) { // 10
      for (let j = 0; j < 4; j++) { //6
        let brick = new Brick(
          this.scene,
          150 + i * 80,
          200 + j * 30,
          50,
          100,
          0xffffff,
          1
        );
        this.add(brick);
        brick.isBallCreator = true;
      }
    }
  }


}
