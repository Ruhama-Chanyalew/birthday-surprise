
// =====================================================
// A SPECIAL SURPRISE — INTERACTIVE BIRTHDAY EXPERIENCE
// =====================================================


// -----------------------------------------------------
// 1. PASSCODE LANDING PAGE
// -----------------------------------------------------

const correctPasscode = "5350";
let enteredPasscode = "";

const loginScreen = document.getElementById("login-screen");
const birthdayScreen = document.getElementById("birthday-screen");
const treasureScreen = document.getElementById("treasure-screen");
const doorScreen = document.getElementById("door-screen");
const cakeScreen = document.getElementById("cake-screen");

const passcodeDots = document.querySelectorAll(".passcode-dot");
const errorMessage = document.getElementById("error-message");
const keys = document.querySelectorAll(".key");

function updatePasscodeDisplay() {
    passcodeDots.forEach((dot, index) => {
        dot.classList.toggle("filled", index < enteredPasscode.length);
    });
}

function checkPasscode() {
    if (enteredPasscode === correctPasscode) {
        loginScreen.classList.add("hidden");
        birthdayScreen.classList.remove("hidden");
        launchBalloons();
        return;
    }

    errorMessage.classList.add("show");

    setTimeout(() => errorMessage.classList.remove("show"), 1800);

    enteredPasscode = "";
    updatePasscodeDisplay();
}

keys.forEach((key) => {
    key.addEventListener("click", () => {
        const number = key.dataset.number;
        const action = key.dataset.action;

        if (number !== undefined && enteredPasscode.length < 4) {
            enteredPasscode += number;
            updatePasscodeDisplay();
        }

        if (action === "clear") {
            enteredPasscode = "";
            updatePasscodeDisplay();
        }

        if (action === "backspace") {
            enteredPasscode = enteredPasscode.slice(0, -1);
            updatePasscodeDisplay();
        }

        if (enteredPasscode.length === 4) checkPasscode();
    });
});


// -----------------------------------------------------
// 2. BALLOONS
// -----------------------------------------------------

let balloonInterval = null;

function launchBalloons() {
    const container = document.getElementById("balloon-container");
    if (!container) return;

    container.innerHTML = "";

    const colors = ["violet", "orange", "beige", "gold", "rose", "cream"];

    function spawnBalloon(initial = false) {
        const screen = document.getElementById("birthday-screen");
        if (!screen || screen.classList.contains("hidden")) return;

        const balloon = document.createElement("div");
        const color = colors[Math.floor(Math.random() * colors.length)];
        balloon.classList.add("balloon", color);

        balloon.style.left = (Math.random() * 95 + 2.5) + "%";

        // Longer duration for dreamy, graceful floating: 12s to 21s
        const duration = 12 + Math.random() * 9;
        balloon.style.animationDuration = duration + "s";

        // Initial burst staggered across 0-14s; streaming has tiny staggered delay
        const delay = initial ? (Math.random() * 14) : (Math.random() * 0.4);
        balloon.style.animationDelay = delay + "s";

        // Random swaying parameters for realistic wind currents
        const d1 = (Math.random() - 0.5) * 50;
        const d2 = (Math.random() - 0.5) * 60;
        const d3 = (Math.random() - 0.5) * 50;
        const r1 = (Math.random() - 0.5) * 16;
        const r2 = (Math.random() - 0.5) * 18;
        const r3 = (Math.random() - 0.5) * 16;
        const r4 = (Math.random() - 0.5) * 14;

        balloon.style.setProperty("--drift-1", `${d1}px`);
        balloon.style.setProperty("--drift-2", `${d2}px`);
        balloon.style.setProperty("--drift-3", `${d3}px`);
        balloon.style.setProperty("--rot-start", `${r1}deg`);
        balloon.style.setProperty("--rot-mid", `${r2}deg`);
        balloon.style.setProperty("--rot-end", `${r3}deg`);
        balloon.style.setProperty("--rot-final", `${r4}deg`);

        const size = 34 + Math.random() * 32;
        balloon.style.width = size + "px";
        balloon.style.height = (size * 1.3) + "px";

        container.appendChild(balloon);

        setTimeout(() => {
            balloon.remove();
        }, (duration + delay + 1) * 1000);
    }

    // Launch 70 balloons across initial staggered waves!
    for (let i = 0; i < 70; i++) {
        spawnBalloon(true);
    }

    // Keep streaming fresh balloons continuously so the screen stays festive and filled
    if (balloonInterval) clearInterval(balloonInterval);
    balloonInterval = setInterval(() => {
        spawnBalloon(false);
    }, 500);
}


