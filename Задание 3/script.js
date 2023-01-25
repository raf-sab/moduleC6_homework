const inpMessNode = document.querySelector('.input-message');
const btnSendNode = document.querySelector('.btn-send');
const btnGeoNode = document.querySelector('.btn-geo');
const boxChatNode = document.querySelector('.chat-box');
const infoNode = document.querySelector('.info');

const url = "wss://echo.websocket.events/.ws";
let websocket;

websocket = new WebSocket(url);

// Выводим сообщение
function writeToScreen(message) {
	let tag = document.createElement("p");
	tag.style = "break-word";
	tag.innerHTML = message;
	boxChatNode.appendChild(tag);
	boxChatNode.scrollTop = boxChatNode.scrollHeight;
}

// Сообщение пользователя
btnSendNode.addEventListener('click', () => {
    const message = inpMessNode.value;
    if (message != '') {
    	writeToScreen('<span class="send-user">' + message +'</span>');
    	websocket.send(message);
    	inpMessNode.value = '';
    } 
});

// Соединение установлено
websocket.onopen = function(e) {
    infoNode.innerHTML = '<span style="color: green;">Соединение установлено...</span>';
}

// Ответ сервера
websocket.onmessage = function(evt) {
    if (evt.data !== 'echo.websocket.events sponsored by Lob.com') {
    	writeToScreen('<span class="send-server">' + evt.data +'</span>');
    }
};

// Соединение прервано
websocket.onclose = function(e) {
    infoNode.innerHTML = '<span style="color: red;">Соединение прервано...</span>\
    <button id="reset" class="btn-reset">Обновить страницу</button>';
    const btn = document.querySelector('.btn-reset');
    // Перезагрузка страницы
    btn.addEventListener('click', () => {
        location.reload(); 
    });
}

// Ошибка
websocket.onerror = function(evt) {
    writeToScreen('<span class="send-server" style="color: red;">ERROR: </span> ' + evt.data);
  };

// Геолокация
btnGeoNode.addEventListener('click', () => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            const { coords } = position;
            writeToScreen(`<a class="send-user" href = https://www.openstreetmap.org/#map=18/${coords.latitude}/${coords.longitude} \
            id="map-link" target="_blank">Ваша геолокация</a>`)
        }, () => {
        	// Если выбрали "Блокировать" 
        	writeToScreen(`<span class="send-server" style="color: red;">Разрешите доступ к данным о вашем местоположении...</span>`);
        });
    } else {
        writeToScreen(`<span class="send-server" style="color: red;">Ваше местоположение недоступно</span>`);   
    }
});
