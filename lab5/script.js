/** @type {HTMLCanvasElement} */

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width = window.innerWidth;
const CANVAS_HEIGHT = canvas.height = window.innerHeight;


const collisionCanvas = document.getElementById('collisionCanvas');
const collisionCanvasCtx = collisionCanvas.getContext('2d');

const COLLISION_CANVAS_WIDTH = collisionCanvas.width = window.innerWidth;
const COLLISION_CANVAS_HEIGHT = collisionCanvas.height = window.innerHeight;

let timeToNextRaven = 0;
let revenInterval = 800;
let lastTime = 0;

let canvasPosition = canvas.getBoundingClientRect();

let ravens = [];
let epxlosions = [];
let gameOver = false;

let scroll = 0;
ctx.font = '40px Impact';

const BIRD_LIST = [
    'bird_2_cardinal.png',
    'bird_1_bluejay.png',
    'bird_2_blue.png',
    'bird_2_eagle.png',
    'bird_2_white.png',
    'bird_3_robin.png',
    'bird_3_sparrow.png'
]

class Raven {
    constructor() {  
        this.spriteWidth=96/3;
        this.spriteHeight = 256/8;
        this.ratio = Math.random() * (6-2) + 2;
        this.width = this.spriteWidth * this.ratio;
        this.height = this.spriteHeight * this.ratio;
        this.x = canvas.width;
        this.y = Math.random() * (canvas.height - this.height);
        this.directionX = Math.random() * (3-1) + 1;
        this.directionY = Math.random() * 3 - 2.5;
        this.markForDeletion = false;
        this.image = new Image();
        this.kindOfBird = Math.floor(Math.random() * BIRD_LIST.length);
        this.image.src = `resource/${BIRD_LIST[this.kindOfBird]}`;
        this.frame = 0;
        this.timeSinceFlap = 0;
        this.flapInterval = Math.random() * 100 + 50; 
        this.randomColors = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)];
        this.color = `rgb(${this.randomColors[0]},${this.randomColors[1]},${this.randomColors[2]})`;
    } 

    update(deltaTime){
        if (this.y < 0 || this. y > canvas.height - this.height - 250) {
            this.directionY = -this.directionY;
        }
        this.x -=this.directionX;
        this.y -=this.directionY;
        if(this.x < 0 - this.width) {
            this.markForDeletion = true;
            gameOver = true;
        };
        this.timeSinceFlap +=deltaTime;
        if (this.timeSinceFlap > this.flapInterval) {
            this.frame < 2 ? this.frame++ : this.frame = 0;
            this.timeSinceFlap=0;
        } 
    }

    draw(){
        collisionCanvasCtx.fillStyle = this.color;
        collisionCanvasCtx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image,
            this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight,
            this.x, this.y, this.width, this.height)
    }
}

class Epxlosion {
    constructor(x, y) {

        this.spriteWidth = 200;
        this.spriteHeight = 179;
        this.width = this.spriteWidth * 0.7;
        this.height = this.spriteHeight * 0.7;

        this.x = x;
        this.y = y;

        this.image = new Image();
        this.image.src = 'boom.png';
        this.frame = 0;
        this.time = 0;
        this.angle = Math.random * 20;

        this.sound = new Audio();
        this.sound.src = '8bit_bomb_explosion.wav';
        this.timeSinceLastFrame = 0;
        this.frameInterval = 200;

    }
    update(deltaTime) {
        this.time++;
        if (this.frame === 0) this.sound.play();
        this.timeSinceLastFrame+=deltaTime
        if (this.timeSinceLastFrame > this.frameInterval) {
            this.frame++;
            this.timeSinceLastFrame = 0;
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



function drawScroll () {
    ctx.fillStyle = 'black';
    ctx.fillText('Score: ' + scroll, 55, 75);
    ctx.fillStyle = 'white';
    ctx.fillText('Score: ' + scroll, 50, 70);
}


function drawGameOver() {
    ctx.textAlign = 'center'
    ctx.fillStyle = 'black';
    ctx.fillText('GameOver, your scroll is: ' + scroll,canvas.width/2, canvas.height/2);
    ctx.fillStyle = 'white';
    ctx.fillText('GameOver, your scroll is: ' + scroll, canvas.width/2, canvas.height/2+5);
}
const createAnimation = (e) => {
    const positionX = e.x - canvasPosition.left;
    const positionY = e.y - canvasPosition.top;
    epxlosions.push(new Epxlosion(positionX, positionY))
}

window.addEventListener('click', (e) => {
    const detectPixelColor = collisionCanvasCtx.getImageData(e.x,e.y, 1, 1);
    const pc = detectPixelColor.data;
    ravens.forEach((obj) => {
        if (obj.randomColors[0] === pc[0] && obj.randomColors[1] === pc[1] && obj.randomColors[2] === pc[2]) {
            if (obj.kindOfBird  > 4) {
                scroll++;
            } else if (obj.ratio > 2) {
                scroll += 2;
            } else  {
                scroll += 3;
            } 
            obj.markForDeletion = true;
            createAnimation(e)
        } 
    })
})

function animate(timestamp) {
    ctx.clearRect(0,0, CANVAS_WIDTH,CANVAS_HEIGHT);
    collisionCanvasCtx.clearRect(0, 0, COLLISION_CANVAS_WIDTH, COLLISION_CANVAS_HEIGHT);

    drawScroll()

    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    timeToNextRaven +=deltaTime;

    if(timeToNextRaven > revenInterval) {
        ravens.push(new Raven());
        timeToNextRaven = 0;
        ravens.sort((a,b) => {
            return a.width - b.width;
        });
    }

    [...ravens, ...epxlosions]?.forEach((obj,index) => {
        obj?.update(deltaTime);
        obj?.draw();
    })

    ravens = ravens.filter(obj => !obj.markForDeletion)
    epxlosions = epxlosions.filter(obj => obj.frame < 5)
    if(!gameOver) {
        requestAnimationFrame(animate);
    } else {
        drawGameOver()
    }
}

animate(0);