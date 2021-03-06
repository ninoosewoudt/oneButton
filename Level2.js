GameStates.Level2 = function (game) {

};

var background;
var cannon;
var enemy;
var shot;
var shotTimeOut = 0;
var bulletCount;
var bulletCounter = 30;
var killsNeeded2 = 15;



GameStates.Level2.prototype = {

    create: function () {




        // background   -----   tilemap will be here
        starfield = this.add.tileSprite(0, 0, 800, 600, 'starfield');

        // text

        bulletCount = this.add.text(600, 16, "bullets : 30", {
            font: "20px Arial",
            fill: "#ffffff"

        });


        //enable cursor keys
        keys = this.input.keyboard.createCursorKeys();


        // player sprite
        cannon = this.add.sprite(400, 450, 'cannon');
        cannon.anchor.setTo(0.5, 0.5);
        // shot sprite
        shot = this.add.group();

        //shot physics
        shot.physicsBodyType = Phaser.Physics.ARCADE;
        shot.enableBody = true;

        //shot modifiers
        shot.createMultiple(bulletCounter, 'shot');
        shot.setAll('anchor.x', 0.5);
        shot.setAll('anchor.y', 1);
        shot.setAll('outOfBoundKill', true);
        shot.setAll('checkWorldBounds', true);

        //enemy sprite
        enemy = this.add.group();

        //enemy physics
        enemy.physicsBodyType = Phaser.Physics.ARCADE;
        enemy.enableBody = true;




        //enable physics
        this.game.physics.enable(shot, Phaser.Physics.ARCADE);
        this.game.physics.enable(enemy, Phaser.Physics.ARCADE);
        this.game.physics.enable(cannon, Phaser.Physics.ARCADE);
        cannon.body.collideWorldBounds = true;






        // call functions
        console.log(killsNeeded2);
        createEnemy2();

        this.time.events.loop(Phaser.Timer.SECOND, fireShot, this);

        this.add.tween(enemy).to({
            x: 325
        }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);

        shotSound = this.add.audio('shot');
        shotSound.volume = 0.2;

        hitSound = this.add.audio('explosion');
        hitSound.volume = 0.5;
    },

    update: function () {
        // player movement
        if (keys.down.isUp) {
            cannon.body.velocity.x = -350;

        }
        if (keys.down.isDown) {
            cannon.body.velocity.x = 350;

        }

        this.physics.arcade.overlap(enemy, shot, collisionHandler2, null, this);
        updateText()

        if (killsNeeded2 == 0) {
            this.state.start('Level3');
            bulletCounter = 30;
            killsNeeded2 = 15;
        }

        if (bulletCounter == 0) {
            this.state.start('GameOver');
            bulletCounter = 30;
            killsNeeded2 = 15;
        }




    },

    render: function () {


    },






};

function createEnemy2() {

    for (var y = 0; y < 3; y++) {
        for (var x = 0; x < 5; x++) {
            var enemys = enemy.create(x * 100, y * 50, 'enemy');
            enemys.anchor.setTo(0.5, 0.5);

        }
    }

    enemy.x = 50;
    enemy.y = 100;




}


function collisionHandler2(enemy, shot) {

    shot.kill();
    enemy.kill();
    killsNeeded2--;
    bulletCounter++;
    hitSound.play();



}

function fireShot() {

    shots = shot.getFirstExists(false);

    if (shots) {
        shots.reset(cannon.x, cannon.y);
        shots.body.velocity.y = -300;
        shotSound.play();
        bulletCounter--;


    }
}

function updateText() {



    bulletCount.setText(" bullets : " + bulletCounter);

}