// -----------------------------------------------------
// 3. MOVE INTO THE 28 LITTLE SECRETS
// -----------------------------------------------------

document.getElementById("continue-button").addEventListener("click", () => {
    birthdayScreen.classList.add("hidden");
    treasureScreen.classList.remove("hidden");

    if (balloonInterval) {
        clearInterval(balloonInterval);
        balloonInterval = null;
    }
    document.getElementById("balloon-container").innerHTML = "";

    window.scrollTo({ top: 0, behavior: "smooth" });
});


// -----------------------------------------------------
// 4. THE 28 MESSAGES
// -----------------------------------------------------

const secretMessages = [
    { title: "A Little Beginning", text: "If I could choose again, I would still choose to have you in my life." },
    { title: "Your Smile", text: "Your smile has a way of making even an ordinary day feel special." },
    { title: "My Favorite Person", text: "Somehow, among all the people in this world, you became my favorite." },
    { title: "A Little Secret", text: "Sometimes I catch myself smiling just because I have you." },
    { title: "Your Heart", text: "I admire the person you are, even in the little things you might not notice." },
    { title: "My Safe Place", text: "There is something comforting about knowing I have you in my world." },
    { title: "The Little Things", text: "It's not always the big moments. Sometimes it's the smallest things you do." },
    { title: "Your Laugh", text: "I hope you never stop teasing and being completely yourself." },
    { title: "My Favorite Thought", text: "You are one of my favorite reasons to embrace tomorrow." },
    { title: "A Promise", text: "I promise to keep finding new reasons to appreciate you." },
    { title: "Your Dreams", text: "I hope you never make your dreams smaller just because they seem far away." },
    { title: "A Little Reminder", text: "You are doing better than you sometimes give yourself credit for." },
    { title: "Our Adventures", text: "I hope there are a million more little adventures waiting for us, evenif we didn't start them yet :)" },
    { title: "My Favorite Sound", text: "There are voices you recognize, and then there is the one that feels like home." },
    { title: "You Are Special", text: "I hope you see even a little of what I see when I look at you." },
    { title: "A Wish for You", text: "May this new year of your life bring you closer to everything you dream about." },
    { title: "Your Strength", text: "I admire how you keep going, even when things aren't easy." },
    { title: "A Little Happiness", text: "I hope today gives you as much happiness as you bring into my life." },
    { title: "My Favorite Human", text: "You can be silly, serious, annoying, wonderful, and still my favorite person." },
    { title: "More Memories", text: "We may not have pictures of everything, but that doesn't mean those moments are forgotten." },
    { title: "The Future", text: "I am excited about all the things you are going to become." },
    { title: "My Gratitude", text: "Thank you for being a part of my story." },
    { title: "A Little Hug", text: "Imagine this message coming with the longest birthday hug." },
    { title: "Never Forget", text: "You deserve love, kindness, peace, and every beautiful thing life can offer." },
    { title: "Twenty-Eight", text: "Twenty-eight years of you existing. And I am so glad our paths crossed." },
    { title: "One More Year", text: "Here's to another year of growing, learning, laughing, and becoming." },
    { title: "My Favorite Wish", text: "I wish I could show you how much happiness I want life to bring you." },
    { title: "The Last Piece", text: "And finally, the last little piece of my heart. Happy birthday, my love." }
];

const secretGrid = document.getElementById("secret-grid");
const secretCount = document.getElementById("secret-count");
const secretProgressFill = document.getElementById("secret-progress-fill");
const secretMessage = document.getElementById("secret-message");
const keyComplete = document.getElementById("key-complete");

const discoveredSecrets = new Set();


// -----------------------------------------------------
// 5. HEART KEY POINTS
// -----------------------------------------------------

const keyCoordinates = [
    [150, 105], [137, 94], [121, 84], [103, 77],
    [86, 80], [77, 94], [82, 111], [95, 126],
    [111, 141], [130, 155], [150, 169],
    [170, 155], [189, 141], [205, 126],
    [218, 111], [223, 94], [214, 80], [197, 77],
    [150, 182], [150, 194], [150, 206], [150, 218],
    [150, 230], [150, 242], [163, 182], [176, 182],
    [163, 194], [176, 194]
];

const keyPoints = document.getElementById("key-points");

