/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 - 2019 digitsensitive
 * @license      Digitsensitive
 */

export class MainScene extends Phaser.Scene {
  private phaserSprite: Phaser.GameObjects.Sprite;

  constructor() {
    super({
      key: "MainScene"
    });
  }

  preload(): void {
    //this.load.image("logo", "./src/boilerplate/assets/phaser.png");
    this.load.spritesheet("theMan", "./src/boilerplate/assets/theGod.png", {frameWidth: 32, frameHeight: 48});
  }

  create(): void {
   // this.phaserSprite = this.add.sprite(400, 300, "logo");
   const player = this.add.sprite(100,100, "theMan",0);
   this.anims.create({
     key : "walk",
     frames: this.anims.generateFrameNames("theMan",{start:0, end: 4})
   })
  }

  update() : void {
   
  }
}
