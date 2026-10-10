let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;
let highScore = 0;

let h2 = document.querySelector("h2");
let scoreDisplay = document.getElementById("score");

// Start the game on keypress
document.addEventListener("keypress", function () {
    if (!started) {
        console.log("Game started");
        started = true;
        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 300);
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function () {
        btn.classList.remove("userFlash");
    }, 300);
}

function playSequence() {
    let i = 0;
    let interval = setInterval(() => {
        let color = gameSeq[i];
        let btn = document.querySelector(`.${color}`);
        gameFlash(btn);
        i++;
        if (i >= gameSeq.length) {
            clearInterval(interval);
        }
    }, 600);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    gameSeq.push(randColor);

    // Show full sequence
    playSequence();
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.classList[1]; 
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
     
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        // game over
        document.body.classList.add("game-over");
        h2.innerText = `Game Over! Your Score: ${level} | Press any key to restart`;

        if (level > highScore) {
            highScore = level;
            scoreDisplay.innerText = `High Score: ${highScore}`;
        }

        setTimeout(() => {
            document.body.classList.remove("game-over");
        }, 1000);

        resetGame();
    }
}

function resetGame() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}
