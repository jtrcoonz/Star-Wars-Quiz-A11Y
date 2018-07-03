let questionNum = 1;

let correctAnswers = 0;

function questionTemplate(correctAnswers, question, questionsAnswered) {
  return `
    <section role="region" id="question-format">
     <form>
        <h1 id="question-content">${question.text}</h1>
        <fieldset role="radiogroup">
          <legend>Select One...</legend>
          <label>
            <input type="radio" name="option">
            <span>${question.ans1}</span>
          </label>
          <label>
            <input type="radio" name="option">
            <span>${question.ans2}</span>
          </label>
          <label>
            <input type="radio" name="option">
            <span>${question.ans3}</span>
          </label>
          <label>
            <input type="radio" name="option">
            <span>${question.ans4}</span>
          </label>
        </fieldset>
        <button type="button" id="js-submit-button">SUBMIT</button>
      </form>

      <div class="tracker">
        <span id="question-counter">Question ${question.number}/10</span>
        <span id="score-counter">Score: ${correctAnswers}/${questionsAnswered}</span>
      </div>
    </section>
  `;
}

function handleStartButton() {
  $('#js-start-button').click(function(event) {
    nextQuestion();
  });
}

function handleSubmitButton() {
  $('.container').on('click', '#js-submit-button', function(event) {
    event.preventDefault()

    const answer = $('input:checked').siblings('span');

    const userIsCorrect = checkUserAnswer(answer);
    if(userIsCorrect) {
      generateCorrectFeedback();
    } else {
      generateIncorrectFeedback();
    }
  });
}

function handleNextButton() {
  $('.container').on('click', '#js-next-button', function(event) {

    if(questionNum === 10) {
      createResultsPage(correctAnswers);
    } else {
      iterateQuestion();
      nextQuestion();
  }
  });
}

function handleRestartButton() {
  $('.container').on('click', '#js-restart-button', function(event) {

    questionNum = 1;

    correctAnswers = 0;

    nextQuestion();
  });
}

function nextQuestion() {

  const question = questionSet[questionNum - 1];

  const questionsAnswered = questionNum - 1;

  $('.container').html(questionTemplate(correctAnswers, question, questionsAnswered));
}

function checkUserAnswer(answer) {
  if(answer.text() === ANSWERS[questionNum - 1]) {
    return true;
  } else {
    return false;
  }
}

function generateCorrectFeedback() {
  $('.container').html(correctFeedback);
  iterateCorrectAnswers();
}

const correctFeedback = `
  <section role="region" class="correct-feedback-page">
    <div style="width:100%;height:100%;">
      <h2>Correct! BB-8 approves.</h2>
      <iframe src="https://giphy.com/embed/3o7abB06u9bNzA8lu8" title="bb-8-thumbs-up" width="75%" height="75%" frameBorder="0" class="correct-gif">
      </iframe>
    </div>
    <div>
      <button id="js-next-button" type="button">NEXT QUESTION</button>
    </div
  </section>
`;

function generateIncorrectFeedback() {
  $('.container').html(incorrectFeedbackTemplate(questionNum));
}

function incorrectFeedbackTemplate(questionNum) {
  return `
    <section role="region" class="incorrect-feedback-page">
      <div style="width:100%;height:100%px;">
        <h2>Oh, no! The correct answer was ${ANSWERS[questionNum - 1]}. Looks like The Empire won this round...</h2>
        <iframe src="https://giphy.com/embed/AcPT09jtaLbNK" title="alderaan-destruction" width="75%" height="75%" frameBorder="0" class="incorrect-gif">
        </iframe>
      </div>
      <div>
        <button id="js-next-button" type="button">NEXT QUESTION</button>
      </div>
    </section>
`;
}

function iterateQuestion() {
  questionNum++;
}

function iterateCorrectAnswers() {
  correctAnswers++;
}

function createResultsPage(correctAnswers) {
  $('.container').html(`
    <section role="region" class="end-page">
      <h2>Final Score: ${correctAnswers}/10</h2>
      <button id="js-restart-button" type="button">TRY AGAIN</button>
    </section>
  `);
}

function handleButtons() {
  handleStartButton();
  handleSubmitButton();
  handleNextButton();
  handleRestartButton();
}

handleButtons();
