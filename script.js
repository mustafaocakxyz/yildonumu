// Data
const restaurants = [
    { name: "Çakı Restoran", type: "Malatya mutfağı", url: "https://www.google.com/maps/search/?api=1&query=Çakı+Restoran+41.12269,28.77577" },
    { name: "Sushi-Şah", type: "Suşi", url: "https://www.google.com/maps/search/?api=1&query=Sushi-Şah+41.11906,28.76686" },
    { name: "Beit Beyrut", type: "Lübnan mutfağı", url: "https://www.google.com/maps/search/?api=1&query=Beit+Beyrut+41.11911,28.77141" },
    { name: "Tepsihan", type: "Urfa mutfağı", url: "https://www.google.com/maps/search/?api=1&query=Tepsihan+41.11867,28.76832" },
    { name: "Sofrtna Restaurant", type: "Arap mutfağı", url: "https://www.google.com/maps/search/?api=1&query=Sofrtna+Restaurant+41.12250,28.77071" },
    { name: "Al Jamra", type: "Suudi mutfağı", url: "https://www.google.com/maps/search/?api=1&query=ALJAMRA+41.11808,28.77155" },
    { name: "Bukhari Lezzetleri", type: "Buhara mutfağı", url: "https://www.google.com/maps/search/?api=1&query=Bukhari+Lezzetleri+41.12260,28.77029" },
    { name: "Tarihi Sultan Bahti Köftecisi", type: "Köfte", url: "https://www.google.com/maps/search/?api=1&query=Tarihi+Sultan+Bahti+Köftecisi+41.12311,28.77895" },
    { name: "Birecikli Kebap", type: "Kebap", url: "https://www.google.com/maps/search/?api=1&query=Birecikli+Kebap+Kayaşehir+41.12475,28.77093" },
    { name: "SAJ Pide & Falafel", type: "Pide & falafel", url: "https://www.google.com/maps/search/?api=1&query=SAJ+Pide+Falafel+41.11911,28.77148" },
    { name: "Bharat Restaurant", type: "Hint mutfağı", url: "https://www.google.com/maps/search/?api=1&query=Bharat+Restaurant+41.120759,28.781931" },
    { name: "Kroren Kayaşehir", type: "Uygur mutfağı", url: "https://www.google.com/maps/search/?api=1&query=Kroren+Kayaşehir+Kayabaşı+Akzambak+Sokak+No:+2+I" }
];

const desserts = [
    { name: "Hamdizade", type: "Dondurma & künefe", url: "https://www.google.com/maps/search/?api=1&query=Hamdizade+Kayaşehir+41.12285,28.77612" },
    { name: "Antephan Künefe", type: "Künefe & baklava", url: "https://www.google.com/maps/search/?api=1&query=Antephan+Künefe+Kayaşehir+41.12288,28.77622" },
    { name: "Paşabahçe Çikolatacısı", type: "Çikolata & pastane", url: "https://www.google.com/maps/search/?api=1&query=Paşabahçe+Çikolatacısı+Başakşehir+41.12228,28.77980" },
    { name: "Noi Crea", type: "Pasta & tatlı", url: "https://www.google.com/maps/search/?api=1&query=Noi+Crea+41.12236,28.77970" },
    { name: "Choco Zuma", type: "Çikolatalı tatlılar", url: "https://www.google.com/maps/search/?api=1&query=Choco+Zuma+Kayaşehir+41.12484,28.76965" },
    { name: "Varina Chocolate", type: "Çikolatalı tatlılar", url: "https://www.google.com/maps/search/?api=1&query=Varina+Chocolate+41.11784,28.77449" },
    { name: "Piko Patisserie", type: "Pastane & kafe", url: "https://www.google.com/maps/search/?api=1&query=Piko+Patisserie+41.12004,28.77405" },
    { name: "Abu Saleh", type: "Dondurma & meyve suyu", url: "https://www.google.com/maps/search/?api=1&query=Abu+Saleh+41.11884,28.77246" }
];

// State
let state = loadState();

