
import * as http from "http";
import * as Static  from "node-static";
const ep1_0 = require("ep1_0");
import WebSocketServer = require('ws');
import {Test} from "./moduls/test";

const webSocketServer: WebSocketServer.Server = new WebSocketServer.Server({port: 8081});
webSocketServer.on('connection', (ws) => {

  console.log("новое соединение ");
  
  const test: Test = new Test("ep0_0");
  ws.send(test.episode);
  

  ws.on('message', function(message: string): void {
    test.nextEpisode(message);
    ws.send(test.episode);
  });

  ws.on('close', function(): void {
    console.log('соединение закрыто ');
  });

});


const fileServer: Static.Server = new Static.Server('.');
http.createServer( (req, res) => {
  
  fileServer.serve(req, res);

}).listen(8080);

console.log("Сервер запущен на портах 8080, 8081");

