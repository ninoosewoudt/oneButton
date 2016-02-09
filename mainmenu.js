GameStates.MainMenu = function (game) {

};

GameStates.MainMenu.prototype = {
    create: function () {

        background = this.add.tileSprite(0, 0, 800, 600, 'background');
        cannon = this.add.sprite(375, 450, 'cannon');

        this.enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);

        this.enterKey.onDown.add(this.playGame, this);
    },
    playGame: function () {
        this.state.start('Game');
    }
};