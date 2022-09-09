/** @type {HTMLCanvasElement} */


window.addEventListener('load', function() {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');

    const CANVAS_WIDTH = canvas.width = 600;
    const CANVAS_HEIGHT = canvas.height = 600;
    let lastTime = 0;
    class Game {
        constructor(ctx, width, height) {
            this.ctx = ctx;
            this.width = width;
            this.height = height;
            this.enemyInterval = 1000;
            this.enemyTimer = 0;
            this.enemies = [];
            this.enemyType = ['worm', 'ghost', 'spider'];
        }
        update(delatTime) {
            if(this.enemyInterval < this.enemyTimer) {
                this.#addNewEnemy(new Enemy(this));
                this.enemyTimer = 0;
            } else {
                this.enemyTimer += delatTime;
            }
            this.enemies.forEach(enemy => enemy.update(delatTime))
        }
        draw() {
            this.enemies.forEach(enemy => enemy.draw(this.ctx))
        }
        #addNewEnemy() {
            const randomEnemy = this.enemyType[Math.floor(Math.random() * this.enemyType.length)];
            switch (randomEnemy) {
                case this.enemyType[0]:
                    this.enemies.push(new Worm(this));
                    break;
                case this.enemyType[1]:
                    this.enemies.push(new Ghost(this));
                    break;
                case this.enemyType[2]:
                    this.enemies.push(new Spider(this));
                    break;
                default:
                    this.enemies.push(new Worm(this));
                    break;
            }
            this.enemies = this.enemies.filter((enemy) => !enemy.markToDelete);
            console.log("🚀 ~ file: script.js ~ line 50 ~ Game ~ #addNewEnemy ~ this.enemies", this.enemies)
        }
    }

    class Enemy {
        constructor(game) {
            // super(props)
            this.game = game;
            this.markToDelete = false;
            this.frameX = 0; 
            this.maxFrame = 5;
            this.frameInterval = 100;
            this.frameTimer = 0;

        }
        update(delatTime) {
            this.x -= this.vx * delatTime;
            if(this.x < 0 - this.width) {
                this.markToDelete = true;
            }
            if (this.frameTimer > this.frameInterval) {
                if(this.frameX < this.maxFrame)  this.frameX++;
                else this.frameX = 0
            } else {
                this.frameTimer += delatTime
            }
            
        }
        draw(ctx) {           
            ctx.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x,this.y, this.width, this.height);
        }
    }

    class Worm extends Enemy {
        constructor(game) {
            super(game);
            this.image = worm;
            this.spriteWidth = 229;
            this.spriteHeight = 171;
            this.ratio = 0.5;
            this.width = this.spriteWidth * this.ratio;
            this.height = this.spriteHeight * this.ratio;
            this.x = this.game.width;
            this.y = this.game.height - this.height;
            this.vx = Math.random() * (0.1) + 0.1;
        }
    }
    class Ghost extends Enemy {
        constructor(game) {
            super(game);
            this.image = ghost;
            this.x = this.game.width;
            this.y = Math.random() * this.game.height * 0.6;
            this.spriteWidth = 261;
            this.spriteHeight = 209;
            this.ratio = 0.5;
            this.width = this.spriteWidth * this.ratio;
            this.height = this.spriteHeight * this.ratio;
            this.vx = Math.random() * (0.2) + 0.1;
            this.angle = Math.random() * 2;
            this.angleSpeed = Math.random() * 0.2;
            this.curve = Math.random() *5;

        }
        update(delatTime) {
            super.update(delatTime);
            this.y -= Math.sin(this.angle) * this.curve;
            this.angle += this.angleSpeed;
        }
        draw() {
            ctx.save();
            ctx.globalAlpha = 0.5;
            super.draw(ctx);
            ctx.restore();
        }
    }
    class Spider extends Enemy {
        constructor(game) {
            super(game);
            this.spriteWidth = 310;
            this.spriteHeight = 175;
            this.ratio = 0.4;
            this.width = this.spriteWidth * this.ratio;
            this.height = this.spriteHeight * this.ratio;
            this.image = spider;
            this.y = 0 - this.height;
            this.x = Math.random() * (this.game.width - this.width /2) + this.width/2;
            
            this.vx = 0;
            this.vy = 1;
            this.rangeMovement = Math.random() * this.game.height * 0.5
        }
        update(delatTime) {
            super.update(delatTime);
            this.y += this.vy * delatTime * 0.4;
            if (this.y > this.rangeMovement) this.vy = -this.vy;
            if (this.y < 0 - this.height *2) {
                this.markToDelete = true;
            }
        }
        draw() {
            ctx.beginPath();
            ctx.moveTo(this.x + this.width /2,0);
            ctx.lineTo(this.x + this.width / 2, this.y);
            ctx.stroke();
            super.draw(ctx);
        }
    }
    const game = new Game(ctx, CANVAS_WIDTH, CANVAS_HEIGHT );


    function animate(timestamp) {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        let deltaTime = timestamp - lastTime;
        lastTime = timestamp;

        game.draw();
        game.update(deltaTime);

        requestAnimationFrame(animate)
    }

    animate(0)
})