"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModel = void 0;
const objection_1 = require("objection");
class UsersModel extends objection_1.Model {
    static get tableName() {
        return "users";
    }
}
exports.UsersModel = UsersModel;
