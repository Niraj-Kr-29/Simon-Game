/** All the variables and references */

// Game state variables
let playGame;
const allButtons = document.querySelectorAll(".btn");
const heading_text = document.querySelector("h1");
const collection = ["green", "blue", "red", "yellow"];
let actualArray = []; // Array to store the sequence generated by the game
let userArray = []; // Array to store the user's input sequence
let Level = 1; // Variable to track the current level

/** Start the game */
document.addEventListener("keypress", function (e) {
    startGame(); // Start the game when any key is pressed
});

document.addEventListener("touchstart", function(e) {
    startGame();
})

function startGame() {
    playGame = true; // Set game state to playing
    actualArray = []; // Reset the game's sequence array
    userArray = []; // Reset the user's input array
    Level = 1; // Reset the level to 1
    document.querySelector("body").style.backgroundColor = "#011F3F"; // Reset background color
    proceedGame(); // Start the first level
}

function gameOver() {
    playGame = false; // Set game state to not playing
    document.querySelector("body").style.backgroundColor = "red"; // Change background color to red
    heading_text.innerHTML = `Game Over, Press any Key to Restart..!!`; // Display game over message
    actualArray = []; // Reset the game's sequence array
    userArray = []; // Reset the user's input array
}

function proceedGame() {
    userArray = []; // Clear the user's input array for the new level
    heading_text.innerHTML = `Level ${Level}`; // Update heading to display the current level
    const randomColor = collection[Math.floor(Math.random() * 4)]; // Choose a random color from the collection
    animate(randomColor); // Animate the chosen color
    playSound(randomColor); // Play sound corresponding to the chosen color
    actualArray.push(randomColor); // Add the chosen color to the game's sequence array
    Level++; // Increment the level
}

// Function to check the user's input against the game's sequence
function checkAnswer(currentLevel) {
    // Check if the user's input at the current level matches the game's sequence
    if (userArray[currentLevel] === actualArray[currentLevel]) {
        // If the user has finished the current sequence correctly
        if (userArray.length === actualArray.length) {
            setTimeout(proceedGame, 1000); // Proceed to the next level after 1 second
        }
    } else {
        gameOver(); // If the user's input is incorrect, end the game
    }
}

// Add event listeners to all buttons
for (const button of allButtons) {
    button.addEventListener("click", function(e) {
        if (playGame) {
            const userChosenColor = e.target.id;
            userArray.push(userChosenColor);
            animate(userChosenColor);
            playSound(userChosenColor);
            checkAnswer(userArray.length - 1);
        }
    });

    button.addEventListener("touchstart", function(e) {
        e.preventDefault();
        e.stopPropagation()
        e.stopImmediatePropagation()
        if (playGame) {
            const userChosenColor = e.target.id;
            userArray.push(userChosenColor);
            animate(userChosenColor);
            playSound(userChosenColor);
            checkAnswer(userArray.length - 1);
        }
    }, { passive: false });
}

// Function to play sound corresponding to a given color
function playSound(key) {
    let audio;
    switch (key) {
        case "green":
            audio = new Audio("sounds/green.mp3");
            audio.play();
            break;
        case "blue":
            audio = new Audio("sounds/blue.mp3");
            audio.play();
            break;
        case "red":
            audio = new Audio("sounds/red.mp3");
            audio.play();
            break;
        case "yellow":
            audio = new Audio("sounds/yellow.mp3");
            audio.play();
            break;
    }
}

// Function to animate button press
function animate(key) {
    const activeButton = document.querySelector("." + key); // Select the button based on the color key
    activeButton.classList.add("pressed"); // Add the 'pressed' class to the button
    setTimeout(function () {
        activeButton.classList.remove("pressed"); // Remove the 'pressed' class after 100ms
    }, 100);
}
