let energy = 3;
let wood = 0;
let stone = 0;
let food = 0;

function updateResources() {
    document.getElementById('wood').textContent = `Wood: ${wood}`;
    document.getElementById('stone').textContent = `Stone: ${stone}`;
    document.getElementById('food').textContent = `Food: ${food}`;
    document.getElementById('energy').textContent = `Energy: ${energy}`;
}

function chopWood() {
    if (energy > 0) {
        energy--;
        wood++;
        updateResources();
    } else {
        alert("You don't have enough energy!");
    }
}

function gatherStone() {
    if (energy > 0) {
        energy--;
        stone++;
        updateResources();
    } else {
        alert("You don't have enough energy!");
    }
}

function forageFood() {
    if (energy > 0) {
        energy--;
        food++;
        updateResources();
    } else {
        alert("You don't have enough energy!");
    }
}
