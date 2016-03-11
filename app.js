window.onload = function () {

    var game = new Phaser.Game(800, 600, Phaser.AUTO, '');

    //  Add the States your game has.
    game.state.add('Boot', GameStates.Boot);
    game.state.add('Preloader', GameStates.Preloader);
    game.state.add('MainMenu', GameStates.MainMenu);
    game.state.add('Level1', GameStates.Level1);
    game.state.add('Level2', GameStates.Level2);
    game.state.add('Level3', GameStates.Level3);
    game.state.add('WinScreen', GameStates.WinScreen);
    game.state.add('GameOver', GameStates.GameOver);


    //  Now start the Boot state.
    game.state.start('Boot');

};