var GameStates = {



};

GameStates.Boot = function (game) {


};

GameStates.Boot.prototype = {
    preload: function () {
        // load assets to be used later in the preloader e.g. for loading screen / splashscreen
        this.load.image('preloaderBar', 'Assets/preloader-bar.png');
    },
    create: function () {
        // setup game environment
        // scale, input etc..

        // call next state
        this.state.start('Preloader');
    }
};