keyCoordinates.forEach((point, index) => {
    const circle = document.createElementNS(
        "http://www.w3.org/2000/svg", "circle"
    );

    circle.setAttribute("cx", point[0]);
    circle.setAttribute("cy", point[1]);
    circle.setAttribute("r", "5");
    circle.setAttribute("class", "key-point");
    circle.setAttribute("id", `key-point-${index}`);

    keyPoints.appendChild(circle);
});


// -----------------------------------------------------
// 6. FLOATING HEART TILES
// -----------------------------------------------------

const popupShapes = [
    "heart", "letter", "flower", "star",
    "circle", "envelope", "diamond"
];

secretMessages.forEach((message, index) => {
    const tile = document.createElement("button");

    tile.type = "button";
    tile.className = "secret-tile floating-heart";
    tile.style.setProperty("--float-delay", `${(index % 7) * -0.45}s`);
    tile.style.setProperty("--float-duration", `${3.5 + (index % 5) * 0.4}s`);

    tile.innerHTML = `
        <span class="tile-heart">♡</span>
        <small>${String(index + 1).padStart(2, "0")}</small>
    `;

    tile.setAttribute("aria-label", `Open secret ${index + 1}`);
    tile.addEventListener("click", () => openSecret(index));

    secretGrid.appendChild(tile);
});


// -----------------------------------------------------
// 7. MESSAGE POPUP SYSTEM
// -----------------------------------------------------

let activePopup = null;

const popupOverlay = document.createElement("div");
popupOverlay.id = "message-popup-overlay";
popupOverlay.className = "message-popup-overlay hidden";

popupOverlay.innerHTML = `
    <div class="message-popup">
        <button class="popup-close" aria-label="Close message">×</button>
        <div class="popup-symbol">♡</div>
        <span class="popup-number"></span>
        <h2 class="popup-title"></h2>
        <p class="popup-text"></p>
        <div class="popup-footer">A little piece of my heart ♡</div>
    </div>
`;

document.body.appendChild(popupOverlay);

const popupCard = popupOverlay.querySelector(".message-popup");

function openSecret(index) {
    const message = secretMessages[index];
    const tile = secretGrid.children[index];

    popupOverlay.querySelector(".popup-number").textContent =
        `LITTLE SECRET ${String(index + 1).padStart(2, "0")} OF 28`;

    popupOverlay.querySelector(".popup-title").textContent = message.title;
    popupOverlay.querySelector(".popup-text").textContent = message.text;

    const shape = popupShapes[index % popupShapes.length];

    popupCard.className = `message-popup shape-${shape}`;
    popupOverlay.querySelector(".popup-symbol").textContent =
        ["♡", "✉", "❀", "✦", "♡", "✉", "◇"][index % 7];

    popupOverlay.classList.remove("hidden");

    // Replay the popup animation.
    popupCard.style.animation = "none";
    void popupCard.offsetWidth;
    popupCard.style.animation = "";

    if (!discoveredSecrets.has(index)) {
        discoveredSecrets.add(index);

        tile.classList.add("discovered");
        tile.classList.remove("floating-heart");

        document.getElementById(`key-point-${index}`).classList.add("lit");

        updateSecretProgress();
    }
}

function closeMessagePopup() {
    popupOverlay.classList.add("hidden");

    if (discoveredSecrets.size === 28) {
        showCompletedKey();
    }
}

popupOverlay.querySelector(".popup-close").addEventListener("click", closeMessagePopup);

popupOverlay.addEventListener("click", (event) => {
    if (event.target === popupOverlay) closeMessagePopup();
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !popupOverlay.classList.contains("hidden")) {
        closeMessagePopup();
    }
});


// Keep the old message panel hidden; the new popup is used instead.
secretMessage.classList.add("hidden");
keyComplete.classList.add("hidden");


// -----------------------------------------------------
// 8. PROGRESS AND KEY COMPLETION
// -----------------------------------------------------

function updateSecretProgress() {
    const count = discoveredSecrets.size;

    secretCount.textContent = `${count} / 28`;
    secretProgressFill.style.width = `${(count / 28) * 100}%`;

    if (count === 28) {
        document.querySelector(".key-paper-note p").textContent =
            "You found every piece of my heart. ♡";
    }
}

let keyOverlay = null;

