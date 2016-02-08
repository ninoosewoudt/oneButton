GameStates.Preloader = function (game) {
    this.preloadBar = null;
}



GameStates.Preloader.prototype = {
    preload: function () {
        //loadingbar
        this.preloadBar = this.add.sprite(this.game.width / 2 - 100, this.game.height / 2, 'preloaderBar');
        this.load.setPreloadSprite(this.preloadBar);

        // load all game assets
        this.load.image('background', "Assets/background.png");
        this.load.image('cannon', "Assets/cannon.png");
        this.load.image('shot', "Assets/shot.png");
        this.load.image('enemy', "Assets/enemy.png");

    },

    create: function () {
        //start
        this.state.start('MainMenu');

    }
};