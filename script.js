let energy = 3;
let wood = 0;
let stone = 0;
let food = 0;
let lastEnergyUpdate = new Date().getTime();
let resultTimeout;

function updateResources() {
    document.getElementById('wood').textContent = `Wood: ${wood}`;
    document.getElementById('stone').textContent = `Stone: ${stone}`;
    document.getElementById('food').textContent = `Food: ${food}`;
    document.getElementById('energy').textContent = `Energy: ${energy}`;
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
    const elapsedSeconds = Math.floor((currentTime - lastEnergyUpdate) / 1000);
    const energyToRegenerate = Math.floor(elapsedSeconds / 60);

    if (energyToRegenerate > 0) {
        energy = Math.min(10, energy + energyToRegenerate);
        lastEnergyUpdate = currentTime;
        updateResources();
    }
}

function resetGame() {
    energy = 3;
    wood = 0;
    stone = 0;
    food = 0;
    lastEnergyUpdate = new Date().getTime();
    updateResources();
}

// Regenerate energy every minute
setInterval(regenerateEnergy, 60000); // 60,000 milliseconds = 1 minute

// Initial update of resources display
updateResources();

// Event listener for the New Game button
document.getElementById('newGameButton').addEventListener('click', resetGame);
