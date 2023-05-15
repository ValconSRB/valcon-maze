import { clearStateOnFinishAndReload } from "./script.js";

const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const overlay = document.getElementById("overlay");
const icon = document.querySelector(".fab");
const congratulationsModal = document.getElementById("modal-container");
const questionCounter =
  congratulationsModal.querySelector(".questions-counter");
const gradeContainer = congratulationsModal.querySelector(".grade-container");
const preContainer = document.querySelector("pre");
const codeContainer = document.querySelector("code");

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

function showCodeQuestion(question) {
  const { question: questionText, codeBlock, programmingLang } = question;

  questionElement.innerText = "";
  preContainer.classList = "";

  switch (programmingLang) {
    case "javascript":
      preContainer.classList.add("language-javascript");
      break;
    case "java":
      preContainer.classList.add("language-java");
      break;
    default:
      return (questionElement.innerText = questionText);
  }

  if (codeBlock) {
    preContainer.style.display = "flex";
    codeContainer.innerText = codeBlock;
  } else {
    preContainer.style.display = "none";
  }

  questionElement.innerText = questionText;
}

function showQuestion(question, mazeInstance) {
  showLangIcon(question);
  showCodeQuestion(question);
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
  question: "Koja novosadska firma se pridružila Evropskoj grupaciji Valcon?",
  answers: [
    { text: "Hybrid IT", correct: true },
    { text: "nQode", correct: false }
  ],
  programmingLang: "valcon",
},
{
  id: 2,
  question: "Kada je Hybrid IT promenio ime u Valcon?",
  answers: [
    { text: "2020", correct: false },
    { text: "2023", correct: true },
  ],
  programmingLang: "valcon",
},
{
  id: 3,
  question: "Hybrid IT je organizovao kvizove za studente?",
  answers: [
    { text: "Tačno", correct: true },
    { text: "Netačno", correct: false },
  ],
  programmingLang: "valcon",
},
{
  id: 4,
  question: "Valcon nije pet friendly?",
  answers: [
    { text: "Tačno", correct: false },
    { text: "Netačno", correct: true },
  ],
  programmingLang: "valcon",
},
{
  id: 5,
  question: "Gde se nalazi Valcon u Novom Sadu?",
  answers: [
    { text: "Na Limanu 3", correct: false },
    { text: "U Bazaru", correct: true },
  ],
  programmingLang: "valcon",
},
{
  id: 6,
  question: "Osim u Novom Sadu, imamo kancelariju i u:",
  answers: [
    { text: "Zrenjaninu", correct: false },
    { text: "Beogradu", correct: true },
  ],
  programmingLang: "valcon",
},
{
  id: 7,
  question: "U Valconu trenutno ima: ",
  answers: [
    { text: "500 zaposlenih", correct: false },
    { text: "200 zaposlenih", correct: true },
  ],
  programmingLang: "valcon",
},
{
  id: 8,
  question: "Omiljeni benefit Valkonovaca je:",
  answers: [
    { text: "Obezbeđen ručak", correct: true },
    { text: "Fitpass", correct: false },
  ],
  programmingLang: "valcon",
},
{
  id: 9,
  question: "Valcon",
  answers: [
    { text: "je outsourcing kompanija", correct: true },
    { text: "je product kompanija", correct: false },
  ],
  programmingLang: "valcon",
},
{
  id: 10,
  question: "Valcon ima svoj kafić.",
  answers: [
    { text: "Tačno", correct: true },
    { text: "Netačno", correct: false },
  ],
  programmingLang: "valcon",
},
{
  id: 11,
  question: "Gde je sedište Valcona?",
  answers: [
    { text: "u Velikoj Britaniji", correct: false },
    { text: "u Holandiji", correct: true },
  ],
  programmingLang: "valcon",
},
{
  id: 12,
  question: "Kako se zvao kviz za studente, koje je organizovao Hybrid IT?",
  answers: [
    { text: "Folk kviz", correct: false },
    { text: "Treš kviz", correct: true },
  ],
  programmingLang: "valcon",
},
{
  id: 13,
  question: "Gde se nalazi nova kancelarija Valcona u Beogradu?",
  answers: [
    { text: "Skyline", correct: true },
    { text: "Na Novom Beogradu", correct: false },
  ],
  programmingLang: "valcon",
},
{
  id: 14,
  question: "Gde je Valcon u januaru otvorio kancelariju?",
  answers: [
    { text: "Sarajevo", correct: false },
    { text: "Banja Luka", correct: true },
  ],
  programmingLang: "valcon",
},
{
  id: 15,
  question: "Kako se zove kafić u Valconu?",
  answers: [
    { text: "Valcon caffe", correct: false },
    { text: "Humanitarni kafić", correct: true },
  ],
  programmingLang: "valcon",
},
{
  id: 16,
  question: "Poslednji tim bilding je bio:",
  answers: [
    { text: "Rakijada", correct: true },
    { text: "Rafting", correct: false },
  ],
  programmingLang: "valcon",
},
{
  id: 17,
  question: "Da li smo sportski orijentisani?",
  answers: [
    { text: "Nikako", correct: false },
    { text: "Da", correct: true },
  ],
  programmingLang: "valcon",
},
{
  id: 18,
  question: "Koju rakiju pijemo u Valconu?",
  answers: [
    { text: "Šljivovica", correct: false },
    { text: "Šamar", correct: true },
  ],
  programmingLang: "valcon",
},
{
  id: 19,
  question: "Terasa u NS kancu ima 300 kvadrata?",
  answers: [
    { text: "Da", correct: true },
    { text: "Ne", correct: false },
  ],
  programmingLang: "valcon",
},
{
  id: 20,
  question: "Šta znači Valcon?",
  answers: [
    { text: "Value Consulting", correct: true },
    { text: "Smart and creative individual", correct: false },
  ],
  programmingLang: "valcon",
},
{
  id: 21,
  question: "Valcon HR tim broji:",
  answers: [
    { text: "5 kolega", correct: true },
    { text: "10 kolega", correct: false },
  ],
  programmingLang: "valcon",
},
{
  id: 22,
  question: "Na Kontehu smo posluživali: ",
  answers: [
    { text: "Pitu", correct: false },
    { text: "Kafu", correct: true },
  ],
  programmingLang: "valcon",
},
{
  id: 23,
  question: "Da li imamo Valcon blend coffee?",
  answers: [
    { text: "Da", correct: true },
    { text: "Ne", correct: false },
  ],
  programmingLang: "valcon",
},
{
  id: 24,
  question: "Da li Valcon ima svoje saune?",
  answers: [
    { text: "Da", correct: true },
    { text: "Ne", correct: false },
  ],
  programmingLang: "valcon",
},
{
  id: 25,
  question: "Valcon nudi opciju remote rada?",
  answers: [
    { text: "Ne", correct: false },
    { text: "Da", correct: true },
  ],
  programmingLang: "valcon",
},
{
  id: 26,
  question: "Valcon kancelarije uvek nude:",
  answers: [
    { text: "Sveže voće", correct: true },
    { text: "Gotove cedjene sokove", correct: false },
  ],
  programmingLang: "valcon",
},
{
  id: 27,
  question: "Da li imamo četvorodnevno radno vreme:",
  answers: [
    { text: "Da", correct: false },
    { text: "Ne", correct: true },
  ],
  programmingLang: "valcon",
},
{
  id: 28,
  question: "Pored Mac opreme, naše kolege preferiraju i: ",
  answers: [
    { text: "Dell", correct: true },
    { text: "hp", correct: false },
  ],
  programmingLang: "valcon",
},
{
  id: 29,
  question: "Da li smo ove godine organizovali karaoke žurku?",
  answers: [
    { text: "Da", correct: true },
    { text: "Ne", correct: false },
  ],
  programmingLang: "valcon",
},
{
  id: 30,
  question: "Novogodišnja žurka održana je u: ",
  answers: [
    { text: "Magacinu", correct: false },
    { text: "Pupinu", correct: true },
  ],
  programmingLang: "valcon",
}
]

const questionsTech = [
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
    question: `Šta će biti rezultat izvršavanja koda?`,
    codeBlock: `static void main(String args[]) {
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
    question: `Šta će ove dve komande ispisati?`,
    codeBlock: `
    console.log(0.1 + 0.2);
    console.log(0.1 + 0.2 == 0.3);
    `,
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
    question: `Koji je rezultat sledeće funkcije?`,
    codeBlock: `(function() {
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
    question: `Šta ce biti ispisano nakon izvršenja ovih komandi?`,
    codeBlock: `
    console.log(false == '0');
    console.log(false === '0');`,
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
    question: `Šta će biti ispisano na izlazu?`,
    codeBlock: `name = “Pera” ?? “Zika”;`,
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
    question: `Šta će biti ispisano na izlazu?`,
    codeBlock: `
    a = new int[] { 0, ‘0’ };
    Console.WriteLine(a[0] + a[1]);`,
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
    question: `Šta će biti ispisano na izlazu?`,
    codeBlock: `var zero = 0;
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
