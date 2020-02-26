'use strict';

const buttons = [...document.querySelectorAll('.btn')];

getJSON(requestURL, showResult, showError, true);

function showResult(status, response) {
  let total = localStorage.getItem('score');
  const wrap = document.querySelector('.result'); // обертка результата
  const result = response.results; // результаты
  if (total === null) {
    wrap.classList.add('err');
    wrap.innerHTML = 'Для получения результата нужно пройти тест';
  }
  for (let key in result) {
    if (total >= result[key].range[0] && total <= result[key].range[1]) {
      wrap.insertAdjacentHTML('afterbegin', `
      <h3>${result[key].heading}</h3>
      <p>${result[key].description}</p>
      `);
    }
  }
  console.log(total); // на удаление
}

for (let nr in buttons) {
  buttons[nr].addEventListener('click', () => {
    total = localStorage.removeItem('score');
  });
}
