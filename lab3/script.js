/** @type {HTMLCanvasElement} */

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

const canvas2 = document.getElementById('canvas2');
const ctx2 = canvas2.getContext('2d');

const canvas3= document.getElementById('canvas3');
const ctx3 = canvas3.getContext('2d');

const canvas4 = document.getElementById('canvas4');
const ctx4 = canvas4.getContext('2d');

const canvas5 = document.getElementById('canvas5');
const ctx5 = canvas5.getContext('2d');

const CANVAS_WIDTH = canvas.width = 500;
const CANVAS_HEIGHT = canvas.height = 700;

const CANVAS_WIDTH2 = canvas2.width = 500;
const CANVAS_HEIGHT2 = canvas2.height = 700;

const CANVAS_WIDTH3 = canvas3.width = 500;
const CANVAS_HEIGHT3 = canvas3.height = 700;

const CANVAS_WIDTH4 = canvas4.width = 500;
const CANVAS_HEIGHT4 = canvas4.height = 700;

const CANVAS_WIDTH5 = canvas5.width = 500;
const CANVAS_HEIGHT5 = canvas5.height = 700;

const numberOfElement = 20;

const enemyBatArray = [];
const enemyBatArray2 = [];
const enemyBatArray3= [];
const enemyBatArray4 = [];
const enemyBatArray5 = [];

let gameFrame = 0;
let gameFrame2 = 0;
let gameFrame3 = 0;
let gameFrame4 = 0;
let gameFrame5 = 0;

class EnemyBat {
    constructor(params) {
        this.enemyImage = new Image();
        this.enemyImage.src = 'enemy1.png'
        // this.speed = Math.random() * 4 -2;
        this.spriteWidth = 293;
        this.spriteHeight= 155;
        this.width = this.spriteWidth / 2.5;
        this.height = this.spriteHeight / 2.5;

        this.x = Math.random() * (canvas.width - this.width);
        this.y = Math.random() *(canvas.height - this.height);  
        this.frame = 0;
        this.flapSpeed = Math.floor(Math.random() * 3 + 1);
    }
    update(){
        this.x  +=  Math.random() * 5 - 2.5;
        this.y  +=  Math.random() * 5 - 2.5;
        if (gameFrame % this.flapSpeed === 0) {
            this.frame < 5 ? this.frame++ : this.frame = 0;
        }
    }
    draw() {
        ctx.drawImage(this.enemyImage, 
            this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, 
            this.x, this.y, this.width, this.height)
    }
};
class EnemyBat2 {
    constructor(params) {
        this.enemyImage = new Image();
        this.enemyImage.src = 'enemy2.png';
        this.speed = Math.random() * 4 + 1;
        this.spriteWidth = 266;
        this.spriteHeight = 188;
        this.width = this.spriteWidth / 2.5;
        this.height = this.spriteHeight / 2.5;

        this.x = Math.random() * (canvas2.width - this.width);
        this.y = Math.random() * (canvas2.height - this.height);
        this.frame = 0;
        this.flapSpeed = Math.floor(Math.random() * 3 + 1);
        this.angle = Math.random() * 2;
        this.angleSpeed = Math.random() * 0.2;
    }
    update() {
        this.x -=  this.speed;
        this.y -= Math.sin(this.angle) * 5;
        this.angle += this.angleSpeed;
        if(this.x + this.width < 0) {
            this.x = canvas2.width
        }

        if (gameFrame2 % this.flapSpeed === 0) {
            this.frame < 5 ? this.frame++ : this.frame = 0;
        }
    }
    draw() {
        ctx2.drawImage(this.enemyImage,
            this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight,
            this.x, this.y, this.width, this.height)
    }
};
class EnemyBat3 {
    constructor(params) {
        this.enemyImage = new Image();
        this.enemyImage.src = 'enemy3.png';
        this.speed = Math.random() * 4 + 1;
        this.spriteWidth = 218;
        this.spriteHeight = 177;
        this.width = this.spriteWidth /3;
        this.height = this.spriteHeight /3;

        this.x = Math.random() * (canvas3.width - this.width);
        this.y = Math.random() * (canvas3.height - this.height);
        this.frame = 0;
        this.flapSpeed = Math.floor(Math.random() * 3 + 1);
        this.angle = 0;
        this.angleSpeed = Math.random() *1.5 + 0.5;
        this.curve = Math.random() * 200 + 50;
    }
    update() {
        this.x = this.curve * Math.sin(this.angle * Math.PI / 90) + canvas3.width / 2 - this.width/2;
        this.y = canvas.height / 2.3* Math.cos(this.angle * Math.PI / 180) + canvas3.height / 2 - this.height / 2;

        this.angle +=this.angleSpeed;
        if (gameFrame3 % this.flapSpeed === 0) {
            this.frame < 5 ? this.frame++ : this.frame = 0;
        }
    }
    draw() {
        ctx3.drawImage(this.enemyImage,
            this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight,
            this.x, this.y, this.width, this.height)
    }
};
class EnemyBat4 {
    constructor(params) {
        this.enemyImage = new Image();
        this.enemyImage.src = 'enemy4.png';
        this.speed = Math.random() * 4 + 1;
        this.spriteWidth = 1917/9;
        this.spriteHeight = 212;
        this.width = this.spriteWidth / 3;
        this.height = this.spriteHeight / 3;

        this.x = Math.random() * (canvas4.width - this.width);
        this.y = Math.random() * (canvas4.height - this.height);
        this.newX = Math.random() * (canvas4.width - this.width);
        this.newY = Math.random() * (canvas4.height - this.height);
        this.frame = 0;
        this.flapSpeed = 5;
        this.randomInterval = Math.floor(Math.random() * 200 + 50)
        
    }
    update() {
        if (gameFrame4 % this.randomInterval === 0) {
            this.newX = Math.random() * (canvas4.width - this.width);
            this.newY = Math.random() * (canvas4.height - this.height);
        }

        let dx = this.x - this.newX;
        let dy = this.y - this.newY;

        this.x -= dx/40;
        this.y -= dy/40;

        if (this.x + this.width < 0) {
            this.x = canvas4.width
        }
        if (gameFrame4 % this.flapSpeed === 0) {
            this.frame < 8 ? this.frame++ : this.frame = 0;
        }
    }
    draw() {
        ctx4.drawImage(this.enemyImage,
            this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight,
            this.x, this.y, this.width, this.height)
    }
};

