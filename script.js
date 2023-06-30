let energy = 3;
let wood = 0;
let stone = 0;
let food = 0;
let lastEnergyUpdate = new Date().getTime();

function updateResources() {
    document.getElementById('wood').textContent = `Wood: ${wood}`;
    document.getElementById('stone').textContent = `Stone: ${stone}`;
    document.getElementById('food').textContent = `Food: ${food}`;
    document.getElementById('energy').textContent = `Energy: ${energy}`;
}

function chopWood() {
    if (energy > 0) {
        energy--;
        wood += getRandomAmount();
        updateResources();
        displayResult(`Chopped ${getRandomAmount()} wood.`);
    } else {
        displayEnergyMessage();
    }
}

function gatherStone() {
    if (energy > 0) {
        energy--;
        stone += getRandomAmount();
        updateResources();
        displayResult(`Gathered ${getRandomAmount()} stone.`);
    } else {
        displayEnergyMessage();
    }
}

function forageFood() {
    if (energy > 0) {
        energy--;
        food += getRandomAmount();
        updateResources();
        displayResult(`Foraged ${getRandomAmount()} food.`);
    } else {
        displayEnergyMessage();
    }
}

function getRandomAmount() {
    return Math.floor(Math.random() * 50) + 1;
}

function displayResult(message) {
    const resultContainer = document.getElementById('result');
    resultContainer.textContent = message;
    setTimeout(() => {
        resultContainer.textContent = '';
    }, 2000);
}

function displayEnergyMessage() {
    const currentTime = new Date().getTime();
    const elapsedSeconds = Math.floor((currentTime - lastEnergyUpdate) / 1000);
    const remainingSeconds = 24 * 60 * 60 - elapsedSeconds;
    const remainingTime = new Date(remainingSeconds * 1000).toISOString().substr(11, 8);

    const message = `You don't have enough energy! Come back in ${remainingTime} for more energy.`;
    alert(message);
}

function regenerateEnergy() {
    const currentTime = new Date().getTime();
    const elapsedSeconds = Math.floor((currentTime - lastEnergyUpdate) / 1000);
    const energyToRegenerate = Math.floor(elapsedSeconds / (24 * 60 * 60));

    if (energyToRegenerate > 0) {
        energy = Math.min(3, energy + energyToRegenerate);
        lastEnergyUpdate = currentTime;
        updateResources();
    }
}

// Regenerate energy every second
setInterval(regenerateEnergy, 1000);

// Initial update of resources display
updateResources();
