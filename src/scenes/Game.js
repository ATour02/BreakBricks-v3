import { Scene } from "phaser";

// import class entitities
import { Paddle } from "../entities/Paddle";
import { Ball } from "../entities/Ball";
import { Bomb } from "../entities/Bomb";
import { bombGroup } from "../entities/bombGroup";
import { BallGroup } from "../entities/BallGroup";
import { Brick } from "../entities/Brick";
import { WallBrick } from "../entities/WallBrick";

export class Game extends Scene {
  constructor() {
    super("Game");
  }
  create() {
    // instanciar una nueva paleta.
    // crea un nuevo objeto
    // el this, aca, hace referencia a la escena
    this.ball = new BallGroup(this);
    this.bomb = new bombGroup(this);
    console.log(this.bomb);
    // this.ball.setVelocity(this.ballSpeedX, this.ballSpeedY);
    this.paddle = new Paddle(this, 400, 550, 300, 20, 0xffffff, 1);
    this.wall = new WallBrick(this);
    console.log(this.wall)
    // colisiones
    this.physics.add.collider(this.paddle, this.ball);
    this.physics.add.collider(this.paddle, this.ball.getChildren());

    this.physics.add.collider(
      this.ball,
      this.wall,
      (ball, brick) => {
        if (brick.isBallCreator) {
          this.ball.createBall(ball.x, ball.y);
        };
        if (brick.bombCreator) {
          this.bomb.createBomb(bomb.x, bomb.y);
          console.log(this.bomb)
        };

        brick.hit();
        this.checkBricks();

      },
      null,
      this
    );
    this.physics.add.collider(
      this.ball,
      this.physics.world.down,
      (ball, floor) => {
        
        ball.destroy();
        this.checkBalls();

      },
      null,
      this
    );

    //colision de la pelota con el limite inferior
    this.physics.world.on("worldbounds", (body, up, down, left, right) => {
      console.log("worldbounds");
      if (down) {
        console.log("hit bottom");
      }
    });
  }

  update() {
    this.paddle.update();
  }

  checkBricks(){
    if (this.wall.countActive(true) === 0) {
      this.bricksDestroyed();
    }
  }
  checkBalls() {
    if (this.ball.countActive(true) === 0) {
      console.log(this.ball);
      this.scene.start("GameOver");
    }
  }
  bricksDestroyed() {
    console.log('Todos los ladrillos han sido destruidos.');
  this.scene.restart();
  }
}
