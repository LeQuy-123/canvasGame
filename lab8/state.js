export const state = {
    STANDING_LEFT: 0,
    STANDING_RIGHT: 1,
    SITTING_LEFT: 2,
    SITTING_RIGHT: 3,
    RUNNING_LEFT: 4,
    RUNNING_RIGHT: 5,
    JUMPING_LEFT: 6,
    JUMPING_RIGHT: 7,
    FALLING_LEFT: 8,
    FALLING_RIGHT: 9,
}


class State {
    constructor(state) {
        this.state = state;
    }
}

class StandingLeft extends State {
    constructor(player) {
        super('STANDING LEFT');
        this.player = player;
    }
    enter() {
        this.player.frameY = 1;
        this.player.speed = 0;
        this.player.maxFrame = 6;
    }
    handleInput(input){
        switch (input) {
            case 'PRESS right':
                this.player.setState(state.RUNNING_RIGHT)
                break;
            case 'PRESS left':
                this.player.setState(state.RUNNING_LEFT)
                break;
            case 'PRESS down':
                this.player.setState(state.SITTING_LEFT)
                break;
            case 'PRESS up':
                this.player.setState(state.JUMPING_LEFT)
                break;
            default:
                break;
        }
    }
}
class StandingRight extends State {
    constructor(player) {
        super('STANDING RIGHT');
        this.player = player;
    }
    enter() {
        this.player.frameY = 0;
        this.player.speed = 0;
        this.player.maxFrame = 6;
    }
    handleInput(input) {
        switch (input) {
            case 'PRESS left':
                this.player.setState(state.RUNNING_LEFT)
                break;
            case 'PRESS right':
                this.player.setState(state.RUNNING_RIGHT)
                break;
            case 'PRESS down':
                this.player.setState(state.SITTING_RIGHT)
                break;
            case 'PRESS up':
                this.player.setState(state.JUMPING_RIGHT)
                break;
            default:
                break;
        }
    }
}
class SittingRight extends State {
    constructor(player) {
        super('SITTING RIGHT');
        this.player = player;
    }
    enter() {
        this.player.frameY = 8;
        this.player.speed = 0;
        this.player.maxFrame = 4;
    }
    handleInput(input) {
        switch (input) {
            case 'PRESS left':
                this.player.setState(state.SITTING_LEFT)
                break;
            case 'PRESS up':
                this.player.setState(state.STANDING_RIGHT)
                break;
            case 'RELEASE down':
                this.player.setState(state.STANDING_RIGHT)
                break;
            default:
                break;
        }
    }
}
class SittingLeft extends State {
    constructor(player) {
        super('SITTING LEFT');
        this.player = player;
    }
    enter() {
        this.player.frameY = 9;
        this.player.speed = 0;
        this.player.maxFrame = 4;
    }
    handleInput(input) {
        switch (input) {
            case 'PRESS right':
                this.player.setState(state.SITTING_RIGHT)
                break;
            case 'PRESS up':
                this.player.setState(state.STANDING_LEFT)
                break;
            case 'RELEASE down':
                this.player.setState(state.STANDING_LEFT)
                break;
            default:
                break;
        }
    }
}
class RunningLeft extends State {
    constructor(player) {
        super('RUNNING LEFT');
        this.player = player;
    }
    enter() {
        this.player.frameY = 7;
        this.player.speed = -this.player.maxSpeed;
        this.player.maxFrame = 8;
    }
    handleInput(input) {
        switch (input) {
            case 'PRESS right':
                this.player.setState(state.RUNNING_RIGHT)
                break;
            case 'RELEASE left':
                this.player.setState(state.STANDING_LEFT)
                break;
            case 'RELEASE down':
                this.player.setState(state.SITTING_LEFT)
                break;
            default:
                break;
        }
    }
}
class RunningRight extends State {
    constructor(player) {
        super('RUNNING RIGHT');
        this.player = player;
    }
    enter() {
        this.player.frameY = 6;
        this.player.speed = this.player.maxSpeed;
        this.player.maxFrame = 8;
    }
    handleInput(input) {
        switch (input) {
            case 'PRESS left':
                this.player.setState(state.RUNNING_LEFT)
                break;
            case 'RELEASE right':
                this.player.setState(state.STANDING_RIGHT)
                break;
            case 'RELEASE down':
                this.player.setState(state.SITTING_RIGHT)
                break;
            default:
                break;
        }
    }
}
class JumpingLeft extends State {
    constructor(player) {
        super('JUMPING LEFT');
        this.player = player;
    }
    enter() {
        this.player.frameY = 3;
        if(this.player.isOnGround()) this.player.vy = -40;
        this.player.speed = -this.player.maxSpeed /2;
        this.player.maxFrame = 6;
    }
    handleInput(input) {
        switch (input) {
            case 'PRESS right':
                this.player.setState(state.JUMPING_RIGHT)
                break;
            default:
                break;
        }
        if(this.player.isOnGround()) this.player.setState(state.STANDING_LEFT);
        if(this.player.vy > 0) this.player.setState(state.FALLING_LEFT);
    }
}
class JumpingRight extends State {
    constructor(player) {
        super('JUMPING RIGHT');
        this.player = player;
    }
    enter() {
        this.player.frameY = 2;
        if(this.player.isOnGround()) this.player.vy = -40;
        this.player.speed = this.player.maxSpeed / 2;
        this.player.maxFrame = 6;
    }
    handleInput(input) {
        switch (input) {
            case 'PRESS left':
                this.player.setState(state.JUMPING_LEFT)
                break;
            default:
                break;
        }
        if (this.player.isOnGround()) this.player.setState(state.STANDING_RIGHT);
        if (this.player.vy > 0) this.player.setState(state.FALLING_RIGHT);
    }
}
class FallingLeft extends State {
    constructor(player) {
        super('FALLING LEFT');
        this.player = player;
    }
    enter() {
        this.player.frameY = 5;
        this.player.maxFrame = 6;
    }
    handleInput(input) {
        switch (input) {
            case 'PRESS right':
                this.player.setState(state.FALLING_RIGHT)
                break;
            default:
                break;
        }
        if (this.player.isOnGround()) this.player.setState(state.STANDING_LEFT);
    }
}
class FallingRight extends State {
    constructor(player) {
        super('FALLING RIGHT');
        this.player = player;
    }
    enter() {
        this.player.frameY = 4;
        this.player.maxFrame = 6;
    }
    handleInput(input) {
        switch (input) {
            case 'PRESS left':
                this.player.setState(state.FALLING_LEFT)
                break;
            default:
                break;
        }
        if (this.player.isOnGround()) this.player.setState(state.STANDING_RIGHT)
    }
}



export {
    StandingLeft,
    StandingRight,
    SittingLeft,
    SittingRight,
    RunningLeft,
    RunningRight,
    JumpingLeft,
    JumpingRight,
    FallingLeft,
    FallingRight
}