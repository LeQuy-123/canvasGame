/** @type {HTMLCanvasElement} */
import Player from './src/player.js';
import InputHandler from './src/input.js';
import Background from './src/background.js';
import UI from './src/ui.js';

import { ClimbingEnemy, FlyingEnemy, GroundEnemy } from './src/enemy.js';

window.addEventListener('load', () => {

    const ctx = canvas1.getContext('2d');

    const CANVAS_WIDTH = canvas1.width = 500;
    const CANVAS_HEIGHT = canvas1.height = 500;

    class Game {
        constructor(width, height) {
            this.groundMargin = 80;
            this.width = width;
            this.height = height;
            this.speed = 0;
            this.maxSpeed= 3;
            this.background = new Background(this);
            this.player = new Player(this);
            this.input = new InputHandler(this);
            this.ui = new UI(this);
            this.enemies = [];
            this.particles = [];
            this.collisions = [];
            this.enemyTimer = 0;
            this.enemyInterval = 1000;
            this.debug = true;
            this.score = 0;
            this.fontColor = 'white';
            this.player.currentState = this.player.states[0];
            this.maxParticles = 50;
            this.time = 0;
            this.gameOver = false;
            this.maxTime = 10000;
            // this.player.currentState.enter();
        }
        update(deltaTime){
            this.time +=deltaTime;
            if(this.time > this.maxTime) this.gameOver = true;
            this.background.update();
            this.player.update(this.input.keys, deltaTime);
            this.enemies = this.enemies.filter((obj) => !obj.markToDelete)

            if(this.enemyTimer > this.enemyInterval) {
                this.addEnemy();
                this.enemyTimer=0;
            } else {
                this.enemyTimer+=deltaTime;
            }
            this.enemies.forEach((obj) => {
                obj.update(deltaTime);
            })
            this.particles.forEach((obj) => {
                obj.update();
                this.particles = this.particles.filter((obj) => !obj.markForDelete)
            });
            if(this.particles.length > this.maxParticles) {
                this.particles.length =  this.maxParticles
            }
            this.collisions.forEach((obj) => {
                obj.update(deltaTime);
                this.collisions = this.collisions.filter((obj) => !obj.markForDelete)
            });
            
        }
        draw(context){
            this.background.draw(context);
            this.player.draw(context);
            this.enemies.forEach((obj) => {
                obj.draw(context);
            });
            this.particles.forEach((obj) => {
                obj.draw(context);
            });
            this.collisions.forEach((obj) => {
                obj.draw(context);
            });
            this.ui.draw(context);
        }
        addEnemy(){
            if(this.speed > 0 && Math.random() < 0.5) {
                this.enemies.push(new GroundEnemy(this));
            } else if (this.speed > 0) {
                this.enemies.push(new ClimbingEnemy(this));
            }
            this.enemies.push(new FlyingEnemy(this));
        }
    }

    const game = new Game(CANVAS_WIDTH, CANVAS_HEIGHT);
    let lastTime = 0;

    function animate(timeStamp){
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
        game.update(deltaTime);
        game.draw(ctx);
        if (!game.gameOver) requestAnimationFrame(animate);
    }
    animate(0)
})