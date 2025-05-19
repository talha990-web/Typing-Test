const sentences = [
  "Typing is fun and fast.",
  "Practice makes perfect.",
  "JavaScript is powerful.",
  "Code every single day.",
  "Learn something new daily.",
  "Code is fun and challenging.",
  "Practice is key to success.",
  "Code every day.",
  "Learn something new.",
  "Code is fun.",
  "Typing is a useful skill.",
  "Stay focused and keep typing.",
  "The quick brown fox jumps over the lazy dog.",
  "Hello world, welcome to typing test.",
  "JavaScript is fun to learn.",
  "Coding improves logical thinking.",
  "Mistakes help you learn better.",
  "Keep calm and type on.",
  "Consistency is the key to success.",
  "Practice typing every day.",
  "Code is a skill that can be learned."
];

let randomSentence = "";
let timeLeft = 20;
let timerInterval;

function setRandomSentence() {
  const index = Math.floor(Math.random() * sentences.length);
  randomSentence = sentences[index];
  renderHighlightedSentence();
}

function setDifficulty() {
  const diffSelect = document.getElementById("difficulty");
  timeLeft = parseInt(diffSelect.value);
  document.getElementById("timer").textContent = `⏳ Time : ${timeLeft}s`;
}

function startTimer() {
  let currentTime = timeLeft;
  document.getElementById("timer").textContent = `⏳ Time : ${currentTime}s`;

  timerInterval = setInterval(() => {
    currentTime--;
    document.getElementById("timer").textContent = `⏳ Time : ${currentTime}s`;

    if (currentTime <= 0) {
      clearInterval(timerInterval);
      document.getElementById("message").textContent = "⛔ Time's up. Try again.";
      document.getElementById("typingInput").disabled = true;
    }
  }, 1000);
}

function renderHighlightedSentence() {
  document.getElementById("sentence").textContent = randomSentence;
}

function handleTyping() {
  playSound();

  const input = document.getElementById("typingInput").value;
  let output = "";

  for (let i = 0; i < randomSentence.length; i++) {
    if (i < input.length) {
      if (input[i] === randomSentence[i]) {
        output += `<span class="highlight-correct">${randomSentence[i]}</span>`;
      } else {
        output += `<span class="highlight-wrong">${randomSentence[i]}</span>`;
      }
    } else {
      output += randomSentence[i];
    }
  }

  document.getElementById("sentence").innerHTML = output;
}

function playSound() {
  const sound = document.getElementById("typingSound");
  sound.currentTime = 0;
  sound.play();
}

function checkTyping() {
  clearInterval(timerInterval);

  const userInput = document.getElementById("typingInput").value.trim();
  const targetText = randomSentence.trim();
  const messageEl = document.getElementById("message");
  const accuracyEl = document.getElementById("accuracy");

  if (userInput === targetText) {
    messageEl.textContent = "✅ Success. You typed it correctly.";
  } else {
    messageEl.textContent = "❌ You entered wrong text.";
  }

  let correctChars = 0;
  for (let i = 0; i < userInput.length; i++) {
    if (userInput[i] === targetText[i]) correctChars++;
  }
  const accuracy = Math.floor((correctChars / targetText.length) * 100);
  accuracyEl.textContent = `🎯 Accuracy: ${accuracy}%`;

  document.getElementById("typingInput").disabled = true;
}

function restartTest() {
  clearInterval(timerInterval);
  document.getElementById("typingInput").value = "";
  document.getElementById("message").textContent = "";
  document.getElementById("accuracy").textContent = "";
  setRandomSentence();
  document.getElementById("typingInput").disabled = false;
  document.getElementById("typingInput").focus();
  startTimer();
}

function startTest() {
  clearInterval(timerInterval);
  document.getElementById("message").textContent = "⏳ Get ready...";
  document.getElementById("typingInput").value = "";
  document.getElementById("typingInput").disabled = true;

  setDifficulty();

  setTimeout(() => {
    document.getElementById("message").textContent = "✅ Start Typing!";
    document.getElementById("typingInput").disabled = false;
    document.getElementById("typingInput").focus();
    setRandomSentence();
    startTimer();
  }, 2000);
}

setRandomSentence();