function showCompletedKey() {
    if (keyOverlay) return;

    keyOverlay = document.createElement("div");
    keyOverlay.className = "completed-key-overlay";

    const originalKey = document.getElementById("heart-key");

    const keyClone = originalKey.cloneNode(true);
    keyClone.removeAttribute("id");
    keyClone.classList.add("completed-heart-key");

    keyOverlay.innerHTML = `
        <div class="key-complete-message">
            <span>✦ YOU FOUND ALL 28 ✦</span>
            <h1>Every piece led to you.</h1>
            <p>Your heart-shaped key is complete.</p>
            <div class="key-touch-hint">Touch your key to unlock the door</div>
        </div>
    `;

    keyOverlay.appendChild(keyClone);
    document.body.appendChild(keyOverlay);

    requestAnimationFrame(() => keyOverlay.classList.add("visible"));

    keyOverlay.addEventListener("click", openDoorWithKey);
    keyOverlay.style.cursor = "pointer";
}


// -----------------------------------------------------
// 9. THE DOOR — THE KEY ITSELF IS CLICKABLE
// -----------------------------------------------------

let doorHasOpened = false;

function openDoorWithKey() {
    if (doorHasOpened) return;
    doorHasOpened = true;

    // 1. Gently fade out the key completion overlay
    if (keyOverlay) {
        keyOverlay.style.transition = "opacity 0.45s ease, transform 0.45s ease";
        keyOverlay.style.opacity = "0";
        keyOverlay.style.transform = "scale(0.95)";
    }

    setTimeout(() => {
        keyOverlay?.remove();
        keyOverlay = null;

        // 2. Switch to the Door Room environment
        treasureScreen.classList.add("hidden");
        doorScreen.classList.remove("hidden");
        window.scrollTo({ top: 0, behavior: "instant" });

        const door = document.getElementById("magical-door");
        const flyingKey = document.getElementById("flying-door-key");
        const doorStatus = document.getElementById("door-status-text");
        const sparks = document.getElementById("key-unlock-sparks");
        const floorLight = document.getElementById("door-light-cast");
        const doorKeyhole = document.getElementById("door-keyhole");
        const doorArea = document.querySelector(".magical-door-area");
        const doorEnv = document.querySelector(".door-room-environment");

        // Helper to smoothly transition to the Birthday Cake Room
        let hasAdvanced = false;
        const advanceToCake = () => {
            if (hasAdvanced) return;
            hasAdvanced = true;

            // Camera smoothly zooms through the open doorway
            if (doorEnv) {
                doorEnv.classList.add("door-walk-in");
            }

            setTimeout(() => {
                doorScreen.classList.add("hidden");
                cakeScreen.classList.remove("hidden");
                window.scrollTo({ top: 0, behavior: "instant" });
                startBirthdayRoom();
            }, 950);
        };

        // 3. Heart key appears floating gracefully in front of the door
        if (flyingKey) {
            flyingKey.classList.remove("hidden");
            flyingKey.style.transform = "translate(-50%, -50%) scale(1.15)";
            requestAnimationFrame(() => {
                flyingKey.classList.add("key-floating");
            });
        }

        if (doorStatus) {
            doorStatus.textContent = "Your heart key found its door... ♡";
        }

        // 4. Calculate exact pixel-perfect target coordinates for the keyhole
        requestAnimationFrame(() => {
            let deltaX = 85;
            let deltaY = 62;

            if (doorKeyhole && doorArea) {
                const holeRect = doorKeyhole.getBoundingClientRect();
                const areaRect = doorArea.getBoundingClientRect();

                // Keyhole center relative to .magical-door-area:
                const holeX = (holeRect.left + holeRect.width / 2) - areaRect.left;
                const holeY = (holeRect.top + holeRect.height / 2) - areaRect.top;

                // Initial position of flying key center:
                const keyStartX = areaRect.width / 2;
                const keyStartY = areaRect.height * 0.48;

                // Key shaft tip offset (transform-origin 50% 80.7%):
                const keyTipStartY = keyStartY + (120 * 0.307);

                deltaX = Math.round(holeX - keyStartX);
                deltaY = Math.round(holeY - keyTipStartY);

                if (sparks) {
                    sparks.style.left = `${Math.round(holeX)}px`;
                    sparks.style.top = `${Math.round(holeY)}px`;
                }
            }

            // 5. Key glides smoothly into the keyhole with natural ease
            setTimeout(() => {
                if (flyingKey) {
                    flyingKey.classList.remove("key-floating");
                    flyingKey.style.transition = "transform 1.0s cubic-bezier(0.25, 1, 0.35, 1)";
                    flyingKey.style.transform = `translate(calc(-50% + ${deltaX}px), calc(-50% + ${deltaY}px)) scale(0.25) rotate(0deg)`;
                }
                if (doorStatus) {
                    doorStatus.textContent = "Inserting the key into the lock...";
                }

                // 6. Key turns 90 degrees inside the lock smoothly
                setTimeout(() => {
                    if (flyingKey) {
                        flyingKey.style.transition = "transform 0.65s cubic-bezier(0.4, 0, 0.2, 1)";
                        flyingKey.style.transform = `translate(calc(-50% + ${deltaX}px), calc(-50% + ${deltaY}px)) scale(0.25) rotate(90deg)`;
                    }
                    if (doorStatus) {
                        doorStatus.textContent = "Unlocking the door... ✨";
                    }

                    // 7. Sparkle burst and key dissolves into the lock
                    setTimeout(() => {
                        if (sparks) {
                            sparks.classList.add("sparks-burst");
                        }
                        if (flyingKey) {
                            flyingKey.style.transition = "opacity 0.45s ease, filter 0.45s ease";
                            flyingKey.style.opacity = "0";
                            flyingKey.style.filter = "blur(3px)";
                        }

                        // 8. Mechanical latch releases: door cracks open slightly first
                        setTimeout(() => {
                            door?.classList.add("door-cracked");
                            floorLight?.classList.add("light-crack");

                            // 9. Door swings wide open with smooth, majestic wooden door physics
                            setTimeout(() => {
                                door?.classList.remove("door-cracked");
                                door?.classList.add("open");
                                floorLight?.classList.remove("light-crack");
                                floorLight?.classList.add("light-visible");

                                if (doorStatus) {
                                    doorStatus.textContent = "Welcome inside, my love... ♡";
                                }

                                // Instant click anywhere to step inside immediately
                                doorScreen.style.cursor = "pointer";
                                doorScreen.onclick = advanceToCake;

                                // 10. Natural pause: lets user admire the open door and room for 2.8s
                                setTimeout(() => {
                                    advanceToCake();
                                }, 2800);

                            }, 450);

                        }, 350);

                    }, 550);

                }, 850);

            }, 750);

        });

    }, 450);
}


