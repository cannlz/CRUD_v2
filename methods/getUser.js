const data = require('../utils/sql3_db')


function getUser(req, resp) {
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

        // Если указан ID, то выводим информацию о пользователе с полученным ID 
        if (body.length > 0) {

            // Ищем в бд пользователя с данным ID
            let response = await data.getUserByIdDb(userObj);
            
            if (response !== undefined) {
                resp.writeHead(200);
                resp.end(JSON.stringify(response));
                //Если не нашли, выдаём 404
            } else {
                resp.writeHead(404);
                resp.end(JSON.stringify({message: "User not found"}));
            }
            // Иначе выводим список всех пользователей
        } else {
            resp.writeHead(200);
            let response = await data.getAllUsersDb()
            resp.end(JSON.stringify(response));
        }
    });
}

module.exports = getUser;