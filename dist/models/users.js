"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersStore = void 0;
/* eslint-disable class-methods-use-this */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const database_1 = __importDefault(require("../database"));
dotenv_1.default.config();
const saltRounds = Number(process.env.SALT_ROUNDS);
const pepper = process.env.BCRYPT_PASSWORD;
class UsersStore {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'select * from users';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (error) {
            throw new Error(`Unable to fetch all the users : ${error}`);
        }
    }
    async show(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'select * from users where id = $(id)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Unable to fetch user : ${error}`);
        }
    }
    async create(username, firstname, lastname, password) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'insert into users (username,firstname, lastname, password) values($1,$2,$3,$4) returning *';
            const passwordHash = bcrypt_1.default.hashSync(`${password}${pepper}`, saltRounds);
            const result = await conn.query(sql, [
                username,
                firstname,
                lastname,
                passwordHash,
            ]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Unable to create user : ${error}`);
        }
    }
    async update(id, firstname, lastname, newPassword) {
        try {
            const conn = await database_1.default.connect();
            let sql;
            let result;
            if (!firstname && !lastname && !newPassword) {
                throw new Error('No parameters provided');
            }
            if (firstname) {
                sql = 'update users set firstname=($1) where id=($2) returning *';
                result = await conn.query(sql, [firstname, id]);
            }
            if (lastname) {
                sql = 'update users set lastname=($1) where id=($2) returning *';
                result = await conn.query(sql, [lastname, id]);
            }
            if (newPassword) {
                sql = 'update users set password=($1) where id=($2) returning *';
                const passwordHash = await bcrypt_1.default.hash(`${newPassword}${pepper}`, saltRounds);
                result = await conn.query(sql, [passwordHash, id]);
            }
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Unable to update a user : ${error}`);
        }
    }
    async login(username, password) {
        const conn = await database_1.default.connect();
        const sql = 'select * from users where username=($1)';
        const result = await conn.query(sql, [username]);
        if (result.rows.length) {
            const user = result.rows[0];
            if (bcrypt_1.default.compareSync(`${password}${pepper}`, user.password))
                return user;
        }
        conn.release();
        return null;
    }
    async delete(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'delete from users where id=($1) returning *';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Unable to delete user : ${error}`);
        }
    }
    async resetTable() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'alter sequence users_id_seq restart with 1';
            await conn.query(sql);
            conn.release();
        }
        catch (error) {
            throw new Error(`Unable to reset table : ${error}`);
        }
    }
}
exports.UsersStore = UsersStore;