function getDefaultState() {
    return {
        introSeen: false,
        restaurant: {
            order: shuffleArray([...Array(restaurants.length).keys()]),
            revealed: [],
            chosen: null
        },
        dessert: {
            order: shuffleArray([...Array(desserts.length).keys()]),
            revealed: [],
            chosen: null
        }
    };
}

function loadState() {
    try {
        const saved = localStorage.getItem('yildonumu-state');
        if (saved) {
            return JSON.parse(saved);
        }
    } catch (e) {
        console.error('Failed to load state:', e);
    }
    return getDefaultState();
}

function saveState() {
    try {
        localStorage.setItem('yildonumu-state', JSON.stringify(state));
    } catch (e) {
        console.error('Failed to save state:', e);
    }
}

function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// DOM Elements
const introScreen = document.getElementById('intro-screen');
const menuScreen = document.getElementById('menu-screen');
const cardScreen = document.getElementById('card-screen');
const heartsContainer = document.getElementById('hearts-container');
const heartIcon = document.querySelector('.heart-icon');

const restaurantBtn = document.getElementById('restaurant-btn');
const dessertBtn = document.getElementById('dessert-btn');
const resetBtn = document.getElementById('reset-btn');
const backBtn = document.getElementById('back-btn');
const revealAllBtn = document.getElementById('reveal-all-btn');

const cardTitle = document.getElementById('card-title');
const cardSubtitle = document.getElementById('card-subtitle');
const cardsGrid = document.getElementById('cards-grid');
const chosenResult = document.getElementById('chosen-result');
const chosenName = document.getElementById('chosen-name');
const chosenType = document.getElementById('chosen-type');
const mapsLink = document.getElementById('maps-link');
const confettiContainer = document.getElementById('confetti-container');

const restaurantSelection = document.getElementById('restaurant-selection');
const dessertSelection = document.getElementById('dessert-selection');

let currentCategory = null;

// Floating Hearts Animation
function createFloatingHearts() {
    const hearts = ['💕', '💗', '💖', '💓', '❤️', '💘', '💝'];
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 6 + 's';
        heart.style.animationDuration = (5 + Math.random() * 3) + 's';
        heart.style.fontSize = (1 + Math.random() * 1.5) + 'rem';
        heartsContainer.appendChild(heart);
    }
}

// Confetti Animation
function createConfetti() {
    confettiContainer.innerHTML = '';
    const emojis = ['💕', '💖', '✨', '🎉', '💗', '🌟'];
    for (let i = 0; i < 15; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        confettiContainer.appendChild(confetti);
    }
}

// Screen Navigation
function showScreen(screen) {
    document.querySelectorAll('.screen').forEach(s => {
        s.classList.remove('active');
    });
    screen.classList.add('active');
}

// Update Menu Selections Display
function updateMenuSelections() {
    if (state.restaurant.chosen !== null) {
        const idx = state.restaurant.chosen;
        restaurantSelection.textContent = `✓ ${restaurants[idx].name}`;
    } else {
        restaurantSelection.textContent = '';
    }
    
    if (state.dessert.chosen !== null) {
        const idx = state.dessert.chosen;
        dessertSelection.textContent = `✓ ${desserts[idx].name}`;
    } else {
        dessertSelection.textContent = '';
    }
}

