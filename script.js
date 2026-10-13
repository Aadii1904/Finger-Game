// How many fingers am I holding? Pick 0-5 and see if you can read my mind.
var MAX_FINGERS = 5;
var BEAT_MS = 420; // one pump of the fist during the 3-2-1 countdown

// People who prefer less motion skip the countdown and confetti
var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

var hand = document.getElementById("hand");
var fingers = hand.querySelectorAll(".finger");
var result = document.getElementById("result");
var choices = document.getElementById("choices");
var confetti = document.getElementById("confetti");

var score = 0;
var rounds = 0;
var streak = 0;

// One button per possible answer, 0 to 5
for (var n = 0; n <= MAX_FINGERS; n++) {
  var button = document.createElement("button");
  button.textContent = n;
  button.dataset.guess = n;
  button.setAttribute("aria-label", "Guess " + n);
  choices.appendChild(button);
}

choices.addEventListener("click", function (event) {
  var button = event.target.closest("button");
  if (!button || choices.classList.contains("busy")) return;
  play(Number(button.dataset.guess), button);
});

function play(guess, button) {
  // Same idea as the original game: a whole number from 0 to 5
  var holding = Math.floor(Math.random() * (MAX_FINGERS + 1));
  rounds++;

  choices.classList.add("busy");
  button.classList.add("picked");
  showFingers(0); // close the hand into a fist

  if (reduceMotion) {
    showFingers(holding);
    reveal(guess, holding, button);
    return;
  }

  // Rock-paper-scissors style: the fist pumps three times, "3... 2... 1..."
  var beats = ["3", "2", "1"];
  var beat = 0;
  hand.classList.add("pumping");
  setResult(beats[beat], "count");

  var timer = setInterval(function () {
    beat++;
    if (beat < beats.length) {
      setResult(beats[beat], "count");
      return;
    }
    clearInterval(timer);
    hand.classList.remove("pumping");
    showFingers(holding); // the fingers spring up one after another (see style.css)
    setTimeout(function () {
      reveal(guess, holding, button);
    }, 500);
  }, BEAT_MS);
}

function reveal(guess, holding, button) {
  var right = guess === holding;
  if (right) {
    score++;
    streak++;
    setResult("You guessed it right!", "win");
    playAnimation(hand, "celebrate");
    burstConfetti();
  } else {
    streak = 0;
    setResult("Not quite. I was holding up " + holding + ".", "lose");
    playAnimation(hand, "nope");
  }
  button.classList.add(right ? "win" : "lose");

  console.log("Guess:", guess, "| Holding:", holding, "|", right ? "right" : "wrong");
  updateScore(right);

  setTimeout(function () {
    button.classList.remove("win", "lose", "picked");
    choices.classList.remove("busy");
  }, 1000);
}

function showFingers(count) {
  fingers.forEach(function (finger, i) {
    finger.classList.toggle("up", i < count);
  });
}

// Sets the message and restarts its little pop animation
function setResult(text, kind) {
  result.textContent = text;
  result.className = "result";
  void result.offsetWidth; // reflow, so the same animation can play again
  result.className = "result " + kind;
}

// Adds a one-off animation class and removes it once the animation ends
function playAnimation(element, name) {
  element.classList.remove(name);
  void element.offsetWidth;
  element.classList.add(name);
  element.addEventListener(
    "animationend",
    function () {
      element.classList.remove(name);
    },
    { once: true }
  );
}

function updateScore(right) {
  document.getElementById("score").textContent = score;
  document.getElementById("rounds").textContent = rounds;
  document.getElementById("streak").textContent = streak;
  document.getElementById("streak-box").classList.toggle("hot", streak >= 3);
  if (right && !reduceMotion) playAnimation(document.getElementById("score"), "bump");
}

// A quick burst of paper confetti over the hand
function burstConfetti() {
  if (reduceMotion) return;
  var colors = ["#f97316", "#facc15", "#22c55e", "#38bdf8", "#ec4899"];
  for (var i = 0; i < 26; i++) {
    var piece = document.createElement("span");
    piece.style.left = 50 + (Math.random() - 0.5) * 30 + "%";
    piece.style.background = colors[i % colors.length];
    piece.style.setProperty("--dx", (Math.random() - 0.5) * 260 + "px");
    piece.style.setProperty("--dy", -(80 + Math.random() * 120) + "px");
    piece.style.setProperty("--spin", (Math.random() - 0.5) * 720 + "deg");
    piece.style.animationDelay = Math.random() * 0.12 + "s";
    confetti.appendChild(piece);
  }
  setTimeout(function () {
    confetti.innerHTML = "";
  }, 1600);
}
