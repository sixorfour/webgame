let energy = 3;
let maxEnergy = 10;
let maxWood = 100; // Maximum value for wood
let maxStone = 100; // Maximum value for stone
let maxFood = 50; // Maximum value for food
let wood = 0;
let stone = 0;
let food = 0;
let excessWood = 0;
let excessStone = 0;
let excessFood = 0;
let lastEnergyUpdate = new Date().getTime();
let resultTimeout;
let timerInterval;
var activeGame = false;

function updateResources() {
  document.getElementById('wood').textContent = `Wood: ${wood} / ${maxWood}`;
  document.getElementById('stone').textContent = `Stone: ${stone} / ${maxStone}`;
  document.getElementById('food').textContent = `Food: ${food} / ${maxFood}`;
  document.getElementById('energy').textContent = `Energy: ${energy} / ${maxEnergy}`;
}

function startGame() {
  var playerName = document.getElementById('name').value;
  if (playerName === '') {
    alert('Please enter your name');
    return;
  }

  if (activeGame) {
    var confirmed = confirm('Are you sure you want to start a new game? Any progress will be lost!');
    if (!confirmed) {
      return;
    }
    // Reset game progress here
  }

  document.getElementById('playerContainer').style.display = 'block';
  document.getElementById('playerName').innerHTML = 'Player: ' + playerName;
  document.getElementById('newGameButton').style.display = 'block';
  document.getElementById('gameStart').style.display = 'none';
  document.getElementById('resources').style.display = 'block';
  document.getElementById('actions').style.display = 'block';
  countdown();
  activeGame = true;
}

function countdown() {
  var timeLeft = 60;
  var countdownElement = document.getElementById('countdown');
  var timer = setInterval(function () {
    if (timeLeft <= 0) {
      clearInterval(timer);
      endGame();
    }
    countdownElement.innerHTML = timeLeft;
    timeLeft -= 1;
  }, 1000);
}

function chopWood() {
  if (energy > 0) {
    if (wood >= maxWood) {
      displayResult(`You have reached the maximum of <span class="max-value">${maxWood}</span> wood.`);
    } else {
      energy--;
      const amount = getRandomAmount();
      const totalWood = Math.min(wood + amount, maxWood);
      excessWood = wood + amount - totalWood;
      wood = totalWood;
      updateResources();
      if (excessWood > 0) {
        displayResult(`You Chopped a total of <span class="rng">${amount}</span> wood --<br>However, you had to leave <span class="excess-rng">${excessWood}</span> behind because you reached your maximum of <span class="max-value">${maxWood}</span> wood.`);
      } else {
        displayResult(`You Chopped <span class="rng">${amount}</span> wood.`);
      }
    }
  } else {
    displayResult('You are out of energy! Wait a bit!');
  }
}

function gatherStone() {
  if (energy > 0) {
    if (stone >= maxStone) {
      displayResult(`You have reached the maximum of <span class="max-value">${maxStone}</span> stone.`);
    } else {
      energy--;
      const amount = getRandomAmount();
      const totalStone = Math.min(stone + amount, maxStone);
      excessStone = stone + amount - totalStone;
      stone = totalStone;
      updateResources();
      if (excessStone > 0) {
        displayResult(`You found a total of <span class="rng">${amount}</span> stone --<br>However, you had to leave <span class="excess-rng">${excessStone}</span> behind because you reached your maximum of <span class="max-value">${maxStone}</span> stone.`);
      } else {
        displayResult(`You Gathered <span class="rng">${amount}</span> stone.`);
      }
    }
  } else {
    displayResult('You are out of energy! Wait a bit!');
  }
}

function forageFood() {
  if (energy > 0) {
    if (food >= maxFood) {
      displayResult(`You have reached the maximum of <span class="max-value">${maxFood}</span> food.`);
    } else {
      energy--;
      const amount = getRandomAmount();
      const totalFood = Math.min(food + amount, maxFood);
      excessFood = food + amount - totalFood;
      food = totalFood;
      updateResources();
      if (excessFood > 0) {
        displayResult(`You found a total of <span class="rng">${amount}</span> food --<br>However, you had to leave <span class="excess-rng">${excessFood}</span> behind because you reached your maximum of <span class="max-value">${maxFood}</span> food.`);
      } else {
        displayResult(`You Foraged <span class="rng">${amount}</span> food.`);
      }
    }
  } else {
    displayResult('You are out of energy! Wait a bit!');
  }
}

function getRandomAmount() {
  return Math.floor(Math.random() * 50) + 1;
}

function displayResult(message, clearPrevious = true, showResult = false) {
  const resultContainer = document.querySelector('.resultContainer');
  const resultElement = document.getElementById('result');

  if (clearPrevious) {
    clearTimeout(resultTimeout); // Clear any existing timeouts
    resultElement.innerHTML = '';
  }

  // Wrap and style numbers based on their type
  const formattedMessage = message.replace(/\d+|<span class="rng">(\d+)<\/span>/g, (match, capture) => {
    let style = '';

    if (match === maxWood.toString() || match === maxStone.toString() || match === maxFood.toString() ||
        match === excessWood.toString() || match === excessStone.toString() || match === excessFood.toString()) {
      style = 'color: white;';
    } else {
      style = 'color: green;';
    }

    return `<span style="${style}">${match}</span>`;
  });

  resultElement.innerHTML += formattedMessage;

  if (showResult) {
    resultContainer.style.display = 'block'; // Show the result container
    document.body.style.backgroundColor = 'gray'; // Set the background color to gray
    resultTimeout = setTimeout(() => {
      resultElement.innerHTML = '';
      resultContainer.style.display = 'none'; // Hide the result container
      document.body.style.backgroundColor = ''; // Reset the background color
    }, 10000); // Display for 10 seconds
  } else if (clearPrevious) {
    resultContainer.style.display = 'none'; // Hide the result container if no result message
    document.body.style.backgroundColor = ''; // Reset the background color
  }
}



function regenerateEnergy() {
  const currentTime = new Date().getTime();
  const elapsedMilliseconds = currentTime - lastEnergyUpdate;
  const energyToRegenerate = Math.floor(elapsedMilliseconds / (60 * 1000)); // Convert milliseconds to minutes

  if (energyToRegenerate > 0) {
    energy += energyToRegenerate;
    energy = Math.min(energy, maxEnergy);
    lastEnergyUpdate = currentTime;
    updateResources();
  }
}

function endGame() {
  clearInterval(timerInterval);
  activeGame = false;
  document.getElementById('resources').style.display = 'none';
  document.getElementById('actions').style.display = 'none';
  document.getElementById('newGameButton').style.display = 'none';
  document.getElementById('gameStart').style.display = 'block';
  document.getElementById('playerContainer').style.display = 'none';
}

timerInterval = setInterval(regenerateEnergy, 60000); // Regenerate energy every minute

document.getElementById('startButton').addEventListener('click', startGame);
document.getElementById('actions').addEventListener('click', function(event) {
  if (event.target.id === 'chopWood') {
    chopWood();
  } else if (event.target.id === 'gatherStone') {
    gatherStone();
  } else if (event.target.id === 'forageFood') {
    forageFood();
  }
});

document.getElementById('newGameButton').addEventListener('click', endGame);

updateResources();
