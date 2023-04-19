import { openQuiz, returnScore, initQuestions } from "./quiz.js";
import Maze from "./maze.js";
import { insertData, updateData } from "./db.js";
import { checkInputs } from "./form-data.js";

const formContainer = document.querySelector(".onboarding-form");
const form = document.getElementById("form");
const submitButton = document.querySelector("#submit-button");
const submitButtonContent = document.querySelector(".form-btn div");
const gameExplanationOverlay = document.getElementById(
  "game-explanation-overlay"
);

const failureModal = document.getElementById("failure-modal");
const explanationButton = document.querySelector(".explanation-button");
const timerElement = document.getElementById("timer");
const timeEl = document.getElementById("time");

const gameExplanationModal = document.getElementById("game-modal");

let levels = [];
levels[0] = {
  map: [
    [1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0],
    [1, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1],
    [0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1],
    [0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0],
    [0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
    [1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1],
    [0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1],
  ],
  player: {
    x: 0,
    y: 11,
  },
  goals: [
    {
      id: 0,
      x: 0,
      y: 4,
    },
    {
      id: 1,
      x: 0,
      y: 9,
    },
    {
      id: 2,
      x: 4,
      y: 2,
    },
    {
      id: 3,
      x: 7,
      y: 5,
    },
    {
      id: 4,
      x: 11,
      y: 0,
    },
  ],
  theme: "default",
};

const isVisited = JSON.parse(sessionStorage.getItem("visited"));

window.onload = function() {
  if (isVisited) {
    formContainer.style.display = "flex";
    sessionStorage.clear();
    location.reload();
  }
}

if (!isVisited) {
  formContainer.style.display = "flex";
} else {
  formContainer.style.display = "none";
  // formContainer.classList.add("exit-animation");
  new Maze("game-container-1", levels[0], openQuiz, goalsLength);
}

let timerInterval;
let globalTimeLeftInQuiz;

function showExplanation(isModalOpen) {
  gameExplanationOverlay.style.visibility = isModalOpen ? "hidden" : "visible";
  gameExplanationModal.style.display = isModalOpen ? "none" : "flex";
}

function showTimer() {
  timerElement.style.display = "flex";
}

function showFailureModal() {
  timerElement.style.display = "none";
  gameExplanationOverlay.style.visibility = "visible";
  failureModal.style.cssText = `
    display:flex;
    z-index:1`;
  clearStateOnFinishAndReload();
}

let goalsLeft;

function goalsLength(goalsLength) {
  goalsLeft = goalsLength;
}

// Get data from form
function getData(form) {
  const formData = new FormData(form);

  return Object.fromEntries(formData);
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  showExplanation(false);

  let data;
  let req;

  if (checkInputs()) {
    submitButton.setAttribute("disabled", "true");
    submitButtonContent.classList.add("loading");
    data = getData(form);
    req = await insertData({ ...data });
  }

  if (req) {
    sessionStorage.setItem("row", req.rowIndex);
    formContainer.classList.add("exit-animation");
    new Maze("game-container-1", levels[0], openQuiz, goalsLength);
    submitButtonContent.classList.remove("loading");
  }
});

export async function clearStateOnFinishAndReload() {
  const score = returnScore();
  const requestUpdate = await updateData({
    score: score,
    requiredTime: globalTimeLeftInQuiz,
  });

  if (requestUpdate) {
    setTimeout(() => {
      sessionStorage.clear();
      window.location.reload();
    }, 3000);
  }
}

let timeLimit = 120;
let timeLeft = timeLimit;
let finishTime;
function timerUpdate() {
  // Decrement the seconds remaining
  timeLeft--;

  // Convert seconds to minutes and seconds
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  // Update the timer display
  timeEl.textContent = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  // If time is up, stop the timer
  finishTime = timeLimit - timeLeft;
  globalTimeLeftInQuiz = finishTime;

  if (timeLeft === 0) {
    clearInterval(timerInterval);
    showFailureModal();
  }
  if (goalsLeft === 1) {
    globalTimeLeftInQuiz = finishTime;
    clearInterval(timerInterval);
  }
}

function startButtonHandler() {
  showTimer();
  initQuestions();
  // remove modal and overlay
  showExplanation(true);
  timerInterval = setInterval(timerUpdate, 1000);
}

explanationButton.addEventListener("click", startButtonHandler);
