// app 

var tryAgainBtn = document.querySelector(".try-again-btn");
var tryAgainBtn1 = document.querySelector(".try-again-btn1");
var quitBtn = document.querySelector(".quit-game");
var SpeedText = document.querySelector(".speed-text p");
var timeCounter = document.querySelector(".time-counter");
var mistakeCounter = document.querySelector(".mistakes-counter");
var wpmCounter = document.querySelector(".wpm-counter");
var cpmCounter = document.querySelector(".cpm-counter");
var inputField = document.querySelector("#input-field");
var finalResult = document.querySelector(".final-result");
let timer,
    maxTime = 30,
    timeLeft = maxTime;
let charIndex = mistakes = isTyping = 0;
// random paragraphs generator 
timeCounter.textContent = maxTime;

function RandomParagraphs() {

    let randIndex = Math.floor(Math.random() * paragraphs.length);
    SpeedText.textContent = paragraphs[randIndex];
    SpeedText.innerHTML = "";
    paragraphs[randIndex].split("").forEach(span => {
        let spanTag = `<span>${span}</span>`;
        SpeedText.innerHTML += spanTag;
    })
    SpeedText.querySelectorAll("span")[0].classList.add("active")
    document.addEventListener("keydown", () => inputField.focus());
    SpeedText.addEventListener("click", () => inputField.focus());

};

// Initial Typing 
function initTyping() {

    let charecters = SpeedText.querySelectorAll("span");
    let inputChars = inputField.value.split("")[charIndex];

    if (charIndex < charecters.length - 1 && timeLeft > 0) {
        if (!isTyping) {
            timer = setInterval(initTime, 1000);
            isTyping = true;
        }
        if (inputChars == null) {
            charIndex--;
            if (charecters[charIndex].classList.contains("incorrect")) {
                mistakes--;
            }
            charecters[charIndex].classList.remove("correct", "incorrect");
        } else {
            if (charecters[charIndex].innerText === inputChars) {
                charecters[charIndex].classList.add("correct");
            } else {
                charecters[charIndex].classList.add("incorrect");
                mistakes++;
            }
            charIndex++;
        }
        let wpm = Math.round((((charIndex - mistakes) / 5) / (maxTime - timeLeft)) * 60);
        wpm = wpm < 0 || wpm === Infinity || !wpm ? 0 : wpm;
        wpmCounter.textContent = wpm;
        charecters.forEach(char => char.classList.remove("active"));
        charecters[charIndex].classList.add("active");
        mistakeCounter.textContent = mistakes;
        cpmCounter.textContent = charIndex - mistakes;
    } else {
        clearInterval(timer)
        inputField.value = "";
        finalResult.classList.add("active");
    }



}


// init time 
function initTime() {
    if (timeLeft > 0) {
        timeLeft--;
        timeCounter.innerText = timeLeft;
    } else {
        clearInterval(timer);
    }
}

function resetGame() {
    RandomParagraphs();
    timeLeft = maxTime;
    charIndex = mistakes = isTyping = 0;
    timeCounter.innerText = timeLeft;
    mistakeCounter.textContent = mistakes;
    wpmCounter.textContent = 0;
    cpmCounter.textContent = 0;
    inputField.value = "";
    clearInterval(timer)


}

function tryGame() {
    finalResult.classList.remove("active");
    RandomParagraphs();
    timeLeft = maxTime;
    charIndex = mistakes = isTyping = 0;
    timeCounter.innerText = timeLeft;
    mistakeCounter.textContent = mistakes;
    wpmCounter.textContent = 0;
    cpmCounter.textContent = 0;
    inputField.value = "";
    clearInterval(timer)
}


function QuitGame(){
    if(confirm("Do You want to close current window?")){
        window.close();
    }
}

RandomParagraphs();
inputField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);
tryAgainBtn1.addEventListener("click", tryGame);
quitBtn.addEventListener("click", QuitGame);