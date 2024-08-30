let sticks = 16;
let currentPlayer = 1;

function updateTurn() {
    const turnText = document.getElementById('turn-text');
    turnText.textContent = `Player ${currentPlayer}'s turn`;
}

function drawSticks() {
    const sticksContainer = document.getElementById('sticks-container');
    sticksContainer.innerHTML = '';

    for (let i = 0; i < sticks; i++) {
        const stick = document.createElement('div');
        stick.classList.add('stick');
        sticksContainer.appendChild(stick);
    }
}

function pickSticks(num) {
    if (num < 1 || num > 3 || num > sticks) {
        alert('Invalid move. Please pick 1, 2, or 3 sticks.');
        return;
    }

    for (let i = 0; i < num; i++) {
        const stick = document.querySelector('#sticks-container .stick:not(.taken)');
        if (stick) {
            stick.classList.add('taken');
        }
    }

    sticks -= num;

    if (sticks === 0) {
        const winnerText = document.getElementById('winner-text');
        winnerText.classList.remove('hidden');

        const winnerName = document.getElementById('winner-name');
        winnerName.textContent = Player ${(currentPlayer+1)%2};
        const winnerMessage = document.getElementById('winner-message');
        winnerMessage.textContent = 'Wins!';

        // Disable pick buttons after game ends
        document.querySelectorAll('#buttons-container button').forEach(button => button.disabled = true);
        document.getElementById('restart-btn').disabled = false;
    } else {
        currentPlayer = 3 - currentPlayer; // Switch player
        updateTurn();
    }
}

function restartGame() {
    // Enable pick buttons
    document.querySelectorAll('.stick').forEach(stick => stick.classList.remove('taken'));

    const winnerText = document.getElementById('winner-text');
    winnerText.classList.add('hidden');

    document.querySelectorAll('#buttons-container button').forEach(button => button.disabled = false);
    document.getElementById('restart-btn').disabled = true;

    sticks = 16;
    currentPlayer = 1;
    drawSticks();
    updateTurn();
}

updateTurn();
drawSticks();

