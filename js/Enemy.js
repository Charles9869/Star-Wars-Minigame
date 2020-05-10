class Enemy {
  constructor(theRoot, enemySpot) {
    this.root = theRoot;
    this.spot = enemySpot;
    this.x = enemySpot * ENEMY_WIDTH;
    this.y = -ENEMY_HEIGHT;
    this.destroyed = false;
    this.domElement = document.createElement('img');
    this.domElement.src = `images/enemy${Math.floor(Math.random() * 2) +
      1}.png`;
    this.domElement.style.position = 'absolute';
    this.domElement.style.left = `${this.x}px`;
    this.domElement.style.top = `${this.y}px`;
    this.domElement.style.zIndex = 5;
    theRoot.appendChild(this.domElement);
    this.speed = Math.random() / 2 + 0.25;
    this.hasShot = false;
  }

  update(timeDiff) {
    this.y = this.y + timeDiff * this.speed;
    this.domElement.style.top = `${this.y}px`;
    if (this.y > GAME_HEIGHT) {
      this.root.removeChild(this.domElement);
      this.destroyed = true;
    }
  }

  shoot = () => {
    if (this.hasShot == false) {
      this.numberRandom = Math.floor(Math.random() * 7);
      if (this.numberRandom === 5) {
        gameEngine.enemyProjectiles.push(
          new EnemyProjectile(this.root, this.x, 'images/sith.png')
        );
      }
    }
    this.hasShot = true;
  };
}
