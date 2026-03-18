const questions = [
  {
    question: "Wat is het belangrijkste kenmerk van asynchrone online communicatie?",
    answers: [
      "A. De communicatie vindt plaats via video",
      "B. De deelnemers reageren niet gelijktijdig",
      "C. Er is altijd een moderator aanwezig",
      "D. De communicatie is uitsluitend tekstgebaseerd"
    ],
    correct: 1
  },
  {
    question: "Volgens de Social Presence Theory hangt de effectiviteit van online communicatie vooral af van:",
    answers: [
      "A. De snelheid van de internetverbinding",
      "B. Het aantal deelnemers",
      "C. De mate waarin een medium sociale aanwezigheid kan overbrengen",
      "D. De lengte van de berichten"
    ],
    correct: 2
  },
  {
    question: "Wat wordt bedoeld met “context collapse” op sociale media?",
    answers: [
      "A. Het verdwijnen van sociale netwerken",
      "B. Het samenvallen van verschillende publieksgroepen in één online context",
      "C. Het verliezen van internetverbinding tijdens een livestream",
      "D. Het verwijderen van oude berichten"
    ],
    correct: 1
  },
  {
    question: "Welke factor vergroot de kans op misinterpretatie bij tekstgebaseerde online communicatie het meest?",
    answers: [
      "A. Overmatig gebruik van emoji’s",
      "B. Gebrek aan non-verbale signalen",
      "C. Te veel hyperlinks",
      "D. Hoge resolutie van afbeeldingen"
    ],
    correct: 1
  },
  {
    question: "Wat is een belangrijk kenmerk van het “online disinhibition effect”?",
    answers: [
      "A. Mensen zijn online altijd formeler",
      "B. Mensen vertonen online sneller extreem of ongefilterd gedrag",
      "C. Online communicatie is trager dan offline communicatie",
      "D. Online gesprekken bevatten minder emotie"
    ],
    correct: 1
  },
  {
    question: "In het Shannon-Weaver communicatiemodel wordt ‘ruis’ gedefinieerd als:",
    answers: [
      "A. Elke vorm van auditief geluid",
      "B. Technische storingen tijdens videogesprekken",
      "C. Alles wat de overdracht van een boodschap verstoort",
      "D. Emotionele reacties van de ontvanger"
    ],
    correct: 2
  },
  {
    question: "Wat is een belangrijk verschil tussen synchrone en asynchrone communicatie?",
    answers: [
      "A. Synchrone communicatie vereist altijd beeld",
      "B. Asynchrone communicatie laat meer tijd voor reflectie",
      "C. Synchrone communicatie is altijd openbaar",
      "D. Asynchrone communicatie is alleen mogelijk via e-mail"
    ],
    correct: 1
  },
  {
    question: "Welke strategie vermindert de kans op escalatie in online discussies het meest?",
    answers: [
      "A. Sneller reageren dan de ander",
      "B. Gebruik van hoofdletters om duidelijkheid te scheppen",
      "C. Actief parafraseren van de ander",
      "D. Ironie gebruiken om spanning te breken"
    ],
    correct: 2
  },
  {
    question: "Wat wordt bedoeld met “filter bubbles” in online communicatie?",
    answers: [
      "A. Tijdelijke blokkering van accounts",
      "B. Gepersonaliseerde informatieomgevingen die afwijkende meningen beperken",
      "C. Versleutelde chatgesprekken",
      "D. Het automatisch verwijderen van spam"
    ],
    correct: 1
  },
  {
    question: "Welke rol speelt algoritmische curatie in online communicatie?",
    answers: [
      "A. Het handmatig controleren van alle berichten",
      "B. Het willekeurig tonen van berichten",
      "C. Het selecteren en rangschikken van content op basis van data en gedrag",
      "D. Het verwijderen van alle negatieve reacties"
    ],
    correct: 2
  }
];

let currentQuestionIndex = 0;
let selectedAnswer = null;

document.addEventListener('DOMContentLoaded', function() {
  // Welcome overlay handled by main_page.js

  const urlParams = new URLSearchParams(window.location.search);
  currentQuestionIndex = parseInt(urlParams.get('q')) || parseInt(sessionStorage.getItem('currentQ')) || 0;
  selectedAnswer = parseInt(sessionStorage.getItem('selectedAns_' + currentQuestionIndex)) || null;

  const questionEl = document.getElementById('question-text');
  const cards = document.querySelectorAll('.card');
  const answerBtn = document.querySelector('.answer');

  if (!questionEl || cards.length !== 4) {
    console.error('Quiz elements not found');
    return;
  }

  // Load question
  loadQuestion();

  // Card clicks
  cards.forEach((card, index) => {
    card.addEventListener('click', () => {
      cards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      selectedAnswer = index;
      sessionStorage.setItem('selectedAns_' + currentQuestionIndex, selectedAnswer);
    });
  });

  // Restore selected if any
  if (selectedAnswer !== null && selectedAnswer < 4) {
    cards[selectedAnswer].classList.add('selected');
  }

  // Answer button
  answerBtn.addEventListener('click', () => {
    if (selectedAnswer === null) {
      alert('Selecteer een antwoord');
      return;
    }

    sessionStorage.setItem('ans_' + currentQuestionIndex, selectedAnswer);

    if (currentQuestionIndex < 9) {
      currentQuestionIndex++;
      sessionStorage.setItem('currentQ', currentQuestionIndex);
      window.location.href = `question${currentQuestionIndex + 1}.html?q=${currentQuestionIndex + 1}`;
    } else {
      // Calculate score
      let score = 0;
      for (let i = 0; i < 10; i++) {
        const userAns = parseInt(sessionStorage.getItem('ans_' + i)) || -1;
        if (userAns === questions[i].correct) score++;
      }
      localStorage.setItem('score_online_communicatie', score);
      window.location.href = 'resultaat.html';
    }
  });
});

function loadQuestion() {
  const questionEl = document.getElementById('question-text');
  const cards = document.querySelectorAll('.card');
  if (currentQuestionIndex >= questions.length) {
    window.location.href = 'resultaat.html';
    return;
  }
  const q = questions[currentQuestionIndex];


  questionEl.textContent = q.question;

  cards.forEach((card, index) => {
    card.textContent = q.answers[index];
    card.dataset.answer = index;
    if (parseInt(card.dataset.answer) === selectedAnswer) {
      card.classList.add('selected');
    } else {
      card.classList.remove('selected');
    }
  });
}
