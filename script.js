const icons = [
    '🍎', '🍎',
    '🍌', '🍌',
    '🍇', '🍇',
    '🍉', '🍉',
    '🍒', '🍒',
    '🍑', '🍑',
    '🍍', '🍍',
    '🥝', '🥝'
];

let flippedCards = [];
let matchedCards = [];

document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    startGame(gameBoard);

    document.getElementById('restartButton').addEventListener('click', () => {
        startGame(gameBoard);
    });
});

function startGame(gameBoard) {
    gameBoard.innerHTML = '';
    flippedCards = [];
    matchedCards = [];
    const shuffledIcons = shuffleArray(icons);

    shuffledIcons.forEach(icon => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.icon = icon;
        card.innerHTML = `<span class="icon">${icon}</span>`;
        card.addEventListener('click', () => flipCard(card));
        gameBoard.appendChild(card);
    });
}

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

function flipCard(card) {
    if (flippedCards.length < 2 && !card.classList.contains('flipped') && !card.classList.contains('matched')) {
        card.classList.add('flipped');
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            checkForMatch();
        }
    }
}

function checkForMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.icon === card2.dataset.icon) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCards.push(card1, card2);
        flippedCards = [];

        if (matchedCards.length === icons.length) {
            setTimeout(() => alert('Parabéns! Você encontrou todos os pares!'), 500);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}
