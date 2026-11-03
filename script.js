function createFallingHearts() {
    const container = document.getElementById('hearts-bg');
    if (!container) return;

    const hearts = ['💖', '💗', '💕', '❤️', '🌸', '✨'];

    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('falling-heart');
        
        // Random heart emoji, position, size, and speed
        heart.innerText = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = Math.random() * 12 + 10 + 'px';
        heart.style.animationDuration = Math.random() * 3 + 3 + 's'; // 3s to 6s speed

        container.appendChild(heart);

        // Cleanup after animation completes
        setTimeout(() => {
            heart.remove();
        }, 6000);
    }, 400); // Har 400ms me naya heart girega
}

// Automatically start hearts on page load
document.addEventListener('DOMContentLoaded', createFallingHearts);

// Screen 1 se Screen 2 par jane ke liye
function nextScreen() {
    document.getElementById('screen-1').style.display = 'none';
    document.getElementById('screen-2').style.display = 'block';
}

// No button click karne par Not an Option screen par jane ke liye
function noscreen() {
    document.getElementById('screen-2').style.display = 'none';
    document.getElementById('screen-3').style.display = 'block';
}

// Countdown start karne aur 3, 2, 1 chalane ke liye
function startCountdown() {
    document.getElementById('screen-2').style.display = 'none';
    document.getElementById('screen-3').style.display = 'none';
    
    const countdownScreen = document.getElementById('screen-countdown');
    countdownScreen.style.display = 'block';

    let count = 3;
    const numberElement = document.getElementById('countdown-number');
    const titleElement = document.getElementById('countdown-title');
    
    triggerPopEffect(numberElement, count);
    triggerPopEffect(titleElement, "Get ready...");

    let timer = setInterval(function() {
        count--;
        if (count > 0) {
            triggerPopEffect(numberElement, count);
        } else {
            clearInterval(timer);
            countdownScreen.style.display = 'none';
            // Countdown khatam hone ke baad Word Animation start ho jaye gi
            startWordAnimation();
        }
    }, 1000);
}

// HAPPY -> BIRTHDAY -> LOVE ❤️ sequence chalane ke liye
function startWordAnimation() {
    const wordScreen = document.getElementById('screen-word-animation');
    wordScreen.style.display = 'block';

    const textElement = document.getElementById('animated-text');
    const words = ["HAPPY", "BIRTHDAY", "LOVE ❤️"];
    let index = 0;

    textElement.textContent = words[index];
    triggerPopEffect(textElement, words[index]);

    let wordTimer = setInterval(function() {
        index++;
        if (index < words.length) {
            textElement.textContent = words[index];
            triggerPopEffect(textElement, words[index]);
        } else {
            clearInterval(wordTimer);
            wordScreen.style.display = 'none';
            
            // Aakhri screen show ho jaye gi
            document.getElementById('screen-next').style.display = 'block';
        }
    }, 1500); // Har 1.5 second baad agla word aayega
}

// Text ya number par pop-up zoom effect dene ke liye helper function
function triggerPopEffect(element, val) {
    if(typeof val !== 'object') {
        element.textContent = val;
    }
    element.classList.add('pop');
    
    setTimeout(() => {
        element.classList.remove('pop');
    }, 250);
}

function puzzlescreen(){
    document.getElementById('screen-next').style.display='none';
    document.getElementById('puzzle-screen').style.display='block';
}

let isScratching = false;

function initScratchCard() {
    const canvas = document.getElementById('scratch-canvas');
    
    document.getElementById('puzzle-screen').style.display='none';
    
    document.getElementById('screen-scratch').style.display='block';
    const ctx = canvas.getContext('2d');

    // Fill overlay color
    ctx.fillStyle = '#ffb3c1';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Overlay text
    ctx.fillStyle = '#b7094c';
    ctx.font = 'bold 20px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('✨ Scratch here ✨', canvas.width / 2, canvas.height / 2 + 7);

    // Eraser configuration
    ctx.globalCompositeOperation = 'destination-out';

    function scratch(e) {
        if (!isScratching) return;

        const rect = canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        const x = clientX - rect.left;
        const y = clientY - rect.top;

        ctx.beginPath();
        ctx.arc(x, y, 22, 0, Math.PI * 2);
        ctx.fill();

        // Reveal check threshold
        checkScratchPercentage(canvas, ctx);
    }

    // Mouse & Touch events binding
    canvas.addEventListener('mousedown', (e) => { isScratching = true; scratch(e); });
    canvas.addEventListener('mousemove', scratch);
    canvas.addEventListener('mouseup', () => { isScratching = false; });
    canvas.addEventListener('mouseleave', () => { isScratching = false; });

    canvas.addEventListener('touchstart', (e) => { isScratching = true; scratch(e); });
    canvas.addEventListener('touchmove', scratch);
    canvas.addEventListener('touchend', () => { isScratching = false; });
}

