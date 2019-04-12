"use strict";
/// <reference path="./node_modules/test.ts" />
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const http = __importStar(require("http"));
const Static = __importStar(require("node-static"));
const ep1_0 = require("ep1_0");
const WebSocketServer = require("ws");
const test_1 = require("test");
const webSocketServer = new WebSocketServer.Server({ port: 8081 });
webSocketServer.on('connection', (ws) => {
    console.log("новое соединение ");
    const test = new test_1.Test("ep1_0");
    ws.send(test.episode);
    ws.on('message', function (message) {
        test.NextEpisode(message);
        console.log(test.mind);
        ws.send(test.episode);
    });
    ws.on('close', function () {
        console.log('соединение закрыто ');
    });
});
const fileServer = new Static.Server('.');
http.createServer((req, res) => {
    fileServer.serve(req, res);
}).listen(8080);
console.log("Сервер запущен на портах 8080, 8081");
//# sourceMappingURL=server.js.map