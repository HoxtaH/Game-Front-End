/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 - 2019 digitsensitive
 * @description  Coin Runner: Coin
 * @license      Digitsensitive
 */

export class Coin extends Phaser.GameObjects.Image {
  private centerOfScreen: number;
  private changePositionTimer: Phaser.Time.TimerEvent;
  private lastPosition: string;
  private xmr: XMLHttpRequest;
  private coinLocationData: any;
  private counter: number = 0;

  constructor(params) {
    super(params.scene, params.x, params.y, params.key);

    this.initVariables();
    this.initImage();
    this.initEvents();

    this.scene.add.existing(this);
  }

  private initVariables(): void {
    this.centerOfScreen = this.scene.sys.canvas.width / 2;
    this.changePositionTimer = null;
    this.setFieldSide();
  }

  private initImage(): void {
    this.setOrigin(0.5, 0.5);
  }

  private initEvents(): void {
    this.changePositionTimer = this.scene.time.addEvent({
      delay: 2000,
      callback: this.changePosition,
      callbackScope: this,
      loop: true
    });
  }

  update(): void {}

  public changePosition(): void {
    this.setNewPosition();
    this.setFieldSide();

    this.changePositionTimer.reset({
      delay: 2000,
      callback: this.changePosition,
      callbackScope: this,
      loop: true
    });
  }

  private setNewPosition(): void {
    
    this.getCoinLocation('./src/games/coin-runner/objects/coinData.json', (e)=> {
      this.coinLocationData = JSON.parse(e);
     if(this.counter >= this.coinLocationData.length){this.counter = 0};
   
    this.x = this.coinLocationData[this.counter]['x'];
    this.y = this.coinLocationData[this.counter]['y'];
    this.counter++;
    })
    
    // if (this.lastPosition == "right") {
    //   this.x = Phaser.Math.RND.integerInRange(100, this.centerOfScreen);
    // } else {
    //   this.x = Phaser.Math.RND.integerInRange(385, 700);
    // }
    // this.y = Phaser.Math.RND.integerInRange(100, 500);
  }

  private setFieldSide(): void {
    if (this.x <= this.centerOfScreen) {
      this.lastPosition = "left";
    } else {
      this.lastPosition = "right";
    }
  }

  private getCoinLocation(url: string, callback: any): void {
    this.xmr = new XMLHttpRequest();
        this.xmr.onreadystatechange = () => { 
            if (this.xmr.readyState == 4 && this.xmr.status == 200) 
                callback(this.xmr.responseText);
        }
        this.xmr.open("GET", url, true); // true for asynchronous 
        this.xmr.send(null);
  }
}
