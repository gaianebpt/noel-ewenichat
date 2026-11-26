// =================================
// CHRISTMAS QUEST - FONCTIONNEMENT DU JEU
// =================================


// ELEMENTS HTML

const startButton = document.getElementById("startButton");
const welcomeScreen = document.querySelector(".welcome-screen");
const giftSelection = document.getElementById("giftSelection");
const giftReveal = document.getElementById("giftReveal");
const giftDecision = document.getElementById("giftDecision");
const finalChoice = document.getElementById("finalChoice");

const giftCards = document.querySelectorAll(".gift-card");
const finalGiftCards = document.querySelectorAll("[data-final-gift]");

const keepGiftButton = document.getElementById("keepGiftButton");
const discoverOtherButton = document.getElementById("discoverOtherButton");
const continueButton = document.getElementById("continueButton");

const progressText = document.getElementById("progressText");
const progressFill = document.querySelector(".progress-fill");

const giftNumber = document.getElementById("giftNumber");
const revealImage = document.getElementById("revealImage");
const revealGiftName = document.getElementById("revealGiftName");
const revealDescription = document.getElementById("revealDescription");


// DONNEES DES CADEAUX

const gifts = {
    1: {
        number: "01",
        image: "🤿",
        name: "UNE SORTIE PLONGÉE !",
        description: "Je t'offre une sortie de plongée en mer, pour faire le petit poisson. Tu me diras la date et le lieu qui t'arrange et je me charge de faire chauffer la carte bleue."
    },
    2: {
        number: "02",
        image: "👕",
        name: "UN SUPER T-SHIRT !",
        description: "Tu auras droit à un T-shirt spécialement choisi et préparé pour toi hehehehehe"
    }
};


// SUIVI DU PARCOURS

let firstGift = null;
let discoveredBoth = false;


// PROGRESSION

function updateProgress(value) {
    progressText.textContent = value + " %";
    progressFill.style.width = value + "%";
}


// AFFICHER UN CADEAU

function showGift(giftNumberSelected) {
    const gift = gifts[giftNumberSelected];

    giftNumber.textContent = gift.number;
    revealImage.textContent = gift.image;
    revealGiftName.textContent = gift.name;
    revealDescription.textContent = gift.description;

    giftSelection.classList.add("hidden");
    giftDecision.classList.add("hidden");
    finalChoice.classList.add("hidden");
    giftReveal.classList.remove("hidden");

    updateProgress(discoveredBoth ? 80 : 60);
}


// BOUTON COMMENCER

startButton.addEventListener("click", function () {
    welcomeScreen.classList.add("hidden");
    giftSelection.classList.remove("hidden");
    updateProgress(20);
});


// PREMIER CHOIX

giftCards.forEach(function (card) {
    card.addEventListener("click", function () {
        firstGift = Number(card.dataset.gift);
        showGift(firstGift);
    });
});


// BOUTON CONTINUER APRES UNE REVELATION

continueButton.addEventListener("click", function () {
    giftReveal.classList.add("hidden");

    if (discoveredBoth) {
        finalChoice.classList.remove("hidden");
        updateProgress(90);
    } else {
        giftDecision.classList.remove("hidden");
        updateProgress(70);
    }
});


// GARDER LE PREMIER CADEAU

keepGiftButton.addEventListener("click", function () {
    showConfirmation(firstGift);
});


// DECOUVRIR L'AUTRE CADEAU

discoverOtherButton.addEventListener("click", function () {
    discoveredBoth = true;
    showGift(firstGift === 1 ? 2 : 1);
});


// CHOIX DEFINITIF APRES AVOIR DECOUVERT LES DEUX CADEAUX

finalGiftCards.forEach(function (card) {
    card.addEventListener("click", function () {
        showConfirmation(Number(card.dataset.finalGift));
    });
});


// ECRAN DE FIN

function showConfirmation(selectedGift) {
    const gift = gifts[selectedGift];

    finalChoice.classList.add("reward");
    finalChoice.innerHTML = `
        <p class="system-message">&gt; MISSION ACCOMPLIE</p>

        <h2>BRAVO GROS CHAT</h2>

        <div class="decision-icon">${gift.image}</div>

        <h3>${gift.name}</h3>

        <p class="decision-text">
            Voici ton cadeau miam miam j'espère que tu es content
        </p>

        <p class="decision-warning">
            <3 JOYEUX NOËL EWINICHAT <3
        </p>
    `;

    giftReveal.classList.add("hidden");
    giftDecision.classList.add("hidden");
    giftSelection.classList.add("hidden");
    finalChoice.classList.remove("hidden");

    updateProgress(100);
    createStarRain();
}


// PLUIE D'ETOILES

function createStarRain() {
    const container = document.createElement("div");
    container.classList.add("celebration-stars");
    document.body.appendChild(container);

    for (let i = 0; i < 60; i++) {
        const star = document.createElement("span");
        star.classList.add("falling-star");
        star.textContent = "★";
        star.style.left = Math.random() * 100 + "%";
        star.style.fontSize = (12 + Math.random() * 22) + "px";
        star.style.animationDuration = (3 + Math.random() * 4) + "s";
        star.style.animationDelay = Math.random() * 3 + "s";
        container.appendChild(star);
    }

    setTimeout(function () {
        container.remove();
    }, 11000);
}