import { clearStateOnFinishAndReload } from "./script.js";

const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const overlay = document.getElementById("overlay");
const icon = document.querySelector(".fab");
const congratulationsModal = document.getElementById("modal-container");
const questionCounter =
  congratulationsModal.querySelector(".questions-counter");
const gradeContainer = congratulationsModal.querySelector(".grade-container");

let timeOutID;
let correctAnswers = 0;
let shuffledQuestions = [];
let currentQuestionIndex = 0;
let numberOfQuestions = 0;

export function initQuestions() {
  shuffledQuestions = questions.sort(() => Math.random() - 0.5).slice(0, 5);
}

export function returnScore() {
  return correctAnswers;
}

export function openQuiz() {
  clearTimeout(timeOutID);
  overlay.style.display = "flex";
  numberOfQuestions++;
  resetState();
  showQuestion(selectQuestion(), this);
}

function selectQuestion() {
  const question = shuffledQuestions[currentQuestionIndex];
  currentQuestionIndex++;
  return question;
}

function showLangIcon(answer) {
  switch (answer?.programmingLang) {
    case "java":
      icon.classList.add("fa-java");
      break;
    case "javascript":
      icon.classList.add("fa-js-square");
      break;
    default:
      break;
  }
}

function showQuestion(question, mazeInstance) {
  showLangIcon(question);
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", function (e) {
      selectAnswer(e, mazeInstance);
    });
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  icon.classList = "fab";
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}
function congratulationModal() {
  let gradeText = "";
  switch (correctAnswers) {
    case 0:
      gradeText += "Da li si siguran da si na pravom mestu? 😁";
      break;
    case 1:
      gradeText += "Sedi, jedan! 😄";
      break;
    case 2:
    case 3:
      gradeText += "Ok, nije kritično 😅";
      break;
    case 4:
      gradeText += "Na pravom si putu 👍";
      break;
    case 5:
      gradeText += "Kidaš 💪";
      break;
    default:
      return;
  }

  questionCounter.innerText = `${correctAnswers}/${numberOfQuestions}`;
  gradeContainer.innerText = `${gradeText}`;

  // this is because of setTimeOut in selectAnswers()
  overlay.style.display = "none";
  congratulationsModal.style.display = "flex";
  clearStateOnFinishAndReload();
}

function selectAnswer(e, mazeInstance) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (correct) correctAnswers++;
  timeOutID = setTimeout(function () {
    overlay.style.display = "none";
  }, 800);
  mazeInstance.quizValue = false;
  mazeInstance.removeGoal();

  if (mazeInstance.checkForFinish()) {
    congratulationModal();
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

const questions = [
  {
    id: 1,
    question: "java.util.Collection je:",
    answers: [
      { text: "Class", correct: false },
      { text: "Interface", correct: true },
    ],
    programmingLang: "java",
  },
  {
    id: 2,
    question: `Šta će biti rezultat izvršavanja koda?
    static void main(String args[]) {
        System.out.printin(this);
    }`,
    answers: [
      { text: "this", correct: false },
      { text: "Compile time error", correct: true },
    ],
    programmingLang: "java",
  },
  {
    id: 3,
    question: "Koji od ponuđenih interfejsa NIJE deo spring-data-commons?",
    answers: [
      { text: "JpaRepository", correct: true },
      { text: "PagingAndSortingRepository", correct: false },
    ],
    programmingLang: "java",
  },
  {
    id: 4,
    question: "Koja od ponuđenih tvrdnji NIJE istinita u Spring Boot-u?",
    answers: [
      {
        text: "Dependency Injection se može postignuti korišćenjem @Configuration anotacije",
        correct: true,
      },
      {
        text: "Dependency Injection se može postignuti korišćenjem @Autowired anotacije",
        correct: false,
      },
    ],
    programmingLang: "java",
  },
  {
    id: 5,
    question: `Šta će ove dve komande ispisati? 
        console.log(0.1 + 0.2);
        console.log(0.1 + 0.2 == 0.3);`,
    answers: [
      {
        text: " 0.30000000000000004, false",
        correct: true,
      },
      {
        text: "0.30000000000000004, true",
        correct: false,
      },
    ],
    programmingLang: "javascript",
  },
  {
    id: 6,
    question: `Koji je rezultat sledeće funkcije?
        (function() {
            console.log(1);
            setTimeout(function(){console.log(2)}, 1000);
            setTimeout(function(){console.log(3)}, 0);
            console.log(4);
        })();`,
    answers: [
      {
        text: "1 3 2 4",
        correct: false,
      },
      {
        text: "1 4 3 2",
        correct: true,
      },
    ],
    programmingLang: "javascript",
  },
  {
    id: 7,
    question: `Šta ce biti ispisano nakon izvršenja ovih komandi?
        console.log(false == '0')
        console.log(false === '0')`,
    answers: [
      {
        text: "true, false",
        correct: true,
      },
      {
        text: "false, true",
        correct: false,
      },
    ],
    programmingLang: "javascript",
  },
  {
    id: 8,
    question: `Šta će biti ispisano na izlazu?
        name = “Pera” ?? “Zika”;`,
    answers: [
      {
        text: "Pera",
        correct: true,
      },
      {
        text: "Zika",
        correct: false,
      },
    ],
    programmingLang: "javascript",
  },
  {
    id: 9,
    question: `Šta će biti ispisano na izlazu?
        a = new int[] { 0, ‘0’ };
        Console.WriteLine(a[0] + a[1]);
    `,
    answers: [
      {
        text: "0",
        correct: false,
      },
      {
        text: "48",
        correct: true,
      },
    ],
    programmingLang: "java",
  },
  {
    id: 10,
    question: `Šta će biti ispisano na izlazu?
        var zero = 0;
        try{
            System.out.println(42 / 0.0);
            System.out.println(42.0 / 0);
            System.out.println(42 / zero);
        }catch (ArithmeticException e){
            System.out.println("DivideByZeroException");
        }`,
    answers: [
      {
        text: `Infinity
            Infinity 
            Infinity`,
        correct: false,
      },
      {
        text: `Infinity
             Infinity
             DivideByZeroException`,
        correct: true,
      },
    ],
    programmingLang: "java",
  },
  {
    id: 11,
    question: "Šta je load-ballancing?",
    answers: [
      {
        text: "Efikasno raspoređivanje dolazećeg saobraćanja na više replika u okviru jedne grupe.",
        correct: true,
      },
      {
        text: " Efikasno raspoređivanje dolazećeg saobraćanja na više replika u okviru više grupa.",
        correct: false,
      },
    ],
    programmingLang: "java",
  },
  {
    id: 12,
    question: "Šta je horizontalno skaliranje?",
    answers: [
      {
        text: "Pokretanje dodatnih replika postojeće instance kako bi se smanjilo opterećenje te instance",
        correct: true,
      },
      {
        text: "Povećavanje procesorske moći ili memorije postojeće instance kako bi se smanjilo opterećenje iste.",
        correct: false,
      },
    ],
    programmingLang: "java",
  },
];
