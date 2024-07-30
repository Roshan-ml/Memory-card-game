const container = document.querySelector(".container");
const resetButton = document.getElementById("resetbutton");
const winModal = document.getElementById("winModal");
const closeModal = document.querySelector(".close");
const playAgainButton = document.getElementById("playAgain");

const images = ["Images/mario.png", "Images/gta.png", "Images/pubg.png", "Images/amongus.png", "Images/pikachu.png", "Images/rock-paper-scissors.png", "Images/tic-tac-toe.png", "Images/ghost.png"];
const picker = [...images, ...images];
const imageCount = picker.length;

let revealedCount = 0;
let activeTile = null;
let awaitingEndOfMove = false;

function buildTile(image) {
    const element = document.createElement("div");
    element.classList.add("cards");
    element.setAttribute("data-image", image);

    const img = document.createElement("img");
    img.src = image;
    img.style.display = 'none';
    element.appendChild(img);

    element.addEventListener("click", () => {
        if (awaitingEndOfMove || img.style.display === 'block') {
            return;
        }

        img.style.display = 'block';

        if (!activeTile) {
            activeTile = element;
            return;
        }

        awaitingEndOfMove = true;

        setTimeout(() => {
            if (activeTile && activeTile !== element) {
                const currentImg = element.querySelector('img');
                const activeImg = activeTile.querySelector('img');

                if (activeTile.getAttribute("data-image") !== element.getAttribute("data-image")) {
                    activeImg.style.display = 'none';
                    currentImg.style.display = 'none';
                } else {
                    revealedCount += 2;
                }

                if (revealedCount === imageCount) {
                    winModal.style.display = "flex";
                }
                activeTile = null;
            }
            awaitingEndOfMove = false;
        }, 1000);
    });

    return element;
}

function setupGame() {
    container.innerHTML = '';
    revealedCount = 0;

    
    for (let i = picker.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [picker[i], picker[j]] = [picker[j], picker[i]];
    }
    for (let i = 0; i < picker.length; i++) {
        const image = picker[i];
        const card = buildTile(image);
        container.appendChild(card);
    }
}

setupGame();

resetButton.addEventListener("click", setupGame);

closeModal.addEventListener("click", () => {
    winModal.style.display = "none";
});

playAgainButton.addEventListener("click", () => {
    setupGame();
    winModal.style.display = "none";
});


