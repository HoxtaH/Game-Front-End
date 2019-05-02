/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 - 2019 digitsensitive
 * @description  Coin Runner: Player
 * @license      Digitsensitive
 */

export class Player extends Phaser.GameObjects.Image {
  private cursors: Phaser.Input.Keyboard.CursorKeys;
  private walkingSpeed: number;
  private xmr: XMLHttpRequest;
  private changePositionTimer: Phaser.Time.TimerEvent;
  private lastPosition: string;
  private playerLocationData: any = [];
  private counter: number = 0;

  constructor(params) {
    super(params.scene, params.x, params.y, params.key);
    this.getPlayerLocationData();
    this.initVariables();
    this.initImage();
    this.initInput();

    this.scene.add.existing(this);
   
  }

  private initVariables(): void {
    this.walkingSpeed = 5;
    this.changePositionTimer = null;
  }

  private initImage(): void {
    this.setOrigin(0.5, 0.5);
  }

  private initInput(): void {
    this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.changePositionTimer = this.scene.time.addEvent({
      delay: 2000,
      callback: this.updateCounter,
      callbackScope: this,
      loop: true
    });
  }

  update(): void {
    this.handleInput();
    this.updatePlayerLocation();
  }

  updateCounter(): void {
    this.counter++;
  }

  private handleInput(): void {
    if (this.cursors.right.isDown) {
      this.x += this.walkingSpeed;
      this.setFlipX(false);
    } else if (this.cursors.left.isDown) {
      this.x -= this.walkingSpeed;
      this.setFlipX(true);
    } else if (this.cursors.up.isDown) {
      this.y -= this.walkingSpeed;
    } else if (this.cursors.down.isDown) {
      this.y += this.walkingSpeed;
    }
  }

  private updatePlayerLocation(): void {
   // console.log(this.playerLocationData);
    if (this.counter >= this.playerLocationData.length) { this.counter = 0 }
      if(this.x <= this.playerLocationData[this.counter]['x']){
         this.x += 3;
         console.log("plus x",this.x);
      }

      if(this.x >= this.playerLocationData[this.counter]['x']){
         this.x -= 3;
         console.log("minus x",this.x);
      }

      if(this.y >= this.playerLocationData[this.counter]['y']){
        this.y -= 3;
        console.log("minus y",this.y);
     }

     if(this.y <= this.playerLocationData[this.counter]['y']){
      this.y += 3;
      console.log("plus y",this.y);
   }
      // if(this.x < this.playerLocationData[this.counter]['x']){
      //   this.x++;
      // } else {
      //   this.x--;
      // }
      // if(this.y < this.playerLocationData[this.counter]['y']){
      //   this.y++;
      // } else {
      //   this.y--;
      // }

     // this.counter++;
      //this.decideWhichDirectionTheCharacterMoves(this.playerLocationData[this.counter]);
      // this.x = this.playerLocationData[this.counter]['x'];
      // this.y = this.playerLocationData[this.counter]['y'];
  }

  private getPlayerMovementData(url: string, callback: any): void {
    this.xmr = new XMLHttpRequest();
    this.xmr.onreadystatechange = () => {
      if (this.xmr.readyState == 4 && this.xmr.status == 200)
        callback(this.xmr.responseText);
    }
    this.xmr.open("GET", url, true); // true for asynchronous 
    this.xmr.send(null);
  }

  private getPlayerLocationData(): void{
    this.getPlayerMovementData('./src/games/coin-runner/objects/coinData.json',(e) => {
      this.playerLocationData = JSON.parse(e);
    });
  }
}
