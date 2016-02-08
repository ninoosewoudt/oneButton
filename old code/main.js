var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'gamedev');

var background;
var cannon;
var enemy;
var shot;
var shotTimeOut = 0;
var bulletCount;
var bulletCounter = 30;




var mainState = {

    preload: function () {

        game.load.image('background', "Assets/background.png");
        game.load.image('cannon', "Assets/cannon.png");
        game.load.image('shot', "Assets/shot.png");
        game.load.image('enemy', "Assets/enemy.png");

    },

    create: function () {




        background = game.add.tileSprite(0, 0, 800, 600, 'background');
        cannon = game.add.sprite(200, 450, 'cannon');


        game.add.text(16, 16, 'hold down to move right and shoot', {
            font: '18px Arial',
            fill: '#ffffff'
        });

        bulletCount = game.add.text(670, 16, "bullets : 30", {
            font: "20px Arial",
            fill: "#ffffff"

        });


        shot = game.add.group();
        shot.physicsBodyType = Phaser.Physics.ARCADE;
        shot.enableBody = true;
        shot.createMultiple(bulletCounter, 'shot');
        shot.setAll('anchor.x', 0.5);
        shot.setAll('anchor.y', 1);
        shot.setAll('outOfBoundKill', true);
        shot.setAll('checkWorldBounds', true);


        enemy = game.add.group();
        enemy.physicsBodyType = Phaser.Physics.ARCADE;
        enemy.ebableBody = true;

        createEnemy();


        game.physics.enable(shot, Phaser.Physics.ARCADE);
        game.physics.enable(enemy, Phaser.Physics.ARCADE);
        game.physics.enable(cannon, Phaser.Physics.ARCADE);
        cannon.body.collideWorldBounds = true;

        keys = game.input.keyboard.createCursorKeys();







    },

    update: function () {

        if (keys.down.isUp) {
            cannon.body.velocity.x = -350;

        }
        if (keys.down.isDown) {
            cannon.body.velocity.x = 350;
            fireShot();
        }

        game.physics.arcade.overlap(enemy, shot, collisionHandler, null, this);




    },
    render: function () {



        //        game.debug.body(shot);
        //        game.debug.body(enemy);
        //        game.debug.body(cannon);

    }

}


function fireShot() {

    if (game.time.now > shotTimeOut) {

        shots = shot.getFirstExists(false);

        if (shots) {
            shots.reset(cannon.x + 25, cannon.y);
            shots.body.velocity.y = -300;
            shotTimeOut = game.time.now + 900;
            updateText();




        }

    }
}

function createEnemy() {

    for (var y = 0; y < 4; y++) {
        for (var x = 0; x < 10; x++) {
            var enemys = enemy.create(x * 48, y * 50, 'enemy');
            enemys.anchor.setTo(0.5, 0.5);

        }
    }

    enemy.x = 175;
    enemy.y = 100;
}

function collisionHandler(enemy, shot) {


    shot.kill();
    enemy.kill();

}

function updateText() {

    bulletCounter--;

    bulletCount.setText(" bullets : " + bulletCounter);

}

game.state.add('mainState', mainState);
game.state.start('mainState');