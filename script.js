// How many fingers am I holding?
// Parts marked ORIGINAL (2018) are from the first version (see original/index.html);
// parts marked NEW were added in the rebuild. CHANGES.md explains each change.

var hand = document.getElementById("hand");
var fingers = hand.querySelectorAll(".finger");
var result = document.getElementById("result");
var choices = document.getElementById("choices");

// NEW: keep score
var score = 0;
var rounds = 0;

// NEW: one button per possible answer (0 to 5), instead of typing into a text box
for (var n = 0; n <= 5; n++) {
  var button = document.createElement("button");
  button.textContent = n;
  button.dataset.guess = n;
  choices.appendChild(button);
}

// NEW: a click on any number button plays a round
// (ORIGINAL (2018): document.getElementById("Check").onclick = function () { ... })
choices.addEventListener("click", function (event) {
  var button = event.target.closest("button");
  if (button) play(Number(button.dataset.guess));
});

function play(guess) {
  // ORIGINAL (2018): pick a random whole number from 0 to 5
  var x = Math.random();
  x = 6 * x;
  x = Math.floor(x);

  rounds++;
  showFingers(x); // NEW: the hand shows the answer

  // ORIGINAL (2018): compare the pick with the guess, same messages as before.
  // NEW: the message goes on the page instead of alert()
  if (x == guess) {
    score++;
    showResult("You Guessed it right!", "win");
  } else {
    showResult("You Guessed it wrong..!! I was holding up " + x + ".", "lose");
  }

  // NEW: update the score
  document.getElementById("score").textContent = score;
  document.getElementById("rounds").textContent = rounds;
}

// NEW: raise the first `count` fingers, lower the rest
function showFingers(count) {
  fingers.forEach(function (finger, i) {
    finger.classList.toggle("up", i < count);
  });
}

// NEW: write the message on the page, green for right and red for wrong
function showResult(text, kind) {
  result.textContent = text;
  result.className = "result " + kind;
}
