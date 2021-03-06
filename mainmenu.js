GameStates.MainMenu = function (game) {

};

var music;

GameStates.MainMenu.prototype = {
    create: function () {

        background = this.add.tileSprite(0, 0, 800, 600, 'background');
        cannon = this.add.sprite(400, 450, 'cannon');
        title = this.add.sprite(400, 100, 'title')

        title.anchor.set(0.5, 1);
        cannon.anchor.setTo(0.5, 0.5);

        this.add.tween(title.scale).to({
            x: 1.3,
            y: 1.1
        }, 900, "Sine.easeInOut", true, 0, -1, true);

        music = this.add.audio('menu');
        music.play();

        this.enterKey = this.input.keyboard.addKey(Phaser.Keyboard.DOWN);

        this.enterKey.onDown.add(this.playGame, this);
    },
    playGame: function () {
        music.stop();
        this.state.start('Level1');
    }
};