'use strict';

const requestURL = 'https://api.jsonbin.io/b/602bd1600665b21b00b81b1b'; // создаем ссылку на нужный файл JSON

let getJSON = function(url, ...callback) { // асинхронный запрос XMLHttpRequest
   const xhr = new XMLHttpRequest(); // создаем новый объект запроса
   xhr.open('GET', url, true); // открываем запрос методом open(); туда всегда передается минимум два параметра - метод (GET/POST/ets) и ссылка на JSON. True указан для того, чтобы явно указать, что запрос будет обрабатываться асинхронно
   xhr.responseType = 'json'; // прописываем для XHR (XMLHttpRequest), что сервер будет возвращать JSON
   xhr.onload = function() { // создается функция обработчик события onload
     const status = xhr.status; // проверяем HTTP статус
     if (status === 200) {
       if (callback) {
         callback[0](null, xhr.response);
       }
     } else if (status !== 200) {
         callback[1](status);
       }
 };
   xhr.send(); // отправляем запрос на сервер методом send()
};

function showError (status, response) {
  this.classList.add('err');
  this.innerText = `Ошибка ${status}. Обновите страницу`;
}
