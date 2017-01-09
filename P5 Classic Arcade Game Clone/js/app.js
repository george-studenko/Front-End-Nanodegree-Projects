/* GameObject is the Base Class from which Enemy, Player and Gem will inherit
 *  it contains the common variables and functions
 */
var GameObject = function(sprite) {
    this.sprite = sprite;
    this.x = 0;
    this.y = 0;
};

// Draws the GameObject on the screen
GameObject.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    GameObject.call(this, 'images/enemy-bug.png');
    // speed will be randomized after an instance is created, so we just leave it a 0 by default
    this.speed = 0;
};
Enemy.prototype = Object.create(GameObject.prototype);
Enemy.prototype.constructor = Enemy;

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

// The player class handles the player behaviour and control input
var Player = function() {
    GameObject.call(this, 'images/char-pink-girl.png');
    this.isDead = false;
    this.score = 0;
    this.lastScore = 0;
    this.maxScore = 0;
};
Player.prototype = Object.create(GameObject.prototype);
Player.prototype.constructor = Player;
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

Player.prototype.checkCollisions = function() {
    this.checkEnemyCollision();
    this.checkWaterCollision();
    this.checkGemCollision();

};

var Gem = function() {
    this.spriteOptions = ['images/gemy.png', 'images/gemb.png', 'images/gemg.png'];
    this.pointsOptions = [15, 30, 45];
    this.points = this.pointsOptions[0];
    GameObject.call(this, this.spriteOptions[0]);
};
Gem.prototype = Object.create(GameObject.prototype);
Gem.prototype.constructor = Gem;
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
};

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
// Player.handleInput() method.
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
