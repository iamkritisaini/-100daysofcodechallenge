const questions=[
  {
    question:"Which is largest animal in the world?",
    answers:[
      {text:'Shark',correct : false},
      {text:'Blue whale',correct : true},
      {text:'Elephant',correct : false},
      {text:'Girrafe',correct : false},
    ]
  },
  {
    question:"Which is the smallest continent in the world?",
    answers:[
      {text:'Asia',correct : false},
      {text:'Australia',correct : true},
      {text:'Arctic',correct : false},
      {text:'Africa',correct : false},
    ]
  },
  {
    question:". The hottest planet in the solar system?",
    answers:[
      {text:'Mercury',correct : false},
      {text:'Venus',correct : true},
      {text:'Mars',correct : false},
      {text:'Jupiter',correct : false},
    ]
  }
  
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
  currentQuestionIndex=0;
  score=0;
  nextButton.innerHTML="Next";
  showQuestion();
}

function showQuestion(){
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML=answer.text;
    button.classList.add("btn");
    answerButton.appendChild(button); // Corrected method name
    if(answer.correct){
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click",selectAnswer);
  });
}


function resetState(){
  nextButton.style.display="none";
  while(answerButton.firstChild){
    answerButton.removeChild(answerButton.firstChild);
  }
}

function selectAnswer(e){
  const selectedBtn= e.target;
  const iscorrect = selectedBtn.dataset.correct === "true";
    if(iscorrect){
      selectedBtn.classList.add("correct");
      score++;
    }else{
      selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
         if(button.dataset.correct === "true"){
          button.classList.add("correct");
         }
         button.disabled=true;
    });
    nextButton.style.display="block";
}

function showScore(){
   resetState();
   questionElement.innerHTML=`You scored ${score} out of ${questions.length}!`;
   nextButton.innerHTML="Play Again";
   nextButton.style.display="block";
}


function handleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex< questions.length){
    showQuestion();
  }else{
    showScore();
  }
}

nextButton.addEventListener("click",()=>{
   if(currentQuestionIndex<questions.length){
      handleNextButton();
   }else{
    startQuiz();
   }
});

startQuiz();