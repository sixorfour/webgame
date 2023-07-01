let energy = 3;
let maxEnergy = 10;
let wood = 0;
let stone = 0;
let food = 0;
let lastEnergyUpdate = new Date().getTime();
let resultTimeout;
let timerInterval;

function updateResources() {
  document.getElementById('wood').textContent = `Wood: ${wood}`;
  document.getElementById('stone').textContent = `Stone: ${stone}`;
  document.getElementById('food').textContent = `Food: ${food}`;
  document.getElementById('energy').textContent = `Energy: ${energy} / ${maxEnergy}`;
}

function chopWood() {
  if (energy > 0) {
    energy--;
    const amount = getRandomAmount();
    wood += amount;
    updateResources();
    displayResult(`Chopped ${amount} wood.`);
  } else {
    displayEnergyMessage();
  }
}

function gatherStone() {
  if (energy > 0) {
    energy--;
    const amount = getRandomAmount();
    stone += amount;
    updateResources();
    displayResult(`Gathered ${amount} stone.`);
  } else {
    displayEnergyMessage();
  }
}

function forageFood() {
  if (energy > 0) {
    energy--;
    const amount = getRandomAmount();
    food += amount;
    updateResources();
    displayResult(`Foraged ${amount} food.`);
  } else {
    displayEnergyMessage();
  }
}

function getRandomAmount() {
  return Math.floor(Math.random() * 50) + 1;
}

function displayResult(message) {
  const resultContainer = document.getElementById('result');
  clearTimeout(resultTimeout); // Clear any existing timeouts
  resultContainer.textContent = message;
  resultTimeout = setTimeout(() => {
    resultContainer.textContent = '';
  }, 3000); // Display for 3 seconds
}

function displayEnergyMessage() {
  const currentTime = new Date().getTime();
  const elapsedSeconds = Math.floor((currentTime - lastEnergyUpdate) / 1000);
  const remainingSeconds = 60 - (elapsedSeconds % 60);
  const remainingTime = new Date(remainingSeconds * 1000).toISOString().substr(14, 5);

  const message = `You don't have enough energy! Come back in ${remainingTime} for more energy.`;
  alert(message);
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