// The old door button is no longer needed.
document.getElementById("open-door-button").classList.add("hidden");
document.getElementById("turn-key-button").classList.add("hidden");


// -----------------------------------------------------
// 10. THE 28 BIRTHDAY WISHES
// -----------------------------------------------------

const birthdayWishes = [
    "May this year bring you the kind of happiness that stays.",
    "May you always find a reason to smile, even on difficult days.",
    "May every dream you carry find its way closer to reality.",
    "May you never forget how capable and extraordinary you are.",
    "May life surprise you with beautiful things you never expected.",
    "May you always have the courage to begin again.",
    "May your hard work turn into something you are proud of.",
    "May you find peace in the moments when life feels too loud.",
    "May you always be surrounded by people who truly value you.",
    "May you never lose the curious and playful part of yourself.",
    "May every challenge teach you something without taking away your joy.",
    "May you have more reasons to laugh than reasons to worry.",
    "May the places you dream of become places you get to visit.",
    "May your heart always feel loved, appreciated, and understood.",
    "May you keep becoming the person you have always wanted to be.",
    "May opportunities find you when you least expect them.",
    "May you be proud of how far you have already come.",
    "May you always have the strength to keep going.",
    "May ordinary days become some of your favorite memories.",
    "May you never feel that you have to make yourself smaller.",
    "May this year bring you new adventures and beautiful beginnings.",
    "May your kindness return to you in a thousand different ways.",
    "May you always find comfort in knowing you are deeply loved.",
    "May your future be even more beautiful than you imagine.",
    "May you have the freedom to explore everything your heart desires.",
    "May you keep discovering new reasons to love your life.",
    "May all the little things you wish for find their way to you.",
    "And above everything, may you always be happy. Happy birthday, my love."
];


// -----------------------------------------------------
// 11. BUILD THE CANDLE EXPERIENCE
// -----------------------------------------------------

let currentWishIndex = 0;
let wishCard = null;
let allCandlesPlaced = false;
let candlesExtinguished = false;

const candleArea = document.querySelector(".candle-area");
const wishInstruction = document.getElementById("wish-instruction");
const birthdayWishReveal = document.getElementById("birthday-wish-reveal");

function startBirthdayRoom() {
    if (!candleArea) {
        console.error("Could not find .candle-area in the birthday room.");
        return;
    }

    // Start with a completely empty cake.
    candleArea.innerHTML = "";
    currentWishIndex = 0;
    allCandlesPlaced = false;
    candlesExtinguished = false;

    document.getElementById("blow-candle-button")?.classList.add("hidden");

    // Hide the final birthday wish until the candles are blown out.
    birthdayWishReveal?.classList.add("hidden");

    // Remove any old microphone panel.
    document.getElementById("mic-permission-panel")?.remove();

    wishInstruction.textContent =
        "I made 28 little wishes for you. Let's put them on your cake. ♡";

    createMicrophoneStatus();

    showNextWish();
}