function checkScratchPercentage(canvas, ctx) {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparentPixels = 0;

    for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] === 0) {
            transparentPixels++;
        }
    }

    const percentage = (transparentPixels / (pixels.length / 4)) * 100;

    // 40% se zyada scratch hone par Continue button reveal karna
    if (percentage > 40) {
        const nextBtn = document.getElementById('scratch-next-btn');
        if (nextBtn) {
            nextBtn.classList.remove('hidden');
        }
    }
}

// Scratch screen activation helper
function showScratchCardScreen() {
    
    document.getElementById('screen-scratch').style.display='none';
    
    document.getElementById('screen-memories').style.display='block';
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    document.getElementById('screen-scratch').classList.remove('hidden');
    initScratchCard();
}

// Scratch Screen ke baad Memories (Flip Cards) Screen par jane ke liye
function showMemoriesScreen() {
    document.getElementById('screen-scratch').style.display = 'none';
    document.getElementById('screen-memories').style.display = 'block';
}

function nextScreenFromMemories() {
    document.getElementById('screen-memories').style.display = 'none';
    document.getElementById('year-card').style.display = 'block';
}
// Array of romantic cute messages
const balloonMessages = [
    "You're my favorite person 💗",
    "My heart belongs to you 💕",
    "You make me smile every day ✨",
    "I love you endlessly ❤️",
    "You are my whole world 🌍💖",
    "Forever & Always 👩‍❤️‍👨",
    "You're the sweetest gift 🎁✨",
    "My happiest place is with you 🥰",
    "Life is so much better with you 🌸",
    "You are my sunshine on a cloudy day ☀️",
    "Every moment with you is magic 💫",
    "I'm so lucky to have you in my life 🍀",
    "Your smile melts my heart every single time 😍",
    "You're my peace and my adventure 🌊",
    "I love you more than words can say 💌"
];

let messageTimeout = null;

// Call this function to display balloon screen
// Is function ko pichli screen ke Continue button par onclick mein lagana hai
function showBalloonScreen() {
    // Baqi saari screens ko hide kar dein
    document.querySelectorAll('.screen').forEach(s => {
        s.style.display = 'none';
        s.classList.add('hidden');
    });

    // Balloons screen ko show karein
    const balloonScreen = document.getElementById('screen-balloons');
    balloonScreen.classList.remove('hidden');
    balloonScreen.style.display = 'block';

    // Balloons generate karne ka function call hoga
    generateBalloons();
}

let balloonInterval = null;

function generateBalloons() {
    const container = document.getElementById('balloon-container');
    
    // Purane balloons aur interval ko clear karein
    const oldBalloons = container.querySelectorAll('.balloon');
    oldBalloons.forEach(b => b.remove());
    if (balloonInterval) clearInterval(balloonInterval);

    const colors = ['#ff4d6d', '#d90429', '#ff758f', '#ff8fa3', '#c9184a'];

    // Har 2 seconds baad aik balloon generate hoga taake screen par hardly 3-4 hi hon
    balloonInterval = setInterval(() => {
        // Agar screen hide ho chuki hai toh interval rok dein
        const balloonScreen = document.getElementById('screen-balloons');
        if (!balloonScreen || balloonScreen.style.display === 'none' || balloonScreen.classList.contains('hidden')) {
            clearInterval(balloonInterval);
            return;
        }

        const balloon = document.createElement('div');
        balloon.classList.add('balloon');

        const randomX = Math.random() * 80; // 0% to 80% width
        const slowDuration = 7 + Math.random() * 4; // Speed slow (7 se 11 seconds tak ka time)
        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        balloon.style.left = `${randomX}%`;
        balloon.style.backgroundColor = randomColor;
        balloon.style.animationDuration = `${slowDuration}s`;

        // Click karne par pop ho jaye
        balloon.addEventListener('click', function () {
            popBalloon(balloon);
        });

        container.appendChild(balloon);

        // Jab balloon animation complete kar ke upar nikal jaye toh DOM se hata dein
        setTimeout(() => {
            balloon.remove();
        }, slowDuration * 1000);

    }, 2000); // Har 2 seconds mein aik naya balloon aayega
}

