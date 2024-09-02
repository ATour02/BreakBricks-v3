export class Ball extends Phaser.GameObjects.Arc {
  constructor(scene, x, y, radius, color, alpha, speed = 200) {
    super(scene, x, y, radius, 0, 360, false, color, alpha);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.speed = speed
    this.body.setCollideWorldBounds(true);
    this.body.setBounce(1, 1);
    this.body.setVelocity(this.speed, this.speed);

    this.body.onWorldBounds = true;
  }
}