// -----------------------------------------------------
// 12. SHOW ONE WISH AND ONE CANDLE AT A TIME
// -----------------------------------------------------

function showNextWish() {
    if (currentWishIndex >= birthdayWishes.length) return;

    // Remove the previous wish card.
    wishCard?.remove();

    const wishNumber = currentWishIndex + 1;
    const wish = birthdayWishes[currentWishIndex];

    wishCard = document.createElement("div");
    wishCard.className = "wish-arrival-card";

    wishCard.innerHTML = `
        <span class="wish-card-number">
            WISH ${String(wishNumber).padStart(2, "0")} OF 28
        </span>

        <p class="wish-card-message">${wish}</p>

        <div class="preview-candle" aria-hidden="true">
            <span class="preview-flame"></span>
            <span class="preview-wick"></span>
        </div>

        <span class="wish-card-hint">
            Touch the candle to place your wish ♡
        </span>
    `;

    document.body.appendChild(wishCard);

    requestAnimationFrame(() => {
        wishCard.classList.add("wish-card-visible");
    });

    // The candle itself is the interaction.
    wishCard.addEventListener("click", placeCurrentWish, { once: true });
}


// -----------------------------------------------------
// 13. PLACE THE CANDLE ON THE CAKE
// -----------------------------------------------------


// 28 non-overlapping positions arranged in TWO concentric circles
// (18 on outer ring + 10 on inner ring) calculated via equal arc-length
// on the top frosting surface of the cake
const outerRingCandles = [
    [ 11.7, -21.8],
    [ 34.7, -20.6],
    [ 57.6, -17.8],
    [ 80.1, -12.7],
    [ 98.0,   0.0],
    [ 80.0,  12.7],
    [ 57.5,  17.8],
    [ 34.5,  20.6],
    [ 11.4,  21.8],
    [-11.7,  21.8],
    [-34.7,  20.6],
    [-57.6,  17.8],
    [-80.1,  12.7],
    [-98.0,  -0.0],
    [-80.0, -12.7],
    [-57.5, -17.8],
    [-34.5, -20.6],
    [-11.4, -21.8]
];

const innerRingCandles = [
    [  0.1, -12.1],
    [ 22.9, -11.0],
    [ 45.3,  -6.6],
    [ 45.3,   6.6],
    [ 22.8,  11.0],
    [ -0.1,  12.1],
    [-22.9,  11.0],
    [-45.3,   6.6],
    [-45.3,  -6.6],
    [-22.8, -11.0]
];

const candlePositions = [...outerRingCandles, ...innerRingCandles];

function placeCurrentWish() {
    if (!wishCard || allCandlesPlaced) return;

    const wishNumber = currentWishIndex + 1;

    // Create one candle.
    const candle = document.createElement("div");

    // Add distinct class for inner vs outer ring
    const isInner = currentWishIndex >= outerRingCandles.length;
    candle.className = `wish-candle candle-arriving ${isInner ? "candle-inner" : "candle-outer"}`;

    candle.innerHTML = `
        <span class="wish-flame"></span>
        <span class="wish-wick"></span>
    `;

    candle.setAttribute("aria-label", `Birthday candle ${wishNumber} (${isInner ? "inner ring" : "outer ring"})`);

    // Position along the concentric rings with true 3D depth
    const pos = candlePositions[currentWishIndex % candlePositions.length];
    const x = pos[0];
    const y = pos[1];

    candle.style.left = `${x}px`;
    candle.style.top = `${y}px`;
    candle.style.zIndex = Math.round(100 + y);

    // Add the candle.
    candleArea.appendChild(candle);

    // Animate it into place.
    requestAnimationFrame(() => {
        candle.classList.add("candle-placed");
    });

    // Remove the wish card.
    wishCard.classList.remove("wish-card-visible");
    wishCard.classList.add("wish-card-leaving");

    setTimeout(() => {
        wishCard?.remove();
        wishCard = null;
    }, 550);

    currentWishIndex++;

    if (currentWishIndex < birthdayWishes.length) {
        wishInstruction.textContent =
            `${currentWishIndex} of 28 wishes placed on your cake. ♡`;

        setTimeout(showNextWish, 650);
    } else {
        allCandlesPlaced = true;

        wishInstruction.textContent =
            "All 28 wishes are on your cake. Now close your eyes and make a wish. ♡";

        // Show manual blow button as a reliable fallback/companion to microphone
        const blowButton = document.getElementById("blow-candle-button");
        if (blowButton) {
            blowButton.classList.remove("hidden");
            blowButton.onclick = () => extinguishBirthdayCandles();
        }

        // Allow tapping the cake/candles directly to blow them out as well
        candleArea.style.pointerEvents = "auto";
        candleArea.style.cursor = "pointer";
        candleArea.title = "Click or blow to extinguish your candles ♡";
        candleArea.onclick = () => extinguishBirthdayCandles();

        requestBirthdayMicrophone();

        setTimeout(showFinalBlowMessage, 700);
    }
}



