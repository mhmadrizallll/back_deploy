"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            res.status(401).json({ status: false, message: "Access denied" });
            return;
        }
        const token = authorization.split(" ")[1];
        const superadminSecret = process.env.SUPERADMIN_SECRET;
        const adminSecret = process.env.ADMIN_SECRET;
        const memberSecret = process.env.MEMBER_SECRET;
        let user;
        try {
            user = jsonwebtoken_1.default.verify(token, superadminSecret);
        }
        catch (err) {
            try {
                user = jsonwebtoken_1.default.verify(token, adminSecret);
            }
            catch (err) {
                try {
                    user = jsonwebtoken_1.default.verify(token, memberSecret);
                }
                catch (err) {
                    res.status(401).json({ status: false, message: "Access denied" });
                    return;
                }
            }
        }
        if (!user || typeof user !== "object" || !user.id || !user.role) {
            return res.status(401).json({ status: false, message: "Access denied" });
        }
        req.user = user;
        console.log(req.user);
        next();
    }
    catch (err) {
        res.status(500).json({ status: false, message: err });
    }
};
exports.default = authMiddleware;
