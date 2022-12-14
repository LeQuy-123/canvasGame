class Enemy {
    constructor() {
        this.frameX = 0;
        this.frameY=0;
        this.fps = 20;
        this.frameTimer = 0;
        this.frameInterval = 1000 / this.fps;
        this.markToDelete = false;
    }
    update(deltaTime){
        this.x -=this.speedX + this.game.speed;
        this.y +=this.speedY;
        if(this.frameTimer > this.frameInterval) {
            this.frameTimer = 0;
            if(this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
        } else {
            this.frameTimer += deltaTime;
        }
        if(this.x + this.width < 0) {
            this.markToDelete = true;
        }
    }
    draw(ctx){
        if (this.game.debug) {
            ctx.strokeRect(this.x, this.y, this.width, this.height)
        }
        ctx.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height,)
    }
}

export class FlyingEnemy extends Enemy {
    constructor(game) {
        super();
        this.game =game;
        this.width =60;
        this.height = 44;
        this.x = this.game.width + Math.random()*this.game.width * 0.8;
        this.y = Math.random() * this.game.height * 0.5;
        this.speedX = Math.random() + 1;
        this.maxFrame = 5;
        this.image = enemy_fly;
        this.speedY = 0;
        this.angle = 0;
        this.va = Math.random()*0.1 + 0.1
    }
    update(deltaTime){
        super.update(deltaTime);
        this.angle +=this.va;
        this.y+=Math.sin(this.angle);
    }
}

export class GroundEnemy extends Enemy {
    constructor(game) {
        super(game);
        this.game = game;
        this.width = 60;
        this.height = 87;
        this.x = this.game.width + Math.random() * this.game.width * 0.8;
        this.y =   this.game.height - this.height - this.game.groundMargin;
        this.speedX = 0;
        this.maxFrame = 1;
        this.image = enemy_plant;
        this.speedY = 0;
    }
}

export class ClimbingEnemy extends Enemy {
    constructor(game) {
        super(game);
        this.game = game;
        this.width = 120;
        this.height = 144;
        this.x = this.game.width + Math.random() * this.game.width * 0.8;
        this.y = Math.random() * this.game.height * 0.5;
        this.speedX = 0;
        this.maxFrame = 1;
        this.image = enemy_spider_big;
        this.speedY = Math.random() > 0.5 ? 1 : -1;
    }
    update(deltaTime) {
        super.update(deltaTime);
        if(this.y > this.game.height - this.height - this.game.groundMargin) this.speedY*=-1;
        if(this.y < -this.height) this.markToDelete = true;
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.x + this.width / 2,0);
        ctx.lineTo(this.x + this.width/2, this.y + this.height/2);
        ctx.stroke();
        super.draw(ctx);

    }
}