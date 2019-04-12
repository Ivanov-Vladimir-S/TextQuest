"use strict";
if (!window.WebSocket) {
    document.body.innerHTML = 'WebSocket в этом браузере не поддерживается.';
}
;
const socket = new WebSocket("ws://localhost:8081");
const buttonsEl = document.getElementById("buttons");
const textEl = document.getElementById("text");
if (buttonsEl != null && textEl != null) {
    socket.onmessage = function (event) {
        const content = JSON.parse(event.data);
        buttonsEl.innerHTML = '';
        let buttonsArray = [];
        if (content.text != undefined) {
            textEl.innerHTML = content.text;
        }
        for (let i = 0; i < content.choice.length; i++) {
            buttonsArray[i] = document.createElement("button");
            buttonsArray[i].id = i + "";
            buttonsArray[i].innerHTML = content.choice[i];
            buttonsEl.appendChild(buttonsArray[i]);
        }
        buttonsEl.onclick = function (event) {
            if (event.target != null) {
                const targetEl = event.target;
                console.log(targetEl.id);
                socket.send(targetEl.id);
            }
        };
    };
}
//# sourceMappingURL=browser.js.map