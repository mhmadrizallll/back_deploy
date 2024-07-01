import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
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
      user = jwt.verify(token, superadminSecret) as jwt.JwtPayload & {
        id: string;
        role: string;
      };
    } catch (err) {
      try {
        user = jwt.verify(token, adminSecret) as jwt.JwtPayload & {
          id: string;
          role: string;
        };
      } catch (err) {
        try {
          user = jwt.verify(token, memberSecret) as jwt.JwtPayload & {
            id: string;
            role: string;
          };
        } catch (err) {
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
  } catch (err) {
    res.status(500).json({ status: false, message: err });
  }
};

export default authMiddleware;
