'use strict';

document.body.onload = function createPreloader() {
    wrap.innerHTML = '...идет загрузка';
}
function stop() {
  getJSON(requestURL, showQuestion, showError, true);
  getJSON(requestURL, progressBarQuiz, true);
}
setTimeout(stop, 1000);
