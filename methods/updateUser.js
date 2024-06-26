const data = require('../utils/sql3_db')

// Обновить пользователя по ID
function updateUser(req, resp) {
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

            // Ищем индекс пользователя с полученным id в бд
            let response = await data.updateUserDb(userObj);
            
            // Если нашли, то обновляем данные
            if (response !== undefined) {
                resp.writeHead(201);
                resp.end(JSON.stringify(response));

                // Иначе кидаем ошибку 404
            } else {
                resp.writeHead(404);
                resp.end(JSON.stringify({message: "User not found"}));
            }
            // Если ввели число с буквой(20 лет, 21 год), то ошибка
        } else {
            resp.writeHead(400);
            resp.end(JSON.stringify({message: "Age is not number"}));
        }
    });
}

module.exports = updateUser;