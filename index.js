document.addEventListener("DOMContentLoaded", () => {
  const colorBox = document.querySelector('[data-testid="colorBox"]');
  const colorButtons = document.querySelectorAll('[data-testid="colorOption"]');
  const gameStatus = document.querySelector('[data-testid="gameStatus"]');
  const scoreDisplay = document.getElementById("score");
  const newGameButton = document.getElementById("newGameButton");
  
  const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink'];

  let targetColor = "";
  let score = 0;

  function pickRandomColor(colorsArray) {
    const randomIndex = Math.floor(Math.random() * colorsArray.length);
    return colorsArray[randomIndex];
  }

  function gameStart() {
    const arrayOfColors = colors.sort(() => 0.5 - Math.random()).slice(0, 6);
    targetColor = pickRandomColor(arrayOfColors);

    colorBox.style.backgroundColor = targetColor;

    colorButtons.forEach((button, index) => {
      button.style.backgroundColor = arrayOfColors[index]; 
      button.onclick = handleGuess;
    });

    gameStatus.textContent = "Guess the correct color!";
  }

  function handleGuess(event) {
    const selectedColor = event.target.style.backgroundColor;
  
    gameStatus.classList.remove('animate');
    void gameStatus.offsetWidth; 
    gameStatus.classList.add('animate');
  
    if (selectedColor === targetColor) {
      gameStatus.textContent = "Correct! 😍";
      score++;
      scoreDisplay.textContent = score;
  
      gameStatus.style.color = 'green';
      colorButtons.forEach(button => button.disabled = true);
  
      setTimeout(() => {
        gameStart();
        colorButtons.forEach(button => button.disabled = false);
        gameStatus.style.color = "black";
      }, 800);
    } else {
      gameStatus.textContent = "Wrong 😒! Try again!";
      gameStatus.style.color = "red";
    }
  }
  
  newGameButton.addEventListener("click", () => {
    gameStart();
    score= 0;
    scoreDisplay.textContent = score;
  });

  gameStart();
});
