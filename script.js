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
let ResultTimeout;
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
      displayResult(`You have reached the maximum of ${maxWood} wood.`);
    } else {
      energy--;
      const amount = getRandomAmount();
      const totalWood = Math.min(wood + amount, maxWood);
      excessWood = wood + amount - totalWood;
      wood = totalWood;
      updateResources();
      if (excessWood > 0) {
        displayResult(`You Chopped a total of <span class="rng">${amount}</span> wood --<br>However, you had to leave ${excessWood} behind because you reached your maximum of ${maxWood} wood.`);
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
      displayResult(`You have reached the maximum of ${maxStone} stone.`);
    } else {
      energy--;
      const amount = getRandomAmount();
      const totalStone = Math.min(stone + amount, maxStone);
      excessStone = stone + amount - totalStone;
      stone = totalStone;
      updateResources();
      if (excessStone > 0) {
        displayResult(`You found a total of <span class="rng">${amount}</span> stone --<br>However, you had to leave ${excessStone} behind because you reached your maximum of ${maxStone} stone.`);
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
      displayResult(`You have reached the maximum of ${maxFood} food.`);
    } else {
      energy--;
      const amount = getRandomAmount();
      const totalFood = Math.min(food + amount, maxFood);
      excessFood = food + amount - totalFood;
      food = totalFood;
      updateResources();
      if (excessFood > 0) {
        displayResult(`You found a total of <span class="rng">${amount}</span> food --<br>However, you had to leave ${excessFood} behind because you reached your maximum of ${maxFood} food.`);
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

function displayResult(message) {
  const ResultContainer = document.getElementById('Result');
  clearTimeout(ResultTimeout); // Clear any existing timeouts

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
  resultTimeout = setTimeout(() => {
    resultContainer.innerHTML = '';
  }, 10000); // Display for 10 seconds
}




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
  lastEnergyUpdate = new Date().getTime();
  clearInterval(timerInterval); // Stop the timer interval
  updateResources();
  startTimer();
}

// Regenerate energy every minute
setTimeout(regenerateEnergy, 60 * 1000); // Initial energy regeneration after 1 minute

// Initial update of resources display
updateResources();

// Start the timer
startTimer();

// Event listener for the New Game button
document.getElementById('newGameButton').addEventListener('click', resetGame);
