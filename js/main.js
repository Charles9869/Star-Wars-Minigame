const startBtn = document.querySelector('.btn');
const mainLogo = document.getElementById('logo');

const gameEngine = new Engine(document.getElementById('app'));
const keydownHandler = (event) => {
  if (gameStarted) {
    if (event.code === 'ArrowLeft') gameEngine.player.moveLeft();
    if (event.code === 'ArrowRight') gameEngine.player.moveRight();

    if (event.key === 'q') {
      sounds.shot.play();
      gameEngine.player.shot();
    }
  }
};

document.addEventListener('keydown', keydownHandler);

// Support touchscreen on movile devices
document.addEventListener('touchstart', (e) => {
  if (gameStarted) {
    if (e.touches[0].pageX < GAME_WIDTH / 2) gameEngine.player.moveLeft();
    else gameEngine.player.moveRight();
  }
});

const startGame = () => {
  gameStarted = true;
  startBtn.style.display = mainLogo.style.display = 'none';
  if (gameStarted) gameEngine.gameLoop();
};

const hide = (object) => (object.domElement.style.display = 'none');

const show = (object) => (object.domElement.style.display = 'block');

const emptyArray = (root, objects) => {
  objects.forEach((object) => {
    root.removeChild(object.domElement);
    object = null;
  });
};
