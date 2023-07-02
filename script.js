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

function updateResources() {
  document.getElementById('wood').textContent = `Wood: ${wood} / ${maxWood}`;
  document.getElementById('stone').textContent = `Stone: ${stone} / ${maxStone}`;
  document.getElementById('food').textContent = `Food: ${food} / ${maxFood}`;
  document.getElementById('energy').textContent = `Energy: ${energy} / ${maxEnergy}`;
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
        displayResult(`You Chopped a total of <span class="rng">${amount}</span> wood --<br>However, you had to leave <span class="excess-rng">${excessWood}</span> behind because you reached your maximum of <span class="max-value">${maxWood}</span> wood.`, true, true);
      } else {
        displayResult(`You Chopped <span class="rng">${amount}</span> wood.`, true, false);
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
        displayResult(`You found a total of <span class="rng">${amount}</span> stone --<br>However, you had to leave <span class="excess-rng">${excessStone}</span> behind because you reached your maximum of <span class="max-value">${maxStone}</span> stone.`, true, true);
      } else {
        displayResult(`You Gathered <span class="rng">${amount}</span> stone.`, true, false);
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
        displayResult(`You found a total of <span class="rng">${amount}</span> food --<br>However, you had to leave <span class="excess-rng">${excessFood}</span> behind because you reached your maximum of <span class="max-value">${maxFood}</span> food.`, true, true);
      } else {
        displayResult(`You Foraged <span class="rng">${amount}</span> food.`, true, false);
      }
    }
  } else {
    displayResult('You are out of energy! Wait a bit!');
  }
}

function getRandomAmount() {
  return Math.floor(Math.random() * 50) + 1;
}

let ResultTimeout;

// Rest of your code...

function displayResult(message) {
  const resultContainer = document.getElementById('result');
  clearTimeout(resultTimeout); // Clear any existing timeouts

  // Wrap and style numbers based on their type
  const formattedMessage = message.replace(/\d+|<span class="rng">(\d+)<\/span>/g, (match, capture) => {
    let style = '';

    if (match === maxWood.toString() || match === maxStone.toString() || match === maxFood.toString()) {
      style = 'color: black;';
    } else if (match === excessWood.toString() || match === excessStone.toString() || match === excessFood.toString()) {
      style = 'color: red;';
    } else {
      style = 'color: green;';
    }

    return `<span style="${style}">${match}</span>`;
  });

  resultContainer.innerHTML = formattedMessage;
  resultContainer.classList.add('show'); // Add the 'show' class

  resultTimeout = setTimeout(() => {
    resultContainer.innerHTML = '';
    resultContainer.classList.remove('show'); // Remove the 'show' class
  }, 10000); // Display for 10 seconds
}



// Rest of your code...

function regenerateEnergy() {
  const currentTime = new Date().getTime();
  const elapsedMilliseconds = currentTime - lastEnergyUpdate;
  const energyToRegenerate = Math.floor(elapsedMilliseconds / (60 * 1000)); // Convert milliseconds to minutes

  if (energyToRegenerate > 0) {
    energy = Math.min(maxEnergy, energy + energyToRegenerate);
    lastEnergyUpdate = currentTime;
    updateResources();
  }

  // Schedule the next energy regeneration
  setTimeout(regenerateEnergy, 60 * 1000); // Regenerate every 1 minute
}

function startTimer() {
  let time = 59;

  function updateTimer() {
    document.getElementById('timer').textContent = `${time} s`;

    if (time <= 0) {
      time = 60;
      regenerateEnergy();
    }

    time--;
  }

  timerInterval = setInterval(updateTimer, 1000); // Update the timer every second
}

function resetGame() {
  energy = 3;
  wood = 0;
  stone = 0;
  food = 0;
  excessWood = 0;
  excessStone = 0;
  excessFood = 0;
  lastEnergyUpdate = new Date().getTime();
  clearInterval(timerInterval);
  startTimer();
  updateResources();
  document.getElementById('resultContainer').innerHTML = '';
}

document.getElementById('newGameButton').addEventListener('click', resetGame);

startTimer();
updateResources();
