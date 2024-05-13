"use strict";

window.addEventListener("load", start);

async function start() {
    console.log("JS is running")
    registerButtonClicks();
    currentGuess = firstNode;
    showGuess(firstNode);
    allData = await readJsonFile()
    console.log(allData);
}

let currentGuess;

let guesses;
let allData;

function readJsonFile(){
    fetch("saveFile.json")
    .then(response => response.json())
    .then(data => {
        console.log(data);
        return data
    });
}

function makeGuesses(){
    console.log(allData);
}

const guess1 = {
    parent: null,
    question: "Er det en XXX?",
    yes: null,
    no: null
}

const firstNode = {
    parent: null,
    question: "Er det et pattedyr?",
    yes: guess1,
    no: null
}

function connectGuesses(){
    guess1.parent = firstNode;

}

function showGuess(guess){
    const html =/*html*/`<div class="guess">
        <div class="text">
            ${guess.question}
        </div>
        <div class="choices">
            <button>yes</button>
            <button>no</button>
        </div>
    </div>`

    document.querySelector("main").insertAdjacentHTML("beforeend", html);
}

function registerButtonClicks(){
    document.querySelector("main").addEventListener("click", userClicked);

    function userClicked(event){
        const target = event.target;
        if(target.tagName === "BUTTON"){
            buttonClicked(target);
        };
    }
}

function buttonClicked(button){
    console.log(button)
    //remove buttons
    button.parentElement.innerHTML = button.textContent;

    // find the scene that has been pressed
    const choice = button.textContent === "yes" ? currentGuess.yes : currentGuess.no;

    // show the new scene
    currentGuess = choice;
    showGuess(currentGuess);

}
