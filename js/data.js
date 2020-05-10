const GAME_WIDTH = 450;
const GAME_HEIGHT = 500;

const ENEMY_WIDTH = 50;
const ENEMY_HEIGHT = 50;
let MAX_ENEMIES = 3;

const PLAYER_WIDTH = 50;
const PLAYER_HEIGHT = 54;

let gameStarted = false;

const sounds = {
  explosion: new Audio('./sounds/explosion.mp3'),
  shot: new Audio('./sounds/shot.mp3'),
  intro: new Audio('./sounds/intro.mp3'),
  bg: new Audio('./sounds/bg.mp3')
};
