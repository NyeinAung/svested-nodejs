const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');
const bcrypt = require('bcrypt');
const fs = require('fs');
const saltRounds = 10;

export default class {

    static setupDbForDev() {
        //  This sets up a DB in memory to be used by creating tables, inserting values, etc.
        db.serialize(function () {
            const createUsersTable = "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT,username TEXT, password text)";
            db.run(createUsersTable);
            const createItemsTable = "CREATE TABLE IF NOT EXISTS datas (id INTEGER PRIMARY KEY AUTOINCREMENT, rand_alphabet TEXT)";
            db.run(createItemsTable);
        });
    }

    static saveData() {
        fs.readFile('./data/data.json', (err, data) => {
            if (err) throw err;
            let result = JSON.parse(data);
            result.forEach(function(item){
                const insertDatas = `INSERT INTO datas (rand_alphabet) VALUES ('${item.randAlphabet}');`;
                db.run(insertDatas);
            });
        });
        
        return true;
    }

    static all(stmt, params) {
        return new Promise((res, rej) => {
            db.all(stmt, params, (error, result) => {
                if (error) {
                    return rej(error.message);
                }
                return res(result);
            });
        })
    }
    static get(stmt, params) {
        return new Promise((res, rej) => {
            db.get(stmt, params, (error, result) => {
                if (error) {
                    return rej(error.message);
                }
                return res(result);
            });
        })
    }

    static run(stmt, params) {
        return new Promise((res, rej) => {
            db.run(stmt, params, (error, result) => {
                if (error) {
                    return rej(error.message);
                }
                return res(true);
            });
        })
    }


}
