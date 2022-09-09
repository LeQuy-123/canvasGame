export default class InputHandler {
    constructor(game) {
        this.keys = [];
        this.game =game;

        window.addEventListener('keydown', (e) => {
            if(!this.keys.includes(e.key)) {
                switch (e.key) {
                    case 'ArrowLeft':
                    case 'ArrowRight':
                    case 'ArrowUp':
                    case 'ArrowDown':
                    case 'Shift':
                    case 'Enter':
                        this.keys.push(e.key);
                        break;
                    default:
                        break;
                }
            } 
            if (e.key ==="d") this.game.debug = !this.game.debug;
        })
        window.addEventListener('keyup', (e) => {
            switch (e.key) {
                case 'ArrowLeft':
                case 'ArrowRight':
                case 'ArrowUp':
                case 'ArrowDown':
                case 'Shift':
                case 'Enter':
                    this.keys.splice(this.keys.indexOf(e.key), 1);
                default:
                    break;
            }
        })
    }
}