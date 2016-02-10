GameStates.WinScreen = function (game) {

};






GameStates.WinScreen.prototype = {

    create: function () {
        background = this.add.tileSprite(0, 0, 800, 600, 'winbackground');
        title = this.add.sprite(400, 250, 'wintitle')
        title.anchor.set(0.5, 1);

        this.add.tween(title.scale).to({
            x: 1.3,
            y: 1.1
        }, 900, "Sine.easeInOut", true, 0, -1, true);

        this.enterKey = this.input.keyboard.addKey(Phaser.Keyboard.DOWN);

        this.enterKey.onDown.add(this.playGame, this);





    },

    playGame: function () {

        this.state.start('Boot');
    }




};