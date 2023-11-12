var input = "";
const startingHP = 5;
var p1HP = startingHP;
var p2HP = startingHP;
let heartsHTML = '';
var turn = false; // true means player2 turn
const leftArrow = document.createElement("img");
const arrow = document.getElementById("arrow");
const healthContainer = document.getElementById('healthContainer');
leftArrow.src = "https://cdn-icons-png.flaticon.com/512/109/109618.png";
var usedWords = [""];
const prompts = [ "th", "he", "in", "en", "nt", "re", "er", "an", "ti", "es", "on", "at", "se", 
"nd","or", "ar", "al", "te", "co", "de", "to", "ra", "et", "ed", "it", "sa", "em", "ro",
"the", "and", "tha", "ent", "ing", "ion", "tio", "for", "nde", "has", "nce", "edt", "tis", "oft", "sth", "men", "oph",
"op", "io"];
var prompt;
var time;
var timer;
arrow.appendChild(leftArrow);
//document.getElementById("p1Health").innerHTML = "P1: " + p1HP.toString(10); 
//document.getElementById("p2Health").innerHTML = "P2: " + p2HP.toString(10);

function restart(){
    p1HP = 5;
    p2HP = 5;
    usedWords = [""];
    turn = false;
    game();
}

function containsUsedWord(input){
    for (let i = 0; i < usedWords.length; i++){
        if (input == usedWords[i]){
            return false;
        }
    }
    return true;
}

function isWord(word){
    return fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + word)
    .then(response => response.ok)
    .catch(error => false);
}

function handleUserInput() {
    console.log("Enter pressed");
    if (event.key == "Enter"){
        const input = document.getElementById("userInput").value;
        if (input.includes(prompt) && containsUsedWord(input)) {
          isWord(input)
            .then(valid => {
              if (valid) {
                clearTimeout(timer);
                usedWords.push(input);
                console.log(input + " is a valid word");
                document.getElementById("userInput").value = ""; 
                game();
              } 
              else {
                document.getElementById("userInput").value = ""; 
                console.log(input + " is not a valid word");
              }
            })
            .catch(error => {
              console.log("Error occurred while checking the word:", error);
            });
        }    
        else{
            console.log(input + " is not a valid word");
            document.getElementById("userInput").value = ""; 
        }
    }
  }

function game(){
    for (let i = 0; i < p1HP; i++) {
        heartsHTML += '<span class="heart"><img src ="https://cdn.pixabay.com/photo/2017/09/23/16/33/pixel-heart-2779422_1280.png" </span>';
    }
    healthContainer1.innerHTML = heartsHTML;
    heartsHTML = '';
    for (let i = 0; i < p2HP; i++) {
        heartsHTML += '<span class="heart"><img src ="https://cdn.pixabay.com/photo/2017/09/23/16/33/pixel-heart-2779422_1280.png" </span>';
    }
    healthContainer2.innerHTML = heartsHTML;
    heartsHTML = '';


    document.getElementById("userInput").value = ""; 
    if (p1HP > 0 && p2HP > 0){
        if (!turn){ // player1 turn
            console.log("p1 turn");
            arrow.style.transform = 'rotate(0deg)';
            time = (Math.floor(Math.random() * (12 - 5 + 1)) + 5) * 1000; // random number between 5 and 12

            prompt = prompts[Math.floor(Math.random()*prompts.length)];
            document.getElementById("prompt").innerHTML = prompt;
    
            // checking user input
            var inputField = document.getElementById("userInput");
            timer = setTimeout(function() {
                p1HP--; // lower health
                //document.getElementById("p1Health").innerHTML = "P1: " + p1HP.toString(10); // update the health
                game();
            } , time);    
            inputField.removeEventListener("keydown", handleUserInput);
            document.getElementById("userInput").addEventListener("keydown", handleUserInput);
            document.getElementById("userInput").focus();
        }
        else {
            console.log("p2 turn");
            arrow.style.transform = 'rotate(180deg)';
            time = (Math.floor(Math.random() * (12 - 5 + 1)) + 5) * 1000; // random number between 5 and 12
            prompt = prompts[Math.floor(Math.random()*prompts.length)];
            document.getElementById("prompt").innerHTML = prompt;
    
            // checking user input
            var inputField = document.getElementById("userInput");
            timer = setTimeout(function() {
                p2HP--; // lower health
                //document.getElementById("p2Health").innerHTML = "P2: " + p2HP.toString(10); // update the health
                game();
            } , time);    
            inputField.removeEventListener("keydown", handleUserInput);
            document.getElementById("userInput").addEventListener("keydown", handleUserInput);
            document.getElementById("userInput").focus();
        }
        turn = !turn;
    }

    else{
        clearTimeout(timer);
        usedWords = [""];
        if (p1HP == 0){
            console.log("Player2 wins");
            document.getElementById("result").innerHTML = "Player2 Wins"; 
        }
        else if(p2HP == 0){
            console.log("Player1 wins");
            document.getElementById("result").innerHTML = "Player1 Wins"; 
        }
        p1HP = startingHP;
        p2HP = startingHP;
       // document.getElementById("p1Health").innerHTML = "P1: " + p1HP.toString(10); 
       // document.getElementById("p2Health").innerHTML = "P2: " + p2HP.toString(10);
    }
}
game();