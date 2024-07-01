"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPassword = exports.encryptPassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const encryptPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcryptjs_1.default.hash(password, 10, (err, result) => {
            if (!!err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });
};
exports.encryptPassword = encryptPassword;
const checkPassword = (encryptPassword, password) => {
    return new Promise((resolve, reject) => {
        bcryptjs_1.default.compare(password, encryptPassword, (err, result) => {
            if (!!err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });
};
exports.checkPassword = checkPassword;
