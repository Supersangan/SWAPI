// скрываем отоборажение данных персонажа
document.querySelector(".person_data").hidden = true;

// Обрабатываем клик по кнопке
document.querySelector("#search_request_btn").addEventListener("click", function () {
  let searchQuery = document.querySelector("#person_search_input").value;
  let searchResourse = document.querySelector("#search_resource_select").value;

  getSwapiResoruse(searchQuery, searchResourse);
});

// Получаем данные от SWAPI через XHR
function getSwapiResoruse(searchQuery, searchResourse) {
  // Сохраняем адрес API
  let api = "https://swapi.dev/api/";

  // Формируем полный адрес запроса:
  let url = api + searchResourse + "/?search="; // добавляем к запросу тип необходимых данных подробно о формате https://swapi.dev/documentation

  url += searchQuery; // значение переменной запроса search

  // Таким образом формируется строка вида:
  // https://swapi.dev/api/{people}/?search={obi}

  // Создаем объект XMLHttpRequest, при помощи которого будем отправлять запрос
  let request = new XMLHttpRequest();

  // Назначаем обработчик события load для запроса
  request.addEventListener("load", function () {
    // отображаем в консоли текст ответа сервера

    // парсим его из JSON-строки в JavaScript-объект
    let response = JSON.parse(request.response);

    // Проверяем статус-код, который прислал сервер
    // 200 — это ОК, остальные — ошибка или не подходят
    if (request.status !== 200) {
      alert(
        "Произошла ошибка при получении ответа от сервера:\n\n" +
        response.message
      );
      return;
    }

    // Проверяем, если поле имя в ответе на запрос
    if (response.count == 0) {
      alert("К сожалению, данные не получены по запросу: " + url);
      return;
    }

    // Если все в порядке, то отображаем результаты поиска
    showResut(response.results);
    name
  });

  // Обработчик готов, можно отправлять запрос
  // Открываем соединение и отправляем
  request.open("get", url);
  request.send();

};


// Отображаем результаты поиска в случае успешного запроса (responce.count > 0)
function showResut(results) {

  // скрываем отоборажение данных персонажа
  document.querySelector(".person_data").hidden = true;

  document.querySelector(".search_result").innerHTML = "";

  for (let i = 0; i < results.length; i++) {
    // создаем кнопку для персонажа
    let item = document.createElement('li');
    item.textContent = results[i].name;

    item.addEventListener("click", function () {
      document.querySelector("#name").textContent = results[i].name || "";
      document.querySelector("#height").textContent = results[i].height || "";
      document.querySelector("#mass").textContent = results[i].mass || "";
      document.querySelector("#birth_year").textContent = results[i].birth_year || "";
      document.querySelector("#films_count").textContent = results[i].films.length || "";

      // показываем отоборажение данных персонажа
      document.querySelector(".person_data").hidden = false;
    });

    document.querySelector(".search_result").appendChild(item);
  }
};