// Build Cards
function buildCards(category) {
    const data = category === 'restaurant' ? restaurants : desserts;
    const catState = state[category];
    
    cardsGrid.innerHTML = '';
    
    catState.order.forEach((dataIndex, cardIndex) => {
        const item = data[dataIndex];
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.cardIndex = cardIndex;
        card.dataset.dataIndex = dataIndex;
        
        if (catState.revealed.includes(cardIndex)) {
            card.classList.add('flipped');
        }
        if (catState.chosen === dataIndex) {
            card.classList.add('chosen', 'flipped');
        }
        
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front"></div>
                <div class="card-back">
                    <div class="card-back-name">${item.name}</div>
                    <div class="card-back-type">${item.type}</div>
                </div>
            </div>
        `;
        
        card.addEventListener('click', () => handleCardClick(card, category));
        cardsGrid.appendChild(card);
    });
    
    // Update reveal all button
    const allRevealed = catState.revealed.length === data.length;
    revealAllBtn.classList.toggle('hidden', allRevealed);
    
    // Show chosen result if exists
    updateChosenResult(category);
}

function handleCardClick(card, category) {
    const cardIndex = parseInt(card.dataset.cardIndex);
    const dataIndex = parseInt(card.dataset.dataIndex);
    const catState = state[category];
    const data = category === 'restaurant' ? restaurants : desserts;
    
    // If already flipped, do nothing special
    if (card.classList.contains('flipped')) {
        return;
    }
    
    // Flip the card
    card.classList.add('flipped');
    
    // Track revealed
    if (!catState.revealed.includes(cardIndex)) {
        catState.revealed.push(cardIndex);
    }
    
    // If no choice made yet, this is THE choice
    if (catState.chosen === null) {
        catState.chosen = dataIndex;
        card.classList.add('chosen');
        
        // Show result
        chosenName.textContent = data[dataIndex].name;
        chosenType.textContent = data[dataIndex].type;
        mapsLink.href = data[dataIndex].url;
        chosenResult.classList.add('visible');
        cardSubtitle.textContent = 'Seçimin yapıldı!';
        
        // Confetti
        createConfetti();
    }
    
    // Update reveal all button
    const allRevealed = catState.revealed.length === data.length;
    revealAllBtn.classList.toggle('hidden', allRevealed);
    
    saveState();
    updateMenuSelections();
}

function updateChosenResult(category) {
    const catState = state[category];
    const data = category === 'restaurant' ? restaurants : desserts;
    
    if (catState.chosen !== null) {
        const item = data[catState.chosen];
        chosenName.textContent = item.name;
        chosenType.textContent = item.type;
        mapsLink.href = item.url;
        chosenResult.classList.add('visible');
        cardSubtitle.textContent = 'Seçimin yapıldı!';
    } else {
        chosenResult.classList.remove('visible');
        cardSubtitle.textContent = 'Bir kart seç';
    }
}

function revealAll(category) {
    const catState = state[category];
    const data = category === 'restaurant' ? restaurants : desserts;
    
    document.querySelectorAll('.card').forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('flipped');
            const cardIndex = parseInt(card.dataset.cardIndex);
            if (!catState.revealed.includes(cardIndex)) {
                catState.revealed.push(cardIndex);
            }
        }, index * 100);
    });
    
    revealAllBtn.classList.add('hidden');
    saveState();
}

function openCardScreen(category) {
    currentCategory = category;
    
    if (category === 'restaurant') {
        cardTitle.textContent = 'Restoran Seçimi';
    } else {
        cardTitle.textContent = 'Tatlı Mekanı Seçimi';
    }
    
    buildCards(category);
    showScreen(cardScreen);
}

function resetAll() {
    if (confirm('Tüm seçimler sıfırlansın mı?')) {
        state = getDefaultState();
        state.introSeen = true; // Keep intro seen
        saveState();
        updateMenuSelections();
        showScreen(menuScreen);
    }
}

// Event Listeners
introScreen.addEventListener('click', () => {
    state.introSeen = true;
    saveState();
    showScreen(menuScreen);
});

restaurantBtn.addEventListener('click', () => openCardScreen('restaurant'));
dessertBtn.addEventListener('click', () => openCardScreen('dessert'));
resetBtn.addEventListener('click', resetAll);

backBtn.addEventListener('click', () => {
    showScreen(menuScreen);
    currentCategory = null;
});

revealAllBtn.addEventListener('click', () => {
    if (currentCategory) {
        revealAll(currentCategory);
    }
});

// Initialize
function init() {
    createFloatingHearts();
    updateMenuSelections();
    
    // Show heart icon after animation
    setTimeout(() => {
        heartIcon.classList.add('visible');
    }, 1800);
    
    // If intro already seen, go to menu
    if (state.introSeen) {
        showScreen(menuScreen);
    } else {
        showScreen(introScreen);
    }
}

init();
