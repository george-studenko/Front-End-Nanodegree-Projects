// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.y = 0;
    this.speed = 0;
};
/* This will set a random speed to the enemy everytime it goes off screen
 *  has a min speed of 100 to make sure it doesn't go very slow
 */
Enemy.prototype.randomizeSpeed = function() {
    this.speed = Math.random() * 100 + 100;
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // If the enemy goes off screen then it reappears from the left side
    if (this.x > 705) {
        this.x = -100;
        this.randomizeSpeed();
    }
    this.x = this.x + this.speed * dt;

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-pink-girl.png';
    this.y = 405;
    this.x = 305;
    this.isDead = false;
    this.score = 0;
    this.lastScore = 0;
    this.maxScore = 0;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.update = function(dt) {

}
// checks the current possition and moves the player if not in the edges
Player.prototype.handleInput = function(key) {
    if (key == 'up') {
        if (this.y == -10) {
            this.isDead = true;
        }
        if (this.y > -10) {
            this.y -= 83;
        }
    }

    if (key == 'down') {
        if (this.y < 405) {
            this.y += 83;
        }
    }

    if (key == 'left') {
        if (this.x > 5) {
            this.x -= 100;
        }
    }
    if (key == 'right') {
        if (this.x < 605) {
            this.x += 100;
        }
    }
    if (key == 'enter' && this.isDead) {
        this.isDead = false;
        this.y = 405;
        this.x = 305;
    }
};

var Gem = function() {
    this.spriteOptions = ['images/gemy.png', 'images/gemb.png', 'images/gemg.png'];
    this.sprite = this.spriteOptions[0];
    this.pointsOptions = [15, 30, 45];
    this.points = this.pointsOptions[0];
    this.x = 0;
    this.y = 0;
};
Gem.prototype.randomizeLocation = function() {
    var gemX = [0, 5, 105, 205, 305, 405, 505, 605];
    var gemY = [0, 239, 156, 73];
    var indexX = Math.floor(Math.random() * 7) + 1;
    var indexY = Math.floor(Math.random() * 3) + 1;
    this.x = gemX[indexX];
    this.y = gemY[indexY];
};

Gem.prototype.randomizeColor = function() {
    var randomGemColor = Math.floor(Math.random() * 3);
    this.sprite = this.spriteOptions[randomGemColor];
    this.points = this.pointsOptions[randomGemColor];

    console.log("RANDOM INDEX" + randomGemColor);
};

Gem.prototype.materialize = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy3 = new Enemy();
enemy3.y = 60;
enemy3.x = 0;

var enemy2 = new Enemy();
enemy2.y = 145;
enemy2.x = -100;

var enemy1 = new Enemy();
enemy1.y = 230;
enemy1.x = -55;

var allEnemies = [enemy1, enemy2, enemy3];

// will set the random speed for each of the enemies
for (var i = 0; i < allEnemies.length; i++) {
    allEnemies[i].randomizeSpeed();
};

var player = new Player();

var gem = new Gem();
gem.randomizeLocation();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        13: 'enter'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
