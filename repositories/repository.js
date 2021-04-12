import dao from './dao';
const bcrypt = require('bcrypt');
const saltRounds = 10;

export default class {

    static async getAllDatas() {
        return await dao.all("SELECT * FROM datas", [])
    }

    static async getUserByUsername(username) {
        return dao.get("SELECT * FROM users WHERE username =?", [username]);
    }

    static async getUserById(id) {
        return dao.get('SELECT * FROM users WHERE id = ?', [id]);
    }

    static async registerUser(username, hash) {
        return await dao.run(`INSERT INTO users (username, password) VALUES ('${username}', '${hash}');`);
    }
}
