const data = require('../utils/sql3_db')

// Создание пользователя
function createUser(req, resp) {
    let body = '';

    req.on('data', chunk => {
        body += chunk;
    });

    req.on('end', async () => {
        let userObj = {};

        // Конвертируем ответ из строки в obj(key: value)
        body.split("&").forEach(data => {
            let keyValue = data.split("=");
            userObj[keyValue[0]] = keyValue[1];
        });
        
        let result = await data.createUserDb(userObj); // Создаём пользователя в бд
        resp.writeHead(201);
        resp.end(JSON.stringify(result)); // Выводим информацию о данном пользователе
    });
}

module.exports = createUser;