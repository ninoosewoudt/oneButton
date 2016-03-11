GameStates.Level3 = function (game) {

};

var background;
var cannon;
var enemy;
var shot;
var enemyShot;
var shotTimeOut = 0;
var bulletCount;
var bulletCounter = 30;
var killsNeeded3 = 1;
var enemyLife = 5;
var playerLife = 3;
var hp;
var bossHp;



GameStates.Level3.prototype = {

    create: function () {




        // background   -----   tilemap will be here
        starfield = this.add.tileSprite(0, 0, 800, 600, 'starfield');

        // text

        bulletCount = this.add.text(600, 16, "bullets : 30", {
            font: "20px Arial",
            fill: "#ffffff"

        });

        hp = this.add.text(20, 16, "health : 5", {
            font: "20px Arial",
            fill: "#ffffff"

        });
        bossHp = this.add.text(20, 32, "boss health : 5", {
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
        enemyShot = this.add.group();

        //shot physics
        shot.physicsBodyType = Phaser.Physics.ARCADE;
        shot.enableBody = true;

        enemyShot.physicsBodyType = Phaser.Physics.ARCADE;
        enemyShot.enableBody = true;

        //shot modifiers
        shot.createMultiple(bulletCounter, 'shot');
        shot.setAll('anchor.x', 0.5);
        shot.setAll('anchor.y', 1);
        shot.setAll('outOfBoundKill', true);
        shot.setAll('checkWorldBounds', true);


        enemyShot.createMultiple(999, 'enemyShot');
        enemyShot.setAll('anchor.x', 0.5);
        enemyShot.setAll('anchor.y', 1);
        enemyShot.setAll('outOfBoundKill', true);
        enemyShot.setAll('checkWorldBounds', true);


        //enemy sprite
        enemy = this.add.group();

        //enemy physics
        enemy.physicsBodyType = Phaser.Physics.ARCADE;
        enemy.enableBody = true;




        //enable physics
        this.game.physics.enable(shot, Phaser.Physics.ARCADE);
        this.game.physics.enable(enemyShot, Phaser.Physics.ARCADE);
        this.game.physics.enable(enemy, Phaser.Physics.ARCADE);
        this.game.physics.enable(cannon, Phaser.Physics.ARCADE);
        cannon.body.collideWorldBounds = true;






        // call functions
        console.log(killsNeeded3);
        createEnemy3();

        this.time.events.loop(Phaser.Timer.SECOND, EnemyShot, this);
        this.time.events.loop(Phaser.Timer.SECOND, fireShot, this);


        this.add.tween(enemy).to({
            x: 600
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

        this.physics.arcade.overlap(enemy, shot, collisionHandler3, null, this);
        this.physics.arcade.overlap(cannon, enemyShot, test, null, this);
        updateText3()

        if (killsNeeded3 == 0) {
            this.state.start('WinScreen');
            bulletCounter = 30;
            killsNeeded3 = 1;
            enemyLife = 5;
        }

        if (bulletCounter == 0) {
            this.state.start('GameOver');
            bulletCounter = 30;
            killsNeeded3 = 1;
            enemyLife = 5;
        }

        if (playerLife == 0) {
            this.state.start('GameOver');
            bulletCounter = 30;
            killsNeeded3 = 1;
            enemyLife = 5;
            playerLife = 3;
        }




    },

    render: function () {


    },






};

function createEnemy3() {

    for (var y = 0; y < 1; y++) {
        for (var x = 0; x < 1; x++) {
            var enemys = enemy.create(x * 100, y * 50, 'enemy');
            enemys.anchor.setTo(0.5, 0.5);

        }
    }

    enemy.x = 200;
    enemy.y = 100;
    enemy.scale.x = 4;
    enemy.scale.y = 4;




}


function collisionHandler3(enemy, shot) {

    shot.kill();

    enemyLife--;

    bulletCounter++;
    hitSound.play();
    updateText3();
    if (enemyLife == 0) {
        enemy.kill();
        killsNeeded3--;

    }

}


function test(cannon, enemyShot) {

    enemyShot.kill();
    playerLife--;
    updateText3();


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

function EnemyShot() {

    enemyshots = enemyShot.getFirstExists(false);

    if (enemyshots) {
        enemyshots.reset(enemy.x, enemy.y);
        enemyshots.body.velocity.y = 300;
    }
}

function updateText3() {



    bulletCount.setText(" bullets : " + bulletCounter);
    hp.setText(" health : " + playerLife);
    bossHp.setText(" boss health : " + enemyLife);

}