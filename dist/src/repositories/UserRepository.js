"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = void 0;
const users_model_1 = require("../models/users.model");
class UserRepository {
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield users_model_1.UsersModel.query();
        });
    }
    getAdminUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield users_model_1.UsersModel.query().where("role", "admin");
        });
    }
    getMemberUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield users_model_1.UsersModel.query().where("role", "member");
        });
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield users_model_1.UsersModel.query().insert(user);
        });
    }
    findByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield users_model_1.UsersModel.query().findOne({ username });
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield users_model_1.UsersModel.query().findById(id);
        });
    }
    updateUser(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield users_model_1.UsersModel.query().patchAndFetchById(id, user);
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield users_model_1.UsersModel.query().deleteById(id);
            return;
        });
    }
}
const userRepository = new UserRepository();
exports.userRepository = userRepository;
