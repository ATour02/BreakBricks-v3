import { Scene } from "phaser";

// import class entitities
import { Paddle } from "../entities/Paddle";
import { Ball } from "../entities/Ball";
import { BallGroup } from "../entities/BallGroup";
import { Brick } from "../entities/Brick";
import { WallBrick } from "../entities/WallBrick";

export class Game extends Scene {
  constructor() {
    super("Game");
  }
  init(data) {
    this.ballSpeedX = data.ballSpeedX || 200; 
    this.ballSpeedY = data.ballSpeedY || 200;
    }
  create() {
    // instanciar una nueva paleta.
    // crea un nuevo objeto
    // el this, aca, hace referencia a la escena
    this.ball = new BallGroup(this);
    // this.ball.setVelocity(this.ballSpeedX, this.ballSpeedY);
    this.paddle = new Paddle(this, 400, 550, 300, 20, 0xffffff, 1);
    this.wall = new WallBrick(this);
    console.log(this.wall)
    this.physics.add.collider(this.paddle, this.ball.getChildren());
    // colisiones
    this.physics.add.collider(this.paddle, this.ball);

    this.physics.add.collider(
      this.ball,
      this.wall,
      (ball, brick) => {
        if (brick.isBallCreator) {
          this.ball.createBall(ball.x, ball.y);
        }
        brick.hit();
        this.checkBricks();

      },
      null,
      this
    );

    //colision de la pelota con el limite inferior
    this.physics.world.on("worldbounds", (body, up, down, left, right) => {
      console.log("worldbounds");
      if (down) {
        console.log("hit bottom");
        this.scene.start("GameOver");
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
      this.scene.start("GameOver");
    }
  }
  bricksDestroyed() {
    console.log('Todos los ladrillos han sido destruidos.');
    const newSpeedX = this.ball.body.velocity.x * 1.1;
    const newSpeedY = this.ball.body.velocity.y * 1.1;
  this.scene.restart({ ballSpeedX: newSpeedX,
                       ballSpeedY: newSpeedY });
  }
}