function popBalloon(balloon) {
    // Add pop animation effect
    balloon.classList.add('popping');
    setTimeout(() => {
        balloon.remove(); // Remove balloon after pop animation
    }, 150);

    // Pick random message
    const randomMsg = balloonMessages[Math.floor(Math.random() * balloonMessages.length)];
    const msgBox = document.getElementById('pop-message-box');
    const msgText = document.getElementById('pop-message-text');

    msgText.textContent = randomMsg;
    msgBox.classList.remove('hidden');
    msgBox.style.display = 'block';

    // Reset timeout if another balloon is popped quickly
    if (messageTimeout) clearTimeout(messageTimeout);

    // Hide message popup after 2.5 seconds (2-3 seconds)
    messageTimeout = setTimeout(() => {
        msgBox.style.display = 'none';
    }, 2500);
}

function nextScreenFromBalloons() {
    document.getElementById('screen-balloons').style.display = 'none';
    // Yahan apni agli final/end screen show karein
}

const loveLetterText = `My Dearest Love,\n\nHappy Birthday! 💖\nWords will never be enough to express how much you mean to me.\nYou bring so much joy, love, and light into my life every single day.\n\nThank you for being my constant support and my favorite person.\nI wish you all the happiness in the world today and always.\n\nForever Yours ❤️`;

let isLetterOpened = false;

function showEnvelopeScreen() {
    document.querySelectorAll('.screen').forEach(s => {
        s.style.display = 'none';
        s.classList.add('hidden');
    });

    const envScreen = document.getElementById('screen-envelope');
    envScreen.classList.remove('hidden');
    envScreen.style.display = 'block';
}

function openEnvelope() {
    if (isLetterOpened) return;
    isLetterOpened = true;

    const wrapper = document.getElementById('envelope-wrapper');
    wrapper.classList.add('open');

    // Envelope khulne ke 600ms baad letter-by-letter typing start ho
    setTimeout(() => {
        typeLetterCharacters(loveLetterText);
    }, 600);
}

// Letter-by-letter typing with cursor logic
function typeLetterCharacters(text) {
    const container = document.getElementById('letter-text');
    const cursor = document.getElementById('cursor');
    container.innerHTML = '';
    
    let index = 0;
    
    const typingInterval = setInterval(() => {
        if (index < text.length) {
            let char = text.charAt(index);
            
            // Newline (\n) ko HTML ke <br> mein convert karna
            if (char === '\n') {
                container.innerHTML += '<br>';
            } else {
                container.innerHTML += char;
            }
            
            index++;
            
            // Auto scroll down as typing happens
            const letterBox = document.getElementById('letter');
            letterBox.scrollTop = letterBox.scrollHeight;
        } else {
            clearInterval(typingInterval);
            
            // Typing mukammal hone par cursor ko hata dein aur Continue button show karein
            if (cursor) cursor.style.display = 'none';
            document.getElementById('envelope-next-btn').classList.remove('hidden');
        }
    }, 35); // Speed control: 35ms per character (fast & smooth)
}



let blownCandles = {
    1: false,
    2: false,
    3: false
};

function showWishScreen() {
    // Sabhi screens ko hide kar dein
    document.querySelectorAll('.screen').forEach(s => {
        s.style.display = 'none';
        s.classList.add('hidden');
    });

    // Sirf Wish screen ko show karein
    const wishScreen = document.getElementById('screen-wish');
    wishScreen.classList.remove('hidden');
    wishScreen.style.display = 'block';
}

function blowCandle(candleNum) {
    if (!blownCandles[candleNum]) {
        blownCandles[candleNum] = true;
        
        // Candle ko smoke icon (💨) mein badal dena
        const candleElement = document.getElementById(`candle-${candleNum}`);
        candleElement.textContent = "💨";
        candleElement.style.cursor = "default";

        // Check karna ke kya teeno candles bujh chuki hain
        if (blownCandles[1] && blownCandles[2] && blownCandles[3]) {
            setTimeout(() => {
                // Text change karna aur button show karna
                document.getElementById('wish-status-text').innerHTML = "Wish made! Now it's time to cut the cake 🎉";
                document.getElementById('cut-cake-btn').classList.remove('hidden');
            }, 400);
        }
    }
}

function cutTheCakeAction() {
    document.getElementById('screen-wish').style.display='none';
    document.getElementById('slice-screen').style.display='block';
}

function lastscreen() {
    document.getElementById('screen-last').style.display='block';
    document.getElementById('slice-screen').style.display='none';
}