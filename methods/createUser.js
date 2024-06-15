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

        // Проверка возраста на наличие исключительно цифр
        if (!isNaN(userObj.age) && !isNaN(parseFloat(userObj.age))) {
            let result = await data.createUserDb(userObj); // Создаём пользователя в бд
            resp.writeHead(201);
            resp.end(JSON.stringify(result)); // Выводим информацию о данном пользователе

            // Если ввели число с буквой(20 лет, 21 год), то ошибка
        } else {
            resp.writeHead(400);
            resp.end(JSON.stringify({message: "Age is not number"}));
        }
        
    });
}

module.exports = createUser;