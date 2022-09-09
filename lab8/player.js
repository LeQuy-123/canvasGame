import {
    StandingRight,
    StandingLeft,
    SittingRight,
    SittingLeft,
    RunningLeft,
    RunningRight,
    JumpingLeft,
    JumpingRight,
    FallingLeft,
    FallingRight
} from './state.js'

export default class Player {
    constructor(gameWidth, gameHeight) {
        this.gameHeight = gameHeight;
        this.gameWidth = gameWidth;
        this.state = [
            new StandingLeft(this), 
            new StandingRight(this), 
            new SittingLeft(this), 
            new SittingRight(this),
            new RunningLeft(this),
            new RunningRight(this),
            new JumpingLeft(this),
            new JumpingRight(this),
            new FallingLeft(this),
            new FallingRight(this)
        ];
        this.currentState = this.state[1];
        this.image = dogImg;
        this.spriteWidth = 200;
        this.spriteHeight = 181.83;
        this.ratio = 1;
        this.width = this.spriteHeight * this.ratio;
        this.height = this.spriteHeight * this.ratio;
        this.x = this.gameWidth /2 - this.width /2;
        this.y = this.gameHeight - this.height;
        this.frameX = 0;
        this.frameY = 0;
        this.speed = 0;
        this.maxSpeed = 10;
        this.vy = 0;
        this.weight = 2;
        this.maxFrame = 6;
        this.fps = 30;
        this.frameTimer = 0;
        this.frameInterval = 1000/this.fps;
        
    }
    draw(ctx, deltaTime) {
        if(this.frameTimer > this.frameInterval) {
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
            this.frameTimer = 0;
        } else {
            this.frameTimer+=deltaTime;
        }
        
        ctx.drawImage(this.image,
            this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight,
            this.x, this.y, this.width, this.height);
    }
    update(input, deltaTime) {
        this.currentState.handleInput(input);
        this.x +=this.speed;
        if(this.x <=0) {
            this.x = 0;
        } else if (this.x >= this.gameWidth - this.width) {
            this.x = this.gameWidth - this.width;
        }
        this.y += this.vy;
        if (!this.isOnGround()) {
            this.vy += this.weight;
        } else {
            this.vy = 0;
        }
        if(this.y > this.gameHeight - this.height) this.y = this.gameHeight - this.height;
    }
    setState(state){
        this.currentState = this.state[state];
        this.currentState.enter();
    }
    isOnGround(){
        return this.y >= this.gameHeight - this.height;
    }
}