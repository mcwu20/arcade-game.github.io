'use strict';

// variables
const points = document.querySelector('.points');
let score = 0;

// Reset position of player
function reset() {
    player.x = 200;
    player.y = 380;
}

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // Size of enemies
    this.width = 85;
    this.height = 50;

    // Positions of enemies
    this.x = x;
    this.y = y;

    // Speed of enemies
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += (this.speed * dt);

    // Make enemies go back to beginning after going off-screen
    if (this.x >= 680) {
        this.x = -180;
    }

    // Handle collision with player
    if (this.y === player.y) {
        if (this.x + 20 < player.x + player.width + 40 && this.x + this.width - 20 > player.x + 40) {
            // alert('collision detected!');
            minusPoints();
            reset();
        }
    }
    // Subtract points from score if collide
    function minusPoints() {
        score -= 5;
        points.innerHTML = score;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor(x, y) {
        // Sprite for our player
        this.sprite = 'images/char-boy.png';

        // Size of player
        this.width = 50;
        this.height = 85;

        // Position of player
        this.x = x;
        this.y = y;
    }

    // Update player position if win game
    update() {
        // Add points to score if win
        function addPoints() {
            score += 10;
            points.innerHTML = score;
        }
        if (this.y <= 0) {
            addPoints();
            this.x = 200;
            this.y = 380;
        }
    }

    // Draw player on the screen
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // Move player using arrow keys
    handleInput(keyCode) {

        switch (keyCode) {
            case 'left':
                if (this.x - 100 >= 0) {
                    this.x -= 100;
                }
                break;
            case 'right':
                if (this.x + 100 <= 400) {
                    this.x += 100;
                }
                break;
            case 'up':
                if (this.y - 80 >= -80) {
                    this.y -= 80;
                }
                break;
            case 'down':
                if (this.y + 80 <= 440) {
                    this.y += 80;
                }
                break;
        }
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
const randomY = Math.random() * 150;
const randomSpeed = Math.random() * 150 + 50;

let enemy1 = new Enemy(0, 140, randomSpeed + 50);
let enemy2 = new Enemy(-120, 60, randomSpeed + 80);
let enemy3 = new Enemy(0, 220, randomSpeed);
let enemy4 = new Enemy(-120, 140, randomSpeed + 20);
let enemy5 = new Enemy(-120, 60, randomSpeed + 100);
let enemy6 = new Enemy(-60, 220, randomSpeed + 10);
let enemy7 = new Enemy(0, 60, randomSpeed + 30);
let enemy8 = new Enemy(-60, 140, randomSpeed + 90);

const allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6, enemy7, enemy8];

// Place the player object in a variable called player
const player = new Player(200, 380);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
