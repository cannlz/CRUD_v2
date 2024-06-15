let startServer = require('./utils/server');
let rooter = require('./utils/rooter');

const url = require('url');

// Обработка запросов
const requestHandler = ((req, resp) => {
    const parsedUrl = url.parse(req.url, true);
    const method = req.method;
    const path = parsedUrl.pathname;

    // Запускаем rooter для обработки входящих запросов
    rooter(req, resp, path, method);
});

// Запускаем сервер
startServer(requestHandler);