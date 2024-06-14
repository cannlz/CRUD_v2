let getUser = require('../methods/getUser');
let createUser = require('../methods/createUser');
let updateUser = require('../methods/updateUser');
let deleteUser = require('../methods/deleteUser');

function rooter(req, resp, users, path, method) {
    // Заголовки ответа
    resp.setHeader('Content-Type', 'application/json');

    switch(path, method) {
        case '/users', 'GET':
            // Получить список пользователей/одного пользователя, если передать его id
            getUser(req, resp, users);
            break;
        
        case '/users', 'POST':
            // Создать пользователя по его ID
            createUser(req, resp, users);
            break;

        case '/users', 'PUT':
            // Обновить пользователя по ID
            updateUser(req, resp, users);
            break;
        
        case '/users', 'DELETE':
            // Удалить пользователя по его ID
            deleteUser(req, resp, users);
            break;

        default:
            // Если что-то пошло не так(не тот path или method), выдаём 404 с ошибкой
            resp.writeHead(404);
            resp.end(JSON.stringify({message: "Route nor found"}));
            break;
    }
}

module.exports = rooter;