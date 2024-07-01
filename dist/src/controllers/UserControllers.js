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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userControllers = void 0;
const UserService_1 = require("../services/UserService");
const bcrypt_1 = require("../utils/bcrypt");
const uuid_1 = require("uuid");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const google_auth_library_1 = require("google-auth-library");
const client = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID);
class UserControllers {
    getUsers(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const role = (_a = req.user) === null || _a === void 0 ? void 0 : _a.role;
            console.log(role);
            try {
                let users;
                if (role === "superadmin") {
                    users = yield UserService_1.userService.getAllUsers();
                }
                else if (role === "admin") {
                    users = yield UserService_1.userService.getAdminUsers();
                }
                else if (role === "member") {
                    users = yield UserService_1.userService.getMemberUsers();
                }
                else {
                    res.status(401).json({ status: false, message: "Access forbidden" });
                    return;
                }
                const withoutPassword = users.map((user) => {
                    const { password } = user, rest = __rest(user, ["password"]);
                    return rest;
                });
                res.status(200).json({
                    status: true,
                    message: "Users Available",
                    data: withoutPassword,
                });
            }
            catch (err) {
                res.status(500).json({ status: false, message: err });
            }
        });
    }
    register(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { username, email, password, role } = req.body;
            const roles = (_a = req.user) === null || _a === void 0 ? void 0 : _a.role;
            try {
                const validatedPassword = (password) => {
                    const capitalLetter = /^[A-Z]/;
                    const containNumber = /[0-9]/;
                    const containSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;
                    if (capitalLetter.test(password) &&
                        containNumber.test(password) &&
                        containSpecialChar.test(password)) {
                        return true;
                    }
                    return false;
                };
                if (!username || username.trim() === "") {
                    res
                        .status(400)
                        .json({ status: false, message: "Username cannot be empty" });
                    return;
                }
                if (!email || email.trim() === "") {
                    res
                        .status(400)
                        .json({ status: false, message: "Email cannot be empty" });
                    return;
                }
                if (!validatedPassword(password)) {
                    res.status(400).json({
                        status: false,
                        message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
                    });
                    return;
                }
                const payload = {
                    id: (0, uuid_1.v4)(),
                    username,
                    email: email.toLowerCase(),
                    password: yield (0, bcrypt_1.encryptPassword)(password),
                    role,
                };
                // role member tanpa authentikasi
                if (role === "member") {
                    yield UserService_1.userService.register(payload.id, payload.username, payload.email, payload.password, payload.role);
                    return res.status(201).json({
                        status: true,
                        message: "Member created successfully",
                        data: {
                            id: payload.id,
                            username: payload.username,
                            email: payload.email,
                            role: payload.role,
                        },
                    });
                }
                // jika tidak ada roles pada data user
                if (!roles) {
                    res.status(401).json({ status: false, message: "Access forbidden" });
                    return;
                }
                // jika roles bukan superadmin
                if (roles !== "superadmin") {
                    res
                        .status(401)
                        .json({ status: false, message: "Only superadmin can register" });
                    return;
                }
                // role superadmin tidak bisa dibuat
                if (role === "superadmin") {
                    res
                        .status(401)
                        .json({ status: false, message: "Not create role superadmin" });
                    return;
                }
                yield UserService_1.userService.register(payload.id, payload.username, payload.email, payload.password, payload.role);
                res.status(201).json({
                    status: true,
                    message: "User created successfully",
                    data: {
                        id: payload.id,
                        username: payload.username,
                        email: payload.email,
                        role: payload.role,
                    },
                });
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ status: false, message: err });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = req.body;
                const user = yield UserService_1.userService.login(username);
                console.log(user);
                if (!user) {
                    res.status(404).json({ status: false, message: "User not found" });
                    return;
                }
                const isPasswordCorrect = yield (0, bcrypt_1.checkPassword)(user.password, password);
                if (!isPasswordCorrect) {
                    res.status(401).json({ status: false, message: "Wrong password" });
                    return;
                }
                const payload = {
                    id: user.id,
                    username: user.username,
                    role: user.role,
                };
                let token;
                if (user.role === "superadmin") {
                    token = jsonwebtoken_1.default.sign(payload, process.env.SUPERADMIN_SECRET, {
                        expiresIn: "30d",
                    });
                }
                else if (user.role === "admin") {
                    token = jsonwebtoken_1.default.sign(payload, process.env.ADMIN_SECRET, {
                        expiresIn: "30d",
                    });
                }
                else if (user.role === "member") {
                    token = jsonwebtoken_1.default.sign(payload, process.env.MEMBER_SECRET, {
                        expiresIn: "30d",
                    });
                }
                console.log(payload);
                res.status(200).json({
                    status: true,
                    message: "User logged in successfully",
                    user: Object.assign(Object.assign({}, user), { password: undefined }),
                    token,
                });
            }
            catch (err) {
                res.status(500).json({ status: false, message: err });
            }
        });
    }
    updateUser(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            const userRole = (_b = req.user) === null || _b === void 0 ? void 0 : _b.role;
            console.log(id, userRole, userId);
            const data = req.body;
            try {
                //
                const validatedPassword = (password) => {
                    const capitalLetter = /^[A-Z]/;
                    const containNumber = /[0-9]/;
                    const containSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;
                    if (capitalLetter.test(password) &&
                        containNumber.test(password) &&
                        containSpecialChar.test(password)) {
                        return true;
                    }
                    return false;
                };
                if (!data.username || data.username.trim() === "") {
                    res
                        .status(400)
                        .json({ status: false, message: "Username cannot be empty" });
                    return;
                }
                if (!data.email || data.email.trim() === "") {
                    res
                        .status(400)
                        .json({ status: false, message: "Email cannot be empty" });
                    return;
                }
                if (!validatedPassword(data.password)) {
                    res.status(400).json({
                        status: false,
                        message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
                    });
                    return;
                }
                const payload = {
                    username: data.username,
                    email: data.email.toLowerCase(),
                    password: yield (0, bcrypt_1.encryptPassword)(data.password),
                    role: data.role,
                    updated_at: new Date(),
                };
                //
                if (data.role === "member") {
                    yield UserService_1.userService.updateUser(id, {
                        username: payload.username,
                        email: payload.email,
                        password: payload.password,
                        role: payload.role,
                        updated_at: payload.updated_at,
                    });
                    res.status(200).json({
                        status: true,
                        message: "User updated",
                        data: {
                            id: data.id,
                            username: payload.username,
                            email: payload.email,
                            role: payload.role,
                        },
                    });
                    return;
                }
                if (userId !== id && userRole !== "superadmin") {
                    res
                        .status(401)
                        .json({ status: false, message: "Update for only superadmin" });
                    return;
                }
                const user = yield UserService_1.userService.updateUser(id, {
                    username: payload.username,
                    email: payload.email,
                    password: payload.password,
                    role: payload.role,
                    created_at: payload.created_at,
                    updated_at: payload.updated_at,
                });
                if (!user) {
                    res.status(404).json({ status: false, message: "User not found" });
                }
                res.status(200).json({
                    status: true,
                    message: "User updated",
                    data: {
                        id: user.id,
                        username: user.username,
                        email: user.email,
                        role: user.role,
                        created_at: payload.created_at,
                        updated_at: payload.updated_at,
                    },
                });
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ status: false, message: err });
            }
        });
    }
    deleteUser(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            const userRole = (_b = req.user) === null || _b === void 0 ? void 0 : _b.role;
            console.log(id, userRole, userId);
            try {
                if (userId !== id && userRole !== "superadmin") {
                    res.status(401).json({ status: false, message: "Access forbidden" });
                    return;
                }
                const user = yield UserService_1.userService.deleteUser(id);
                if (!user) {
                    res.status(404).json({ status: false, message: "User not found" });
                    return;
                }
                res.status(200).json({ status: true, message: "User deleted" });
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ status: false, message: err });
            }
        });
    }
    getCurrentUser(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            try {
                const user = yield UserService_1.userService.getCurrentUser(id);
                if (!user) {
                    res.status(404).json({ status: false, message: "User not found" });
                    return;
                }
                res.status(200).json({ status: true, message: "User Available", user });
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ status: false, message: err });
            }
        });
    }
    loginWithGoogle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { token } = req.body;
                const ticket = yield client.verifyIdToken({
                    idToken: token,
                    audience: process.env.GOOGLE_CLIENT_ID,
                });
                const response = ticket.getPayload();
                console.log(response);
                const payload = {
                    id: response.sub,
                    email: response.email,
                    name: response.name,
                    picture: response.picture,
                    role: "member",
                };
                const tokenJwt = jsonwebtoken_1.default.sign(payload, process.env.MEMBER_SECRET, {});
                res.status(200).json({ status: true, token: tokenJwt, data: payload });
            }
            catch (err) {
                res.status(500).json({ status: false, message: err });
            }
        });
    }
}
const userControllers = new UserControllers();
exports.userControllers = userControllers;
