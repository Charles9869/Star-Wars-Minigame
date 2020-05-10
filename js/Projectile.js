class Projectile {
  constructor(root, x, src) {
    this.root = root;
    this.x = x;
    this.y = GAME_HEIGHT - PLAYER_HEIGHT - 10;

    this.domElement = document.createElement('img');
    this.domElement.src = src;
    this.domElement.style.width = '50px';
    this.domElement.style.height = '30px';
    this.domElement.style.position = 'absolute';
    this.domElement.style.left = `${this.x}px`;
    this.domElement.style.top = ` ${this.y}px`;
    this.domElement.style.zIndex = '10';
    this.destroyed = false;
    root.appendChild(this.domElement);
    this.speed = Math.random() / 2 + 0.25;
  }

  update(timeDiff) {
    this.y = this.y - timeDiff * this.speed * 2;
    this.domElement.style.top = `${this.y}px`;

    if (this.y <= 0) {
      this.root.removeChild(this.domElement);
      this.destroyed = true;
    }
  }
}
