class Engine {
  constructor(theRoot) {
    this.root = theRoot;
    this.player = new Player(this.root);
    this.scorePlayer = new Score(this.root, 10, 10);
    this.sound = new Sounds();
    this.life = new Text(this.root, 350, 10);
    this.enemies = [];
    this.projectiles = [];
    this.enemyProjectiles = [];
    addBackground(this.root);
  }

  gameLoop = () => {
    // Shows the number of lives of the player
    this.life.update(`${this.player.life} lives`);

    if (this.scorePlayer.score % 800 === 0 && this.scorePlayer.score !== 0)
      MAX_ENEMIES += 2;

    this.sound.play('bg');

    let currentFrame = Date.now();
    if (this.lastFrame === undefined) this.lastFrame = new Date().getTime();
    let timeDiff = new Date().getTime() - this.lastFrame;
    this.lastFrame = new Date().getTime();

    // Increase the score
    this.scorePlayer.increaseScore(timeDiff);

    this.enemies.forEach((enemy) => {
      enemy.update(timeDiff);
      if (this.player.life !== 0) enemy.shoot();
    });

    this.projectiles.forEach((projectile) => {
      projectile.update(timeDiff);
    });

    this.enemyProjectiles.forEach((projectile) => {
      projectile.update(timeDiff);
    });

    this.enemies = this.enemies.filter((enemy) => {
      return !enemy.destroyed;
    });

    this.projectiles = this.projectiles.filter((projectile) => {
      return !projectile.destroyed;
    });

    this.enemyProjectiles = this.enemyProjectiles.filter((projectile) => {
      return !projectile.destroyed;
    });

    while (this.enemies.length < MAX_ENEMIES) {
      const spot = nextEnemySpot(this.enemies);
      this.enemies.push(new Enemy(this.root, spot));
    }

    this.projectiles.forEach((projectile, indexProjectile) => {
      this.enemies.forEach((enemie, indexEnnemie) => {
        if (
          enemie.x < projectile.x + projectile.domElement.width - 10 &&
          enemie.x + enemie.domElement.width - 10 > projectile.x &&
          enemie.y < projectile.y + projectile.domElement.height &&
          enemie.y + enemie.domElement.height > projectile.y
        ) {
          this.root.removeChild(projectile.domElement);
          this.root.removeChild(enemie.domElement);
          this.enemies.splice(indexEnnemie, 1);
          this.projectiles.splice(indexProjectile, 1);
        }
      });
    });

    this.enemyProjectiles.forEach((projectile, indexProjectile) => {
      if (
        this.player.x < projectile.x + projectile.domElement.width &&
        this.player.x + this.player.domElement.width > projectile.x &&
        this.player.y < projectile.y + projectile.domElement.height &&
        this.player.y + this.player.domElement.height > projectile.y
      ) {
        this.root.removeChild(projectile.domElement);
        this.enemyProjectiles.splice(indexProjectile, 1);
        projectile = null;
        this.player.life--;
      }
    });

    if (this.isPlayerDead()) {
      this.scorePlayer.showFinalScore();
      gameStarted = false;
      this.clearAll();
    } else {
      this.scorePlayer.update();
      this.lastFrame = Date.now();
      setTimeout(this.gameLoop, 20);
    }
    if (this.isPlayerHit()) console.log('Collision detected!');
  };

  isPlayerHit = () => {
    let isHit = false;
    this.enemies.forEach((enemie, index, value) => {
      if (
        enemie.x === this.player.x &&
        enemie.domElement.offsetTop >
          this.player.domElement.offsetTop - enemie.domElement.height
      ) {
        isHit = true;
        this.player.life--;
        this.root.removeChild(enemie.domElement);
        this.enemies.splice(index, 1);
      }
    });
    return isHit;
  };

  isPlayerDead = () => {
    let isDead = false;
    this.enemies.forEach((enemie, index, value) => {
      if (
        enemie.x === this.player.x &&
        enemie.domElement.offsetTop >
          this.player.domElement.offsetTop - enemie.domElement.height
      ) {
        if (this.player.life === 0) {
          this.root.removeChild(enemie.domElement);
          this.enemies.splice(index, 1);
          bg.src = 'images/fire.gif';
          this.sound.play('explosion');
          isDead = true;
        }
      }
    });
    return isDead;
  };

  clearAll = () => {
    emptyArray(this.root, this.enemies);
    emptyArray(this.root, this.projectiles);
    hide(this.player);

    let resetTimeOut = setTimeout(() => {
      bg.src = 'images/ciel.bmp';
      startBtn.style.display = 'block';
      this.resetGame();
    }, 3500);
  };

  resetGame = () => {
    MAX_ENEMIES = 3;
    mainLogo.style.display = 'block';
    this.player.domElement.style.left = `${2 * (PLAYER_WIDTH * 2)}px`;
    show(this.player);
    this.enemies = [];
    this.projectiles = [];
    this.lastFrame = undefined;
    this.player.x = 200;
    this.scorePlayer.score = 0;
    this.player.life = 3;
  };
}
