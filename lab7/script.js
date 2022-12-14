/** @type {HTMLCanvasElement} */
const KEY_LIST = ['ArrowUp', 'ArrowLeft', 'ArrowRight', 'ArrowDown']
window.addEventListener('load', () => {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');

    const CANVAS_WIDTH = canvas.width = 800;
    const CANVAS_HEIGHT = canvas.height = 720;
    let enemies = [];
    let score = 0;
    let gameOver = false;
    class InputHandler {
        constructor(){
            this.keys = [];
            window.addEventListener('keydown', (e) => {
                if (KEY_LIST.includes(e.key) && this.keys.indexOf(e.key) === -1) {
                    this.keys.push(e.key);
                }
            });
            window.addEventListener('keyup', (e) => {
                if (KEY_LIST.includes(e.key) && this.keys.indexOf(e.key) !== -1) {
                    this.keys.splice(this.keys.indexOf(e.key), 1)
                }
            });
        }
    }
    class Player {
        constructor(gameWidth, gameHeight) {
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.width = 200;
            this.height = 200;
            this.x = 0;
            this.y = this.gameHeight - this.height;
            this.image = playerImage;
            this.frameX = 0;
            this.frameY = 0;
            this.speed = 0;
            this.vy = 0;
            this.weight = 1;
            this.maxFrame = 8;
            this.fps = 15;
            this.frameTimer = 0;
            this.frameInterval = 1000 / this.fps;
        }
        draw(ctx){
            // ctx.strokeStyle = 'white';
            // ctx.beginPath();
            // ctx.arc(this.x + this.width / 2, this.y + this.height / 2, this.width/2, 0,Math.PI * 2);
            // ctx.stroke();
            ctx.drawImage(this.image, this.frameX * this.width,this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
        }
        update(input, deltaTime, enemiesList){
            //collision detection
            enemies.forEach((enemy => {
                const dx =(enemy.x + enemy.width /2 - 20 )- (this.x + this.width /2 - 20);
                const dy = (enemy.y + enemy.height / 2) - (this.y + this.height / 2)
                const distance = dx*dx + dy*dy;
                if (distance < (enemy.width/2 + this.width/2 -20) * (enemy.width/2 + this.width/2 - 20)) {
                    gameOver = true;
                }
            }))
            // animation
            if (this.frameTimer > this.frameInterval) {
                if (this.frameX >= this.maxFrame) this.frameX = 0;
                else this.frameX++;
                this.frameTimer = 0;
            } else {
                this.frameTimer += deltaTime;
            }

            //control
            if (input.keys.indexOf('ArrowRight') > -1) {
                this.speed = 5;
            } else if (input.keys.indexOf('ArrowLeft') > -1) { 
                this.speed = -5;
            } else {
                this.speed = 0;
            }
            if (input.keys.indexOf('ArrowUp') > -1 && this.onGround()) {
                this.vy -=30;
            }
            //horizontal
            if(this.x < 0) this.x = 0;
            else if (this.x > this.gameWidth - this.width) this.x = this.gameWidth -this.width;
            this.x += this.speed;
            //vertical
            this.y += this.vy;
            if(!this.onGround()) {
                this.vy += this.weight;
                this.maxFrame = 5;
                this.frameY = 1;
            } else {
                this.vy = 0;
                this.maxFrame = 8;
                this.frameY = 0;
            }
            if (this.y < 0) this.y = 0;
            else if (this.y > this.gameHeight - this.height) this.y = this.gameHeight - this.height;
        }
        onGround() {
            return this.y >= this.gameHeight - this.height;
        }
    }
    class Background {
        constructor(gameWidth, gameHeight) {
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.image = backgroundImage;
            this.width = 2400;
            this.height = 720;
            this.x = 0;
            this.y =0; 
            this.speed = 5;
        }
        draw(ctx) {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            ctx.drawImage(this.image, this.x + this.width - this.speed, this.y, this.width, this.height);
        }
        
        update(){
            this.x -=this.speed;
            this.x < 0 - this.width ? this.x = 0 : null;
        }
    }
    class Enemy {
        constructor(gameWidth, gameHeight) {
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.image = enemyImage;
            this.width = 160;
            this.height = 118;
            this.x = Math.random() * this.gameWidth + this.gameWidth;
            this.y = this.gameHeight - this.height;
            this.speed = 4;
            this.frameX = 0;
            this.markToDelete = false;
            this.maxFrame = 5;
            this.fps = 15;
            this.frameTimer = 0;
            this.frameInterval = 1000/this.fps;

        }
        draw(ctx) {
            // ctx.strokeStyle = 'white';
            // ctx.beginPath();
            // ctx.arc(this.x + this.width / 2, this.y + this.height / 2, this.width / 2, 0, Math.PI * 2);
            // ctx.stroke();

            ctx.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height);
        }

        update(deltaTime) {
            if(this.frameTimer > this.frameInterval) {
                if (this.frameX >= this.maxFrame) this.frameX = 0;
                else this.frameX++;
                this.frameTimer = 0;
            } else {
                this.frameTimer +=deltaTime;
            }
            this.x -= this.speed;
            if(this.x < 0 - this.width) this.markToDelete = true;
        }
    }
    let lastTime = 0;
    let enemyTimer = 0;
    let enemyInterval = Math.random()* (2000 - 1500) + 1500;

    function handleEnemies(deltaTime) {
        if(enemyTimer > enemyInterval) {
            enemies.push(new Enemy(CANVAS_WIDTH, CANVAS_HEIGHT));
            enemies = enemies.filter((obj) => !obj.markToDelete)
            enemyTimer=0;
            enemyInterval = Math.random() * (2000 - 1500) + 1500;
        } else {
            enemyTimer+=deltaTime;
        }
        enemies.forEach(enemy => {
            enemy.draw(ctx);
            enemy.update(deltaTime);
        })
    }
    function displayStatusText(context) {
        context.font ='30px Helvetica';
        context.fillStyle = 'black';
        context.fillText('Scroll: ' + score, 5, 50);
        context.fillStyle = 'white';
        context.fillText('Scroll: ' + score, 8, 55);
        if(gameOver) {
            context.textAlign = 'center';
            context.fillStyle = 'black';
            context.fillText('GAME OVER', canvas.width/2, 200);
            context.fillStyle = 'white';
            context.fillText('GAME OVER', canvas.width / 2+2, 202);
        }
    }

    const input = new InputHandler();
    const player = new Player(CANVAS_WIDTH, CANVAS_HEIGHT);
    const background = new Background(CANVAS_WIDTH, CANVAS_HEIGHT);

    function animate(timestamp) {
        const deltaTime = timestamp - lastTime;
        lastTime =timestamp;
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        background.draw(ctx);
        background.update(ctx);
        player.draw(ctx);
        player.update(input, deltaTime, enemies);
        handleEnemies(deltaTime);
        displayStatusText(ctx);
        if (!gameOver) requestAnimationFrame(animate)
    }

    animate(0);
});

