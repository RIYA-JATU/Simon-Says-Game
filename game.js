let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;
let btns = ["green", "red", "yellow", "blue"];

let h3 = document.querySelector("h3");

document.addEventListener("keypress", function () {
    if (started == false) {
        console.log("game started");
        started = true;
    }

    if (level == 0) {
        levelUP();
    }

})

function levelUP() {
    level++;
    h3.innerText = `Level ${level}`;

    //generating a random color..
    let randIdx = Math.floor(Math.random() * 3);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameFlash(randBtn);
    // sath k sath flash hone vale color ko gameeq mai bhi add kar denge..
    gameSeq.push(randColor);
    console.log("game seq = ", gameSeq);
}

function gameFlash(btn) {
    btn.classList.add("userFlash");
    //remove class after some time..
    setTimeout(function () {
        btn.classList.remove("userFlash");
    }, 700);
}


let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", function () {
        if (gameSeq.length != 0) {
            userFlash(this);
            // use k btn flash krne par us btn(color) ko userSeq mai add kar denge..
            userColor = this.getAttribute("id");
            userSeq.push(userColor);

            checkAnswer(userSeq.length - 1);

        }

    });
}

function userFlash(btn) {
    btn.classList.add("gameFlash");
    //remove class after some time..
    setTimeout(function () {
        btn.classList.remove("gameFlash");
    }, 300);
}


function checkAnswer(lastIdx) {
    console.log("user seq =", userSeq);
    if (userSeq[lastIdx] != gameSeq[lastIdx]) {
        console.log(`${lastIdx} isn't match.`);
        wrongInput();
        return;
    }

    if (userSeq.length === gameSeq.length) {
        console.log("Full sequence matched!");
        userSeq = [];
        setTimeout(levelUP, 1000); // move to next level after short delay
    }
}

function wrongInput() {
    h3.innerHTML = `Game Over! your <b>score</b> was ${level - 1} <br> Press any key to restart :)`;
    let body = document.querySelector("body");
    body.classList.add("danger");
    setTimeout(function () {
        body.classList.remove("danger");
    }, 300);
    gameReset();
}

function gameReset() {
    started = false;
    level = 0;
    gameSeq = [];
    userSeq = [];
}