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
exports.seed = void 0;
const uuid_1 = require("uuid");
const bcrypt_1 = require("../src/utils/bcrypt");
function seed(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        // Deletes ALL existing entries
        yield knex("users").del();
        // Inserts seed entries
        yield knex("users").insert([
            {
                id: (0, uuid_1.v4)(),
                username: "superadmin",
                email: "superadmin@gmail.com",
                password: yield (0, bcrypt_1.encryptPassword)("Superadmin1*"),
                role: "superadmin",
            },
            {
                id: (0, uuid_1.v4)(),
                username: "superadmin1",
                email: "superadmin1@gmail.com",
                password: yield (0, bcrypt_1.encryptPassword)("Superadmin1*"),
                role: "superadmin",
            },
            {
                id: (0, uuid_1.v4)(),
                username: "superadmin2",
                email: "superadmin2@gmail.com",
                password: yield (0, bcrypt_1.encryptPassword)("Superadmin1*"),
                role: "superadmin",
            },
            {
                id: (0, uuid_1.v4)(),
                username: "superadmin3",
                email: "superadmin3@gmail.com",
                password: yield (0, bcrypt_1.encryptPassword)("Superadmin1*"),
                role: "superadmin",
            },
            {
                id: (0, uuid_1.v4)(),
                username: "superadmin4",
                email: "superadmin4@gmail.com",
                password: yield (0, bcrypt_1.encryptPassword)("Superadmin1*"),
                role: "superadmin",
            },
            {
                id: (0, uuid_1.v4)(),
                username: "admin",
                email: "admin@admin.com",
                password: yield (0, bcrypt_1.encryptPassword)("Admin1*"),
                role: "admin",
            },
            {
                id: (0, uuid_1.v4)(),
                username: "admin1",
                email: "admin1@admin.com",
                password: yield (0, bcrypt_1.encryptPassword)("Admin1*"),
                role: "admin",
            },
            {
                id: (0, uuid_1.v4)(),
                username: "admin2",
                email: "admin2@admin.com",
                password: yield (0, bcrypt_1.encryptPassword)("Admin1*"),
                role: "admin",
            },
            {
                id: (0, uuid_1.v4)(),
                username: "admin3",
                email: "admin3@admin.com",
                password: yield (0, bcrypt_1.encryptPassword)("Admin1*"),
                role: "admin",
            },
            {
                id: (0, uuid_1.v4)(),
                username: "admin4",
                email: "admin4@admin.com",
                password: yield (0, bcrypt_1.encryptPassword)("Admin1*"),
                role: "admin",
            },
            {
                id: (0, uuid_1.v4)(),
                username: "member",
                email: "member@member.com",
                password: yield (0, bcrypt_1.encryptPassword)("Member1*"),
                role: "member",
            },
            {
                id: (0, uuid_1.v4)(),
                username: "member1",
                email: "member1@member.com",
                password: yield (0, bcrypt_1.encryptPassword)("Member1*"),
                role: "member",
            },
            {
                id: (0, uuid_1.v4)(),
                username: "member2",
                email: "member2@member.com",
                password: yield (0, bcrypt_1.encryptPassword)("Member1*"),
                role: "member",
            },
            {
                id: (0, uuid_1.v4)(),
                username: "member3",
                email: "member3@member.com",
                password: yield (0, bcrypt_1.encryptPassword)("Member1*"),
                role: "member",
            },
            {
                id: (0, uuid_1.v4)(),
                username: "member4",
                email: "member4@member.com",
                password: yield (0, bcrypt_1.encryptPassword)("Member1*"),
                role: "member",
            },
            {
                id: (0, uuid_1.v4)(),
                username: "member5",
                email: "member5@member.com",
                password: yield (0, bcrypt_1.encryptPassword)("Member1*"),
                role: "member",
            },
            {
                id: (0, uuid_1.v4)(),
                username: "member6",
                email: "member6@member.com",
                password: yield (0, bcrypt_1.encryptPassword)("Member1*"),
                role: "member",
            },
            {
                id: (0, uuid_1.v4)(),
                username: "member7",
                email: "member7@member.com",
                password: yield (0, bcrypt_1.encryptPassword)("Member1*"),
                role: "member",
            },
        ]);
    });
}
exports.seed = seed;
