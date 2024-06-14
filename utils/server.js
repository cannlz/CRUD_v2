
function startServer(requestHandler) {
    const http = require('http');

    // Создание сервера
    const server = http.createServer(requestHandler);

    // Запускаем сервер
    server.listen(3000, () => {
        console.log('Server on 127.0.0.1:3000')
    });
}


module.exports = startServer;