// DOM Elements
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnIndicator = document.querySelector("#turn-indicator");

// Scores
let oScore = 0;
let xScore = 0;
let tieScore = 0;

let oScoreEl = document.querySelector("#o-score");
let xScoreEl = document.querySelector("#x-score");
let tieScoreEl = document.querySelector("#tie-score");

// Game state
let turnO = true; // true = O's turn, false = X's turn

const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

// Enable all boxes
const enableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("o", "x");
    });
    turnO = true;
    turnIndicator.innerText = "Turn: O";
};

// Disable all boxes
const disableBoxes = () => {
    boxes.forEach(box => box.disabled = true);
};

// Show winner or tie and update scoreboard
const showMsg = (text, winner = null) => {
    msg.innerText = text;
    msgContainer.classList.remove("hide");
    disableBoxes();

    if(winner === "O") {
        oScore++;
        oScoreEl.innerText = oScore;
    } else if(winner === "X") {
        xScore++;
        xScoreEl.innerText = xScore;
    } else if(winner === "Tie") {
        tieScore++;
        tieScoreEl.innerText = tieScore;
    }
};

// Check for winner or tie
const checkWinner = () => {
    for(let pattern of winPatterns){
        const [a, b, c] = pattern;
        let valA = boxes[a].innerText;
        let valB = boxes[b].innerText;
        let valC = boxes[c].innerText;

        if(valA && valA === valB && valB === valC){
            showMsg(`🎉 Winner is ${valA}`, valA);
            return;
        }
    }

    // Check for tie
    let filled = Array.from(boxes).every(box => box.innerText !== "");
    if(filled){
        showMsg("🤝 It's a Tie!", "Tie");
    }
};

// Box click event
boxes.forEach(box => {
    box.addEventListener("click", () => {
        box.innerText = turnO ? "O" : "X";
        box.classList.add(turnO ? "o" : "x");
        box.disabled = true;

        turnO = !turnO;
        turnIndicator.innerText = `Turn: ${turnO ? "O" : "X"}`;

        checkWinner();
    });
});

// Reset game (board only)
const resetGame = () => {
    enableBoxes();
    msgContainer.classList.add("hide");
};

resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);
