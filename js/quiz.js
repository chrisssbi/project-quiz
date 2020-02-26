'use strict';

const answersWrap = document.createElement('div'); // куда делаем выгрузку вопросов
const btnNext = document.createElement('button');
const wrap = document.querySelector('.question');  //  обертка вопроса

let questions = [];
let questionNr = 0;
let allres = [];
let res = 0;
let total = 0;
let selectedElement;

function showQuestion(status, response) { // оформляем вывод данных на странице
  questions = response.quiz; // вопросы и ответы
  const answer = questions[questionNr].answers; // ответы вопроса номер
  let answers = '';
  wrap.innerHTML = ''; // очищаем обертку от содержимого

  wrap.insertAdjacentHTML('afterbegin', `
    <h2>Вопрос ${questionNr+1}/${questions.length}</h2>
    <h3>${questions[questionNr].question}</h3>
  `); // создаем заголовок вопроса

  answersWrap.classList.add('question__answers'); // присваиваем класс обертке (отдельно создавалось для того, чтобы )
  for (let nr in answer) {
    answers += `
      <div class="question__answers__item" data-value="${answer[nr].value}">
        ${answer[nr].text}
      </div>
    `;
  }
  answersWrap.innerHTML = `${answers}`;
  wrap.append(answersWrap);
  createBtn(); // вызов функции генерации кнопки
}

function progressBarQuiz(status, response) {
  const progressbar = document.querySelector('.progressbar');
  let progress = '';
  questions = response.quiz;
  for (let nr in questions) {
    progress = progress + `
      <li class="bullet" style="width:calc(100%/${questions.length})">
        ${+nr+1}
      </li>`;
  }
  progressbar.innerHTML = `${progress}`;
}

function saveResults() { // сохраняем результаты в массив
  allres.push(+res);
  console.log(allres); // НА УДАЛЕНИЕ
}

function createBtn() { // создаем кнопку вперед
  btnNext.classList.add('btn');
  btnNext.disabled = true;
  btnNext.classList.add('btn__disabled');
  wrap.append(btnNext);
  btnNext.innerText = 'Дальше';
  if (questionNr === questions.length-1) {
    btnNext.innerText = 'Увидеть результат';
    btnNext.classList.add('result');
    btnNext.addEventListener('click', () => { // переход на страницу результата
      window.location.href = 'result.html';
      localStorage.setItem('score', total);
    });
  }
}

btnNext.addEventListener('click', () => {
  getJSON(requestURL, showQuestion, true);
  questionNr++;
  if (questionNr < questions.length) {
    let allprogress;
    let bullet = [...document.querySelectorAll('.bullet')];
    allprogress += bullet[questionNr].classList.add('active');
  }
  saveResults();
  total = allres.reduce((sum, current) => sum + current, 0);
  console.log(total); // НА УДАЛЕНИЕ
});

answersWrap.addEventListener('click', (event) => {
  const target = event.target;
  if (target.getAttribute('data-value')) { // проверка на null
    res = target.getAttribute('data-value');
    btnNext.disabled = false;
    btnNext.classList.remove('btn__disabled');
    highlight(target); // выполнение функции выделения выбранного ответа
  }
  console.log(res); // НА УДАЛЕНИЕ
});

function highlight(node) { // выделение выбранного элемента
  if (selectedElement) {
    selectedElement.classList.remove('selected');
  }
  selectedElement = node;
  selectedElement.classList.add('selected');
}
