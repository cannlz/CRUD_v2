const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('crud_base.db');


db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age INTEGER NOT NULL
)`);


module.exports = {

    // Получение всех пользователей
    async getAllUsersDb() {
        const getAllUsersPomis = await new Promise((resolve, reject) => {
            db.all('SELECT * FROM users', [], (err, rows) => {
                err ? reject(err) : resolve(rows);
            });
        }).catch((err) => {return err});
        return getAllUsersPomis;
    },

    // Получение одного пользователя по его ID
    async getUserByIdDb(user) {
        const getUserPomis = await new Promise((resolve, reject) => {
            db.get('SELECT * FROM users WHERE id = ?', [user.id], (err, rows) => {
                err ? reject(err) : resolve(rows);
            });
        }).catch((err) => {return err});
        return getUserPomis;
    },

    // Создание пользователя
    async createUserDb(user) {
        const createUserDbPomis = await new Promise((resolve, reject) => {
            db.run('INSERT INTO users (name, age) VALUES (?, ?)', [user.name, user.age], function (err) {
                err ? reject(err) : resolve(this.createUserDbPomis);
            });
        }).catch((err) => {return err});
        return { id: createUserDbPomis, ...user };
    },

    // Обновление данных пользователя
    async updateUserDb(user) {
        const changes = await new Promise((resolve, reject) => {
            db.run('UPDATE users SET name = ?, age = ? WHERE id = ?', [user.name, user.age, user.id], function (err) {
                err ? reject(err) : resolve(this.changes);
            });
        }).catch((err) => {return err});

        // Если не нашли пользователя, то возвращаем null
        if (this.changes === 0) {
            return null;
        }
        // Если нашли, возвращаем обновлённые данные
        return this.getUserByIdDb(user.id);
    },

    // Удаление пользователя
    async deleteUserDb(user) {
        const changes = await new Promise((resolve, reject) => {
            db.run('DELETE FROM users WHERE id = ?', [user.id], function (err) {
                err ? reject(err) : resolve(this.changes);
            });
        }).catch((err) => {return err});
        return changes > 0; // В случае успешного удаления, возвращаем true
    }
}