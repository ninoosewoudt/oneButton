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
        this.load.image('enemyShot', "Assets/shot.png");
        this.load.image('enemy', "Assets/enemy.png");
        this.load.image('starfield', "Assets/starfield.jpg");
        this.load.image('title', "Assets/title.png");
        this.load.image('wintitle', "Assets/wintitle.png");
        this.load.image('winbackground', "Assets/winbackground.png");
        this.load.image('lose', "Assets/losetitle.png");


        // load all audio
        this.load.audio('menu', ['Assets/menu.wav']);
        this.load.audio('shot', ['Assets/shot.wav']);
        this.load.audio('explosion', ['Assets/exploison.mp3']);


    },

    create: function () {
        //start
        this.state.start('MainMenu');

    }
};