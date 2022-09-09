class CollisionAnimation {
    constructor(game,x,y) {
        this.image = boom;
        this.game = game;
        this.spriteWidth = 100;
        this.spriteHeight = 90;
        this.ratio = Math.random() + 0.4;
        this.width = this.ratio * this.spriteWidth;
        this.height = this.ratio * this.spriteHeight;
        this.x = x - this.width * 0.5;
        this.y = y - this.height * 0.5;
        this.frameX = 0;
        this.maxFrame = 4;
        this.markForDeletion = false;
        this.fps = 20;
        this.frameTimer = 0;
        this.frameInterval = 1000 / this.fps;
    }
    draw(context){
        context.drawImage(this.image, this.spriteWidth * this.frameX, 0, this.spriteWidth, this.spriteHeight, 
            this.x, this.y, this.width, this.height);
    }
    update(deltaTime){
        this.x-=this.game.speed;
        if (this.frameTimer > this.frameInterval) {
            this.frameX++;
            this.frameTimer = 0;
        } else {
            this.frameTimer += deltaTime;
        }
        if(this.frameX > this.maxFrame) this.markForDeletion = true;
    }
}

export {
    CollisionAnimation
}