class Player {
  constructor(root) {
    this.x = 2 * (2 * PLAYER_WIDTH);
    this.y = GAME_HEIGHT - PLAYER_HEIGHT - 10;
    this.domElement = document.createElement('img');
    this.domElement.src = 'images/player1.png';
    this.domElement.style.position = 'absolute';
    this.domElement.style.left = `${this.x}px`;
    this.domElement.style.top = ` ${this.y}px`;
    this.domElement.style.zIndex = '10';
    this.root = root;
    root.appendChild(this.domElement);
    this.life = 3;
  }
  moveLeft() {
    if (this.x > 0) this.x = this.x - PLAYER_WIDTH;
    this.domElement.style.left = `${this.x}px`;
  }
  moveRight() {
    if (this.x + PLAYER_WIDTH < GAME_WIDTH) this.x = this.x + PLAYER_WIDTH;
    this.domElement.style.left = `${this.x}px`;
  }

  shot = () => {
    gameEngine.projectiles.push(
      new Projectile(this.root, this.x, 'images/jedi.png')
    );
  };
}
