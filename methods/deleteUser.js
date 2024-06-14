let data = require('../utils/sql3_db');

// Удалить пользователя по его ID
function deleteUser(req, resp) {
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

        let response = await data.deleteUserDb(userObj); // Пробуем удалить пользователя
        // Если пользователь найдет, то удаляем
        if (response) {
            resp.writeHead(201);
            resp.end(JSON.stringify({message: response}));

            // Иначе кидаем ошибку 404
        } else {
            resp.writeHead(404);
            resp.end(JSON.stringify({message: "User not found"}));
        }

    });
}

module.exports = deleteUser;