let mouseLocationX = null;
let mouseLocationY = null;

class EnemyBat5 {
    constructor(params) {
        this.enemyImage = new Image();
        this.enemyImage.src = 'enemy1.png';
        this.spriteWidth = 293;
        this.spriteHeight = 155;
        this.width = this.spriteWidth / 3;
        this.height = this.spriteHeight / 3;
        this.x = Math.random() * (canvas5.width - this.width);
        this.y = Math.random() * (canvas5.height - this.height);
        this.newX = Math.random() * (canvas5.width - this.width);
        this.newY = Math.random() * (canvas5.height - this.height);
        this.frame = 0;
        this.flapSpeed = 5;
        this.randomInterval = Math.floor(Math.random() * 30 + 10)

    }
    update() {
        if (gameFrame5 % this.randomInterval === 0) {
            this.newX = mouseLocationX ? mouseLocationX : Math.random() * (canvas5.width - this.width);
            this.newY = mouseLocationY ? mouseLocationY : Math.random() * (canvas5.height - this.height);
        }

        let dx = this.x - this.newX;
        let dy = this.y - this.newY;

        this.x -= dx / 40;
        this.y -= dy / 40;

        if (this.x + this.width < 0) {
            this.x = canvas5.width
        }
        if (gameFrame5 % this.flapSpeed === 0) {
            this.frame < 5 ? this.frame++ : this.frame = 0;
        }
    }
    draw() {
        ctx5.drawImage(this.enemyImage,
            this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight,
            this.x, this.y, this.width, this.height)
    }
};


document.onmousemove = handleMouseMove;
function handleMouseMove(event) {
    var eventDoc, doc, body;

    event = event || window.event; // IE-ism

    // If pageX/Y aren't available and clientX/Y are,
    // calculate pageX/Y - logic taken from jQuery.
    // (This is to support old IE)
    if (event.pageX == null && event.clientX != null) {
        eventDoc = (event.target && event.target.ownerDocument) || document;
        doc = eventDoc.documentElement;
        body = eventDoc.body;

        event.pageX = event.clientX +
            (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
            (doc && doc.clientLeft || body && body.clientLeft || 0);
        event.pageY = event.clientY +
            (doc && doc.scrollTop || body && body.scrollTop || 0) -
            (doc && doc.clientTop || body && body.clientTop || 0);
    }
    if (event.srcElement?.id === 'canvas5') {
        mouseLocationX = event.offsetX;
        mouseLocationY = event.offsetY;
    } else {
        mouseLocationX = null;
        mouseLocationY = null;
    }

}   

for (let i = 0; i < numberOfElement; i ++) {
    enemyBatArray.push(new EnemyBat());
    enemyBatArray2.push(new EnemyBat2());
    enemyBatArray3.push(new EnemyBat3());
    enemyBatArray4.push(new EnemyBat4());
    enemyBatArray5.push(new EnemyBat5());

};


function animate() {
    ctx.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx2.clearRect(0, 0, CANVAS_WIDTH2, CANVAS_HEIGHT2);
    ctx3.clearRect(0, 0, CANVAS_WIDTH3, CANVAS_HEIGHT3);
    ctx4.clearRect(0, 0, CANVAS_WIDTH4, CANVAS_HEIGHT4);
    ctx5.clearRect(0, 0, CANVAS_WIDTH5, CANVAS_HEIGHT5);

    enemyBatArray.forEach((obj) => {
        obj.draw();
        obj.update();
    })
    enemyBatArray2.forEach((obj) => {
        obj.draw();
        obj.update();
    })
    enemyBatArray3.forEach((obj) => {
        obj.draw();
        obj.update();
    })
    enemyBatArray4.forEach((obj) => {
        obj.draw();
        obj.update();
    })
    enemyBatArray5.forEach((obj) => {
        obj.draw();
        obj.update();
    })
    gameFrame++;
    gameFrame2++;
    gameFrame3++;
    gameFrame4++;
    gameFrame5++;

    requestAnimationFrame(animate)
}

animate()