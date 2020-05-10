class Score {
  constructor(root, x, y) {
    const div = document.createElement('div');
    div.style.position = 'absolute';
    div.style.left = x;
    div.style.top = y;
    div.style.color = 'white';
    div.style.font = 'bold 30px Impact';
    div.style.color = '#e4ca29';
    div.style.zIndex = 2000;
    root.appendChild(div);
    this.domElement = div;
    this.score = 0;
  }

  update = ctx => (this.domElement.innerText = `${this.score}`);

  showFinalScore = ctx =>
    (this.domElement.innerText = `${this.score} Game Over!`);

  increaseScore = timeDifference => (this.score += timeDifference);
}