// -----------------------------------------------------
// 14. MICROPHONE STATUS — NO ENABLE BUTTON
// -----------------------------------------------------

function createMicrophoneStatus() {
    const oldPanel = document.getElementById("mic-permission-panel");
    oldPanel?.remove();

    const panel = document.createElement("div");
    panel.id = "mic-permission-panel";
    panel.className = "mic-status-panel";

    panel.innerHTML = `
        <p id="mic-status">
            Each candle carries a wish for you. ♡
        </p>
    `;

    document.querySelector(".cake-content")?.appendChild(panel);
}

function showFinalBlowMessage() {
    const status = document.getElementById("mic-status");

    if (!status) return;

    status.textContent =
        "Take a deep breath, close your eyes, and blow toward your microphone. ♡";
}


// -----------------------------------------------------
// 15. AUTOMATIC MICROPHONE REQUEST
// -----------------------------------------------------

let audioContext = null;
let microphoneStream = null;
let analyser = null;
let microphoneFrame = null;
let blowStartTime = null;

async function requestBirthdayMicrophone() {
    const status = document.getElementById("mic-status");

    if (!navigator.mediaDevices?.getUserMedia) {
        status.textContent =
            "Your browser cannot access the microphone here. Please open this website using localhost or HTTPS.";
        return;
    }

    try {
        status.textContent = "Getting your microphone ready... ♡";

        // This call happens as part of the final candle-touch interaction.
        microphoneStream = await navigator.mediaDevices.getUserMedia({
            audio: {
                echoCancellation: false,
                noiseSuppression: false,
                autoGainControl: false
            }
        });

        const AudioContextClass =
            window.AudioContext || window.webkitAudioContext;

        audioContext = new AudioContextClass();

        if (audioContext.state === "suspended") {
            await audioContext.resume();
        }

        const microphoneSource =
            audioContext.createMediaStreamSource(microphoneStream);

        analyser = audioContext.createAnalyser();
        analyser.fftSize = 2048;
        analyser.smoothingTimeConstant = 0.15;

        microphoneSource.connect(analyser);

        status.textContent =
            "I'm listening... Blow gently toward your microphone. ♡";

        detectBirthdayBlow();

    } catch (error) {
        console.error("Microphone error:", error);

        status.textContent =
            "I couldn't access your microphone. Tap this message to try again.";

        // A retry must also come from a user interaction.
        status.style.cursor = "pointer";
        status.setAttribute("role", "button");
        status.setAttribute("tabindex", "0");

        status.onclick = () => {
            status.onclick = null;
            requestBirthdayMicrophone();
        };

        status.onkeydown = (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                status.click();
            }
        };
    }
}


// -----------------------------------------------------
// 16. DETECT THE BLOW
// -----------------------------------------------------

function detectBirthdayBlow() {
    if (!analyser || candlesExtinguished || !allCandlesPlaced) return;

    const samples = new Uint8Array(analyser.fftSize);

    analyser.getByteTimeDomainData(samples);

    let sum = 0;

    for (let i = 0; i < samples.length; i++) {
        const normalized = (samples[i] - 128) / 128;
        sum += normalized * normalized;
    }

    const rms = Math.sqrt(sum / samples.length);

    // Detect a sustained burst of air/sound.
    if (rms > 0.115) {
        if (!blowStartTime) {
            blowStartTime = performance.now();
        }

        if (performance.now() - blowStartTime > 180) {
            extinguishBirthdayCandles();
            return;
        }
    } else {
        blowStartTime = null;
    }

    microphoneFrame = requestAnimationFrame(detectBirthdayBlow);
}


// -----------------------------------------------------
// 17. BLOW OUT ALL 28 CANDLES
// -----------------------------------------------------

