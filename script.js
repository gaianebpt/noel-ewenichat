
// =================================
// CHRISTMAS QUEST
// FONCTIONNEMENT DU JEU
// =================================


// RECUPERATION DES ELEMENTS HTML

const startButton = document.getElementById("startButton");
const welcomeScreen = document.querySelector(".welcome-screen");
const giftSelection = document.getElementById("giftSelection");
const giftReveal = document.getElementById("giftReveal");
const giftDecision = document.getElementById("giftDecision");
const finalChoice = document.getElementById("finalChoice");

const giftCards = document.querySelectorAll(".gift-card");
const finalGiftCards = document.querySelectorAll(".decision-card");

const keepGiftButton = document.getElementById("keepGiftButton");
const discoverOtherButton = document.getElementById("discoverOtherButton");
const continueButton = document.getElementById("continueButton");

const progressText = document.getElementById("progressText");
const progressFill = document.querySelector(".progress-fill");


// ELEMENTS DE LA PAGE DE REVELATION

const giftNumber = document.getElementById("giftNumber");
const revealImage = document.getElementById("revealImage");
const revealGiftName = document.getElementById("revealGiftName");
const revealDescription = document.getElementById("revealDescription");

const voucherNumber = document.getElementById("voucherNumber");
const voucherOffer = document.getElementById("voucherOffer");
const voucherLocation = document.getElementById("voucherLocation");
const voucherDate = document.getElementById("voucherDate");


// DONNEES DES CADEAUX

const gifts = {
    1: {
        image: "🤿",
        name: "UNE SORTIE PLONGÉE !",
        description: "Une sortie en mer entièrement offerte par ta personne préférée.",
        number: "01",
        offer: "Une sortie de plongée en mer",
        location: "À définir ensemble",
        date: "Selon tes disponibilités"
    },
    2: {
        image: "👕",
        name: "UN T-SHIRT SURPRISE !",
        description: "Un T-shirt spécialement choisi et préparé pour toi. Mais chut... le contenu reste secret !",
        number: "02",
        offer: "Un T-shirt surprise",
        location: "Une surprise à découvrir",
        date: "À recevoir bientôt"
    }
};


// VARIABLES POUR SUIVRE LE PARCOURS

let firstGift = null;
let currentGift = null;
let discoveredBoth = false;


// AFFICHER LA PROGRESSION

function updateProgress(value) {
    progressText.textContent = value + " %";
    progressFill.style.width = value + "%";
}


// AFFICHER UN CADEAU

function showGift(giftNumberSelected) {
    const gift = gifts[giftNumberSelected];

    currentGift = giftNumberSelected;

    giftNumber.textContent = gift.number;
    revealImage.textContent = gift.image;
    revealGiftName.textContent = gift.name;
    revealDescription.textContent = gift.description;

    voucherNumber.textContent = "00" + giftNumberSelected;
    voucherOffer.textContent = gift.offer;
    voucherLocation.textContent = gift.location;
    voucherDate.textContent = gift.date;

    giftSelection.classList.add("hidden");
    giftDecision.classList.add("hidden");
    finalChoice.classList.add("hidden");
    giftReveal.classList.remove("hidden");

    updateProgress(discoveredBoth ? 80 : 60);
}


// BOUTON COMMENCER

startButton.addEventListener("click", function() {
    welcomeScreen.classList.add("hidden");
    giftSelection.classList.remove("hidden");

    updateProgress(20);
});


// PREMIER CHOIX

giftCards.forEach(function(card) {
    card.addEventListener("click", function() {
        firstGift = Number(card.dataset.gift);
        showGift(firstGift);
    });
});


// BOUTON CONTINUER APRES UNE REVELATION

continueButton.addEventListener("click", function() {
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

keepGiftButton.addEventListener("click", function() {
    showConfirmation(firstGift);
});


// DECOUVRIR L'AUTRE CADEAU

discoverOtherButton.addEventListener("click", function() {
    discoveredBoth = true;

    const otherGift = firstGift === 1 ? 2 : 1;

    showGift(otherGift);
});


// CHOIX DEFINITIF APRES AVOIR DECOUVERT LES DEUX CADEAUX

finalGiftCards.forEach(function(card) {
    card.addEventListener("click", function() {
        const selectedGift = Number(card.dataset.finalGift);
        showConfirmation(selectedGift);
    });
});


// CONFIRMATION DU CADEAU FINAL

function showConfirmation(selectedGift) {
    const gift = gifts[selectedGift];

    finalChoice.innerHTML = `
        <p class="system-message">> QUEST COMPLETED...</p>

        <h2>TON CHOIX EST FAIT !</h2>

        <div class="decision-icon">${gift.image}</div>

        <h3>${gift.name}</h3>

        <p class="decision-text">
            Ce cadeau est officiellement à toi !
        </p>

        <p class="decision-warning">
            ♥ JOYEUX NOËL EWEN ♥
        </p>
    `;

    giftReveal.classList.add("hidden");
    giftDecision.classList.add("hidden");
    giftSelection.classList.add("hidden");
    finalChoice.classList.remove("hidden");

    updateProgress(100);
        createStarRain();
}

    
// =================================
// PLUIE D'ETOILES
// =================================

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

    setTimeout(function() {
        container.remove();
    }, 10000);
}


    