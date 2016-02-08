GameStates.MainMenu = function (game) {

};

GameStates.MainMenu.prototype = {
    create: function () {


        this.loadingText = this.add.text(this.game.width / 2, this.game.height / 2, "Press DOWN to start", {
            font: "20px monospace",
            fill: "#fff"
        });
        this.loadingText.anchor.setTo(0.5, 0.5);

        this.enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);

        this.enterKey.onDown.add(this.playGame, this);
    },
    playGame: function () {
        this.state.start('Game');
    }
};