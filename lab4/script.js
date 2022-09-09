/** @type {HTMLCanvasElement} */

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width = 500;
const CANVAS_HEIGHT = canvas.height = 700;

let canvasPosition = canvas.getBoundingClientRect();

const explosions = [];


class Epxlosion {
    constructor(x,y) {
        
        this.spriteWidth = 200;
        this.spriteHeight = 179;
        this.width = this.spriteWidth *  0.7;
        this.height = this.spriteHeight *  0.7;

        this.x = x;
        this.y = y;

        this.image = new Image();
        this.image.src = 'boom.png';
        this.frame = 0;
        this.time = 0;
        this.angle = Math.random * 20;

        this.sound = new Audio();
        this.sound.src = '8bit_bomb_explosion.wav';
    }
    update() {
        this.time ++;
        if(this.frame === 0) {
            this.sound.play();
        }

        if(this.time % 10 === 0) {
            this.frame++;
        }
    }
    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.drawImage(this.image,
            this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight,
            0 - this.width / 2, 0 - this.height / 2, this.width, this.height);
        ctx.restore();
    }
};



window.addEventListener('click', (e) => createAnimation(e))
const createAnimation = (e) => {
    const positionX = e.x - canvasPosition.left;
    const positionY = e.y - canvasPosition.top;
    explosions.push(new Epxlosion(positionX, positionY))
}

function animate(x, y) {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    explosions?.forEach((obj,index) => {
        obj.update();
        obj.draw();

        if (obj.frame > 5) {
            explosions.splice(index, 1);
        }
    })
    requestAnimationFrame(animate)
}

animate();