function extinguishBirthdayCandles() {
    if (candlesExtinguished) return;

    candlesExtinguished = true;

    cancelAnimationFrame(microphoneFrame);

    // Hide blow button immediately so it doesn't clutter or linger
    const blowButton = document.getElementById("blow-candle-button");
    if (blowButton) {
        blowButton.classList.add("hidden");
        blowButton.style.display = "none";
    }

    const flames = document.querySelectorAll(
        "#cake-screen .wish-flame"
    );

    flames.forEach((flame, index) => {
        setTimeout(() => {
            flame.classList.add("extinguished");
        }, index * 25);
    });

    const status = document.getElementById("mic-status");

    if (status) {
        status.textContent =
            "You did it! I hope every one of your wishes comes true. ♡";
    }

    // Stop listening after the candles go out.
    if (microphoneStream) {
        microphoneStream.getTracks().forEach(track => track.stop());
        microphoneStream = null;
    }

    if (audioContext) {
        audioContext.close();
        audioContext = null;
    }

    setTimeout(() => {
        wishInstruction.textContent =
            "Twenty-eight candles. Twenty-eight wishes. One very special person. ♡";

        // Fade out and remove the microphone status panel so it never overlaps the celebration card
        const micPanel = document.getElementById("mic-permission-panel");
        if (micPanel) {
            micPanel.style.transition = "opacity 0.6s ease, transform 0.6s ease";
            micPanel.style.opacity = "0";
            micPanel.style.transform = "translateY(15px)";
            setTimeout(() => micPanel.remove(), 600);
        }

        birthdayWishReveal?.classList.remove("hidden");

        birthdayWishReveal?.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }, 1500);
}


// -----------------------------------------------------
// 18. INTERACTIVE POLAROID PHOTO GALLERY LIGHTBOX
// -----------------------------------------------------

const couplePhotos = [
    { src: "assets/photo1.jpg", caption: "Us ♡" },
    { src: "assets/photo2.jpg", caption: "The Birthday Boy ✨" },
    { src: "assets/photo3.jpg", caption: "My Favorite Smile ♥" },
    { src: "assets/photo4.jpg", caption: "Pure Joy ✦" },
    { src: "assets/photo5.jpg", caption: "Forever & Always ♡" }
];

let currentModalPhotoIdx = 0;

function setupPhotoGallery() {
    const photoModal = document.getElementById("photo-modal");
    const modalImg = document.getElementById("photo-modal-img");
    const modalCaption = document.getElementById("photo-modal-caption");
    const modalCounter = document.getElementById("photo-modal-counter");
    const closeBtn = document.getElementById("photo-modal-close");
    const backdrop = document.getElementById("photo-modal-backdrop");
    const prevBtn = document.getElementById("photo-modal-prev");
    const nextBtn = document.getElementById("photo-modal-next");

    function showPhoto(index) {
        currentModalPhotoIdx = (index + couplePhotos.length) % couplePhotos.length;
        const photo = couplePhotos[currentModalPhotoIdx];
        if (modalImg) modalImg.src = photo.src;
        if (modalCaption) modalCaption.textContent = photo.caption;
        if (modalCounter) modalCounter.textContent = `${currentModalPhotoIdx + 1} / ${couplePhotos.length}`;
        photoModal?.classList.remove("hidden");
    }

    function closePhoto() {
        photoModal?.classList.add("hidden");
    }

    document.querySelectorAll(".wall-frame[data-photo-idx]").forEach(frame => {
        frame.addEventListener("click", () => {
            const idx = parseInt(frame.getAttribute("data-photo-idx"), 10) || 0;
            showPhoto(idx);
        });
    });

    closeBtn?.addEventListener("click", closePhoto);
    backdrop?.addEventListener("click", closePhoto);

    prevBtn?.addEventListener("click", (e) => {
        e.stopPropagation();
        showPhoto(currentModalPhotoIdx - 1);
    });

    nextBtn?.addEventListener("click", (e) => {
        e.stopPropagation();
        showPhoto(currentModalPhotoIdx + 1);
    });

    document.addEventListener("keydown", (e) => {
        if (!photoModal || photoModal.classList.contains("hidden")) return;
        if (e.key === "Escape") closePhoto();
        if (e.key === "ArrowLeft") showPhoto(currentModalPhotoIdx - 1);
        if (e.key === "ArrowRight") showPhoto(currentModalPhotoIdx + 1);
    });
}

// Initialize photo gallery
setupPhotoGallery();

